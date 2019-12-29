package com.example.bts_smartreferee.models;

import javax.persistence.*;

@Entity
@Table(name = "guild", schema = "smart_ref")
public class Guild {
    private int id;
    private String guildName;
    private int wins;
    private int loses;
    private int draws;
    private String region;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "guild_name")
    public String getGuildName() {
        return guildName;
    }

    public void setGuildName(String guildName) {
        this.guildName = guildName;
    }

    @Basic
    @Column(name = "wins")
    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    @Basic
    @Column(name = "loses")
    public int getLoses() {
        return loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }

    @Basic
    @Column(name = "draws")
    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    @Basic
    @Column(name = "region")
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Guild guild = (Guild) o;

        if (id != guild.id) return false;
        if (wins != guild.wins) return false;
        if (loses != guild.loses) return false;
        if (draws != guild.draws) return false;
        if (guildName != null ? !guildName.equals(guild.guildName) : guild.guildName != null) return false;
        if (region != null ? !region.equals(guild.region) : guild.region != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (guildName != null ? guildName.hashCode() : 0);
        result = 31 * result + wins;
        result = 31 * result + loses;
        result = 31 * result + draws;
        result = 31 * result + (region != null ? region.hashCode() : 0);
        return result;
    }
}
