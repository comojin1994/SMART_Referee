package com.example.bts_smartreferee.repositories;

import com.example.bts_smartreferee.models.Guild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface GuildRepository extends JpaRepository<Guild, Integer> {
    @Query("SELECT g FROM Guild AS g WHERE g.guildName = ?1 AND g.region = ?2")
    public Guild findByGuildNameNRegion(String guildName, String Region);

    @Query("SELECT g FROM Guild AS g WHERE g.guildName = ?1")
    public Collection<Guild> findListByGuildName(String guildName);

    @Query("SELECT g FROM Guild AS g WHERE g.region = ?1")
    public Collection<Guild> findListByRegion(String region);
}
