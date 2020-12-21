import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Find Countries: <input
                value={props.filterValue}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

export default Filter