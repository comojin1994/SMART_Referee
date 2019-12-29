package com.example.bts_smartreferee.controllers;

import com.example.bts_smartreferee.models.Account;
import com.example.bts_smartreferee.models.Game;
import com.example.bts_smartreferee.services.AccountService;
import com.example.bts_smartreferee.services.GameService;
import com.example.bts_smartreferee.services.GuildService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("game")
@Api
public class GameController {
    @Autowired
    AccountService accountService;

    @Autowired
    GameService gameService;

    @Autowired
    GuildService guildService;

    @GetMapping("/list/{id}")
    public ResponseEntity<Collection<Game>> getMyGuildGameMatchList(@PathVariable int id){          // account id
        Account account = accountService.findById(id);

        Collection<Game> matchInfo = gameService.findListByGuildId(account.getGuildByGuildId().getId());
        return new ResponseEntity<>(matchInfo, HttpStatus.OK);
    }
}
