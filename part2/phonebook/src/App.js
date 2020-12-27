import React, { useEffect, useState } from 'react'
import PersonsService from './services/PersonsService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    PersonsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toUpperCase() === personObject.name.toUpperCase()) {
        window.alert(`${newName} is already added to phonebook!`)
        return
      }
    }
    
    PersonsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      PersonsService
        .remove(id)
        .then(returnedPerson =>  {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
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
      <Filter 
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}/>
      <h2>Add new entry</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person, i) =>
        <Person 
          key={i}
          person={person}
          removePerson={() => removePerson(person.id)}
        />
      )}
    </div>
  )
}

export default App
