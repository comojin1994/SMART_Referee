package com.example.bts_smartreferee.services.interfaces;

import com.example.bts_smartreferee.models.Account;

import java.util.Collection;

public interface AccountServiceInterface {
    public Account findById(int id);

    public Account findByPhoneNumber(String phoneNumber);

    public Account findByGuildIdNId(int guildId, int accountId);

    public Account findByEmail(String email);

    public void save(Account account);

    public void delete(Account account);

    public Collection<Account> findListByGuildIdNValid(int id, int valid);
}
