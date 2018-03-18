import stopWatch from './stopWatch'

describe('stopWatch reducer', () => {
  it('should handle initial state: timer is off, start action enabled, lapses is empty', () => {
    const defaultState = {possibleActions: ['start'],
      timer: {mainTime: 0, lapTime: 0, started: false},
      lapses: []}
    expect(
      stopWatch(undefined, {})
    ).toEqual(defaultState)
  })

  it('should handle START action: start timer, stop and lap actions enabled', () => {
    const state = {possibleActions: ['start'],
      timer: {mainTime: 0, lapTime: 0, started: false},
      lapses: []}
    const afterStartState = {possibleActions: ['stop', 'lap'],
      timer: {mainTime: 0, lapTime: 0, started: true},
      lapses: []}
    expect(
      stopWatch(state, {type: 'START'})
    ).toEqual(afterStartState)
  })

  it('should handle STOP action: stop timer, add a new lap, resume and reset actions enabled', () => {
    const startedState = {possibleActions: ['stop', 'lap'],
      timer: {mainTime: 100000, lapTime: 100000, started: true},
      lapses: []}
    const newState = stopWatch(startedState, {type: 'STOP'})
    expect(newState.possibleActions).toEqual(['resume', 'reset'])
    expect(newState.timer).toEqual({mainTime: 100000, lapTime: 100000, started: false})
    expect(newState.lapses.length).toEqual(1)
  })

  it('should handle RESET action: stop and reset timer, clear lapses, start action enabled', () => {
    const stopedState = {possibleActions: ['resume', 'reset'],
      timer: {mainTime: 100000, lapTime: 100000, started: false},
      lapses: [{id: 123464674, mainTime: 100000, lapTime: 100000}]}
    const newState = stopWatch(stopedState, {type: 'RESET'})
    expect(newState.possibleActions).toEqual(['start'])
    expect(newState.timer).toEqual({mainTime: 0, lapTime: 0, started: false})
    expect(newState.lapses.length).toEqual(0)
  })

  it('should handle RESUME action: start timer, add a new lap, stop and lap actions are enabled, ', () => {
    const stopedState = {possibleActions: ['resume', 'reset'],
      timer: {mainTime: 100000, lapTime: 100000, started: false},
      lapses: [{id: 123464674, mainTime: 100000, lapTime: 100000}]}
    const newState = stopWatch(stopedState, {type: 'RESUME'})
    expect(newState.possibleActions).toEqual(['stop', 'lap'])
    expect(newState.timer).toEqual({mainTime: 100000, lapTime: 0, started: true})
    expect(newState.lapses.length).toEqual(1)
  })

  it('should handle LAP action: reset lap time, add a new lap, stop and lap actions are enabled, ', () => {
    const startedState = {possibleActions: ['stop', 'lap'],
      timer: {mainTime: 100000, lapTime: 100000, started: true},
      lapses: []}
    const newState = stopWatch(startedState, {type: 'LAP'})
    expect(newState.possibleActions).toEqual(['stop', 'lap'])
    expect(newState.timer).toEqual({mainTime: 100000, lapTime: 0, started: true})
    expect(newState.lapses.length).toEqual(1)
  })

  it('should handle TICK action: increment both timers by 100 if timer is running or just ignore if timer is not running', () => {
    const startedState = {possibleActions: ['stop', 'lap'],
      timer: {mainTime: 100000, lapTime: 100000, started: true},
      lapses: []}
    const stopedState = {possibleActions: ['resume', 'reset'],
      timer: {mainTime: 100000, lapTime: 100000, started: false},
      lapses: [{id: 123464674, mainTime: 100000, lapTime: 100000}]}

    let newState = stopWatch(startedState, {type: 'TICK'})
    expect(newState.timer.mainTime).toEqual(startedState.timer.mainTime + 100)
    expect(newState.timer.lapTime).toEqual(startedState.timer.lapTime + 100)
    expect(newState.timer.started).toEqual(startedState.timer.started)
    expect(newState.lapses).toEqual(startedState.lapses)

    newState = stopWatch(stopedState, {type: 'TICK'})
    expect(newState.timer.mainTime).toEqual(stopedState.timer.mainTime)
    expect(newState.timer.lapTime).toEqual(stopedState.timer.lapTime)
    expect(newState.timer.started).toEqual(stopedState.timer.started)
    expect(newState.lapses).toEqual(stopedState.lapses)

 })

})
