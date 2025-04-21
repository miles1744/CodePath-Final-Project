import { useState } from "react"

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");

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
                    <p>Home</p>
                    <p>Create New Post</p>
                </div>
            </div>
        </>
    )}

export default Header;