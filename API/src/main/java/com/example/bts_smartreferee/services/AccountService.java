package com.example.bts_smartreferee.services;

import com.example.bts_smartreferee.models.Account;
import com.example.bts_smartreferee.repositories.AccountRepository;
import com.example.bts_smartreferee.services.interfaces.AccountServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Collection;

@Service("AccountService")
public class AccountService implements AccountServiceInterface {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    EntityManager entityManager;

    @Override
    public Account findById(int id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Account findByPhoneNumber(String phoneNumber) {
        return accountRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public Account findByGuildIdNId(int guildId, int accountId) {
        return accountRepository.findByGuildIdNId(guildId, accountId);
    }

    @Override
    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    @Override
    public void save(Account account) {
        accountRepository.save(account);
    }

    @Override
    public void delete(Account account) {
        accountRepository.delete(account);
    }

    @Override
    public Collection<Account> findListByGuildIdNValid(int id, int valid) {
        return accountRepository.findListByGuildIdNValid(id, valid);
    }
}
