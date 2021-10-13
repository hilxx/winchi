"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeepRight = exports.mergeRight = exports.mergeDeepLeft = exports.mergeLeft = exports.mergeDeepWith = exports.objToArr = exports.rename = exports.deepProp = exports.prop = void 0;
const R = require("ramda");
const isWhat_1 = require("./isWhat");
exports.prop = R.curry((key, o) => typeof key === 'function' ? key(o) : o?.[key]);
exports.deepProp = R.curry((keys, o) => keys.reduce((cur, k) => exports.prop(k, cur), o));
exports.rename = R.curry((key, renameKey, obj) => {
    const val = obj[key];
    const newO = R.assoc(renameKey, val)(obj);
    Reflect.deleteProperty(newO, key);
    return newO;
});
/**
 * 转换数字下标的Record
  */
const objToArr = (obj) => Object.keys(obj)
    .filter((key) => Number.isInteger(+key))
    .reduce((result, cur) => {
    Number.isInteger(+cur) && (result[+cur] = obj[cur]);
    return result;
}, []);
exports.objToArr = objToArr;
exports.mergeDeepWith = R.curry((f, o1, o2) => {
    const mergeO = Array.isArray(o1) && Array.isArray(o2) ? [...o1, ...o2] : { ...o1, ...o2 };
    Reflect.ownKeys(mergeO).forEach(key => {
        if (!Reflect.has(o1, key) || !Reflect.has(o2, key))
            return;
        const v1 = Reflect.get(o1, key);
        const v2 = Reflect.get(o2, key);
        Reflect.set(mergeO, key, isWhat_1.isObj(v1) && isWhat_1.isObj(v2) ? exports.mergeDeepWith(f, v1, v2) : f(v1, v2));
    });
    return mergeO;
});
const _mergeLeftHelper = (a, b) => Array.isArray(a) && Array.isArray(b) ? [...a, ...b] : a;
const _mergeRightHelper = R.flip(_mergeLeftHelper);
/**
 * @description  {a: undefined  null}, {a: 0} => {a: 0}
 * @type Array [...left, ...rigth]
 */
exports.mergeLeft = exports.mergeDeepWith(_mergeLeftHelper);
exports.mergeDeepLeft = exports.mergeDeepWith(_mergeLeftHelper);
/**
 * @description {a: 0}, {a: undefined  null} => {a: 0}
 * @type Array [...rigth, ...left]
 */
exports.mergeRight = exports.mergeDeepWith(_mergeRightHelper);
exports.mergeDeepRight = exports.mergeDeepWith(_mergeRightHelper);
