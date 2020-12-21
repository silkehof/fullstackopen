import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    console.log(filterValue)
  }

  const filterByCountryName = (country) => {
    // if country.name includes filter keep in selected countries array
    return country.name.toUpperCase().includes(filterValue.toUpperCase())
  }

  const selectedCountries = () => {
    return countries.filter(filterByCountryName)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        selectedCountries={selectedCountries()}
      />
    </div>
  )
}

export default App
