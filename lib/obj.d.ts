/// <reference types="ts-toolbelt" />
export declare const prop: import("Function/Curry").Curry<(key: Key | AF<[AO], any>, o: AO) => any>;
export declare const rename: import("Function/Curry").Curry<(key: any, renameKey: any, obj: any) => any>;
export declare const getObjProperty: <T extends object>(o: T) => (keys: (string | number | symbol)[]) => T;
export declare const objToArr: (obj: Record<number, any>) => any[];
/** 让数字下标的对象成为数组 {0： 1} => [1] */
export declare const deepObjToArr: (obj: Record<number, any>) => any;
