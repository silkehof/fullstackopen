import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content - author, title and blog creator', () => {
  const blog = {
    author: 'Mr Knowitall',
    title: 'Blog',
    user: '60468e0c254d186a90edbee1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blog by Mr Knowitall'
  )
})

test('renders content - does not render url and likes by default', () => {
  const blog = {
    author: 'Mr Knowitall',
    title: 'Blog',
    url: 'www.blog.de',
    user: '60468e0c254d186a90edbee1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'View'
  )
})