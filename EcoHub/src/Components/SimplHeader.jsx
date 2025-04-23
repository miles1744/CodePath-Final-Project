import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

const SimpleHeader = () => {
    

    return (
        <>
            <div className="header">
                <h1>EcoHub</h1>
                <div className="header-links">
                   <Link to={"/Home"}><p>Home</p></Link>
                    <Link to={"/Create"}><p>Create New Post</p></Link>
                    <Footer/>
                </div>
            </div>
        </>
    )}

export default SimpleHeader;