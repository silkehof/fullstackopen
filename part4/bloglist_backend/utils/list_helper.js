var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  const topLikes = Math.max(...blogLikes)

  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i].likes === topLikes) {
      const blog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes
      }
      return blog
    }
  }
  return {}
}

const mostBlogs = (blogs) => {
  var authors = _.groupBy(blogs, 'author')
  var finalResult = _.reduce(authors, function(result, authorBlogs, authorName) {
    // console.log(authorBlogs, authorName, result)
    if (authorBlogs.length > result.blogs) {
      result.author = authorName
      result.blogs = authorBlogs.length
    }
    return result
  }, 
  {
    author: '',
    blogs: 0
  })

  return finalResult
}

const mostLikes = (blogs) => {
  var authors = _.groupBy(blogs, 'author')
  var finalResult = _.reduce(authors, function (result, authorBlogs, authorName) {
    // console.log(authorBlogs, authorName, result)
    var authorLikes = totalLikes(authorBlogs)
    if (authorLikes > result.likes) {
      result.author = authorName
      result.likes = authorLikes
    }
    return result
  },
  {
    author: '',
    likes: 0
  })

  return finalResult
}


module.exports = {
  dummy,
  totalLikes, 
  favoriteBlog,
  mostBlogs, 
  mostLikes
}