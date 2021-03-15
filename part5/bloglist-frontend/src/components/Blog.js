import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderColor: '#6200B3',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 1.5,
    background: '#B2ABF2'
  }

  const likeButtonStyle = {
    marginLeft: 10,
    color: '#618B25'
  }

  const hideButtonStyle = {
    marginRight: 5
  }

  const deletebuttonStyle = {
    color: '#ED254E'
  }

  const usernameStyle = {
    paddingBottom: 15
  }

  const hideWhenVisible = {
    paddingTop: 10,
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 10,
    display: visible ? '' : 'none'
  }

  const DeleteButton = () => {
    if (blog.user.username === username) {
      return <button style={deletebuttonStyle} onClick={deleteEntry}>Delete</button>
    } else {
      return null
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addBlogLike = () => {
    likeBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const deleteEntry = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div><strong>{blog.title}</strong> by {blog.author}</div>
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <div>
          {blog.likes}
          <button style={likeButtonStyle} onClick={addBlogLike}>Like</button>
        </div>
        <div style={usernameStyle}>Created by: {blog.user.name}</div>
        <button style={hideButtonStyle} onClick={toggleVisibility}>Hide</button>
        <DeleteButton></DeleteButton>
      </div>
    </div>
  )
}

export default Blog
