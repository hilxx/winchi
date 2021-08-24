
export interface AsyncComposeReturn<D = any> {
 (data?: any): Promise<D>
 catch(cb: AF): AsyncComposeReturn<D>
}

const LOCKET = Symbol('locking')

export const alt = (f1: AF, f2: AF) => (val?: any) => f1(val) || f2(val)
export const and = (f1: AF, f2: AF) => (val?: any) => f1(val) && f2(val)
export const sep = (...fns: AF[]) => v => fns.forEach(fn => fn(v))
export const fork = (join: AF, f1: AF, f2: AF) =>
 v => join(f1(v), f2(v))

export const taps: AF = (...fns: AF[]) => (val: any) => {
 fns.forEach((fn) => fn(val))
 return val
}

export const asyncCompose = <D = any>(...fns: AF[]): AsyncComposeReturn<D> => {
 const f: AsyncComposeReturn = async (data?) => {
  let result = data
  try {
   for (let k = fns.length - 1; k >= 0; k--) {
    result = await fns[k](result)
   }
   return result
  } catch (e) {
   const d = await catchCb?.(e)
   return d === undefined ? Promise.reject(d) : d
  }
 }

 let catchCb: AF
 f.catch = (cb) => {
  catchCb = cb
  return f
 }
 return f
}

export const lockWrap = <F extends AF<any[], Promise<any>>>(fn: F) =>
 async function lockFn_(...rest: ReturnParameters<F>
 ): Promise<ReturnType<F> extends any ? ReturnType<F> : Promise<ReturnType<F>>> {
  lockFn_[LOCKET] = true
  try {
   const d = await fn(...rest)
   return d
  } catch (e) {
   console.error(`lockWrap.${fn.name}`, e)
   return Promise.reject(e)
  } finally {
   lockFn_[LOCKET] = false
  }
 }

export const callLock = <F extends AF>(fn: F) =>
 (...rest: ReturnParameters<F>): ReturnType<F> => {
  const isLocket = fn[LOCKET]
  return isLocket ? Promise.reject(`callLock.${fn.name}: 该函数已经在执行了`) : fn(...rest)
 }