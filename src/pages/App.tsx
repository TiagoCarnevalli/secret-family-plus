import React, { useState } from 'react';
import '../styles/App.scss';

import { signInWithEmailAndPassword, signOut,  } from 'firebase/auth';
import { auth } from '../api/firebase';

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
        console.log(userLogged.providerId);
        console.log(userLogged.operationType);
        setUser(userLogged.user);
      })
      .catch((error) => {
        console.log('Error:');
        console.log(error);
      })
  }
  
  return (
    <div className='login-container'>
      <header>
        <h2>Faça o seu login</h2>
      </header>
      <form onSubmit={(form) => handleLogin(form)}>
        <div>
          <label>Email</label>
          <input id='email' type='email' placeholder='exemplo@email.com' value={email} onChange={({target}) => { setEmail(target.value) }} />
        </div>
        <div>
          <label>Senha</label>
          <input id='password' type={hide ? 'password' : 'text'} placeholder='Senha' value={password} onChange={({target}) => { setPassword(target.value) }}  />
          <input type='checkbox' checked={hide} onChange={() => { setHide(!hide) }} style={{ width: 'fit-content' }} />
        </div>
        <a href='www.google.com'>Esqueci minha senha</a>
        <button type='submit'>Entrar</button>
      </form>
      <div style={{ marginTop: '0.4rem' }}>
        <button onClick={() => { setUser({}); signOut(auth) }} 
          style={{ 
            background: 'var(--red)', 
            border: 'none', 
            color: 'white', 
            padding: '0.2rem 0.4rem', 
            borderRadius: '0.2rem',
            marginRight: '0.4rem'
          }}>Sair</button>
        {(user as any).email || '-'}
      </div>
    </div>
  );
}

export default App;
