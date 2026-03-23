import { useLocation } from 'react-router-dom';

interface Question {
    question: string;
    answer: string;
}


const ResultsPage = () => {
    const location = useLocation();
    const questions = location.state?.questions;


    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '0.5rem' }}>Your Interview Questions</h1>
                <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }}>Study these carefully before your interview</p>
                {questions.map((q: Question, index: number) => (
                    <div key={index} style={{
                        backgroundColor: '#1e293b',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ color: '#6366f1', fontWeight: 'bold', marginBottom: '0.5rem' }}>Q{index + 1}: {q.question}</p>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>{q.answer}</p>
                    </div>
                ))}
                <button
                    onClick={() => window.history.back()}
                    style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#6366f1', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Generate New Questions
                </button>
            </div>
        </div>
    );
}

export default ResultsPage;
