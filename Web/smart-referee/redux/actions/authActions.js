import { URL } from "../../url";

export function isLoading(bool) {
    return {
        type: "LOGIN_ATTEMPT",
        isLoading: bool
    };
}

export function loginSuccess(userData) {
    return {
        type: "LOGIN_SUCCESS",
        userData
    };
}

export function loginFailed(error) {
    return {
        type: "LOGIN_FAILED",
        error
    };
}

export function login(data) {
    return dispatch => {
        dispatch(isLoading(true));
        return (data.email === "1234" && data.password === "1234")
}
