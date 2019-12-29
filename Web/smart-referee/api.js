import axios from "axios";
import { URL, DL_URL } from "./url";

const api = axios.create({
    baseURL: URL
});

api.defaults.headers.post["Content-Type"] = "application/json";

export const accountApi = {
    /* Method      : GET
     * Parameter   : code [로그인시 생성]
     * Description : KaKao 로그인 API */
    kakaoLoginApi: code => api.get(code),

    /* Method      : POST
     * Parameter   : phoneNumber [휴대폰 번호]
     * Description : 전화번호로 계정 찾기 API */
    findAccountId: phoneNumber => api.post("account/find/id", { phoneNumber }),

    /* Method      : DELETE
     * Parameter   : null
     * Description : KaKao 로그아웃 API */
    logout: () => api.delete("account/logout"),

    /* Method      : PUT
     * Parameter   : {"position": "position"}
     * Description : 포지션 설정 API */
    setAccountPosition: position =>
        api.delete("account/personal-info", { position }),

    /* Method      : POST
     * Parameter   : phoneNumber [휴대폰 번호]
     * Description : 전화번호 설정 API */
    setAccountPhoneNumber: phoneNumber =>
        api.post("account/personal-info/settings", { phoneNumber }),

    /* Method      : GET
     * Parameter   : accountId [account 테이블 인덱스]
     * Description : 계정 정보 반환 API */
    getAccountInfo: accountId => api.get(`account/personal-info/${accountId}`)
};

export const gameApi = {
    /* Method      : GET
     * Parameter   : accountId [account 테이블 인덱스]
     * Description : 경기 리스트 반환 API */
    getMyGuildGameMatchList: accountId => api.get(`game/list/${accountId}`)
};

export const guildApi = {
    /* Method      : POST
     * Parameter   : region [지역], guildName [팀명]
     * Description : 팀 생성 API */
    createMyGuild: (region, guildName) =>
        api.post(`guild/create`, { region, guildName }),

    /* Method      : GET
     * Parameter   : accountId [account 테이블 인덱스]
     * Description : 팀 정보 반환 API */
    myGuildInfo: accountId => api.get(`guild/myguild/info/${accountId}`),

    /* Method      : GET
     * Parameter   : guildId [guild 테이블 인덱스]
     * Description : 팀 가입 신청서 반환 API */
    getApplicationList: guildId =>
        api.get(`guild/myguild/manage/application/${guildId}`),

    /* Method      : PUT
     * Parameter   : accountId [account 테이블 인덱스]
     * Description : 팀원 방출 API */
    dropMember: accountId => api.put(`guild/myguild/manage/${accountId}/drop`),

    /* Method      : GET
     * Parameter   : guildId [guild 테이블 인덱스]
     * Description : 팀원 리스트 반환 API */
    myGuildMemberList: guildId =>
        api.get(`guild/myguild/members?id=${guildId}`),

    /* Method      : GET
     * Parameter   : guildId [guild 테이블 인덱스], accountId [account 테이블 인덱스]
     * Description : 팀원 상세 정보 반환 API */
    myGuildMemberInfo: (guildId, accountId) =>
        api.get(`guild/myguild/member/${guildId}?account=${accountId}`),

    /* Method      : PUT
     * Parameter   : guildId [guild 테이블 인덱스]
     * Description : 팀 이름, 지역 검색 API */
    reportApplicationForm: guildId =>
        api.put(`guild/search/application/report`, { id: guildId }),

    /* Method      : GET
     * Parameter   : guildId [guild 테이블 인덱스]
     * Description : 팀 상세 정보 API */
    guildInfo: guildId => api.get(`guild/search/info/${guildId}`),

    /* Method      : GET
     * Parameter   : guildName [팀명], region[지역]
     * Description : 팀 가입 멤버 리스트 반환 API */
    memberList: (guildName, region) =>
        api.get(`guild/search/members?name=${guildName}&region=${region}`),

    /* Method      : GET
     * Parameter   : guildId [guild 테이블 인덱스], accountId [account 테이블 인덱스]
     * Description : 팀 맴버 상세 정보 반환 API */
    memberInfo: (guildId, accountId) =>
        api.get(`guild/search/member/${guildId}?account=${accountId}`),

    /* Method      : GET
     * Parameter   : guildName [팀명]
     * Description : 팀 이름 검색 API */
    getGuildListByGuildName: guildName =>
        api.get(`guild/search/name/${guildName}`),

    /* Method      : GET
     * Parameter   : region [지역]
     * Description : 팀 지역 검색 API */
    getGuildListByRegion: region => api.get(`guild/search/region/${region}`),

    /* Method      : GET
     * Parameter   : guildName [팀명[, region [지역]
     * Description : 팀명, 지역 검색 API */
    getGuildByRegionGuildName: (guildName, region) =>
        api.get(`guild/search?name=${guildName}&region=${region}`)
};

export const imageUploadApi = {
    /* Method      : POST
     * Parameter   : formData {uri, type, name}
     * Description : 경기 이미지 업로드 API */
    uploadImage: formData =>
        fetch(`${DL_URL}/analysis/result`, {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
            method: "POST",
            body: formData
        }).then(response => {
            return response.json();
        })
};
