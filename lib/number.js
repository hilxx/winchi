"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePercent = void 0;
const R = require("ramda");
exports.computePercent = R.curry((validBit, total, cur) => `${(cur / total * 100) || 0}`.slice(0, validBit + 2) + '%');
