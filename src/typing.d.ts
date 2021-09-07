declare type Key = string | number
declare type AO = Record<Key, any>
declare type AF<params extends any[] = any[], result = any> = (...rest: params) => result
declare type ReturnParameters<T> = T extends (...args: infer P) => any ? P : any