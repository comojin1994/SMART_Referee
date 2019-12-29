<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Insert title here</title>
    </head>

    <body>
        <c:if test="${userId eq null}">
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=64dc810e80232529eab176b4f4899f0d&redirect_uri=http://localhost:8888/account&response_type=code">

                <img src="${pageContext.request.contextPath}/img/kakao_account_login_btn_medium_narrow.png">
            </a>
        </c:if>
        <c:if test="${userId ne null}">
            <h1>login success</h1>
            <input type="button" value="logout" onclick="location.href='/logout'">
        </c:if>
    </body>
</html>