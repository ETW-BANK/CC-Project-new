import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../src/App.css';

function Login() {
    const { selectedCity } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    document.title = "Login";

    const loginHandler = async (e) => {
        e.preventDefault();
        
        const dataToSend = {
            Email: email,
            Password: password
        };

        try {
            const response = await fetch("api/UserAccount/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem("user", dataToSend.Email);
            navigate(selectedCity ? `/restaurants-page/${selectedCity}` : '/restaurants-page/');
        } catch (error) {
            setError('Something went wrong, please try again');
            console.error('Login error:', error);
        }
    };

    return (
        <section className='login-page-wrapper page'>
            <div className='login-page'>
                <header>
                    <h1>Login Page</h1>
                </header>
                <p className='message'>{error}</p>
                <div className='form-holder'>
                    <form action="#" className='login' onSubmit={loginHandler}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <br />
                        <input type="checkbox" name='Remember' id='remember' />
                        <label htmlFor="remember">Remember Password?</label>
                        <br />
                        <br />
                        <input type="submit" value="Login" className='login btn' />
                    </form>
                </div>
                <div className='my-5'>
                    <span>Or </span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </section>
    );
}

export default Login;
