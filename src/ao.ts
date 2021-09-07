import * as R from 'ramda'
import { isObj } from './isWhat';

export const prop = R.curry(
  (key: Key | AF<[AO], any>, o: AO) => typeof key === 'function' ? key(o) : o[key]
)

export const rename = R.curry((key, renameKey, obj) => {
  const val = obj[key];
  const newO = R.assoc(renameKey, val)(obj);
  Reflect.deleteProperty(newO, key);
  return newO;
});

export const getObjProperty = <T extends object>(o: T) => (keys: (string | number | symbol)[]) =>
  Array.isArray(keys) ? keys.reduce((currentO, key) => currentO[key], o) : o[keys]

// 数字下标转数组
export const objToArr = (obj: Record<number, any>) =>
  Object.keys(obj)
    .filter((key) => Number.isInteger(+key))
    .reduce((result, cur) => {
      Number.isInteger(+cur) && (result[+cur] = obj[cur])
      return result;
    }, [] as any[])

/** 让数字下标的对象成为数组 {0： 1} => [1] */
export const deepObjToArr = (obj: Record<number, any>) =>
  objToArr(obj).map((item) => (isObj(item) ? deepObjToArr(item) : item));

