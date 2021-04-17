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

export const showNotification = (message) => {
  return {
    type: 'NOTIFICATION_ON',
    data: message
  }
}

export const hideNotification = () => {
  return {
    type: 'NOTIFICATION_OFF'
  }
}

export const showAndHideNotification = (dispatch, message) => {
  dispatch(showNotification(message))
  setTimeout(() => dispatch(hideNotification()), 5000)
}

export default notificationReducer