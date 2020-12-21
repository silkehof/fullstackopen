import React from 'react'
import Country from './Country'

const Countries = (props) => {
    if (props.filterValue === '') {
        return <div>Please start filtering.</div>
    }

    if (props.selectedCountries.length > 10) {
        return <div>Too many results, please change filter.</div>
    }

    if (props.selectedCountries.length === 0) {
        return <div>No country found, try another filter.</div>
    }

    if (props.selectedCountries.length > 1) {
        return (
        <div>
            {props.selectedCountries.map(country =>
                <div key={country.name}>
                    {country.name}
                    <button type='button' onClick={() => props.setFilterValue(country.name)}>Show info</button>
                </div>)}
        </div>
        )
    }
    
    return <Country country={props.selectedCountries[0]} />
}

export default Countries