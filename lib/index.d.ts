/// <reference types="ts-toolbelt" />
export * as R from 'ramda';
import * as func from './func';
declare const _default: {
    isObj: (o: any) => o is AO;
    isEmptyObj: (obj: AO) => boolean;
    computePercent: import("Function/Curry").Curry<(validBit: number, total: number, cur: number) => string>;
    mergeStr: import("Function/Curry").Curry<(split: string, rest: string[]) => string>;
    classifyAos: import("Function/Curry").Curry<(prop: AF<any[], any>, arr: AO[]) => AO>;
    prop: import("Function/Curry").Curry<(key: Key | AF<[AO], any>, o: AO) => any>;
    rename: import("Function/Curry").Curry<(key: any, renameKey: any, obj: any) => any>;
    getObjProperty: <T extends object>(o: T) => (keys: (string | number | symbol)[]) => T;
    objToArr: (obj: Record<number, any>) => any[];
    deepObjToArr: (obj: Record<number, any>) => any;
    alt: (f1: AF<any[], any>, f2: AF<any[], any>) => (val?: any) => any;
    and: (f1: AF<any[], any>, f2: AF<any[], any>) => (val?: any) => any;
    sep: (...fns: AF<any[], any>[]) => (v: any) => void;
    fork: (join: AF<any[], any>, f1: AF<any[], any>, f2: AF<any[], any>) => (v: any) => any;
    taps: AF<any[], any>;
    identify: (v: any) => AO;
    asyncCompose: <D = any>(...fns: AF<any[], any>[]) => func.AsyncComposeReturn<D>;
    lockWrap: <F extends AF<any[], Promise<any>>>(fn: F) => (...rest: ReturnParameters<F>) => Promise<ReturnType<F> extends any ? ReturnType<F> : Promise<ReturnType<F>>>;
    callLock: <F_1 extends AF<any[], any>>(fn: F_1) => (...rest: ReturnParameters<F_1>) => ReturnType<F_1>;
};
export default _default;
