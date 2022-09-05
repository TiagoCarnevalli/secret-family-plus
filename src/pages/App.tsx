import React, { useState } from 'react';
import '../styles/App.scss';

function App() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  
  return (
    <div className='login-container'>
      <form>
        <label>
          Email
        </label>
        <input id='email' type='email' placeholder='Email' value={email} onChange={({currentTarget}) => { setEmail(currentTarget.value.replace(/\s/g, '')) }} />
        <input id='password' type={'password'} placeholder='Senha' />
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
}

export default App;
