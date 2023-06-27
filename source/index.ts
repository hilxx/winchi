export * as R from 'ramda'

import * as funcs from './func'
import * as array from './array'
import * as ao from './object'
import * as is from './is'
import * as string from './string'
import * as number from './number'
import * as prop from './prop'
import * as date from './date'

export const obj = new Proxy<any>(
	{},
	{
		set() {
			return false
		},
	}
)

export const arr = new Proxy<any[]>([], {
	set() {
		return false
	},
})

export function func(...rest: any[]) {
	return rest
}

export const key = Symbol('only key')

export default {
	...funcs,
	...ao,
	...array,
	...string,
	...number,
	...is,
	...prop,
	...date,
	key,
	obj,
	arr,
	func,
}

export type IKey = string | number | symbol;

export type PropKey = void | IKey | AF<[AO], any>;

export type AO = Record<IKey, any | any[]>;

export interface AF<params extends any[] = any[], result = any> {
  (...rest: params): result
  [x: IKey]: any
}
export type ReturnParameters<T> = T extends (...args: infer P) => any ? P : any;