import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0f0d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '600px' }}>
                <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                    Ace Your Next <span style={{ color: '#10b981' }}>Tech Interview</span>
                </h1>
                <p style={{ color: '#6ee7b7', fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                    Paste any job description and get personalized interview questions with detailed answers — powered by AI. Walk into your interview prepared and confident.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/register')}
                        style={{ padding: '0.875rem 2rem', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Get Started Free
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ padding: '0.875rem 2rem', borderRadius: '8px', border: '2px solid #10b981', backgroundColor: 'transparent', color: '#10b981', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;