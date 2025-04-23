import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"



const footer = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut()
            navigate("/signup")
        }
        catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="footer-container">
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default footer;