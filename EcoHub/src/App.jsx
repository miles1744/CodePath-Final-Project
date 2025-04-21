import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './Css/App.css'
import {supabase} from "./client.js"

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchCrewmates = async () => {
          const {data} = await supabase
          .from("Posts")
          .select()
          .order("created_at", { ascending: true })
          setPosts(data);
      }
      fetchCrewmates()
  },[])

  return (
    <>
      <Outlet />
      <div className="Sort-btn-container">
        <p>Order by: </p>
        <button className="order-btn">Newest</button>
        <button className="order-btn">Most Popular</button>
      </div>
    <div className="posts-container">
    {posts && posts.length > 0 ? posts.map((post) => (
      <div key={post.id}>
        <p>Posted {post.created_at}</p>

      </div>
    )) :

    <div>

    </div>
    
    }
    </div>
   
    </>
  )
}

export default App
