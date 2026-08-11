import { it, expect, describe } from 'vitest';
import { formatDate }  from './formatDate';

describe('formatDate', () => {
  it('formats integer 20260406 as string "2026-04-06".', () => {
    expect(formatDate(20260406)).toBe('2026-04-06');
  });
  
  it('formats integer 21110406 as string "2111-04-06".', () => {
    expect(formatDate(21110406)).toBe('2111-04-06');
    expect(formatDate(19280628)).toBe('1928-06-28');
  });
})
