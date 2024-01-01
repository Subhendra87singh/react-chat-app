import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addSelectedUser } from './../redux/slices/useSlice';

export default function SideBar() {
    const [userData, setUserData] = useState([]);
    const [selected, setSelected] = useState(null);
    const dispach = useDispatch();
    useEffect(() => {
        ; (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            let datArr = [];
            querySnapshot.forEach((doc) => {
                datArr = [...datArr, { user_id: doc.data().user_id, displayName: doc.data().displayName }]
            });

            setUserData(datArr);

        })()

    }, [])

    const handleUserClick = (user) => {
        setSelected(user.user_id);
        dispach(addSelectedUser(user));
    };
    return (
        <div className="w-1/4 bg-gray-200 p-4">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {userData.map((user) => (
                    <li key={user.user_id} onClick={() => handleUserClick(user)} className={`cursor-pointer divide-y border-4 flex gap-2 p-2 ${user.user_id === selected && 'border-red-400'}`}>
                        <div className='w-10 rounded-full text-center bg-orange-400 h-auto'>{user.displayName[0]}</div>
                        <p>{user.displayName}</p>

                    </li>
                ))}
            </ul>
        </div>
    )
}
