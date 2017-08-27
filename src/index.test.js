import mapper from './index';

describe('StructureMapper', () => {
    describe('simple examples', () => {
        it('should rename single property', () => {
            const srcObject = { foo: 123 };
            const mapConfig = { foo: 'bar' };
            const mappedObj = { bar: 123 };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should rename single property by inversing map', () => {
            const srcObject = { foo: 123 };
            const mapConfig = { bar: 'foo' };
            const mappedObj = { bar: 123 };

            expect(mapper(srcObject, mapConfig, true)).toEqual(mappedObj);
        });

        it('should renamed object without changing its properties', () => {
            const srcObject = { foo: { bar: 123 } };
            const mapConfig = { foo: 'biz' };
            const mappedObj = { biz: { bar: 123 } };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should NOT rename/remove properties NOT covered by map', () => {
            const srcObject = { bar: 123 };
            const mapConfig = { foo: 'biz' };
            const mappedObj = { bar: 123 };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should map object properties', () => {
            const srcObject = { foo: { a: 11, b: 22 } };
            const mapConfig = { foo$object: { a: 'x', b: 'y' } };
            const mappedObj = { foo: { x: 11, y: 22 } };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should rename object and map its properties', () => {
            const srcObject = { foo: { a: 11, b: 22 } };
            const mapConfig = {
                foo: 'bar',
                foo$object: { a: 'x', b: 'y' },
            };
            const mappedObj = { bar: { x: 11, y: 22 } };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should map objects in array', () => {
            const srcObject = {
                foo: [
                    {
                        a: 11,
                        b: 'bar',
                        c: { desc: 'some object' },
                    },
                ],
            };
            const mapConfig = {
                foo$array: {
                    a: 'x',
                    b: 'y',
                    c: 'z',
                },
            };
            const mappedObj = {
                foo: [
                    {
                        x: 11,
                        y: 'bar',
                        z: { desc: 'some object' },
                    },
                ],
            };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should map path', () => {
            const srcObject = {
                foo: [
                    {
                        a: 11,
                        b: 'bar',
                        c: { desc: 'some object' },
                    },
                ],
            };
            const mapConfig = {
                bar$path: 'foo.0.b',
            };
            const mappedObj = {
                foo: [
                    {
                        a: 11,
                        b: 'bar',
                        c: { desc: 'some object' },
                    },
                ],
                bar: 'bar',
            };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });

        it('should map path in array of object', () => {
            const srcObject = {
                foo: [
                    {
                        a: 11,
                        b: 'bar',
                        c: { desc: 'some object' },
                    },
                ],
            };
            const mapConfig = {
                foo$array: {
                    description$path: 'c.desc',
                },
            };
            const mappedObj = {
                foo: [
                    {
                        a: 11,
                        b: 'bar',
                        c: { desc: 'some object' },
                        description: 'some object',
                    },
                ],
            };

            expect(mapper(srcObject, mapConfig)).toEqual(mappedObj);
        });
    });

    describe('complex examples', () => {
        const srcObject = {
            a: 'testA',
            b: [
                {
                    b1: 'testB1',
                    b2: 'testB2',
                    b3: {
                        b31: 'testB31',
                        b32: 'testB32',
                    },
                    b4: [
                        {
                            b41: 'testB41',
                            b42: 'testB42',
                        },
                    ],
                },
            ],
            c: {
                c1: 'testC1',
                c2: 'testC2',
            },
        };

        const mapStructure = {
            a: 'c',
            b: 'd',
            b$array: {
                b1: 'd1',
                b2: 'd2',
                b3$object: {
                    b31: 'c2',
                },
                b4$array: {
                    b41: 'bc',
                },
            },
            c: 'f',
            c$object: {
                c1: 'f1',
                c2: 'f2',
            },
        };

        const mappingResult = {
            c: 'testA',
            d: [
                {
                    d1: 'testB1',
                    d2: 'testB2',
                    b3: {
                        c2: 'testB31',
                        b32: 'testB32',
                    },
                    b4: [
                        {
                            bc: 'testB41',
                            b42: 'testB42',
                        },
                    ],
                },
            ],
            f: {
                f1: 'testC1',
                f2: 'testC2',
            },
        };

        it('should map src data using map structure', () => {
            const mappedObject = mapper(srcObject, mapStructure);

            expect(mappedObject).toEqual(mappingResult);
        });

        it('should inverse structure mapping when inverse flag is true', () => {
            const mappedObject = mapper(srcObject, mapStructure);
            const inversedObject = mapper(mappedObject, mapStructure, true);

            expect(inversedObject).toEqual(srcObject);
        });
    });
});
