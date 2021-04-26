import axios from 'axios'
import AnecdoteList from '../components/AnecdoteList'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
  const object = { content, votes: 0, id: getId() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upvoteAnecdote = async (anecdote) => {
  const newObject = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newObject)
  return response.data
}

export default { 
  getAll, 
  createNew,
  upvoteAnecdote 
}