import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'


test('blogForm test', async () => {
  const addBlog=jest.fn()
  const user=userEvent.setup()
  render(
    <BlogForm addBlog={addBlog}/>
  )
  const input = screen.getAllByRole('textbox')
  const createBtn=screen.getByText('create')

  await user.type(input[0],'blog title for test...')
  await user.type(input[1],'blog author for test...')
  await user.type(input[2],'blog url for test...')

  await user.click(createBtn)
  expect(addBlog.mock.calls[0][0].title).toBe('blog title for test...')
  expect(addBlog.mock.calls[0][0].author).toBe('blog author for test...')
  expect(addBlog.mock.calls[0][0].url).toBe('blog url for test...')
})

