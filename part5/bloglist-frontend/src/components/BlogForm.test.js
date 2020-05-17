import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form calls its props.eventHandler w/ correct details', () => {
    const mockHandler = jest.fn(() => 21)

    const component = render(<BlogForm handleNewBlog={mockHandler}/>)

    const button = component.getByText('Add')

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    expect(titleInput).toHaveAttribute('name', 'title')
    expect(authorInput).toHaveAttribute('name', 'author')
    expect(urlInput).toHaveAttribute('name', 'url')

    fireEvent.change(titleInput, { target: { value: 'This is a blog' } })
    fireEvent.change(authorInput, { target: { value: 'Boris B. Blog' } })
    fireEvent.change(urlInput, { target: { value: 'bloggy.com' } })

    fireEvent.click(button)

    expect(titleInput.value).toBe('')
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
