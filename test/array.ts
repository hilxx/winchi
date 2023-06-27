import * as R from 'ramda'
import Wc from '../source'
import fc from 'fast-check'

describe('iAmArray()', () => {
 
})

describe('groupBy()', () => {
 it('Record[]分类成Map', () => {
  fc.assert(
   fc.property(
    fc.array(
     fc.record({
      a: fc.string(),
      b: fc.string(),
     })
    ),
    (arr) => {
     const obj = Wc.groupBy(R.prop('a'), arr)

     for (const [aValue, recordList] of Object.entries(obj)) {
      for (const { a } of recordList) {
       if (a! === aValue)
        return false
      }
     }
     return true
    },
   )
  )
 })

 it('string[]分类成Map', () => {
  fc.assert(
   fc.property(
    fc.array(
     fc.record({
      a: fc.string(),
      b: fc.string(),
     })
    ),
    (arr) => {
     const obj = Wc.groupBy(R.prop('a'), arr)

     for (const [aValue, recordList] of Object.entries(obj)) {
      for (const a of recordList) if (a! === aValue)
       return false
     }
     return true
    },
   )
  )
 }
 )
})
