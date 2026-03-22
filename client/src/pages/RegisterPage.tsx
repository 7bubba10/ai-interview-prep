import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const RegisterPage = () => {
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
        }
        //Post Request
        const response = await fetch('http://localhost:8000/api/auth/register', requestOptions);
        const data = await response.json();
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
            backgroundColor: '#0f172a'
        }}>
            <div style={{
                backgroundColor: '#1e293b',
                padding: '2rem',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '1rem' }}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '1rem' }}
                    />
                    <button
                        type='submit'
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#6366f1', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Register
                    </button>
                </form>
                <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <a href='/login' style={{ color: '#6366f1' }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;