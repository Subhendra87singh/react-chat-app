import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { addLoginStatus, addUser } from '../redux/slices/useSlice';
// import { onAuthStateChanged } from 'firebase/auth';


const Home = () => {
    const account = useSelector((state) => state.account.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const getData = localStorage.getItem("users_chat");

    //     if (getData != undefined) {
    //         console.log("getData", getData);
    //         dispatch(addUser(JSON.parse(getData)));
    //         dispatch(addLoginStatus(true));
    //     }
    // }, []);
    useEffect(() => {
        console.log("===account", account);

    }, []);

    return (
        <div>
            <h1>home Page</h1>
        </div>
    )
}

export default Home
