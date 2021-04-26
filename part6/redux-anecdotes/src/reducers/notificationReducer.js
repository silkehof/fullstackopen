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

export const showAndHideNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({ type: 'NOTIFICATION_ON', data: message })
    setTimeout(() => dispatch({ type: 'NOTIFICATION_OFF' }), seconds * 1000)
  }
}

export default notificationReducer