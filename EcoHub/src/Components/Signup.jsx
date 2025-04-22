import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div>
            <form>
                <h2> Sign up today!</h2>
                <p>
                   Already have an account? <Link to={"/signin"}>Sign in!</Link>
                </p>
            </form>
        </div>
    )
}

