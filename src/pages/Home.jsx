import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Chat from './../components/Chat';
import SideBar from '../components/SideBar';


const Home = () => {
    const account = useSelector((state) => state.account.user);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("===account", account);

    }, []);

    return (
        <div className="flex h-full">
            <SideBar />
            <Chat />
        </div>
    )
}

export default Home
