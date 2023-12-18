import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth'
import app, { db } from '../../firebase'
import md5 from 'md5';
import {set, ref} from 'firebase/database';

function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const {register, formState: {errors}, handleSubmit } = useForm();

  const auth = getAuth(app)

  const onSubmit = async(data) => {
    try{
      setLoading(true);
      const createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
      console.log(createdUser)  
      
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })

      const userRef = ref(db, `users/${createdUser.user.uid}`);

      set(userRef , {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL
      })
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
        <h3>회원가입</h3>
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

        <label htmlFor='name'>이름</label>
        <input 
          name='name'  
          type='text' 
          id='name' 
          {...register('name', {required: true, maxLength: 10})}
        />
        {errors.name && errors.name.type =='required' && <p>이름을 입력해주세요.</p>}
        {errors.name && errors.name.type =='maxLength' && <p>이름이 너무 깁니다.</p>}

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

        <Link style={{color: 'gray', textDecoration: 'none'}} to={'/login'}>로그인</Link>
      </form>
    </div>
  )
}

export default RegisterPage