/**
 * 一些常用属性的获取
 */
import * as R from 'ramda'
import type { PropKey, AF, AO } from './'

export const prop: AF = R.curry((key: PropKey, o: AO) =>
	typeof key === 'function' ? key(o) : o?.[key as any]
)

export const propRecords = prop('records')

export const propData = prop('data')

export const propLength = prop('length') as AF

export const propId = prop('id')

export const propName = prop('name')

export const propCreatedAt = R.prop('createdAt')

/**
 * 获取e.target.value
 * @param e event
 * @returns string | undefined
 */
export const propTargetValue = (e: any) => e?.target?.value

export const propMimetype = R.prop('mimetype')

/**
 * 获取文件名字和格式
 * @param name 文件的名字
 * @return [文件名，文件格式]
 */
export const propFileName = (name: string) => {
	const list = name.split('.')
	return [list.slice(0, list.length - 1).join(''), list[list.length - 1]]
}