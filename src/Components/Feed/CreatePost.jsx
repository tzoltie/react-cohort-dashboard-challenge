import { useContext, useState } from "react"
import { UsersContext } from "../../App"
import { PostsContext } from "../../App"


export default function CreatePost() {

    const {loggedInuser} = useContext(UsersContext)
    const {posts, setPosts} = useContext(PostsContext)
    const [postForm, setPostForm] = useState({
        content: '',
        title: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setPostForm({
            ...postForm,
            [name]: value,
            loggedInuser
        })
    }

    const addPost = (e) => {
        e.preventDefault()

        fetch(`https://boolean-uk-api-server.fly.dev/tzoltie/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postForm)
        })
            .then(response => response.json())
            .then(json => setPosts(json, ...posts))

        setPostForm({
            content: '',
            title: ''
        })
    }

    

    return (
        <section className="post-container">
            <form className="post-form" onSubmit={(e) => addPost(e)}>
                <div className="profile-initials">
                    <p>{}</p>
                </div>
                <div className="text-input-container" id="create-post-input">
                    <input type="text" name="content" placeholder="What's on your mind?" value={postForm.content} onChange={(e) => handleChange(e)}/>
                    {postForm.content.length >= 1 &&
                    <input type="text" name="title" placeholder="Post Title" value={postForm.title} onChange={(e) => handleChange(e)} className="post-title-input"/>}
                </div>
                <div className="button-container">
                    <button id="post-btn">Post</button>
                </div>
            </form>
        </section>
    )
}