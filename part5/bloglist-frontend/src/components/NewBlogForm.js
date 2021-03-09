import React from 'react'

const NewBlogForm = (props) => {
    return (
        <form onSubmit={props.addBlog}>
            <div>
                Title: <input
                    value={props.title}
                    onChange={props.handleTitleChange}
                />
            </div>
            <div>
                Author: <input
                    value={props.author}
                    onChange={props.handleAuthorChange}
                />
            </div>
            <div>
                Url: <input
                    value={props.url}
                    onChange={props.handleUrlChange}
                />
            </div>
            <div>
                <br></br>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default NewBlogForm