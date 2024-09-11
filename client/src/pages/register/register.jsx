import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
function Register() {
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/register", {
                username, email, password
            })
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message);
        } finally{
            setIsLoading(false);
          }

    };
    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" required type="text" placeholder="Username" />
                    <input name="email" required type="text" placeholder="Email" />
                    <input name="password" required type="password" placeholder="Password" />
                    <button disabled={isLoading}>Register</button>
                    {error && <span>{error}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg5.png" alt="" />
                <img src="/bg6.png" alt="" className='bg1' />
            </div>
        </div>
    );
}

export default Register;