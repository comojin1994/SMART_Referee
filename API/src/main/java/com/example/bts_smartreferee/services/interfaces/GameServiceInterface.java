package com.example.bts_smartreferee.services.interfaces;

import com.example.bts_smartreferee.models.Game;

import java.util.Collection;

public interface GameServiceInterface {
    public Game findById(int id);

    public Collection<Game> findListByGuildId(int id);

    public void save(Game game);

    public void delete(Game game);
}
