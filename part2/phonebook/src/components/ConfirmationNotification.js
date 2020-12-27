import React from 'react'

const ConfirmationNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="confirmation">
            {message}
        </div>
    )
}

export default ConfirmationNotification