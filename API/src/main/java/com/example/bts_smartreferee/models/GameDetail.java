package com.example.bts_smartreferee.models;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "game_detail", schema = "smart_ref")
public class GameDetail {
    private int id;
    private int homeInningScore;
    private int awayInningScore;
    private int inning;
    private Timestamp time;
    private Game gameByGameId;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "home_inning_score")
    public int getHomeInningScore() {
        return homeInningScore;
    }

    public void setHomeInningScore(int homeInningScore) {
        this.homeInningScore = homeInningScore;
    }

    @Basic
    @Column(name = "away_inning_score")
    public int getAwayInningScore() {
        return awayInningScore;
    }

    public void setAwayInningScore(int awayInningScore) {
        this.awayInningScore = awayInningScore;
    }

    @Basic
    @Column(name = "inning")
    public int getInning() {
        return inning;
    }

    public void setInning(int inning) {
        this.inning = inning;
    }

    @Basic
    @Column(name = "time")
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GameDetail that = (GameDetail) o;

        if (id != that.id) return false;
        if (homeInningScore != that.homeInningScore) return false;
        if (awayInningScore != that.awayInningScore) return false;
        if (inning != that.inning) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + homeInningScore;
        result = 31 * result + awayInningScore;
        result = 31 * result + inning;
        result = 31 * result + (time != null ? time.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id", nullable = false)
    public Game getGameByGameId() {
        return gameByGameId;
    }

    public void setGameByGameId(Game gameByGameId) {
        this.gameByGameId = gameByGameId;
    }
}
