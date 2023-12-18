import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import app from '../../firebase';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const {register, formState: {errors}, handleSubmit } = useForm();

  const auth = getAuth(app)

  const onSubmit = async(data) => {
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password)
    }
    catch(error) {
      console.error(error)
      setErrorMessage(error.message);

      setTimeout(() => {
        setErrorMessage("");
      }, 3000)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='auth-wrapper'>
      <div>
        <h3>로그인</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email'>이메일</label>
        <input 
          name='email' 
          type='email' 
          id='email' 
          {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
        />
        {errors.email && <p>이메일을 입력해주세요.</p>}

        <label htmlFor='password'>비밀번호</label>
        <input 
          name='password' 
          type='password' 
          id='password' 
          {...register('password', {required: true, minLength: 6})}
        />
        {errors.password && errors.password.type =='required' && <p>비밀번호를 입력해주세요.</p>}
        {errors.password && errors.password.type =='minLength' && <p>비밀번호를 6글자 이상으로 작성해주세요.</p>}

        {errorMessage && 
          <p>{errorMessage}</p>
        }
        <input type='submit' disabled={loading} />

        <Link style={{color: 'gray', textDecoration: 'none'}} to={'/register'}>회원가입</Link>
      </form>
    </div>
  )
}

export default LoginPage