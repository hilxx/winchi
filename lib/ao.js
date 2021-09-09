"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepObjToArr = exports.objToArr = exports.rename = exports.deepProp = exports.prop = void 0;
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
