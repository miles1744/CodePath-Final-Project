import { useState } from "react"
import { Outlet, useParams } from 'react-router-dom'
import "../Css/App.css"
import { supabase } from "../client.js"

const postPage = () =>{

    const {id} = useParams();
    const [crewmateData, setCrewmateData] = useState({id: null, name: "", speed: 0, color: ""});

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
        const fetchCrewmates = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .eq("id", id)
            .single()

            setCrewmateData(data)
        }
        fetchCrewmates()
    }, [])
    

    return(
        <>
            <Outlet/>
            <div>
                <p>{getFriendlyTimeAgo(crewmateData.created_at)}</p>
            </div>
        </>
    )
}

export default postPage;