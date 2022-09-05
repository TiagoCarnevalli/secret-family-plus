import React, { useState } from 'react';
import '../styles/App.scss';

import { signInWithEmailAndPassword, signOut,  } from 'firebase/auth';
import { auth } from '../api/firebase';

import { FiEye, FiEyeOff } from 'react-icons/fi';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(false);
  const [user, setUser] = useState({});

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userLogged) => {
        console.log('Logged:');
        console.log(userLogged.user);
        setUser(userLogged.user);
      })
      .catch((error) => {
        console.log('Error:');
        console.log(error);
      });
  }

  function handleLogout() {
    signOut(auth)
    .then(() => {
        setUser({}); 
        console.log('Logged Out');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <div className='login-container'>
      <header className='login-header'>
        <h2 className='login-title'>Faça o seu login</h2>
      </header>
      <form className='login-form' onSubmit={(form) => handleLogin(form)}>
        <div className='login-input-div'>
          <label className='login-label'>Email</label>
          <input id='email' type='email' className='login-input' placeholder='exemplo@email.com' value={email} onChange={({target}) => { setEmail(target.value) }} />
        </div>
        <div className='login-input-div'>
          <label className='login-label'>Senha</label>
          <input id='password' type={hide ? 'password' : 'text'} className='login-input' placeholder='Senha' value={password} onChange={({target}) => { setPassword(target.value) }}  />
          <div className='password-hide' onClick={() => setHide(!hide)}>{hide ? <FiEye/> : <FiEyeOff/>}</div>
        </div>
        <a href='www.google.com' className='login-link'>Esqueci minha senha</a>
        <button className='login-submit' type='submit'>Entrar</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        {(user as any).email && <button onClick={handleLogout} 
          style={{ 
            background: 'var(--red)', 
            border: 'none', 
            color: 'white', 
            padding: '0.2rem 0.4rem', 
            borderRadius: '0.2rem',
            marginRight: '0.6rem',
            userSelect: 'none'
          }}>Sair</button>}
        {(user as any).email || '-'}
      </div>
    </div>
  );
}

export default App;
