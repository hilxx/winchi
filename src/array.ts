import * as R from 'ramda'

export const classifyAos = R.curry(
  (prop: AF, arr: AO[]) =>
    arr.reduce((r, o) => {
      const v = prop(o)
      r[v] = r[v] ? [...r[v], o] : [o]
      return r
    }, {} as AO)
)