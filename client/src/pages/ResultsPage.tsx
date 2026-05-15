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
            backgroundColor: '#0a0f0d',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '0.5rem' }}>Your Interview Questions</h1>
                <p style={{ color: '#6ee7b7', textAlign: 'center', marginBottom: '2rem' }}>Study these carefully before your interview</p>
                {questions.map((q: Question, index: number) => (
                    <div key={index} style={{
                        backgroundColor: '#111c17',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>Q{index + 1}: {q.question}</p>
                        <p style={{ color: '#6ee7b7', lineHeight: '1.6' }}>{q.answer}</p>
                    </div>
                ))}
                <button
                    onClick={() => window.history.back()}
                    style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Generate New Questions
                </button>
            </div>
        </div>
    );
}

export default ResultsPage;
