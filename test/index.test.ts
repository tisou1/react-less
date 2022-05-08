import { describe, expect, it } from 'vitest'
import store from '../src/store'
import { decremented, incremented } from '../src/store/reducers/counterSlice'

describe('boolean', () => {
  it('1', () => {
    const result = store.getState()
    expect(result).toMatchInlineSnapshot(`
      {
        "booleaner": {
          "value": false,
        },
        "counter": {
          "value": 0,
        },
      }
    `)
  })
})
