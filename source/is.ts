import * as R from 'ramda'
import type { AO } from './'
import { or } from './func'

export const isExtendObj = (o: any): o is AO =>
	(!!o && typeof o === 'object') || typeof o === 'function'

export const isObj = (o: any): o is AO =>
	Reflect.apply(Object.prototype.toString, o, []) === '[object Object]'

/** 判断文件类型 */
export const isFiles = {
	isZip: R.equals('application/x-zip-compressed')
}

export const isEmpty = or(
	R.isNil,
	R.isEmpty,
)

export const isNotEmpty = R.compose(
	R.not,
	isEmpty,
)