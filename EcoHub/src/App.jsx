import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Css/App.css'
import {supabase} from "./client.js"



function App() {
  const [posts, setPosts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newestButtonActive, setNewestButtonActive] = useState(true)
  const [popularButtonActive, setPopularButtonActive] = useState(false)


  const getFriendlyTimeAgo = (createdAt) => {
    const { seconds, minutes, hours, days, months, years } = getTimeSincePost(createdAt);
    if (seconds === 1) return "1 second ago";
    if (seconds < 60 && seconds != 1) return `${seconds} seconds ago`;
    if (minutes === 1) return "1 minute ago";
    if (minutes < 60 && minutes != 1) return `${minutes} minutes ago`;
    if (hours === 1) return "1 hour ago";
    if (hours < 24 && hours != 1) return `${hours} hours ago`;
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    if (months === 1) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };
  

  const getTimeSincePost = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diff = now - postDate; 
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  
    return {
      seconds,
      minutes,
      hours,
      days,
      months,
      years
    };
  };
  

  useEffect(() => {
      const fetchPosts = async () => {
        
          const {data, error} = await supabase
          .from("Posts")
          .select()
          .order("created_at", { ascending: false })
          if (error) {
            console.error('⚠️ fetchPosts error:', error.message);
          } else {
            console.log('✅ posts fetched:', data);
            setPosts(data);
          }      }
      fetchPosts()
  },[])

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredList(posts);
    } else {
      setFilteredList(
        posts.filter((post) =>
          post.Title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);

  const handleNew = () => {
    setFilteredList(posts)
    setNewestButtonActive(true)
    setPopularButtonActive(false)
  }

  const handlePopular = () => {
    const sorted = [...posts].sort((postA, postB) => postB.Upvotes - postA.Upvotes);
    setFilteredList(sorted);
    setNewestButtonActive(false);
    setPopularButtonActive(true);
  }

  return (
    <>
      <Outlet context={{searchTerm, setSearchTerm}}/>
      <div className="Sort-btn-container">
        <p>Order by: </p>
        <button className={`order-btn ${newestButtonActive === true ? "active" : ""}`} onClick={handleNew}>Newest</button>
        <button className= {`order-btn ${popularButtonActive === true ? "active" : ""}`} onClick={handlePopular}>Most Popular</button>
      </div>
    <div className="posts-container">
    {filteredList && filteredList.length > 0 ? filteredList.map((post, index) => (
      <Link to={`/post/${post.id}`} key={index}>
        <div className="post" >
          <p>Posted {getFriendlyTimeAgo(post.created_at)}</p>
          <h4>{post.Title}</h4>
          <p>{post.Upvotes} upvotes</p>
        </div>
      </Link>
    )) :

    <div>
    </div>
    
    }
    </div> 
    </>
  )
}

export default App
