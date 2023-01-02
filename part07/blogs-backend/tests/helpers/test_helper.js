
const Blog = require('../../models/Blog')
const User = require('../../models/User')

const initialBlogs = [
  {
    title: 'the blog one title',
    author: 'the blog one author',
    url: 'the blog one url',
    likes: 20
  },
  {
    title: 'the blog two title',
    author: 'the blog two author',
    url: 'the blog two url',
    likes: 2
  },
  {
    title: 'the blog three title',
    author: 'the blog three author',
    url: 'the blog three url',
    likes: 20
  }
]

const allBlogsInDB = async () => {
  return await Blog.find({})
}

const noExistingId = async () => {
  const blog = new Blog({
    title: 'title1',
    author: 'author',
    url: 'url'
  })
  await blog.save()
  await blog.remove()
  return blog.id
}

const allUsersInDB = async () => {
  return await User.find({})
}

module.exports = {
  initialBlogs,
  allBlogsInDB,
  allUsersInDB,
  noExistingId
}
