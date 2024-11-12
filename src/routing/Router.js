import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "../App";
import ProtectedRoute from '../components/ProtectedRoute'
import SignIn from '../pages/SignIn'
import Home from '../pages/Home';
import CreateUser from "../pages/CreateUser"
import SignUp from '../pages/SignUp'
import User from "../pages/User"

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                    <Route path="/signin" element={<SignIn/>}></Route>
                    <Route path="/signup" element={<SignUp/>}></Route>
                    <Route path="/cake" element={<ProtectedRoute><CreateUser/></ProtectedRoute>}></Route>
                    <Route path="/cakes/:nickname/:docId" element={<User />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;
