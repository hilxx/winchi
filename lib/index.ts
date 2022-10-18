export * as R from "ramda";

export type Key = string | number | symbol;
export type GetKey = void | Key | AF<[AO], any>;
export type AO = Record<Key, any>;
export type AF<params extends any[] = any[], result = any> = (
  ...rest: params
) => result;
export type ReturnParameters<T> = T extends (...args: infer P) => any ? P : any;

import * as funcs from "./func";
import * as array from "./array";
import * as ao from "./ao";
import * as is from "./is";
import * as string from "./string";
import * as number from "./number";
import * as prop from "./prop";

export const obj = new Proxy<AO>(
  {},
  {
    set() {
      return false;
    },
  }
);

export const arr = new Proxy<any[]>([], {
  set() {
    return false;
  },
});

export function func(...rest: any[]) {
  return rest;
}

export const key = Symbol("only key");

export default {
  ...funcs,
  ...ao,
  ...array,
  ...string,
  ...number,
  ...is,
  ...prop,
  key,
  obj,
  arr,
  func,
};
