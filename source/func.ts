import * as R from 'ramda'
import type { AF, ReturnParameters } from './index'

export interface AsyncComposeReturn<P extends any[] = any[], R = any> {
	(...data: P): Promise<R>;
	catch: (cb: AF) => AsyncComposeReturn<P, R>
	finally: (cb: AF) => AsyncComposeReturn<P, R>
}

/**
	* R.compose的泛型不好传递，做了这个
	*/
export const compose = <P extends any[] = any[], R = any>(...fns: (AF | void)[]) =>
	(...params: P): R => R.compose.apply(null, fns.filter(f => typeof f === 'function') as any)(...params) as unknown as R


export const or = (f1: AF, f2: AF) => (...params: any[]) => {
	const res1 = f1(...params)
	if (!R.isNil(res1)) return res1

	return f2(...params)
}

export const and = (f1: AF, f2: AF) => (...params: any[]) => {
	const res1 = f1(...params)
	if (R.isNil(res1)) return res1

	return f2(...params)
}

export const sep =
	(...fns: AF[]) =>
		(...rest: any[]) => {
			fns.forEach((fn) => fn(...rest))
			return rest.length === 1 ? rest[0] : rest
		}

export const fork = (join: AF, f1: AF, f2: AF) => (v: any) => join(f1(v), f2(v))

export const forkPromise = (join: AF, f1: AF, f2: AF) => async (v: any) => {
	const [a, b] = await Promise.all([f1(v), f2(v)])
	return join(a, b)
}

/**
	* 用于传值
	* @param v 返回的值
	* @returns () => v
	*/
export const constant: AF = (v) => () => v

/**
	* @description 等待 callback
	*/
export const tap: AF =
	(fn) =>
		async (...v: any[]) => {
			await fn(...v)
			return v.length < 2 ? v[0] : v
		}

export const curryLazy = R.compose(
	R.curry,
	(fn) =>
		new Proxy(fn, {
			apply(target, _, args) {
				return (...rest: any[]) => target(...args, ...rest)
			},
		})
)

export const wait = R.curry(
	(ms: number, v: any) =>
		new Promise((resolve) => setTimeout(() => resolve(v), ms))
)

export const asyncCompose = <P extends any[] = any[], R = any>(...fns: AF[]): AsyncComposeReturn<P, R> => {
	/** 自底向上 */
	const errCallbacks: AF[] = []
	/** 自顶向下 */
	const thenCallbacks: AF[] = [...fns]
	const finallyCallbacks: AF[] = []

	const f: AsyncComposeReturn = async (...data) => {
		try {
			let result = data
			for (let k = thenCallbacks.length - 1; k >= 0; k--) {
				result = await (k === thenCallbacks.length - 1 ? thenCallbacks[k](...data) : thenCallbacks[k](result))
			}
			return result
		} catch (e) {
			const reject = errCallbacks.reduce(
				(promise, cb) => promise.catch(cb),
				Promise.reject<any>(e)
			)
			const d = await reject
			return d == undefined ? Promise.reject(d) : d
		} finally {
			finallyCallbacks.forEach(f)
		}
	}

	f.catch = (cb) => {
		errCallbacks.push(cb)
		return f
	}

	f.finally = (cb) => {
		finallyCallbacks.push(cb)
		return f
	}

	return f
}

const _LOCKET = Symbol('locking')
/**
	* 创建一个包装函数，用于保证只有一个实例在运行，并返回一个 Promise 对象。
	* @param fn 要封装的异步函数。
	* @returns 返回一个新的包装函数，它会确保只有一个实例在运行，并返回一个 Promise 对象。
	*/
export const promiseOne = <F extends AF<any[], Promise<any>>>(fn: F) =>
	async function lockFn_(...rest) {
		// 将锁标记设置为 true，表示该函数正在运行中。
		(lockFn_ as AF)[_LOCKET] = true

		try {
			// 执行封装的异步函数，并获取结果。
			const d = await fn(...rest)
			return d
		} catch (e) {
			console.error(`promiseOne().${fn.name}`, e)
			return Promise.reject(e)
		} finally {
			// 将锁标记设置为 false，表示该函数已经运行结束。
			(lockFn_ as AF)[_LOCKET] = false
		}
	} as AF<
		ReturnParameters<F>,
		Promise<ReturnType<F> extends any ? ReturnType<F> : Promise<ReturnType<F>>>
	>

export const throttle = R.curry((gap: number, f: AF) => {
	let old = Number.MIN_SAFE_INTEGER
	/** 防止最后一次不被触发 */
	let timeOutKey: any
	return (...params: any[]) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		timeOutKey && clearTimeout(timeOutKey)
		const now = Date.now()
		if (now - gap >= old) {
			old = now
			return f(...params)
		} else {
			timeOutKey = setTimeout(() => f(...params))
		}
	}
})

export const debouncePromise = (rejectValue?: any) => {
	const queue: AF[] = []

	return (promise: Promise<any>) => {
		/** 取消上次任务  */
		const lastReject = queue[queue.length - 1]
		lastReject?.(rejectValue)

		return Promise.race([
			promise.then((d) => {
				queue.splice(0, queue.length)
				return d
			}),
			new Promise((_, reject) => queue.push(reject)),
		])
	}
}


/**
	* 判断两个值是否相等，非严格相等
	* @param a {any}
	* @param b {any}
	* @returns {boolean}
	*/
export const eq = (a: any, b: any) => {
	try {
		if (a === b || +a === +b) return true
		if (a === null && a === undefined) return true
		if (Number.isNaN(a) && Number.isNaN(b)) return true

		return JSON.stringify(a) === JSON.stringify(b)
	} catch {
		return false
	}
}