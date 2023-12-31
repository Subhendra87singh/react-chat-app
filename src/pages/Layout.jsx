import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, Link } from 'react-router-dom'
export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            {/* <Footer /> */}

        </div>
    )
}
