const ARRAY_MAPPING_NAME = '$array';
const OBJECT_MAPPING_NAME = '$object';

const inverseStructureMap = (map) => {
    const inversedMap = {};
    Object.keys(map).forEach(key => {
        if (typeof map[key] === 'string') {
            inversedMap[map[key]] = key;
        }
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

const mapStructure = (srcData, structureMap, doInverseStructureMap = false) => {
    const result = {};
    const structure = doInverseStructureMap ? inverseStructureMap(structureMap) : structureMap;
    Object.keys(srcData).forEach(key => {
        const arrayStructure = structure[`${key}${ARRAY_MAPPING_NAME}`];
        const objectStructure = structure[`${key}${OBJECT_MAPPING_NAME}`];
        const newKey = structure[key];
        const oldKey = key;

        if (!newKey && !arrayStructure && !objectStructure) {
            result[oldKey] = srcData[oldKey];
            return;
        }

        if (arrayStructure) {
            result[newKey || oldKey] = srcData[oldKey].map(item =>
                mapStructure(item, arrayStructure, doInverseStructureMap)
            );
            return;
        }

        if (objectStructure) {
            result[newKey || oldKey] = mapStructure(srcData[oldKey], objectStructure, doInverseStructureMap);
            return;
        }

        result[newKey] = srcData[oldKey];
    });
    return result;
};

export default mapStructure;
