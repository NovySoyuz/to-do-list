import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';

function Register () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .catch((err) => setError(err.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <button>S'inscrire</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default Register;