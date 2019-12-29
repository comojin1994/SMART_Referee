package com.example.bts_smartreferee.services;

import com.example.bts_smartreferee.models.Game;
import com.example.bts_smartreferee.repositories.GameRepository;
import com.example.bts_smartreferee.services.interfaces.GameServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Collection;

@Service("GameService")
public class GameService implements GameServiceInterface {
    @Autowired
    GameRepository gameRepository;

    @Autowired
    EntityManager entityManager;

    @Override
    public Game findById(int id) {
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public Collection<Game> findListByGuildId(int id) {
        return gameRepository.findListByGuildId(id);
    }

    @Override
    public void save(Game game) {
        gameRepository.save(game);
    }

    @Override
    public void delete(Game game) {
        gameRepository.delete(game);
    }
}
