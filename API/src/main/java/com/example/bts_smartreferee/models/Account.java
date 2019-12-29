package com.example.bts_smartreferee.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "account", schema = "smart_ref")
public class Account {
    private int id;
    private String email;
    private String name;
    private String phoneNumber;
    private int valid;
    private int credit;
    private String position;
    private Guild guildByGuildId;

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
    @Column(name = "credit")
    public Integer getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    @Basic
    @NotNull
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @NotNull
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @NotNull
    @Column(name = "phone_number")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "position")
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Basic
    @NotNull
    @Column(name = "valid")
    public Integer getValid() {
        return valid;
    }

    public void setValid(int valid) { this.valid = valid; }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "guild_id", referencedColumnName = "id", nullable = false)
    public Guild getGuildByGuildId() {
        return guildByGuildId;
    }

    public void setGuildByGuildId(Guild guildByGuildId) {
        this.guildByGuildId = guildByGuildId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Account account = (Account) o;

        if (id != account.id) return false;
        if (valid != account.valid) return false;
        if (credit != account.credit) return false;
        if (email != null ? !email.equals(account.email) : account.email != null) return false;
        if (name != null ? !name.equals(account.name) : account.name != null) return false;
        if (phoneNumber != null ? !phoneNumber.equals(account.phoneNumber) : account.phoneNumber != null) return false;
        if (position != null ? !position.equals(account.position) : account.position != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + valid;
        result = 31 * result + credit;
        result = 31 * result + (position != null ? position.hashCode() : 0);
        return result;
    }
}
