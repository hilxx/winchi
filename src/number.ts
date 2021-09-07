import * as R from 'ramda'

export const computePercent = R.curry(
 (validBit: number, total: number, cur: number) =>
  `${(cur / total * 100) || 0}`.slice(0, validBit + 2) + '%'
)