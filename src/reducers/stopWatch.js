const defaultState = {possibleActions: ['start'],
  timer: {mainTime: 0, lapTime: 0, started: false},
  lapses: []}

/**
    * Handles tick events, increment timers if timer is started or ignore if timer is off.
    * @param {Object} timer - Previous timer object.
    * @returns {Object} = A new timer object if previous timer object is started or the previous timer object.
**/
export const handleTick = (timer) => {
  if (timer.started) {
    return {...timer, mainTime: timer.mainTime + 100, lapTime: timer.lapTime + 100}
  }
  return timer
}

/**
    * Handles start timer.
    * @param {Object} timer - Previous timer object.
    * @returns {Object} = A new timer object.
**/
export const startTimer = (timer) => ({...timer, started: true})
/**
    * Handles resume timer.
    * @param {Object} timer - Previous timer object.
    * @returns {Object} = A new timer object.
**/
export const resumeTimer = (timer) => ({...timer, lapTime: 0, started: true})

/**
    * Handles lap timer.
    * @param {Object} timer - Previous timer object.
    * @returns {Object} = A new timer object.
**/
export const lapTimer = (timer) => ({...timer, lapTime: 0, started: true})
/**
    * Handles stop timer.
    * @param {Object} timer - Previous timer object.
    * @returns {Object} = A new timer object.
**/
export const stopTimer = (timer) => ({...timer, started: false})
/**
    * Handles reset timer.
    * @returns {Object} = A new timer object.
**/
export const resetTimer = () => ({mainTime: 0, lapTime: 0, started: false})

/**
    * Get new empty list of lapses.
    * @returns {Array} = Empty list of lapses.
**/
export const clearLapses = () => []

/**
    * Handles creation and addition of a new lap to list of lapses.
    * Should remove the first lap before adding a new lap if lapses is greater than or equal to 5
    * @returns {Array} = A new array of lapses.
**/
export const addToLapses = (lapses, lapTime, mainTime) => {
  if (lapses.length >= 5) {
    lapses.shift()
  }
  return [...lapses, {mainTime, lapTime, id: getLapId()}]
}

/**
    * Get unique Id for a new lap.
    * @returns {Number} = unique Id.
**/
export const getLapId = () => new Date().getTime()

/**
    * The stopwatch reducer.
    * @param {Object} state - Previous state.
    * @param {Object} action - Action.
    * @returns {Object} = A new state.
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
