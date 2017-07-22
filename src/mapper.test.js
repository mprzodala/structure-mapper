import mapper from './index';

describe('StructureMapper', () => {
    const srcObject = {
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

    const mappingResult = {
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
