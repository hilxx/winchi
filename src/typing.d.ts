export type Key = string | number |symbol
export type GetKey = void | Key | AF<[AO], any>
export type AO = Record<Key, any>
export type AF<params extends any[] = any[], result = any> = (...rest: params) => result
export type ReturnParameters<T> = T extends (...args: infer P) => any ? P : any