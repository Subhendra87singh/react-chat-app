import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from './../../firebase.js'
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
const Signup = () => {
    const [credential, setCredential] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (credential.email == '' || credential.name == '' || credential.password == '') {
                alert("Plaese fill all Fields!");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, credential.email, credential.password);
            const user = userCredential.user;
            console.log(user);
            await updateProfile(auth.currentUser, {
                displayName: credential.name
            });
            await addDoc(collection(db, "users"), {
                displayName: user.displayName,
                user_id: user.uid,
            });

            setCredential({
                name: '',
                email: '',
                password: ''
            });
            navigate('/')
            console.log("user created successfully.");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        }


    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }


    return (
        <div className=' h-96   justify-center '>
            <form onSubmit={handleSubmit} className='max-w-[400] w-1/2 mx-auto mt-4 bg-gray-900 p-8 px-8 rounded-lg'>
                <h1 className='text-4xl dark:text-white font-bold text-center'>SignUp Page </h1>

                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Name</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-700 focus:outline-none'
                        type='text' name='name' value={credential.name} onChange={onChange} placeholder='Name' />
                </div>

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

                <button className='w-full my-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 mt-4 rounded-sm'>Signup</button>
                <p className='text-white'>You have already an account ? <Link to='/login'>Sign In</Link> </p>
            </form>
        </div>
    )
}

export default Signup
