import { Link, useOutletContext } from "react-router-dom";
import Footer from "./Footer.jsx"

const Header = () => {
    
    const { searchTerm, setSearchTerm } = useOutletContext();


    return (
        <>
            <div className="header">
                <h1>EcoHub</h1>
                <input className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="header-links">
                   <Link to={"/Home"}><p>Home</p></Link>
                    <Link to={"/Create"}><p>Create New Post</p></Link>
                    <Footer/>
                </div>
            </div>
        </>
    )}

export default Header;