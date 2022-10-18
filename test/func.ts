// import { asyncCompose, wait } from '../src/func'


// class TJ {
//  private promise: Promise<any> = Promise.resolve()

//  public print(mes: string): TJ {
//   this.promise.then(() => console.log(mes))
//   return this;
//  }

//  public wait(ms: number): TJ {
//   this.promise = new Promise(resolve => setTimeout(resolve, ms))
//   return this;
//  }
// }

// new TJ().print("hello").wait(3000).print("2022年1月11日")

// /* ------------------ */

// const log = mes => () => console.log(mes)

// const start = asyncCompose(
//  log("2022年1月11日"),
//  wait(3000),
//  console.log
// )

// start("hello")





