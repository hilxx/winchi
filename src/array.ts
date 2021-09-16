import * as R from 'ramda'
import { AF, AO } from './index'

/**
 * @description 数组分类
 * @return object
  */
export const classifyAos = R.curry(
  (prop: AF, arr: AO[]) =>
    arr.reduce((r, o) => {
      const v = prop(o)
      r[v] = r[v] ? [...r[v], o] : [o]
      return r
    }, {} as AO)
)

/**
 * @index 只取数组中某一项（忽略空值）， 输入 undefined | null 取全部值
  */
export const flatArrayShallow = R.curry(
  (index: number | undefined | null, arr: any[]) =>
    arr.reduce((r, c) => {
      const isAll = c == undefined
      const v = isAll ? c : c?.[index!]
      return v !== undefined ? [...r, ...isAll && Array.isArray(v) ? v : [v]] : r
    }, [] as any[])
)

export const propLength = R.prop('length') as AF