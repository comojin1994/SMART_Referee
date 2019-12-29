package com.example.bts_smartreferee.services;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service("KakaoLoginService")
public class
KakaoService {
    public String getAccessToken(String authCode){
        String accessToken = "";
        String refreshToken = "";
        String requestUrl = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));

            StringBuilder builder = new StringBuilder();
            builder.append("grant_type=authorization_code")
                    .append("&client_id=64dc810e80232529eab176b4f4899f0d")
                    .append("&redirect_uri=http://localhost:8888/account")
                    .append("&code=" + authCode);

            writer.write(builder.toString());
            writer.flush();

            int responseCode = connection.getResponseCode();
            System.out.println("response code: " + responseCode);

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder responseBody = new StringBuilder();

            while((line = reader.readLine()) != null){
                responseBody.append(line);
            }

            System.out.println("response body: " + responseBody.toString());

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(responseBody.toString());

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token: " + accessToken);
            System.out.println("refresh_token: " + refreshToken);

            reader.close();
            writer.close();
        }
        catch (IOException exception){
            exception.printStackTrace();
        }

        return accessToken;
    }

    public HashMap<String, Object> getUserInfo(String accessToken){
        HashMap<String, Object> userInfo = new HashMap<>();
        String requestUrl = "https://kapi.kakao.com/v2/user/me";

        try{
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");

            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = connection.getResponseCode();
            System.out.println("responseCode: " + responseCode);

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder responseBody = new StringBuilder();

            while((line = reader.readLine()) != null){
                responseBody.append(line);
            }

            System.out.println("response Body: " + responseBody.toString());

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(responseBody.toString());

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
        }
        catch(IOException exepction){
            exepction.printStackTrace();
        }

        return userInfo;
    }

    public void kakaoLogout(String accessToken){
        String requestUrl = "https://kapi.kakao.com/v1/user/logout";

        try{
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            int responseCode = connection.getResponseCode();
            System.out.println("responseCode: " + responseCode);

            BufferedReader reader  = new BufferedReader(new InputStreamReader((connection.getInputStream())));

            String result = "";
            String line = "";

            while((line = reader.readLine()) != null) {
                result += line;
            }

            System.out.println(result);
        }

        catch(IOException exception){
            exception.printStackTrace();
        }
    }
}
