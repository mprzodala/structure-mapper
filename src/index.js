const ARRAY_MAPPING_NAME = '$array';
const OBJECT_MAPPING_NAME = '$object';

const inverseStructureMap = (map) => {
    const inversedMap = {};
    Object.keys(map).forEach(key => {
        if (typeof map[key] === 'string') inversedMap[map[key]] = key;
        if (map[`${key}${ARRAY_MAPPING_NAME}`]){
            inversedMap[`${map[key]}${ARRAY_MAPPING_NAME}`] = map[`${key}${ARRAY_MAPPING_NAME}`];
            return;
        }
        if (map[`${key}${OBJECT_MAPPING_NAME}`]){
            inversedMap[`${map[key]}${OBJECT_MAPPING_NAME}`] = map[`${key}${OBJECT_MAPPING_NAME}`];
            return;
        }
        if (key.indexOf(OBJECT_MAPPING_NAME) > -1 || key.indexOf(ARRAY_MAPPING_NAME) > -1) {
            const originalKey = key.split('$')[0];
            if (!map[originalKey]){
                inversedMap[key] = map[key];
            }
        }
    });
    return inversedMap;
};

const mapStructure = (data, structureMap, inverse) => {
    const result = {};
    const structure = inverse ? inverseStructureMap(structureMap) : structureMap;
    Object.keys(data).forEach(key => {
        const arrayStructure = structure[`${key}${ARRAY_MAPPING_NAME}`];
        const objectStructure = structure[`${key}${OBJECT_MAPPING_NAME}`];
        const newKey = structure[key];
        const oldKey = key;

        if (!newKey && !arrayStructure && !objectStructure) {
            result[oldKey] = data[oldKey];
            return;
        }

        if (arrayStructure) {
            result[newKey || oldKey] = data[oldKey].map(item =>
                mapStructure(item, arrayStructure, inverse)
            );
            return;
        }

        if (objectStructure) {
            result[newKey || oldKey] = mapStructure(data[oldKey], objectStructure, inverse);
            return;
        }

        result[newKey] = data[oldKey];
    });
    return result;
};

export default mapStructure;