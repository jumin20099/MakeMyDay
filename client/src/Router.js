import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css";
import App from "./App"; // 'App' 컴포넌트를 가져옵니다.
import InstagramCallback from "./callback";
import Main from "./Main";

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/callback/instagram" element={<InstagramCallback />} />
                    <Route path="/main" element={<Main></Main>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;
