package com.example.bts_smartreferee.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity
@Table(name = "game", schema = "smart_ref")
public class Game {
    private int id;
    private int homeScore;
    private int awayScore;
    private Timestamp time;
    private Guild guildByHomeGuildId;
    private Guild guildByAwayGuildId;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @NotNull
    @Column(name = "away_score")
    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(int awayScore) {
        this.awayScore = awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    @Basic
    @NotNull
    @Column(name = "home_score")
    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(int homeScore) {
        this.homeScore = homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    @Basic
    @NotNull
    @Column(name = "time")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "home_guild_id", referencedColumnName = "id", nullable = false)
    public Guild getGuildByHomeGuildId() {
        return guildByHomeGuildId;
    }

    public void setGuildByHomeGuildId(Guild guildByHomeGuildId) {
        this.guildByHomeGuildId = guildByHomeGuildId;
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "away_guild_id", referencedColumnName = "id", nullable = false)
    public Guild getGuildByAwayGuildId() {
        return guildByAwayGuildId;
    }

    public void setGuildByAwayGuildId(Guild guildByAwayGuildId) {
        this.guildByAwayGuildId = guildByAwayGuildId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Game game = (Game) o;

        if (id != game.id) return false;
        if (homeScore != game.homeScore) return false;
        if (awayScore != game.awayScore) return false;
        if (time != null ? !time.equals(game.time) : game.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + homeScore;
        result = 31 * result + awayScore;
        result = 31 * result + (time != null ? time.hashCode() : 0);
        return result;
    }
}
