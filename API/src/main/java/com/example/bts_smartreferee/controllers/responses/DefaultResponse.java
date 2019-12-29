package com.example.bts_smartreferee.controllers.responses;

public class DefaultResponse {
    private Status status;
    private Object data;
    private String msg;

    public enum Status {
        SUCCESS, FAIL
    }

    public DefaultResponse() {
        this.status = Status.SUCCESS;
        this.data = null;
        this.msg = null;
    }

    public DefaultResponse(final Status status) {
        this.status = status;
        this.data = null;
        this.msg = null;
    }

    public DefaultResponse(final Status status, final String msg) {
        this.status = status;
        this.data = null;
        this.msg = msg;
    }

    public DefaultResponse(final Object data) {
        this.status = Status.SUCCESS;
        this.data = data;
        this.msg = null;
    }

    public DefaultResponse(final Status status, final Object data, final String msg) {
        this.status = status;
        this.data = data;
        this.msg = msg;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(final Status status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(final Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(final String msg) {
        this.msg = msg;
    }
}

