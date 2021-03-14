import React, {useState} from 'react'

const Blog = ({ blog }) => {
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

  const buttonStyle = {
    marginLeft: 10,
    color: '#EA3546'
  }

  const textStyle = {
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
  

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div><strong>{blog.title}</strong> by {blog.author}</div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <div>
          {blog.likes}
          <button style={buttonStyle}>Like</button>
        </div>
        <div style={textStyle}>Created by: {blog.user.username}</div>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
}

export default Blog
