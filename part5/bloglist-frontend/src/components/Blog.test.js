import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content - author, title and blog creator', () => {
  const blog = {
    author: 'Mr Knowitall',
    title: 'Blog',
    url: 'www.blog.de',
    likes: 10,
    user: '60468e0c254d186a90edbee1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    `${blog.title} by ${blog.author}`
  )
  expect(component.getByText(blog.url)).not.toBeVisible()
  expect(component.getByText(blog.likes.toString())).not.toBeVisible()
})

test('renders url and likes when view button is clicked', () => {
  const blog = {
    author: 'Mr Knowitall',
    title: 'Blog',
    url: 'www.blog.de',
    likes: 10,
    user: '60468e0c254d186a90edbee1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.getByText(blog.url)).toBeVisible()
  expect(component.getByText(blog.likes.toString())).toBeVisible()
})