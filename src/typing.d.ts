declare type AO = Record<any, any>
declare type AF<params extends any[] = any[], result = any> = (...rest: params) => result
declare type ReturnParameters<T> = T extends (...args: infer P) => any ? P : any