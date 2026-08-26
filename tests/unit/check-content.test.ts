import { afterEach, describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Proves the release gate actually refuses bad content (SC-008). Each case injects exactly one
 * deliberate violation into src/, runs the real script, and asserts the matching rule fires.
 * A gate that has never been seen to fail is not a gate.
 */
const ROOT = process.cwd();
const FIXTURE_TS = join(ROOT, 'src', 'content', '__gate_fixture__.ts');
const FIXTURE_CSS = join(ROOT, 'src', 'styles', '__gate_fixture__.css');

interface GateResult {
  code: number;
  output: string;
}

const runGate = (): GateResult => {
  try {
    const stdout = execFileSync('npx', ['tsx', 'scripts/check-content.ts'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, output: stdout };
  } catch (error) {
    const err = error as { status?: number; stdout?: string; stderr?: string };
    return { code: err.status ?? 1, output: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
};

afterEach(() => {
  rmSync(FIXTURE_TS, { force: true });
  rmSync(FIXTURE_CSS, { force: true });
});

describe('release gate', () => {
  it('rejects prohibited marketing vocabulary', () => {
    writeFileSync(FIXTURE_TS, "export const copy = 'A seamless, game-changing platform.';\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-2');
    expect(output).toContain('seamless');
  });

  it('rejects an unsupported price', () => {
    writeFileSync(FIXTURE_TS, "export const copy = 'Managed AI operations from $2,400 a month.';\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-5');
  });

  it('rejects a fabricated proof word', () => {
    writeFileSync(FIXTURE_TS, "export const copy = 'We are SOC 2 compliant.';\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-5');
  });

  it('rejects emoji', () => {
    writeFileSync(FIXTURE_TS, "export const copy = 'Ship it \u{1F680}';\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-6');
  });

  it('rejects a mis-cased brand name', () => {
    writeFileSync(FIXTURE_TS, "export const copy = 'DirtyWorks operates the stack.';\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-7');
  });

  it('rejects an all-caps heading, because CSS does the uppercasing', () => {
    writeFileSync(FIXTURE_TS, "export const section = { heading: 'ACCESS IS NOT THE SERVICE' };\n");
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-7');
  });

  it('rejects a radius above the ceiling, a blurred shadow, a gradient and an unknown token', () => {
    writeFileSync(
      FIXTURE_CSS,
      [
        '.fixture-a { border-radius: 12px; }',
        '.fixture-b { box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2); }',
        '.fixture-c { background: linear-gradient(#fff, #000); }',
        '.fixture-d { color: var(--not-a-real-token); }',
        '',
      ].join('\n'),
    );
    const { code, output } = runGate();
    expect(code).toBe(1);
    expect(output).toContain('RULE-8');
    expect(output).toContain('exceeds the 3px ceiling');
    expect(output).toContain('blur must be 0');
    expect(output).toContain('Gradients are not permitted');
    expect(output).toContain('--not-a-real-token');
  });
});
