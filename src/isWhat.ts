export const isObj = (o): o is object =>
 typeof o === 'function' || (o !== null && typeof o === 'object')

export const isEmptyObj = (obj: object): obj is object => Reflect.ownKeys(obj).length === 0