import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <Languages country={country} />
            <img src={country.flag} alt='Country Flag' height='150'></img>
            <Weather capital={country.capital}/>
        </div>
    )
}

export default Country