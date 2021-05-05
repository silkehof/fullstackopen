const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION_ON':
    return action.data
  case 'NOTIFICATION_OFF':
    return initialState
  default:
    return state
  }
}

let timer

export const showAndHideNotification = (message, seconds) => {
  return async dispatch => {
    if (timer) {
      clearTimeout(timer)
    }
    dispatch({ type: 'NOTIFICATION_ON', data: message })
    timer = setTimeout(() => dispatch({ type: 'NOTIFICATION_OFF' }), seconds * 1000)
  }
}

export default notificationReducer