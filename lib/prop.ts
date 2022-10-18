/**
 * 一些常用属性的获取
 */
import * as R from "ramda";
import { GetKey, AF, AO } from "./";

export const prop: AF = R.curry((key: GetKey, o: AO) =>
  typeof key === "function" ? key(o) : o?.[key as any]
);

export const propRecords = prop("records");

export const propLength = prop("length") as AF;

export const propId = prop("id");

/**
 * 获取e.target.value
 * @param e envent
 * @returns string | undefined
 */
export const propTargetValue = (e) => e?.target?.value;
