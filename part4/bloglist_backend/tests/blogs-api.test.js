const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test-helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)    
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Writing tests is fun',
        author: 'Bob the Writer',
        url: 'www.bob.de',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd[blogsAtEnd.length-1]).toMatchObject(newBlog)
})

test('the unique identifier property of blog posts is named id', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].id).toBeDefined()
})

test('a missing likes property defaults to the value 0', async () => {
    const newBlog = {
        title: 'Writing tests is fun',
        author: 'Bob the Writer',
        url: 'www.bob.de',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
})



afterAll(() => {
    mongoose.connection.close()
})