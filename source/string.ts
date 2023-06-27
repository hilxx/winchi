import * as R from 'ramda'
import { arr } from './'

export const mergeStr = R.curry((split: string, rest: string[]) =>
	rest.reduce((r, c) => `${r}${split}${c}`)
)

export const splitComma = (str: string) => (str != undefined ? R.split(',', str) : arr)
