// src/instagram.js
import axios from "axios";

class Instagram {
    constructor() {
        this.clientId = 7258951234215357;
        this.redirectUri = "https://localhost:3000/callback/instagram"
    }

    /**
     * @description 인스타그램 인가코드를 받기위한 URL 가져오기
     */
    getAuthCodeURL() {
        return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    }
    async getToken(code) {
        const params = {
            client_id: this.clientId,
            code,
            grant_type: "authorization_code",
            redirect_uri: this.redirectUri,
        }; // 👈 필수 parameter만 작성

        const { data } = await axios.post(
            "https://api.instagram.com/oauth/access_token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }, // 👈 헤더 설정
            }
        );

        console.log(data);

        const tokenData = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        };

        return tokenData;
    }
    async getUserData(token) {
        const { data } = await axios.get("https://graph.instagram.com/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                fields: 'id,username', // 추가적인 정보가 필요하다면 여기에 필드를 추가
            },
        });
    
        console.log(data);
    
        const userData = {
            id: data.id,
            username: data.username,
        };
    
        return userData;
    }
    
}
export const InstagramClient = new Instagram();