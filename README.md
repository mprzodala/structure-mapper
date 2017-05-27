# structure-mapper

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg" />
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg" />
<img src="https://img.shields.io/badge/license-MIT-blue.svg" />
<img src="https://img.shields.io/badge/npm-v1.0.0-blue.svg" />

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