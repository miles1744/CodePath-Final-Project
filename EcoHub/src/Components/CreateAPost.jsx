import { useState } from "react"
import { Outlet } from 'react-router-dom'
import "../Css/App.css"
import { supabase } from "../client.js"




const CreateAPost = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setURL] = useState("");

    const createPost = async (event) => {
        event.preventDefault();
      
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
      
        // Try inserting
        const { data: newPost, error } = await supabase
          .from('Posts')
          .insert({
            Title:   title,
            Content: content,
            URL:     url,
            Upvotes: 0,
            user_id: user.id,
          })
          .select();  // returns the inserted row(s)
      
        if (error) {
          console.error('❌ insert error:', error.message);
          return;  // bail out so you can fix the problem
        }
      
        console.log('✅ post created:', newPost);
        // navigate instead of full reload
        window.location.href = '/Home';
      };
      


    return(
        <>
            <Outlet />
            <div className="Create-Form-Container">
                <form className="Create-Form" onSubmit={createPost}>
                    <input className="input-bar" type="text" value={title} placeholder="Title" onChange={(e) => {setTitle(e.target.value)}}/>
                    <textarea className="text-area-content" value={content} placeholder="Content (Optional)" onChange={(e) => {setContent(e.target.value)}}> </textarea>
                    <input type="text" className="input-bar" value={url} placeholder="Image URL (Optional)" onChange={(e) => {setURL(e.target.value)}}/>
                    <button className="post-btn" type="submit" >Create Post</button>
                </form>
            </div>
        </>
    )
}

export default CreateAPost;