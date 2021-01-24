import React, { useEffect, useState } from 'react'
import PersonsService from './services/PersonsService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import ConfirmationNotification from './components/ConfirmationNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        updatePerson(persons[i].id)
        return
      }
    }
    
    PersonsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setConfirmationMessage(`Success! ${newName} has been added to the phonebook.`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const message = error.response.data
        setErrorMessage(`${message.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updatePerson = id => { //old entry's id!
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }

    if (window.confirm(`Do you want to update the contact ${person.name} with a new number?`)) {
      PersonsService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setConfirmationMessage(`Success! ${person.name} has been updated in the phonebook.`)
          setTimeout(() => {
            setConfirmationMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `Oh no! The phonebook entry for '${person.name}' was already removed from the server.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewNumber('')
        })
    }
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
  }

  const personsToShow = filterValue === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filterValue.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <ConfirmationNotification message={confirmationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter 
        filterValue={filterValue}
        handleFilterChange={handleFilterChange} />
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
