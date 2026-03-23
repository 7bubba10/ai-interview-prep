import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [daysUntilInterview, setDaysUntilInterview] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                jobDescription,
                daysUntilInterview,
                questionCount
            })
        };



        const response = await fetch('http://localhost:8000/api/interview/generate', requestOptions);
        const data = await response.json();

        if (!response.ok || !data) {
            alert(data.message || 'Something went wrong');
            setLoading(false);
            return;
        }

        // Pass generated questions to results page via router state
        navigate('/results', { state: { questions: data } });


    };


    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{
                backgroundColor: '#1e293b',
                padding: '2rem',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '600px'
            }}>
                <h1 style={{ color: 'white', marginBottom: '0.5rem', textAlign: 'center' }}>AI Interview Prep</h1>
                <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1.5rem' }}>Paste a job description and get personalized interview questions</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <textarea
                        placeholder='Paste the job description here...'
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={6}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '1rem', resize: 'vertical' }}
                    />
                    <input
                        type='number'
                        placeholder='Days until interview'
                        value={daysUntilInterview}
                        onChange={(e) => setDaysUntilInterview(Number(e.target.value))}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '1rem' }}
                    />
                    <input
                        type='number'
                        placeholder='Number of questions'
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '1rem' }}
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        style={{ padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: loading ? '#4f46e5' : '#6366f1', color: 'white', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                    >
                        {loading ? 'Generating...' : 'Generate Interview Questions'}
                    </button>
                </form>
            </div>
        </div>
    );

};

export default DashboardPage;

