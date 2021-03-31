import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'My Blog' }
  })
  fireEvent.change(author, {
    target: { value: 'Myself' }
  })
  fireEvent.change(url, {
    target: { value: 'www.blog.de' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('My Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Myself')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.de')
})