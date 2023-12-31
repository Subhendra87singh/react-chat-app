import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../firebase.js'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/slices/useSlice.js';

const Login = () => {
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    });


    const dispach = useDispatch();
    const loginStatus = useSelector(state => state.account.loginStatus);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, credential.email, credential.password);
            console.log(userCredential);
            setCredential({
                email: '',
                password: ''
            });
            dispach(addUser(userCredential.user));
            navigate('/');
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        };

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        if (loginStatus) {
            navigate('/');
        }
    }, [loginStatus]);
    return (
        <div className=' h-96   justify-center '>
            <form onSubmit={handleSubmit} className='max-w-[400] w-1/2 mx-auto mt-4 bg-gray-900 p-8 px-8 rounded-lg'>
                <h1 className='text-4xl dark:text-white font-bold text-center'>Login </h1>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none'
                        type='text' name='email' value={credential.email} onChange={onChange} placeholder='Email' />
                </div>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none'
                        type='password' name='password' value={credential.password} onChange={onChange} placeholder='password' />
                </div>

                <button className='w-full my-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 mt-4 rounded-sm'>Sign In</button>
                <p className='text-white'>You don't have account ? <Link to='/signup'>Sing Up</Link> </p>
            </form>
        </div>
    )
}

export default Login
