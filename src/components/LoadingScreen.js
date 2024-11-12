import React from "react";
import { SyncLoader } from 'react-spinners'

function LoadingScreen(){
    return(
        <div id="LoadingScreen">
            잠시만 기다려주세요
            <SyncLoader/>
        </div>
    )
}

export default LoadingScreen;