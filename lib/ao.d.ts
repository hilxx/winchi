/// <reference types="ts-toolbelt" />
import { AO, AF, GetKey } from './index';
export declare const prop: import("Function/Curry").Curry<(key: GetKey, o: AO) => any>;
export declare const deepProp: import("Function/Curry").Curry<(keys: GetKey[], o: AO) => AO>;
export declare const rename: import("Function/Curry").Curry<(key: any, renameKey: any, obj: any) => any>;
/**
 * 转换数字下标的Record
  */
export declare const objToArr: (obj: Record<number, any>) => any[];
export declare const mergeDeepWith: import("Function/Curry").Curry<(f: AF, o1: AO, o2: AO) => any[] | {
    [x: string]: any;
    [x: number]: any;
}>;
/**
 * @description  {a: undefined  null}, {a: 0} => {a: 0}
 * @type Array [...left, ...rigth]
 */
export declare const mergeLeft: import("Function/Curry").Curry<(o1: AO, o2: AO) => any[] | {
    [x: string]: any;
    [x: number]: any;
}>;
export declare const mergeDeepLeft: import("Function/Curry").Curry<(o1: AO, o2: AO) => any[] | {
    [x: string]: any;
    [x: number]: any;
}>;
/**
 * @description {a: 0}, {a: undefined  null} => {a: 0}
 * @type Array [...rigth, ...left]
 */
export declare const mergeRight: import("Function/Curry").Curry<(o1: AO, o2: AO) => any[] | {
    [x: string]: any;
    [x: number]: any;
}>;
export declare const mergeDeepRight: import("Function/Curry").Curry<(o1: AO, o2: AO) => any[] | {
    [x: string]: any;
    [x: number]: any;
}>;
