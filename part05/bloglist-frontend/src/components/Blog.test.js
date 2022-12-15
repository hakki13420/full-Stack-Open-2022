import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog test',() => {

  let blog,addLike
  beforeEach(() => {
    blog={
      title:'title for testing',
      author:'author for testing',
      url:'url for testing',
      likes:22
    }
    addLike=jest.fn()
    render(
      <Blog blog={blog} addLike={addLike}/>
    ).container

  })

  test('test clicking twice on like button',async () => {

    const button=screen.getByText('like')
    const user=userEvent.setup()

    await user.click(button)
    await user.click(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })

})
