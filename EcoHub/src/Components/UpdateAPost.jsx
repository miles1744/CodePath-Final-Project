import { useState, useEffect } from "react"
import { Outlet, useParams, Link } from 'react-router-dom'
import "../Css/App.css"
import { supabase } from "../client.js"




const UpdateAPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, Title: "", Content: "", URL: ""});

    const updateCrewmate = async (event) => {
        event.preventDefault();

        await supabase
        .from("Posts")
        .update({ Title: post.Title, Content: post.Content, URL: post.URL})
        .eq("id", id)

        window.location = "/Home"
    }

    useEffect(() => {
        const fetchCrewmates = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .eq("id", id)
            .single()

            setPost(data)
        }
        fetchCrewmates()
    }, [])

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    return(
        <>
            <Outlet/>
            <div className="Create-Form-Container">
                <form className="Create-Form" onSubmit={updateCrewmate}>
                    <input className="input-bar" name="Title"  type="text" value={post.Title} placeholder="Title" onChange={handleChange}/>
                    <textarea className="text-area-content" name="Content" value={post.Content} placeholder="Content (Optional)" onChange={handleChange}> </textarea>
                    <input type="text" className="input-bar" name="URL" value={post.URL} placeholder="Image URL (Optional)" onChange={handleChange}/>
                    <button className="post-btn" type="submit" >Update Post</button>
                </form>
            </div>
        </>
    )
}

export default UpdateAPost;