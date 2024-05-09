import axios from 'axios';
import cors from 'cors';
import express from 'express'
import { config } from 'dotenv';
import {InstagramClient} from './instagram.js'
config();

import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;

const clientId = 7258951234215357;
const clientSecret = '7b8b5760e62f2dd4abc47149da80c10c';
const redirectUri = "https://localhost:3000/callback/instagram"


// mkcert로 생성한 인증서와 키의 경로를 지정합니다.
const options = {
  key: fs.readFileSync('../cert/localhost-key.pem'),
  cert: fs.readFileSync('../cert/localhost.pem')
};

app.use(express.json());
app.use(cors());

app.get('/instagram/url', (req, res, next) => {

  const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;;

  res.status(200).json({
    url,
  });
});

// Instagram OAuth 엔드포인트로부터 토큰을 얻기 위한 경로
app.post('/instagram/oauth', async (req, res) => {
  try {
    // 클라이언트로부터 받은 데이터를 URL 인코딩된 형식으로 변환
    const params = new URLSearchParams({
      client_id: '7258951234215357',
      client_secret: '7b8b5760e62f2dd4abc47149da80c10c',
      grant_type: 'authorization_code',
      redirect_uri: 'https://localhost:3000/callback/instagram',
      code: req.body.code, // 클라이언트로부터 받은 code
    }).toString();

    // Instagram API에 요청
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params, // 변환된 파라미터 사용
    });

    const data = await response.json(); // Instagram API 응답
    
    const accessToken = data.access_token;

    // 클라이언트에 Instagram API 응답 전달
    res.json(data);
    res.json({access_token: accessToken});
  } catch (error) {
    console.error('Error contacting Instagram API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Express 앱을 HTTPS 서버에 연결합니다.
https.createServer(options, app).listen(PORT, function () {
  console.log(`HTTPS server running on port ${PORT}`);
});