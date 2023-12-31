import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const account = useSelector(state => state.account);
    const handleLogout = () => {
        const auth = getAuth(app);
        signOut(auth);
        navigate('/');
    }

    return (
        <div className='bg-red-400 container py-4 flex justify-between  px-10'>
            <Link to="/"><div className='text-xl font-bold text-white cursor-pointer'>LOGO</div></Link>
            <p className='text-white'>{account.user?.displayName}</p>
            <div className='flex gap-4 text-white'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {!account.loginStatus ? <Link to="/login">Sign In</Link> : <p className='cursor-pointer' onClick={handleLogout}>LogOut</p>}

            </div>
        </div>
    )
}
