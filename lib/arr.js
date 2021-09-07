"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyAos = void 0;
const R = require("ramda");
exports.classifyAos = R.curry((prop, arr) => arr.reduce((r, o) => {
    const v = prop(o);
    r[v] = r[v] ? [...r[v], o] : [o];
    return r;
}, {}));
