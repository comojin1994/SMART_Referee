package com.example.bts_smartreferee.controllers.forms;

public class FindIdForm {
    private String phoneNumber;

    public FindIdForm() {
    }

    public FindIdForm(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
