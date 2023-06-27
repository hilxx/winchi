import * as R from 'ramda'
import { isEmpty, } from './is'
import type { AF, PropKey, IKey } from './index'
import { prop } from './prop'
import { random } from './number'

/**
	*  无论无何我是数组, 如果成员是undefined则返回空数组
	**/
export const iAmArray = <T>(list: T | T[]): T[] => {
	if (isEmpty(list)) return []
	return Array.isArray(list) ? list : [list]
}

export const joinComma = (list: any[]): string => list ? R.join(',', list) : ''

/**
	* 转换数组 -> Map<Key, any>
	* @param {Key} key
	* @param {any[]} arr
	* @return Map<Key, any>
	* @example ``` 
*  arr2Map('id', [{id: '1', content: '1'}]) //=>Map //Map.get('1') => {id:'1', content: '1'}
	* ```
	**/
export const groupBy = R.curry<AF<[PropKey, any[]], Map<IKey, any>>>((PropKey, list) =>
	list.reduce((r, c) => {
		const key = prop(PropKey, c)
		r.set(key, c)
		return r
	}, new Map())
)

/**
	* 转换数组 -> Map<Key, any[]>
	* @param {Key} key
	* @param {any[]} arr
	* @return Map<Key, any[]>
	* @example ``` 
	*  arr2MapList('id', [{id: '1', content: '1'}, id: '1', content: '2']) //=>Map //Map.get('1') => [{id:'1', content: '1'}, {id: 1, content: '2'}]
	* ```
	**/
export const groupListBy = R.curry<AF<[PropKey, any[]], Map<any, any[]>>>((PropKey, list) =>
	list.reduce((r, ele) => {
		const key = prop(PropKey, ele)
		const temp = r.get(key) ?? []
		temp.push(ele)
		r.set(key, temp)
		return r
	}, new Map())
)

/** 数组两两比较，找出新增、修改、删除的值 */
export const arrComputeDirtyData = R.curry(
	(key: PropKey, cleanData: any[], dirtyData: any[]) => {
		/** key: id, value: IAllergen  */
		const cleanMap: Map<string, any> = groupBy(key, cleanData)
		/** key: id, value: IAllergen  */
		const dirtyMap: Map<string, any> = groupBy(key, dirtyData)

		const dirty: { add: any[]; remove: any[]; update: any[] } = {
			add: [],
			remove: [],
			update: [],
		}

		dirtyMap.forEach((val: any, dirtyKey: any) => {
			if (cleanMap.get(dirtyKey) == null) {
				dirty.add.push(val)
				return
			}

			const currentClean = cleanMap.get(dirtyKey)

			if (currentClean != val && JSON.stringify(val) !== JSON.stringify(cleanMap.get(dirtyKey)))
				dirty.update.push(val)

			cleanMap.delete(dirtyKey)
			return
		})

		cleanMap.forEach((val) => dirty.remove.push(val))

		return dirty
	}
)

/** 打乱数组 */
export const randomSortArray = (list: any[]) => {
	const res = [...list]

	for (let max = res.length, i = max - 1; i >= 0; i--) {
		const randomIndex = random(0, max)
		const randomVal = res[randomIndex]
		res[randomIndex] = res[i]
		res[i] = randomVal
	}
	return res
}

