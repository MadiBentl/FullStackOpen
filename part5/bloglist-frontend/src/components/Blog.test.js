import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn(() => 21)

  beforeEach(() => {
    const sampleBlog = {
      title: 'This is a sample Blog',
      author: 'Doris G. Sample',
      likes: '19',
      url: '123.com',
      user: {
        username: 'SampleUser',
        id: '12345'
      }
    }
    component = render(
      <Blog blog={sampleBlog} likeBlog={mockHandler}>
      </Blog>
    )
  })

  test('renders title & author', () => {
    expect(component.container).toHaveTextContent('Doris G. Sample')
    expect(component.container).toHaveTextContent('This is a sample Blog')
  })

  test('does not render url & number of likes', () => {
    const div = component.container.querySelector('.mainInfo')
    expect(div).not.toHaveTextContent('19')
    expect(div).not.toHaveTextContent('123.com')
  })

  test('url and likes are shown on click', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const div = component.container.querySelector('.extraInfo')
    expect(div).toHaveTextContent('19')
    expect(div).toHaveTextContent('123.com')
  })

  test('on 2x like button click, likes increment by 2', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
    expect(mockHandler.mock.results[1].value).toBe(21)
  })


})
