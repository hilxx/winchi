"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R = void 0;
exports.R = require("ramda");
const func = require("./func");
const array = require("./array");
const ao = require("./ao");
const isWhat = require("./isWhat");
const string = require("./string");
const number = require("./number");
exports.default = {
    ...func,
    ...ao,
    ...array,
    ...string,
    ...number,
    ...isWhat,
};
