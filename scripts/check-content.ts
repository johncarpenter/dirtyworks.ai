/**
 * Release gate. Exits non-zero while the site is not fit to publish.
 *
 * The constitution requires this to be a build gate rather than an intention: unresolved claims,
 * prohibited vocabulary, banned calls to action and unstamped illustrative artefacts must be
 * unable to reach production. Contract: specs/001-build-marketing-website/contracts/content-check.md
 *
 * Rules 1, 4 and 5 inspect the built output, because a stamp can only be verified as *rendered*.
 * Run `npm run build` first.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { PLACEHOLDERS } from '../src/content/placeholders';
import { ROUTES } from '../src/content/routes';
import { CLAIM_ARTEFACTS } from '../src/content/claim-artefacts';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

interface Violation {
  file: string;
  line: number;
  rule: string;
  message: string;
}

const violations: Violation[] = [];
const notes: string[] = [];

const fail = (file: string, line: number, rule: string, message: string) =>
  violations.push({ file, line, rule, message });

/* ------------------------------------------------------------------ file collection */

const walk = (dir: string, exts: string[]): string[] => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full, exts);
    return exts.includes(extname(full)) ? [full] : [];
  });
};

const srcFiles = walk(SRC, ['.astro', '.ts', '.tsx', '.css']);
const contentFiles = srcFiles.filter((f) => f.includes(join('src', 'content')));
const distHtml = walk(DIST, ['.html']);

const lineOf = (text: string, index: number) => text.slice(0, index).split('\n').length;

/** Strip comments so documentation of a banned term is not itself a violation. */
const stripComments = (text: string) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

const publishedRoutes = ROUTES.filter((r) => r.published);
const htmlForRoute = (path: string): string | null => {
  const candidates =
    path === '/'
      ? [join(DIST, 'index.html')]
      : [join(DIST, `${path.slice(1)}.html`), join(DIST, path.slice(1), 'index.html')];
  const found = candidates.find((c) => existsSync(c));
  return found ? readFileSync(found, 'utf8') : null;
};

/* ------------------------------------------------------------------ rule 1: placeholders */

/**
 * `--launch` promotes launch blockers to hard failures. Day to day, a page carrying an honest
 * visible stamp (real copy, approval outstanding) may ship; the public launch may not.
 */
const LAUNCH_MODE = process.argv.includes('--launch');

for (const placeholder of PLACEHOLDERS) {
  for (const routeId of placeholder.blocksRoutes) {
    const route = ROUTES.find((r) => r.id === routeId);
    if (!route?.published) continue;

    const message =
      `Placeholder ${placeholder.key} (${placeholder.state}, owner: ${placeholder.owner}) ` +
      `blocks route ${route.path}, but that route is published. ${placeholder.note}`;

    if (placeholder.severity === 'blocks-build') {
      fail('src/content/placeholders.ts', 0, 'RULE-1', message);
    } else if (LAUNCH_MODE) {
      fail('src/content/placeholders.ts', 0, 'RULE-1', `[launch] ${message}`);
    } else {
      notes.push(`RULE-1 launch blocker: ${message}`);
    }
  }
}

if (distHtml.length === 0) {
  notes.push(
    'dist/ is empty or missing: rules 1 (rendered markers), 4 (stamps) and 5 (rendered proof) ' +
      'were skipped. Run `npm run build` before this check in CI.',
  );
} else {
  /* An OPEN GAP marker in rendered output always fails: it means invented or missing content is
     public. A LEGAL REVIEW stamp is intentional pre-launch signage, so it fails only at launch. */
  const renderedMarkers = LAUNCH_MODE ? ['OPEN GAP', 'LEGAL REVIEW'] : ['OPEN GAP'];

  for (const route of publishedRoutes) {
    const html = htmlForRoute(route.path);
    if (html === null) {
      fail(
        relative(ROOT, join(DIST, route.path)),
        0,
        'RULE-1',
        `No built output found for ${route.path}`,
      );
      continue;
    }
    for (const marker of renderedMarkers) {
      /* Word-boundary matched, plus the stamp attribute. A substring match is wrong here: the
         monthly record on /method legitimately says "Evaluated failures / open gaps", which is
         copy, not an unresolved-content marker. */
      const phrase = new RegExp(`\\b${marker}\\b`, 'i');
      const stamped = html.includes(`data-claim-state="${marker}"`);
      if (phrase.test(html) || stamped) {
        fail(
          `dist${route.path}`,
          0,
          'RULE-1',
          `Unresolved marker "${marker}" is rendered on published route ${route.path}`,
        );
      }
    }
  }
}

