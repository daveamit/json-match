# json-match
[![Build Status](https://travis-ci.org/daveamit/json-match.svg?branch=master)](https://travis-ci.org/daveamit/json-match) [![Coverage Status](https://coveralls.io/repos/github/daveamit/json-match/badge.svg)](https://coveralls.io/github/daveamit/json-match) [![Dependency Status](https://gemnasium.com/badges/github.com/daveamit/json-match.svg)](https://gemnasium.com/github.com/daveamit/json-match) [![bitHound Overall Score](https://www.bithound.io/github/daveamit/json-match/badges/score.svg)](https://www.bithound.io/github/daveamit/json-match) [![bitHound Code](https://www.bithound.io/github/daveamit/json-match/badges/code.svg)](https://www.bithound.io/github/daveamit/json-match)

## `NOTE: Currently does not support arrays`

## About
### Compare two json object for matching deep keys, also supports regular-expression.

usage:
```
npm install json-compare
```

```javascript
   import compare from 'json-compare'
   const source = {
    name: "Dave Amit",
    hobby: {
        game: 'The Division'
    },
    country: 'India',
   };

   const test = {
       name: /[a-Z ]+/,
       hobby: {
           game: /Division/,
       },
       country: 'india',
   };

   const result = compare(source, test);

   // Result will be something like:

   {
    regExMatch: 2, // Because it matched 2 regular expressions
    exactMatch: 0, 
    fuzzyMatch: 1, // Because India to india match
    matchCount: 3, // Total keys matched
    mismatchCount: 0,
    unmatchedCount: 0,
    match: true,
    isExactMatch: false, // Because fuzzyMatch
  }
```