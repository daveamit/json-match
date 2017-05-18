import {expect} from 'chai';
import jsonMatch from '../src';

describe('JSON Match', () => {
  describe('Should match Object', () => {
    it('Object -- all match', () => {
      const a = {
        a: 'a',
        b: {
          a: 'a',
          c: 'c',
          d: {
            d: 'm'
          }
        },
        c: 'C',
        d: 'd'
      };
      const b = {
        a: 'a',
        b: {
          a: 'a',
          c: 'C',
          d: {
            d: /m/
          }
        },
        c: /C/,
        d: 'd'
      }

      const match = jsonMatch(a, b);
      expect(match)
        .deep
        .equal({
          "exactMatch": 3,
          "fuzzyMatch": 1,
          "isExactMatch": false,
          "isMatch": true,
          "matchCount": 6,
          "mismatchCount": 0,
          "regExMatch": 2,
          "unmatchedCount": 0
        });
    });
    it('Object -- exact', () => {
      const a = {
        a: 'a',
        b: {
          a: 'a',
          c: 'C',
          d: {
            d: 'm'
          }
        },
        c: 'C',
        d: 'd'
      };
      const b = {
        a: 'a',
        b: {
          a: 'a',
          c: 'C',
          d: {
            d: 'm'
          }
        },
        c: 'C',
        d: 'd'
      }

      const match = jsonMatch(a, b);
      expect(match)
        .deep
        .equal({
          "exactMatch": 6,
          "fuzzyMatch": 0,
          "isExactMatch": true,
          "isMatch": true,
          "matchCount": 6,
          "mismatchCount": 0,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('Object -- unmatched', () => {
      const a = {
        a: 'a',
        b: {
          a: 'a',
          c: 'c',
          d: {
            d: 'm'
          }
        },
        c: 'C',
        d: 'd'
      };
      const b = {
        a: 'a',
        b: {
          a: 'a',
          c: 'C',
          d: {
            d: /m/,
            k: 8,
            m: /m/
          }
        },
        c: /C/,
        d: 'd'
      }

      const match = jsonMatch(a, b);
      expect(match)
        .deep
        .equal({
          "exactMatch": 3,
          "fuzzyMatch": 1,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 6,
          "mismatchCount": 0,
          "regExMatch": 2,
          "unmatchedCount": 2
        });
    });
  })
  describe('Should match primitive types -- HAPPY', () => {
    it('number -- exact', () => {
      const match = jsonMatch(0, 0);
      expect(match)
        .deep
        .equal({
          "exactMatch": 1,
          "fuzzyMatch": 0,
          "isExactMatch": true,
          "isMatch": true,
          "matchCount": 1,
          "mismatchCount": 0,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('number -- weak', () => {
      const match = jsonMatch(0, '0');
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 1,
          "isExactMatch": false,
          "isMatch": true,
          "matchCount": 1,
          "mismatchCount": 0,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- exact', () => {
      const match = jsonMatch('a', 'a');
      expect(match)
        .deep
        .equal({
          "exactMatch": 1,
          "fuzzyMatch": 0,
          "isExactMatch": true,
          "isMatch": true,
          "matchCount": 1,
          "mismatchCount": 0,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- fuzzy', () => {
      const match = jsonMatch('a', 'A');
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 1,
          "isExactMatch": false,
          "isMatch": true,
          "matchCount": 1,
          "mismatchCount": 0,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- regEx', () => {
      const match = jsonMatch('a', /a/);
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": true,
          "isMatch": true,
          "matchCount": 1,
          "mismatchCount": 0,
          "regExMatch": 1,
          "unmatchedCount": 0
        });
    });
  });
  describe('Should match primitive types -- UN-HAPPY', () => {
    it('number -- exact', () => {
      const match = jsonMatch(0, 1);
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 0,
          "mismatchCount": 1,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('number -- weak', () => {
      const match = jsonMatch(0, '1');
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 0,
          "mismatchCount": 1,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- exact', () => {
      const match = jsonMatch('a', 'b');
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 0,
          "mismatchCount": 1,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- fuzzy', () => {
      const match = jsonMatch('a', 'B');
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 0,
          "mismatchCount": 1,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
    it('string -- regEx', () => {
      const match = jsonMatch('a', /b/);
      expect(match)
        .deep
        .equal({
          "exactMatch": 0,
          "fuzzyMatch": 0,
          "isExactMatch": false,
          "isMatch": false,
          "matchCount": 0,
          "mismatchCount": 1,
          "regExMatch": 0,
          "unmatchedCount": 0
        });
    });
  });
});