/* ------------------------------------------------------------------ rule 2: vocabulary */

const BANNED_VOCABULARY = [
  'revolutionary',
  'game-changing',
  'unleash',
  'unlock',
  'harness',
  'seamless',
  'frictionless',
  'magic',
  'supercharge',
  'transformative',
  'cutting-edge',
  'future-proof',
  'autonomous workforce',
  'replace employees',
  'eliminate hallucinations',
  'one-click',
  'set-and-forget',
];

const CAREFUL_VOCABULARY = ['AI-powered', 'ROI'];

for (const file of srcFiles) {
  const text = stripComments(readFileSync(file, 'utf8'));
  for (const term of BANNED_VOCABULARY) {
    const re = new RegExp(`\\b${term.replace(/[-]/g, '[-\\\\s]')}\\b`, 'gi');
    for (const match of text.matchAll(re)) {
      fail(relative(ROOT, file), lineOf(text, match.index ?? 0), 'RULE-2', `Prohibited term "${match[0]}"`);
    }
  }
  for (const term of CAREFUL_VOCABULARY) {
    const re = new RegExp(`\\b${term}\\b`, 'g');
    for (const match of text.matchAll(re)) {
      notes.push(
        `${relative(ROOT, file)}:${lineOf(text, match.index ?? 0)} RULE-2 warning: "${match[0]}" requires ` +
          `an adjacent specific.`,
      );
    }
  }
}

/* ------------------------------------------------------------------ rule 3: banned CTAs */

const BANNED_CTAS = ['get started', 'learn more', 'book a demo', 'contact us', 'talk to sales'];

const linkText = (html: string): { text: string; index: number }[] => {
  const out: { text: string; index: number }[] = [];
  for (const match of html.matchAll(/<(?:a|button)\b[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)) {
    out.push({ text: match[1].replace(/<[^>]*>/g, ' ').trim(), index: match.index ?? 0 });
  }
  return out;
};

for (const file of distHtml) {
  const html = readFileSync(file, 'utf8');
  for (const { text, index } of linkText(html)) {
    const normalised = text.toLowerCase().replace(/\s+/g, ' ').trim();
    if (BANNED_CTAS.includes(normalised)) {
      fail(relative(ROOT, file), lineOf(html, index), 'RULE-3', `Banned call to action label "${text}"`);
    }
  }
}

/* ------------------------------------------------------------------ rule 4: claim stamps */

if (distHtml.length > 0) {
  for (const artefact of CLAIM_ARTEFACTS) {
    const route = ROUTES.find((r) => r.id === artefact.route);
    if (!route?.published) continue;
    const html = htmlForRoute(route.path);
    if (html === null) continue;
    if (!html.toLowerCase().includes(artefact.marker.toLowerCase())) {
      fail(
        `dist${route.path}`,
        0,
        'RULE-4',
        `${artefact.what} must render its ${artefact.stamp} stamp ("${artefact.marker}")`,
      );
    }
  }
}

/* ------------------------------------------------------------------ rule 5: fabricated proof */

const PRICE = /(?:^|[\s(>])(?:\$|CAD\s?\$?|USD\s?\$?)\s?\d[\d,]*(?:\.\d{2})?\b/g;
const COMPARATIVE = /\b\d+(?:\.\d+)?\s?(?:%|percent|x)\s+(?:faster|cheaper|better|more|less)\b/gi;
const PROOF_WORDS = /\b(?:testimonial|ISO\s?\d{4,5}|SOC\s?2)\b/gi;

for (const file of srcFiles) {
  const text = stripComments(readFileSync(file, 'utf8'));
  for (const re of [PRICE, COMPARATIVE, PROOF_WORDS]) {
    for (const match of text.matchAll(re)) {
      fail(
        relative(ROOT, file),
        lineOf(text, match.index ?? 0),
        'RULE-5',
        `Unsupported proof or price: "${match[0].trim()}"`,
      );
    }
  }
}

/* ------------------------------------------------------------------ rule 6: emoji */

const EMOJI = /\p{Extended_Pictographic}/gu;
/* Structural connectors permitted inside diagrams; everything else pictographic is banned. */
const ALLOWED_GLYPHS: Record<string, true> = { '\u2192': true, '\u2191': true };

for (const file of srcFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(EMOJI)) {
    if (ALLOWED_GLYPHS[match[0]]) continue;
    fail(
      relative(ROOT, file),
      lineOf(text, match.index ?? 0),
      'RULE-6',
      `Emoji or pictographic character "${match[0]}" is not permitted`,
    );
  }
}

/* ------------------------------------------------------------------ rule 7: casing */

for (const file of srcFiles) {
  const text = stripComments(readFileSync(file, 'utf8'));
  for (const match of text.matchAll(/\b(DirtyWorks|Dirty Works)\b/g)) {
    fail(
      relative(ROOT, file),
      lineOf(text, match.index ?? 0),
      'RULE-7',
      `Brand is "Dirtyworks.ai" in prose; found "${match[0]}"`,
    );
  }
}

for (const file of contentFiles) {
  const text = stripComments(readFileSync(file, 'utf8'));
  for (const match of text.matchAll(/\b(?:heading|title)\s*:\s*'([^']{8,})'/g)) {
    const value = match[1];
    const letters = value.replace(/[^A-Za-z]/g, '');
    if (letters.length > 6 && letters === letters.toUpperCase()) {
      fail(
        relative(ROOT, file),
        lineOf(text, match.index ?? 0),
        'RULE-7',
        `Headings are authored in sentence case and uppercased by CSS; found "${value}"`,
      );
    }
  }
}

