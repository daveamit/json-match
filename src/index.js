function mergeStats(a, b) {
  return Object
    .keys(a)
    .reduce((result, key) => ({
      ...result,
      [key]: a[key] + b[key],
    }), {});
}

function match(a, b) {
  const stats = {
    regExMatch: 0,
    exactMatch: 0,
    fuzzyMatch: 0,
    matchCount: 0,
    mismatchCount: 0,
    unmatchedCount: 0,
  };

  /* istanbul ignore next -- because istanbul is not properly covering typeof b*/
  const objectType = typeof b;
  switch (objectType) {
    case 'object':
      if (b instanceof RegExp) {
        if (b.test(a)) {
          stats.regExMatch = 1;
          stats.matchCount = 1;
        } else if (typeof a !== 'undefined') {
          stats.mismatchCount = 1;
        } else {
          stats.unmatchedCount = 1;
        }
      } else {
        Object
          .keys(b)
          .forEach((key) => {
            Object.assign(stats, mergeStats(stats, match(a[key], b[key])));
          });
      }
      return stats;
    default:
      if (b === a) {
        stats.exactMatch = 1;
        stats.matchCount = 1;
      } else if (a && b && typeof a === 'string' && typeof b === 'string' && b.toLowerCase() === a.toLowerCase()) {
        stats.fuzzyMatch = 1;
        stats.matchCount = 1;
      } else if (b == a) { // eslint-disable-line
        stats.fuzzyMatch = 1;
        stats.matchCount = 1;
      } else if (typeof a === 'undefined') {
        stats.unmatchedCount = 1;
      } else {
        stats.mismatchCount = 1;
      }
      return stats;
  }
}

export default(a, b) => {
  const stats = match(a, b);
  return Object.assign(stats, {
    isMatch: (stats.mismatchCount + stats.unmatchedCount) === 0,
    isExactMatch: (stats.mismatchCount + stats.unmatchedCount) === 0 && stats.fuzzyMatch === 0,
  });
};
