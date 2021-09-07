"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepObjToArr = exports.objToArr = exports.getObjProperty = exports.rename = exports.prop = void 0;
const R = require("ramda");
const isWhat_1 = require("./isWhat");
exports.prop = R.curry((key, o) => typeof key === 'function' ? key(o) : o[key]);
exports.rename = R.curry((key, renameKey, obj) => {
    const val = obj[key];
    const newO = R.assoc(renameKey, val)(obj);
    Reflect.deleteProperty(newO, key);
    return newO;
});
const getObjProperty = (o) => (keys) => Array.isArray(keys) ? keys.reduce((currentO, key) => currentO[key], o) : o[keys];
exports.getObjProperty = getObjProperty;
// 数字下标转数组
const objToArr = (obj) => Object.keys(obj)
    .filter((key) => Number.isInteger(+key))
    .reduce((result, cur) => {
    Number.isInteger(+cur) && (result[+cur] = obj[cur]);
    return result;
}, []);
exports.objToArr = objToArr;
/** 让数字下标的对象成为数组 {0： 1} => [1] */
const deepObjToArr = (obj) => exports.objToArr(obj).map((item) => (isWhat_1.isObj(item) ? exports.deepObjToArr(item) : item));
exports.deepObjToArr = deepObjToArr;
Symbol();
