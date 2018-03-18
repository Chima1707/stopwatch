const defaultState = {possibleActions: ['start'],
  timer: {mainTime: 0, lapTime: 0, started: false},
  lapses: []}

/**
    * handles tick events, increment timers if timer has started or ignore if timer is off.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const handleTick = (timer) => {
  if (timer.started) {
    return {...timer, mainTime: timer.mainTime + 100, lapTime: timer.lapTime + 100}
  }
  return timer
}

/**
    * starts timer.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const startTimer = (timer) => ({...timer, started: true})
/**
    * resume stopped timer.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const resumeTimer = (timer) => ({...timer, lapTime: 0, started: true})

/**
    * lap timer.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const lapTimer = (timer) => ({...timer, lapTime: 0, started: true})
/**
    * stops timer.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const stopTimer = (timer) => ({...timer, started: false})
/**
    * reset timer.
    * @param {Object} timer - timer object.
    * @returns {Object} = timer object.
**/
export const resetTimer = () => ({mainTime: 0, lapTime: 0, started: false})

/**
    * clears lapses list.
    * @returns {Array} = lapses.
**/
export const clearLapses = () => []

/**
    * add a new lapses.
    * @returns {Array} = lapses.
**/
export const addToLapses = (lapses, lapTime, mainTime) => {
  if (lapses.length === 10) {
    lapses.shift()
  }
  return [...lapses, {mainTime, lapTime, id: getLapId()}]
}

/**
    * get unique Id for a new lap.
    * @returns {Number} = lapses.
**/
export const getLapId = () => new Date().getTime()

/**
    * stopwatch reducer.
    * @param {Object} state - previous state.
    * @param {Object} action - action.
    * @returns {Object} = new state.
**/
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
