import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const {session, signUpNewUser} = UserAuth()
    console.log(session)

    return (
        <div>
            <form>
                <h2> Sign up today!</h2>
                <p>
                   Already have an account? <Link to={"/signin"} className="signup-link">Sign in!</Link>
                </p>

                <input placeholder="Email" type="email" />
                <input placeholder="Password" type="password" />
                <button type="submit" disabled={loading}>Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;
