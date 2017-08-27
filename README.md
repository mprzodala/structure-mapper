# structure-mapper

[![Build Status](https://travis-ci.org/mprzodala/structure-mapper.svg?branch=master)](https://travis-ci.org/mprzodala/structure-mapper)
[![Coverage Status](https://coveralls.io/repos/github/mprzodala/structure-mapper/badge.svg?branch=master)](https://coveralls.io/github/mprzodala/structure-mapper?branch=master)
[![npm](https://img.shields.io/npm/l/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)
[![npm](https://img.shields.io/npm/v/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)

Structure mapper gives the posibility to map any object into another with different structure.

## Examples

key name
```js
import mapper from 'structure-mapper';

const src = { foo: 123 };
const map = { foo: 'bar' };
const result = { bar: 123 };

expect(mapper(src, map)).toEqual(result);
```

key name in object
```js
import mapper from 'structure-mapper';

const src = {
    foo: {
        bar: 123
    }
};
const map = {
    foo$object: {
        bar: 'foo'
    }
};
const result = {
    foo: {
        foo: 123
    }
};

expect(mapper(src, map)).toEqual(result);
```

key names in array of object
```js
import mapper from 'structure-mapper';

const src = {
    foo: [
        {
            foo: 123,
            bar: 321
        }
    ]
};
const map = {
    foo$array: {
        foo: 'foo2'
        bar: 'bar2'
    }
};
const src = {
    foo: [
        {
            foo2: 123,
            bar2: 321
        }
    ]
};

expect(mapper(src, map)).toEqual(result);
```

To see more complex examples, check out this project's [test suite](./src/index.test.js).
