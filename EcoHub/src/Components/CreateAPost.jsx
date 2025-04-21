import { useState } from "react"

const CreateAPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setURL] = useState("");



    return(
        <>
            <form className="Create-Form">
                <input type="text" value={title} placeholder="Title" />
                <textarea value={content} placeholder="Content (Optional)"> </textarea>
                <input type="text" value={url} placeholder="Image URL (Optional)"/>
                <button type="submit">Create Post</button>
            </form>
        </>
    )
}