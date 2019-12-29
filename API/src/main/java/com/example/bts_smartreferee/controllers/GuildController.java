package com.example.bts_smartreferee.controllers;

import com.amazonaws.services.kms.model.AlreadyExistsException;
import com.example.bts_smartreferee.models.Account;
import com.example.bts_smartreferee.models.Guild;
import com.example.bts_smartreferee.services.AccountService;
import com.example.bts_smartreferee.services.GuildService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("guild")
@Api
public class GuildController {
    @Autowired
    GuildService guildService;

    @Autowired
    AccountService accountService;

    @PostMapping("create")
    public ResponseEntity<Guild> createMyGuild(@RequestBody Map<String, Object> createform, @ApiIgnore HttpSession httpSession){
        Guild guild = new Guild();
        String guildName = "";
        String region = "";

        try{
            int id = Integer.parseInt(httpSession.getAttribute("id").toString());
            guildName = createform.get("guildName").toString();
            region = createform.get("region").toString();

            if(guildService.findByGuildNameNRegion(guildName, region) != null)
                throw new AlreadyExistsException(guildName + " " + region + " already Exist");
        }
        catch (NullPointerException nullPointer){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        catch (AlreadyExistsException alreadyExist){
            System.out.println(alreadyExist.getMessage());
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }

        guild.setRegion(region);
        guild.setGuildName(guildName);
        guild.setWins(0);
        guild.setDraws(0);
        guild.setLoses(0);

        guildService.save(guild);

        return new ResponseEntity<>(guild, HttpStatus.OK);
    }

    @GetMapping("/myguild/info/{id}")
    public ResponseEntity<HashMap<String, String>> myguildInfo(@PathVariable("id") int guildId) {
        HashMap<String, String> myguildInfo = new HashMap<>();

        Guild guild = guildService.findById(guildId);
        myguildInfo.put("name", guild.getGuildName());
        myguildInfo.put("region", guild.getRegion());
        myguildInfo.put("wins", guild.getWins() + "");
        myguildInfo.put("draws", guild.getDraws() + "");
        myguildInfo.put("loses", guild.getLoses() + "");

        return new ResponseEntity<>(myguildInfo, HttpStatus.OK);
    }

    @GetMapping("/myguild/members")
    public ResponseEntity<Collection<Account>> myguildMemberList(@RequestParam("id") int guildId) {
        Collection<Account> players = accountService.findListByGuildIdNValid(guildId, 2);

        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @GetMapping("/myguild/members/{id}")
    public ResponseEntity<Account> myguildMemberInfo(@PathVariable("id") int guildId, @RequestParam("account") int accountId){
        Account account = accountService.findById(accountId);
        if(guildId != account.getGuildByGuildId().getId()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        Account guildMember = accountService.findByGuildIdNId(guildId, accountId);
        return new ResponseEntity<>(guildMember, HttpStatus.OK);
    }

    @PutMapping("/myguild/manage/{id}/drop")
    public ResponseEntity<Account> dropMember(@PathVariable("id") int accountId) {
        Guild guild = guildService.findById(0);
        Account account = accountService.findById(accountId);
        account.setGuildByGuildId(guild);

        accountService.save(account);

        return new ResponseEntity<>(account, HttpStatus.OK);                         // debug
    }

    @GetMapping("/myguild/manage/application/{id}")
    public Collection<Account> getApplicationList(@PathVariable("id") int guildId){
        Collection<Account> accounts = accountService.findListByGuildIdNValid(guildId, 1);

        return accounts;
    }

    @GetMapping("/search")
    public ResponseEntity<Collection<Guild>> getGuildByRegionGuildName(@RequestParam("name") String name, @RequestParam("region") String region){
        Collection<Guild> guild = new ArrayList<>();
        guild.add(guildService.findByGuildNameNRegion(name, region));

        return new ResponseEntity<>(guild, HttpStatus.OK);
    }

    @GetMapping("/search/name/{name}")
    public ResponseEntity<Collection<Guild>> getGuildListByGuildName(@PathVariable("name") String name){
        Collection<Guild> guildList = guildService.findListByGuildName(name);

        return new ResponseEntity<>(guildList, HttpStatus.OK);
    }

    @GetMapping("/search/region/{region}")
    public ResponseEntity<Collection<Guild>> getGuildListByRegion(@PathVariable("region") String region){
        Collection<Guild> guildList = guildService.findListByRegion(region);

        return new ResponseEntity<>(guildList, HttpStatus.OK);
    }

    @GetMapping("/search/members")
    public ResponseEntity<Collection<Account>> memberList(@RequestParam("name") String name, @RequestParam("region") String region){
        Guild guild = guildService.findByGuildNameNRegion(name, region);
        Collection<Account> accounts = accountService.findListByGuildIdNValid(guild.getId(), 2);

        if(accounts.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    @GetMapping("/search/members/{id}")
    public ResponseEntity<Account> memberInfo(@PathVariable("id") int guildId, @RequestParam("account") int accountId){
        Account guildMember = accountService.findByGuildIdNId(guildId, accountId);

        if(guildMember.getValid() != 2) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(guildMember, HttpStatus.OK);
    }

    @GetMapping("/search/info/{id}")
    public ResponseEntity<HashMap<String, String>> guildInfo(@PathVariable("id") int guildId){
        HashMap<String, String> guildInfo = new HashMap<>();

        Guild guild = guildService.findById(guildId);
        guildInfo.put("name", guild.getGuildName());
        guildInfo.put("region", guild.getRegion());
        guildInfo.put("wins", guild.getWins() + "");
        guildInfo.put("draws", guild.getDraws() + "");
        guildInfo.put("loses", guild.getLoses() + "");

        return new ResponseEntity<>(guildInfo, HttpStatus.OK);
    }

    @PutMapping("/search/applicationreport")                  // 가입 신청서, 유저가 팀 검색시 가져온 팀정보로 팀 id를 참조, 유저 정보 조건적으로 몇개만 노출
    public Account reportApplicationForm(@RequestParam("id") int guildId, @ApiIgnore HttpSession httpSession){
        Account account = accountService.findById(Integer.parseInt(httpSession.getAttribute("id").toString()));
        Guild guild = guildService.findById(guildId);

        account.setGuildByGuildId(guild);
        account.setValid(1);

        accountService.save(account);

        return account;
    }
}
