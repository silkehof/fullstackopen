/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`Success! Blog "${blogObject.title}" has been saved.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          'Blog could not be saved, please try again!'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addBlogLike = (blogObject, id) => {
    blogService
      .addLike(blogObject, id)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Delete ${blog.title}?`)) {
      blogService
        .remove(id)
        .then(returnedBlog => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setSuccessMessage('This worked! Blog has been deleted.')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch (error => {
          setErrorMessage('Sorry, blog could not be deleted!')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">Login</button>
    </form>
  )

  const logoutUser = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
    setSuccessMessage('Logout was successful, until next time!')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const sortByLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h1>Blogs</h1>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <button onClick={logoutUser}>Logout</button>
          <p>Welcome {user.name}, you are logged in!</p>
          <Togglable buttonLabel="New blog entry" ref={blogFormRef}>
            <NewBlogForm createBlog={addBlog} />
          </Togglable>
          <h2>My saved blogs:</h2>
          <div className='bloglist'>
            {blogs.sort(sortByLikes).map(blog =>
              <Blog
                key={blog.id}
                username={user.username}
                blog={blog}
                likeBlog={addBlogLike}
                deleteBlog={deleteBlog} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App