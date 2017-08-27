import { get, getRealKey } from './helpers';

const ARRAY_MAPPING_NAME = '$array';
const OBJECT_MAPPING_NAME = '$object';
const PATH_MAPPING_NAME = '$path';

const inverseObjectStructureSchema = (key, schema) => {
    if (key.indexOf(OBJECT_MAPPING_NAME) > -1 || key.indexOf(ARRAY_MAPPING_NAME) > -1) {
        const originalKey = getRealKey(key);
        if (!schema[originalKey]) {
            return schema[key];
        }
    }
    return false;
};

const inverseStructureSchema = (schema) => {
    const inversedSchema = {};
    Object.keys(schema).forEach((key) => {
        if (typeof schema[key] === 'string') {
            inversedSchema[schema[key]] = key;
        }
        if (schema[`${key}${ARRAY_MAPPING_NAME}`]) {
            inversedSchema[`${schema[key]}${ARRAY_MAPPING_NAME}`] = schema[`${key}${ARRAY_MAPPING_NAME}`];
            return;
        }
        if (schema[`${key}${OBJECT_MAPPING_NAME}`]) {
            inversedSchema[`${schema[key]}${OBJECT_MAPPING_NAME}`] = schema[`${key}${OBJECT_MAPPING_NAME}`];
            return;
        }

        const inversedObjectSchema = inverseObjectStructureSchema(key, schema);

        if (inversedObjectSchema) {
            inversedSchema[key] = inversedObjectSchema;
        }
    });
    return inversedSchema;
};

const mapArrayStructure = (srcData, structure, doInverseStructureSchema) =>
    srcData.map(item => mapStructure(
        item,
        structure,
        doInverseStructureSchema,
    ));

const getPathStructureChanges = schema =>
    Object.keys(schema).filter(key => key.indexOf(PATH_MAPPING_NAME) > -1);

const changeStructureBySchema = ({
    srcData,
    arrayStructureSchema,
    objectStructureSchema,
    doInverseStructureSchema,
}) => {
    if (arrayStructureSchema) {
        return mapArrayStructure(
            srcData,
            arrayStructureSchema,
            doInverseStructureSchema,
        );
    }

    if (objectStructureSchema) {
        return mapStructure(
            srcData,
            objectStructureSchema,
            doInverseStructureSchema,
        );
    }

    return srcData;
};

const mapStructure = (srcData, structureSchema, doInverseStructureSchema = false) => {
    const result = {};
    const structureMapSchema = doInverseStructureSchema ?
        inverseStructureSchema(structureSchema) : structureSchema;
    Object.keys(srcData).forEach((key) => {
        const arrayStructureSchema = structureMapSchema[`${key}${ARRAY_MAPPING_NAME}`];
        const objectStructureSchema = structureMapSchema[`${key}${OBJECT_MAPPING_NAME}`];
        const newKey = structureMapSchema[key];
        const oldKey = key;

        result[newKey || oldKey] = changeStructureBySchema({
            srcData: srcData[oldKey],
            arrayStructureSchema,
            objectStructureSchema,
            doInverseStructureSchema,
        });
    });
    getPathStructureChanges(structureSchema).forEach((key) => {
        const path = structureSchema[key];
        const newKey = getRealKey(key);
        result[newKey] = get(srcData, path);
    });
    return result;
};

export default mapStructure;
