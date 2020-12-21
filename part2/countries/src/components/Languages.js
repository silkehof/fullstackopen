import React from 'react'

const Languages = ({country}) => {
    return (
        <div>
            <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
        </div>
    )
}

export default Languages