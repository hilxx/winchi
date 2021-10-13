"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArrayRight = exports.mergeArrayLeft = exports.mergeArrayWith = exports.uniqueRight = exports.uniqueLeft = exports.uniqueWith = exports.propLength = exports.flatArrayShallow = exports.classifyAos = void 0;
const R = require("ramda");
const isWhat_1 = require("./isWhat");
/**
 * @description 数组分类
 * @return object
  */
exports.classifyAos = R.curry((prop, arr) => arr.reduce((r, o) => {
    const v = prop(o);
    r[v] = r[v] ? [...r[v], o] : [o];
    return r;
}, {}));
/**
 * @index 只取数组中某一项（忽略空值）， 输入 undefined | null 取全部值
  */
exports.flatArrayShallow = R.curry((index, arr) => arr.reduce((r, c) => {
    const isAll = c == undefined;
    const v = isAll ? c : c?.[index];
    return v !== undefined ? [...r, ...isAll && Array.isArray(v) ? v : [v]] : r;
}, []));
exports.propLength = R.prop('length');
exports.uniqueWith = R.curry((choose, prop_, arr) => {
    const prop = typeof prop_ === 'function' ? prop_ : v => v?.[prop_];
    return [
        ...arr.reduce((map, cur) => {
            const v = prop(cur);
            map.set(v, map.has(v) ? choose(map.get(v), cur) : cur);
            return map;
        }, new Map()).values()
    ];
});
exports.uniqueLeft = exports.uniqueWith(a => a);
exports.uniqueRight = exports.uniqueWith((_, b) => b);
exports.mergeArrayWith = R.curry((choose, prop_, arr) => {
    const prop = typeof prop_ === 'function' ? prop_ : d => d?.[prop_];
    return arr.reduce((map, cur) => {
        const key = prop(cur);
        map.set(key, map.has(key) ? choose(map.get(key), cur) : cur);
        return map;
    }, new Map());
});
const _mergeLeftHelper = (a, b) => isWhat_1.isObj(a) && isWhat_1.isObj(b) ? { ...a, ...b } : a;
const _mergeRightHelper = R.flip(_mergeLeftHelper);
exports.mergeArrayLeft = exports.mergeArrayWith(_mergeLeftHelper);
exports.mergeArrayRight = exports.mergeArrayWith(_mergeRightHelper);
