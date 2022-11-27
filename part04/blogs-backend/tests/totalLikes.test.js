const { totalLikes } = require('../utils/list_helper')

describe('likes total', () => {
  test('test likes some', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes([])).toBe(0)
  })
})
