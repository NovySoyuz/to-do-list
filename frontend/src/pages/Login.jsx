import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .catch((err) => setError(err.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <button>Se connecter</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;