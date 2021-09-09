import * as R from 'ramda'
import { isObj } from './isWhat';
import { AO, GetKey } from './typing';

export const prop = R.curry(
  (key: GetKey, o: AO) => typeof key === 'function' ? key(o) : o?.[key as any]
)

export const deepProp = R.curry(
  (keys: GetKey[], o: AO) => keys.reduce((cur, k) => prop(k, cur), o)
)

export const rename = R.curry((key, renameKey, obj) => {
  const val = obj[key];
  const newO = R.assoc(renameKey, val)(obj);
  Reflect.deleteProperty(newO, key);
  return newO;
});

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

