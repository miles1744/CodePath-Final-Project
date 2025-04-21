import { useState } from "react"

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <h1>EcoHub</h1>
            <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </>
    )}

export default Header;