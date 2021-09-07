
export const isObj = (o): o is AO =>
 typeof o === 'function' || (o !== null && typeof o === 'object')

export const isEmptyObj = (obj: AO) => Reflect.ownKeys(obj).length === 0