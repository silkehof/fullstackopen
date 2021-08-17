  
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button } from 'react-bootstrap'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources([...resources, response.data])
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div className="container">
      <h2>Notes</h2>
      <Form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>Create</button>
      </Form>
      <Table striped>
        <tbody>
          {notes.map(n =>
            <tr key={n.id}>
              <td>{n.content}</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: <input {...name} /> <br/>
        Number: <input {...number} />
        <button>Create</button>
      </form>
      <Table striped>
        <tbody>
          {persons.map(n =>
            <tr key={n.id}>
              <td>{n.name}</td>
              <td>{n.number}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App