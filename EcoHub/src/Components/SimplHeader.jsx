import { Link } from "react-router-dom";

const SimpleHeader = () => {
    

    return (
        <>
            <div className="header">
                <h1>EcoHub</h1>
                <div className="header-links">
                   <Link to={"/"}><p>Home</p></Link>
                    <Link to={"/Create"}><p>Create New Post</p></Link>
                </div>
            </div>
        </>
    )}

export default SimpleHeader;