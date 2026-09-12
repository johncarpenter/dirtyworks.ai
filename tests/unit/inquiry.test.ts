import { describe, expect, it } from 'vitest';
import {
  INTERESTS,
  INTEREST_LABELS,
  MESSAGE_HELP,
  NEUTRAL_INTEREST,
  parseInterest,
} from '../../src/copy/inquiry';

describe('inquiry interest', () => {
  it('recognises exactly the three query values', () => {
    expect(parseInterest('?interest=workspace-pilot')).toBe('workspace-pilot');
    expect(parseInterest('?interest=existing-ai')).toBe('existing-ai');
    expect(parseInterest('?interest=msp-partner')).toBe('msp-partner');
  });

  it('falls back to the neutral selection for anything else', () => {
    expect(parseInterest('')).toBe(NEUTRAL_INTEREST);
    expect(parseInterest('?interest=')).toBe(NEUTRAL_INTEREST);
    expect(parseInterest('?interest=incident')).toBe(NEUTRAL_INTEREST);
    expect(parseInterest('?interest=not-sure')).toBe(NEUTRAL_INTEREST);
    expect(parseInterest('?interest=Workspace-Pilot')).toBe(NEUTRAL_INTEREST);
    expect(parseInterest('?other=workspace-pilot')).toBe(NEUTRAL_INTEREST);
  });

  it('labels and helps every interest, including the neutral one', () => {
    for (const interest of INTERESTS) {
      expect(INTEREST_LABELS[interest].length).toBeGreaterThan(0);
      expect(MESSAGE_HELP[interest].length).toBeGreaterThan(0);
    }
    expect(INTEREST_LABELS[NEUTRAL_INTEREST]).toBe('Not sure yet');
  });

  it('asks the MSP route for one client opportunity, never identifiable records', () => {
    expect(MESSAGE_HELP['msp-partner']).toBe(
      'Describe one client opportunity or the AI service you want to add.',
    );
  });
});
