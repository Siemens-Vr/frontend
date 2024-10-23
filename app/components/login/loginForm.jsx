"use client"
import styles from '@/app/styles/login/loginform/loginForm.module.css';
import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useRouter } from "next/navigation";  // Use this to navigate after login
import { config } from "/config";
import {jwtDecode} from 'jwt-decode'; // Use jwt-decode to decode token


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();  // Use for navigation after login

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.baseURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 401) {
                setError('Invalid email or password');
                setLoading(false);
                return;
            }

            const data = await response.json();
         
        
            
            if (response.ok) {
                // Save tokens to localStorage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                // Decode the token to get user role
                const decodedToken = jwtDecode(data.accessToken); // Decodes the token to get user info
                const userRole = decodedToken.role;
                console.log(userRole)
                // Redirect to the correct dashboard based on user role
                switch (userRole) {
                    case 'admin':
                        window.location.href = '/pages/admin/dashboard'; // Example for admin
                        console.log("redirecting")
                        break;
                    case 'equipment':
                        router.push('/pages/equipment/dashboard');
                        break;
                    case 'student':
                        router.push('/pages/student/dashboard');
                        break;
                    default:
                        router.push('/403'); // Redirect to 403 for unauthorized access
                }
            } else {
                // Show error message
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.log(err)
        } finally {
            setLoading(false);  // Stop loading after the request
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
            />

            <div className={styles.passwordWrapper}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                />
                <span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
                    {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
};

export default LoginForm;
