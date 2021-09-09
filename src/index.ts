export * as R from 'ramda'

import * as func from './func'
import * as array from './array'
import * as ao from './ao'
import * as isWhat from './isWhat'
import * as string from './string'
import * as number from './number'

export * from './func'
export * from './array'
export * from './ao'
export * from './isWhat'
export * from './string'
export * from './number'

export default {
 ...func,
 ...ao,
 ...array,
 ...string,
 ...number,
 ...isWhat,
}
