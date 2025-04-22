import { Link, useOutletContext } from "react-router-dom";

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
                   <Link to={"/"}><p>Home</p></Link>
                    <Link to={"/Create"}><p>Create New Post</p></Link>
                </div>
            </div>
        </>
    )}

export default Header;