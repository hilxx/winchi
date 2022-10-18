import * as R from "ramda";
import { arr } from "winchi";

export const mergeStr = R.curry((split: string, rest: string[]) =>
  rest.reduce((r, c) => `${r}${split}${c}`)
);

export const splitComma = (str) => (str != undefined ? R.split(",", str) : arr);
