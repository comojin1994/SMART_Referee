package com.example.bts_smartreferee.repositories;

import com.example.bts_smartreferee.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    @Query("SELECT g FROM Game AS g WHERE (g.guildByHomeGuildId.id = ?1 OR g.guildByAwayGuildId.id = ?1) ORDER BY g.time DESC")
    public Collection<Game> findListByGuildId(int id);
}
