import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        };
        const response = await fetch(`${API_URL}/api/auth/login`, requestOptions);
        const data = await response.json();

        // Show error if login failed or no token returned
        if (!response.ok || !data.token) {
            alert(data.message || 'Something went wrong');
            return;
        }

        // Store token and redirect to dashboard
        login(data.token);
        navigate('/dashboard');

    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#0a0f0d'
        }}>
            <div style={{
                backgroundColor: '#111c17',
                padding: '2rem',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Login</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#1a2e25', color: 'white', fontSize: '1rem' }}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#1a2e25', color: 'white', fontSize: '1rem' }}
                    />
                    <button
                        type='submit'
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Login
                    </button>
                </form>
                <p style={{ color: '#6ee7b7', textAlign: 'center', marginTop: '1rem' }}>
                    Don't have an account? <a href='/register' style={{ color: '#10b981' }}>Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;