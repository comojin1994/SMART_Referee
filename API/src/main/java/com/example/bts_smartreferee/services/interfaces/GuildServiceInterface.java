package com.example.bts_smartreferee.services.interfaces;

import com.example.bts_smartreferee.models.Guild;

import java.util.Collection;

public interface GuildServiceInterface {
    public Guild findById(int id);

    public void save(Guild guild);

    public void delete(Guild guild);

    public Collection<Guild> findListByGuildName(String guildName);

    public Collection<Guild> findListByRegion(String region);

    public Guild findByGuildNameNRegion(String guildName, String region);
}
