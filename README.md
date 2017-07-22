# structure-mapper

[![Build Status](https://travis-ci.org/mprzodala/structure-mapper.svg?branch=master)](https://travis-ci.org/mprzodala/structure-mapper)
[![Coverage Status](https://coveralls.io/repos/github/mprzodala/structure-mapper/badge.svg?branch=master)](https://coveralls.io/github/mprzodala/structure-mapper?branch=master)
[![npm](https://img.shields.io/npm/l/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)
[![npm](https://img.shields.io/npm/v/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)

Structure mapper gives the posibility to map any object into another with different structure.

## Examples

```js
import mapper from 'structure-mapper';

const src = { foo: 123 };
const map = { foo: 'bar' };
const result = { bar: 123 };

expect(mapper(src, map)).toEqual(result);
```

To see more complex examples, check out this project's [test suite](./src/index.test.js).
