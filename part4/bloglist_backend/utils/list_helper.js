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

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog
}