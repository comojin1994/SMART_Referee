package com.example.bts_smartreferee.services;

import com.example.bts_smartreferee.models.Guild;
import com.example.bts_smartreferee.repositories.GuildRepository;
import com.example.bts_smartreferee.services.interfaces.GuildServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Collection;

@Service("GuildService")
public class GuildService implements GuildServiceInterface {
    @Autowired
    GuildRepository guildRepository;

    @Autowired
    EntityManager entityManager;

    @Override
    public Guild findById(int id) {
        return guildRepository.findById(id).orElse(null);
    }

    @Override
    public Guild findByGuildNameNRegion(String guildName, String region) {
        return guildRepository.findByGuildNameNRegion(guildName, region);
    }

    @Override
    public Collection<Guild> findListByGuildName(String guildName) {
        return guildRepository.findListByGuildName(guildName);
    }

    @Override
    public Collection<Guild> findListByRegion(String region) {
        return guildRepository.findListByRegion(region);
    }

    @Override
    public void save(Guild guild) {
        guildRepository.save(guild);
    }

    @Override
    public void delete(Guild guild) {
        guildRepository.delete(guild);
    }
}
