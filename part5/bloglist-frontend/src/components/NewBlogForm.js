import React, {useState} from 'react'

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const isButtonDisabled = (title === '' || url === '' )

    return (
        <div>
            <h2>Create a new blog entry:</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title: <input
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author: <input
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url: <input
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <br></br>
                    <button disabled={isButtonDisabled} type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm