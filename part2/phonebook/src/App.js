import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040 1237685'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toUpperCase() === nameObject.name.toUpperCase()) {
        window.alert(`${newName} is already added to phonebook!`)
        return
      }
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    if (filterValue !== '') {
      setShowAll(false)
    }
  }

  const personsToShow =  showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filterValue.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with <input
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add new entry</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App