/* ------------------------------------------------------------------ rule 8: tokens and surfaces */

const cssLike = srcFiles.filter((f) => ['.css', '.astro'].includes(extname(f)));
const definedVars = new Set<string>();
for (const file of cssLike) {
  for (const match of readFileSync(file, 'utf8').matchAll(/(--[a-z0-9-]+)\s*:/gi)) {
    definedVars.add(match[1]);
  }
}

for (const file of cssLike) {
  const text = readFileSync(file, 'utf8');

  for (const match of text.matchAll(/var\((--[a-z0-9-]+)/gi)) {
    if (!definedVars.has(match[1])) {
      fail(
        relative(ROOT, file),
        lineOf(text, match.index ?? 0),
        'RULE-8',
        `Unknown design token ${match[1]} — not defined in the vendored token set`,
      );
    }
  }

  for (const match of text.matchAll(/border-radius:\s*([^;}]+)/gi)) {
    for (const px of match[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
      if (Number(px[1]) > 3) {
        fail(
          relative(ROOT, file),
          lineOf(text, match.index ?? 0),
          'RULE-8',
          `border-radius ${px[1]}px exceeds the 3px ceiling`,
        );
      }
    }
  }

  for (const match of text.matchAll(/box-shadow:\s*([^;}]+)/gi)) {
    const value = match[1];
    if (/\bnone\b|^var\(/.test(value.trim())) continue;
    const lengths = [...value.matchAll(/(-?\d+(?:\.\d+)?)(?:px)?(?=\s|$)/g)].map((m) =>
      Number(m[1]),
    );
    if (lengths.length >= 3 && lengths[2] !== 0) {
      fail(
        relative(ROOT, file),
        lineOf(text, match.index ?? 0),
        'RULE-8',
        `box-shadow blur must be 0 (one hard offset or none); found "${value.trim()}"`,
      );
    }
  }

  for (const match of text.matchAll(/(linear|radial|conic)-gradient\(/gi)) {
    fail(relative(ROOT, file), lineOf(text, match.index ?? 0), 'RULE-8', 'Gradients are not permitted');
  }

  for (const match of text.matchAll(/@import\s+url\(\s*["']?https?:/gi)) {
    fail(
      relative(ROOT, file),
      lineOf(text, match.index ?? 0),
      'RULE-8',
      'External @import: fonts and styles must be self-hosted',
    );
  }
}

/* ------------------------------------------------------------------ report */

const byRule = violations.reduce<Record<string, number>>((acc, v) => {
  acc[v.rule] = (acc[v.rule] ?? 0) + 1;
  return acc;
}, {});

for (const note of notes) console.log(`note: ${note}`);

if (violations.length === 0) {
  console.log(
    `check:content passed — ${srcFiles.length} source files, ${distHtml.length} built pages, ` +
      `${CLAIM_ARTEFACTS.length} claim artefacts verified.`,
  );
  process.exit(0);
}

for (const v of violations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  console.error(`${v.file}:${v.line}  ${v.rule}  ${v.message}`);
}
console.error(
  `\ncheck:content FAILED — ${violations.length} violation(s): ` +
    Object.entries(byRule)
      .map(([rule, count]) => `${rule}×${count}`)
      .join(', '),
);
process.exit(1);
