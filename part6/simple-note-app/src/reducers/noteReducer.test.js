import noteReducer from './noteReducer'
import deepFreeze from 'deepFreeze'

describe('noteReducer', () => {
  test('returns new state with action ADD_NOTE', () => {
    const state = []
    const action = {
      type: 'ADD_NOTE',
      data: {
        content: 'the app state is in the redux store',
        important: true,
        id: 1
      }
    }
    deepFreeze(state) //ensures state is not mutated
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
  test('returns new start with action TOGGLE_IMPORTANCE', () => {
    const state = [
      {
        content: 'Monkeys rule',
        important: true,
        id: 1
      },
      {
        content: '1992 was a year of the monkey',
        important: false,
        id: 2
      }
    ]

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2
      }
    }
    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      content: '1992 was a year of the monkey',
      important: true,
      id: 2
    })
  })
})
