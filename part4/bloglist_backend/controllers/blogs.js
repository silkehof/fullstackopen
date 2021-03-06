const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes,
    user: user._id
  })
    
  if (blog.url === '' || blog.title === '' || blog.url === undefined || blog.title === undefined) {
    return response.status(400).json({ error: 'url or title missing'})
  } 
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id) 
  await user.save()

  const returnedBlog = await Blog.findById(blog.id).populate('user', { username: 1, name: 1 })
  response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter