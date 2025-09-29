import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';  // Import the loading spinner
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
// import './Login.css'; // Import the CSS file for styling

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);  // State to manage loading
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [lastLoginAttempt, setLastLoginAttempt] = useState(0); // Track login attempts to prevent spam
    let navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Redirect to home if already logged in
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prevent spam login attempts (minimum 1 second between attempts)
        const now = Date.now();
        if (now - lastLoginAttempt < 1000) {
            alert("Please wait a moment before trying again");
            return;
        }
        setLastLoginAttempt(now);

        setLoading(true);

        try {
            // Add timeout to API call (10 seconds max)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch("https://pu-resources-lf6n.onrender.com/api/loginuser", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                signal: controller.signal,
                cache: 'no-cache' // Don't cache login requests
            });

            clearTimeout(timeoutId);
            const json = await response.json();

            if (!json.success) {
                alert("Email or password is incorrect");
            } else {
                localStorage.setItem("authToken", json.authToken);
                // Use navigate with replace to avoid browser back button issues
                navigate("/", { replace: true });
                // alert("Login successful"); // Replaced with toast or better UX
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                alert("Login request timed out. Please check your internet connection and try again.");
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className='container'>
                <form className='m-3' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name='email'
                            value={credentials.email}
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                name='password'
                                value={credentials.password}
                                onChange={onChange}
                            />
                            <div className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="m-3 btn btn-success" disabled={loading}>
                        Submit
                    </button>
                    <Link to={"/createuser"} className='m-3 btn btn-danger'>Create account</Link>
                </form>
                {loading && (
                    <div className="loading-spinner">
                        <TailSpin
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
