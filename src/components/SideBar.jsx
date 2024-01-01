import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addSelectedUser } from './../redux/slices/useSlice';

export default function SideBar() {
    const [userData, setUserData] = useState([]);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch(); // Corrected spelling here

    useEffect(() => {
        ; (async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                let dataArr = [];
                querySnapshot.forEach((doc) => {
                    dataArr = [...dataArr, { user_id: doc.data().user_id, displayName: doc.data().displayName }]
                });

                setUserData(dataArr);

            } catch (error) {

            }
        })()

    }, [])

    const handleUserClick = useCallback((user) => {
        setSelected(user.user_id);
        dispatch(addSelectedUser(user)); // Corrected spelling here
    }, []);

    return (
        <div className="w-1/4 bg-gray-900 p-4">
            <h2 className="text-xl font-bold m-4 text-white text-center" >Users</h2>
            <ul>
                {userData.length > 0 && userData.map((user) => (
                    <li key={user.user_id} onClick={() => handleUserClick(user)} className={`cursor-pointer border-2 rounded w-64 flex gap-2 p-2 text-white m-4 focus:outline-none ${user.user_id === selected && 'border-green-700 border-4'}`}>
                        <div className='w-8 rounded-full text-center text-black bg-gray-200 h-auto '>{user.displayName[0]}</div>
                        <p>{user.displayName}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
