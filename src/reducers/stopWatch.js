const defaultState = {possibleActions: ['start'],
  timer: {mainTime: 0, lapTime: 0, started: false},
  lapses: []}

export const handleTick = (timer) => {
  if (timer.started) {
    return {...timer, mainTime: timer.mainTime + 100, lapTime: timer.lapTime + 100}
  }
  return timer
}

export const startTimer = (timer) => ({...timer, started: true})
export const resumeTimer = (timer) => ({...timer, lapTime: 0, started: true})
export const lapTimer = (timer) => ({...timer, lapTime: 0, started: true})
export const stopTimer = (timer) => ({...timer, started: false})
export const resetTimer = () => ({mainTime: 0, lapTime: 0, started: false})
export const clearLapses = () => []
export const addToLapses = (lapses, lapTime, mainTime) => {
  if (lapses.length === 10) {
    lapses.shift()
  }
  return [...lapses, {mainTime, lapTime, id: getLapId()}]
}
export const getLapId = () => new Date().getTime()

const stopWatch = (state = defaultState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        timer: startTimer(state.timer),
        possibleActions: ['stop', 'lap']
      }
    case 'STOP':
      return {
        ...state,
        lapses: addToLapses(state.lapses, state.timer.lapTime, state.timer.mainTime),
        timer: stopTimer(state.timer),
        possibleActions: ['resume', 'reset']
      }
    case 'RESUME':
      return {
        ...state,
        timer: resumeTimer(state.timer),
        possibleActions: ['stop', 'lap']
      }
    case 'RESET':
      return {
        ...state,
        lapses: clearLapses(),
        timer: resetTimer(),
        possibleActions: ['start']
      }
    case 'LAP':
      return {
        ...state,
        lapses: addToLapses(state.lapses, state.timer.lapTime, state.timer.mainTime),
        timer: lapTimer(state.timer),
        possibleActions: ['stop', 'lap']
      }
    case 'TICK':
      const timer = handleTick(state.timer)
      return {
        ...state,
        timer
      }
    default:
      return state
  }
}

export default stopWatch
