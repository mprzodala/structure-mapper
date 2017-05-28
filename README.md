# structure-mapper

[![Build Status](https://travis-ci.org/mprzodala/structure-mapper.svg?branch=master)](https://travis-ci.org/mprzodala/structure-mapper)
[![Coverage Status](https://coveralls.io/repos/github/mprzodala/structure-mapper/badge.svg?branch=master)](https://coveralls.io/github/mprzodala/structure-mapper?branch=master)
[![npm](https://img.shields.io/npm/l/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)
[![npm](https://img.shields.io/npm/v/structure-mapper.svg)](https://npmjs.org/package/structure-mapper)

structure mapper give you posibility to map any object to another with diferent structure

## EXAMPLE OF USE

```js
import mapper from 'structure-mapper';

const object = {
    a: 'testA',
    b: [
        {
            b1: 'testB1',
            b2: 'testB2',
            b3: {
                b31: 'testB31',
                b32: 'testB32'
            },
            b4: [
                {
                    b41: 'testB41',
                    b42: 'testB42'
                }
            ]
        }
    ],
    c: {
        c1: 'testC1',
        c2: 'testC2'
    }
};

const mapStructure = {
    a: 'c',
    b: 'd',
    'b$array': {
        b1: 'd1',
        b2: 'd2',
        'b3$object': {
            b31: 'c2'
        },
        'b4$array': {
            b41: 'bc'
        }
    },
    c: 'f',
    'c$object': {
        c1: 'f1',
        c2: 'f2'
    }
};

const mappedObject = mapper(object, mapStructure)

```

##### mappedObject

```js
const expectedResults = {
    c: 'testA',
    d: [
        {
            d1: 'testB1',
            d2: 'testB2',
            b3: {
                c2: 'testB31',
                b32: 'testB32'
            },
            b4: [
                {
                    bc: 'testB41',
                    b42: 'testB42'
                }
            ]
        }
    ],
    f: {
        f1: 'testC1',
        f2: 'testC2'
    }
};
```

You can use inverse flag attribute to map structure in inverse mode.