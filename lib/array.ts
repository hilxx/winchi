import * as R from "ramda";
import { isObj } from "./is";
import { AF, AO, GetKey, Key } from "./index";
import { arr } from "./index";
import { prop } from "./prop";

/**
 * @description 数组分类
 * @return object
 */
export const classifyAos = R.curry((prop: AF, arr: AO[]) =>
  arr.reduce((r, o) => {
    const v = prop(o);
    r[v] = r[v] ? [...r[v], o] : [o];
    return r;
  }, {} as AO)
);

/**
 * @description 数据内销
 */
export const uniqueWith = R.curry(
  (choose: AF, prop_: string | AF, arr: any[]) => {
    const prop = typeof prop_ === "function" ? prop_ : (d) => d?.[prop_];
    const arrMap = arr.reduce((map, cur) => {
      const key = cur && typeof cur === "object" ? prop(cur) : cur;
      map.set(key, map.has(key) ? choose(map.get(key), cur) : cur);
      return map;
    }, new Map());

    return Array.from(arrMap.values());
  }
);

/**
 * @description 优先返回左边，遇到object则合并
 */
export const uniqueLeft = uniqueWith((a, b) =>
  isObj(a) && isObj(b) ? { ...b, ...a } : a
);

/**
 * @description 优先返回右边, 遇到object则合并
 */
export const uniqueRight = uniqueWith((b, a) =>
  isObj(a) && isObj(b) ? { ...b, ...a } : a
);

export const sortByProp: AF = R.curry((prop_: Key, arr: any[]) => {
  const prop = typeof prop_ === "function" ? prop_ : (v) => v?.[prop_];
  const newArr = [...arr];

  return newArr.sort((a, b) => prop(a) - prop(b));
});

/** @description 更新数组某一项的值 */
export const setArr: AF = R.curry((arr: any[], index: number, newV): any[] =>
  newV === arr[index]
    ? arr
    : [...arr.slice(0, index), newV, ...arr.slice(index + 1)]
);

/**
 * 数组某一项移动
 */
export const arrMove = R.curry((origin: number, target: number, arr: any[]) => [
  ...arr.slice(0, origin),
  ...arr.slice(origin + 1, target + 1),
  arr[origin],
  ...arr.slice(target + 1),
]);

export const arrPropEqual = R.curry((a1: any[], a2: any[]) => {
  if (a1.length !== a2.length) return false;

  for (let i = 0, len = a1.length; i < len; i++)
    if (a1[i] !== a2[i]) {
      return false;
    }

  return true;
});

/**
 *  无论无何我是数组, 如果成员是undefined则返回空数组
 **/
export const iAmArray = (item = arr) => (Array.isArray(item) ? item : [item]);

export const joinComma = R.join(",");

/**
 * 让arr转数组
 * @param getKey 得到函数
 * @param arr 数组
 **/
export const arrToMap = R.curry((getKey: GetKey, arr: any[]) =>
  arr.reduce((r, c) => {
    const key = prop(getKey, c);
    r.set(key, c);
    return r;
  }, new Map())
);

/** 数组两两比较，找出新增、修改、删除的值 */
export const arrComputeDirtyData = R.curry(
  (key: GetKey, cleanData: any[], dirtyData: any[]) => {
    /** key: id, value: IAllergen  */
    const cleanMap: Map<string, any> = arrToMap(key, cleanData);
    /** key: id, value: IAllergen  */
    const dirtyMap: Map<string, any> = arrToMap(key, dirtyData);

    const dirtys: { add: any[]; remove: any[]; update: any[] } = {
      add: [],
      remove: [],
      update: [],
    };

    dirtyMap.forEach((val, key) => {
      if (cleanMap.get(key) == null) return dirtys.add.push(val);

      const currentClean = cleanMap.get(key);

      if (
        currentClean != val &&
        JSON.stringify(val) !== JSON.stringify(cleanMap.get(key))
      )
        dirtys.update.push(val);

      cleanMap.delete(key);
    });

    cleanMap.forEach((val) => dirtys.remove.push(val));

    return dirtys;
  }
);

/**
 * 根据某个属性进行平铺，例如children属性
 * @param key 例如children
 * @param 增强children的值，比如获取parent的id，传入undefined时，则采取原值返回
 * @param array
 **/
export const flatProp = R.curry(
  (key: GetKey, compute: (children, parent) => any | void, list: any[]) =>
    list.reduce((r, c) => {
      const children = Array.isArray(prop(key, c)) ? prop(key, c) : arr;
      const childrenParent = compute
        ? children.map((v) => compute(v, c))
        : children;

      return [
        ...r,
        c,
        ...(childrenParent.length
          ? flatProp(key, compute, childrenParent)
          : childrenParent),
      ];
    }, [])
);

/** 平铺children属性 */
export const flatChildren = flatProp("children");
