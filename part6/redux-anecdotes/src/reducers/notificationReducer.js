const initialState = "Test Notification"

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'NOTIFICATION':
    return state
  default: 
    return state
  }
}

export const showNotification = () => {
  return {
    type: 'NOTIFICATION'
  }
}

export default notificationReducer