const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body 
    logger.info(`${body}`) // body is undefined! 

    const blog = new Blog(body)
    blog
        .save()
        .then(result => {
            if (blog.url === undefined || blog.title === undefined) {
                response.status(400).json(result)
            } else {
                response.status(201).json(result)
            }
        })
})

module.exports = blogsRouter