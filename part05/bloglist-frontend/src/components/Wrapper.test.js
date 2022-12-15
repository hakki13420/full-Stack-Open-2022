import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Wrapper from './Wrapper'



describe('Wrapper test',() => {
  let container,blog

  beforeEach(() => {

    blog={
      title:'title for testing',
      author:'author for testing',
      url:'url for testing',
      likes:22
    }

    const mockHandl=jest.fn()
    container =render(
      <Wrapper
        title={blog.title + blog.author}
        key={blog.id}
        titleBtnFirst="view"
        titleBtnSecond="hide">
        <Blog blog={blog} addLike={mockHandl}/>
      </Wrapper>
    ).container

  })


  test('Blog rendering title & not author and not url',() => {

    const elementTitle=screen.queryByText('title for testing')
    const elementAuthor=screen.queryByText('author for testing')
    const elementUrl=screen.queryByText('url for testing')
    const elementLikes=screen.queryByText('22')

    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeNull()
    expect(elementUrl).toBeNull()
    expect(elementLikes).toBeNull()

  })

  test('cliking show button dispaly url and likes',async () => {

    const user=userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url=container.querySelector('.url')
    expect(url).not.toBeNull()

    const likes=container.querySelector('.likes')
    expect(likes).not.toBeNull()

  })
})

