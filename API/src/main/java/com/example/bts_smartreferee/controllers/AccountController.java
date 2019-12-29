package com.example.bts_smartreferee.controllers;

import com.example.bts_smartreferee.controllers.responses.DefaultResponse;
import com.example.bts_smartreferee.models.Account;
import com.example.bts_smartreferee.models.Guild;
import com.example.bts_smartreferee.services.AccountService;
import com.example.bts_smartreferee.services.KakaoService;
import com.example.bts_smartreferee.services.GuildService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

@RestController
@RequestMapping("account")
@Api
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private GuildService guildService;

    @Autowired
    private KakaoService kakaoService;

    @GetMapping
    public ResponseEntity<Account> kakaoLoginApi(@RequestParam("code") String code, @ApiIgnore HttpSession httpSession) {
        String accessToken = kakaoService.getAccessToken(code);
        HashMap<String, Object> userInfo = kakaoService.getUserInfo(accessToken);

        String email = userInfo.get("email").toString();
        Account account;

        if((account = accountService.findByEmail(email)) == null) {
            Guild guild = guildService.findById(0);
            account = new Account();

            account.setEmail(email);
            account.setName(userInfo.get("nickname").toString());
            account.setValid(0);
            account.setPhoneNumber("0");
            account.setCredit(0);
            account.setGuildByGuildId(guild);
            accountService.save(account);
        }

        httpSession.setAttribute("id", account.getId());
        httpSession.setAttribute("email", email);
        httpSession.setAttribute("access_token", accessToken);

        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(@ApiIgnore HttpSession httpSession) {
        String id = "";
//        if((id = httpSession.getAttribute("id").toString()) == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);           // 로그인 중이 아님
//        Accounts account = accountService.findById(Integer.parseInt(id));

        kakaoService.kakaoLogout(httpSession.getAttribute("access_token").toString());
        httpSession.removeAttribute("access_token");
        httpSession.removeAttribute("email");
        httpSession.removeAttribute("id");

        return new ResponseEntity<>("index", HttpStatus.OK);
    }

    @PostMapping("/find/id")
    public ResponseEntity<String> findAccountId(@RequestBody Map<String, String> phoneNumberBody) {
        Account account = accountService.findByPhoneNumber(phoneNumberBody.get("phoneNumber"));

        if(account == null)
            return new ResponseEntity(HttpStatus.NO_CONTENT);               // 등록된 번호가 없음

        StringBuilder builder = new StringBuilder();
        String at = "@";
        String blind = "*";

        StringTokenizer tokenizer = new StringTokenizer(account.getEmail(), at);
        String personal = tokenizer.nextToken();

        int length = personal.length();

        int loop = length / 2;
        while(loop-- > 0) builder.append(blind);

        builder.append(personal.substring(length / 2, length))
                .append(at).append(tokenizer.nextToken());

        return new ResponseEntity<>(builder.toString(), HttpStatus.OK);
    }

    @GetMapping("/personal-info/{id}")
    public ResponseEntity<DefaultResponse> getAccountInfo(@ApiIgnore HttpSession httpSession, @PathVariable("id") int id) {
//        if(httpSession.getAttribute("id") == null)                  // 로그인이 필요한 서비스
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        Account account = accountService.findById(Integer.parseInt(httpSession.getAttribute("id").toString()));

        return new ResponseEntity(account, HttpStatus.OK);
    }

    @PutMapping("/personal-info")
    public ResponseEntity<DefaultResponse> setAccountPosition(@ApiIgnore HttpSession httpSession, @RequestBody Map<String, String> positionBody) {
        Account account = accountService.findById(Integer.parseInt(httpSession.getAttribute("id").toString()));

        if(account.getId() == 0)                                            // 로그인이 필요한 서비스
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        account.setPosition(positionBody.get("position"));
        accountService.save(account);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/personal-info/settings")
    public ResponseEntity<Account> setAccountPhoneNumber(@ApiIgnore HttpSession httpSession, @RequestBody Map<String, String> phoneNumberBody){
//        if(httpSession.getAttribute("id") == null)                    // 로그인이 필요한 서비스
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        Account account = accountService.findById(Integer.parseInt(httpSession.getAttribute("id").toString()));

        account.setPhoneNumber(phoneNumberBody.get("phoneNumber"));
        accountService.save(account);

        return new ResponseEntity<>(account, HttpStatus.OK);
    }
}
