
module.exports.dummy = (blogs) => {
  return 1
}

module.exports.totalLikes = (blogs) => {
  return blogs.reduce((acc, item) => acc + item.likes, 0)
}

module.exports.favoriteBlog = (blogs) => {
  const blogMax = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
  // const likes = blogs.map(blog => blog.likes)
  // console.log(likes)
  // const max = Math.max(...likes)

  // const blogMax = blogs.find(blog => blog.likes === max)
  // console.log(blogMax)
  return {
    title: blogMax.title,
    author: blogMax.author,
    likes: blogMax.likes
  }
}

module.exports.mostBlogs = (blogs) => {
  const uniqAuthors = []
  blogs.map(({ author }) => !uniqAuthors.includes(author) ? uniqAuthors.push(author) : null)
  const authorBlogs = uniqAuthors.map(aut => {
    const nbBlogs = blogs.reduce((acc, { author }) => {
      return aut === author ? acc + 1 : acc
    }, 0)
    return {
      author: aut,
      blogs: nbBlogs
    }
  })
  return authorBlogs.reduce((prev, current) => prev.blogs < current.blogs ? current : prev)
}

module.exports.mostLikes = (blogs) => {
  const authors = []
  blogs.map(({ author }) => !authors.includes(author) ? authors.push(author) : null)
  const authorsLikes = authors.map(at => {
    const nblikes = blogs.reduce((acc, { author, likes }) => {
      return author === at ? acc + likes : acc
    }, 0)
    return {
      author: at,
      likes: nblikes
    }
  })
  return authorsLikes.reduce((prev, current) => {
    return prev.likes < current.likes ? current : prev
  })
}
