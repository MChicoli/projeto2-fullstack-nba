import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nbaLogo from '../assets/nba-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail]   = useState('');
  const [password, setPass] = useState('');
  const [erro, setErro]     = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Credenciais inválidas');
      }

      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/search');
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={nbaLogo} alt="NBA Logo" className="login-logo" />

        <h2>Acesse o Sistema</h2>

        <form onSubmit={handleSubmit}>
          {erro && <div className="login-error">{erro}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="teste@exemplo.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => setPass(e.target.value)}
              placeholder="123456"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
