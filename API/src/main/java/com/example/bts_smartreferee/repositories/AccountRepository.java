package com.example.bts_smartreferee.repositories;

import com.example.bts_smartreferee.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    public Account findByPhoneNumber(String phoneNumber);

    public Account findByEmail(String email);

    @Query("SELECT a FROM Account AS a WHERE a.id = ?1 AND a.id = ?2")
    public Account findByGuildIdNId(int guildId, int accountId);

    @Query("SELECT a FROM Account AS a WHERE a.guildByGuildId.id = ?1 AND a.valid = ?2")
    public Collection<Account> findListByGuildIdNValid(int id, int valid);
}

