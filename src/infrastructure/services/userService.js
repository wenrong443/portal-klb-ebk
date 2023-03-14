// TODO : implement the query string

export default function (config) {

    const { httpClient } = config;

    return {
        async getAdminInfo() {
            return await httpClient.get(`/user/admin/info`)
        },
        async getUserList(filter) {
            return await httpClient.post(`/user/admin/normal-user-list`, filter)
        },
        async getUserInfo(recordId){
            return await httpClient.get(`/user/admin/view-normal-user-info/${recordId}`)
        },
        async updateNormalUserInfo(record){
            return await httpClient.put(`/user/admin/update-normal-user-info`, record)
        },
        async getUserReferrer(userId, filter){
            return await httpClient.post(`/user/admin/normal-user/referrer/${userId}`, filter)
        },
        async updateAdminProfile(record){
            return await httpClient.put(`/user/admin/update-profile`, record)
        },
        async changePassword(record){
            return await httpClient.put(`/user/admin/change-password`, record)
        },
        async getTeamReport2(record){
            return await httpClient.post(`/user/admin/team-report2`, record)
        },
        async getMyTeam(record){
            return await httpClient.post(`/user/admin/my-team`, record)
        },
        async batchUpdateUserStatus(record, type){
            console.log(record)
            return httpClient.post(`/user/admin/update-user-status/batch/${type}`, record);
        },
        async updateReviewTaskCount(record){
            return await httpClient.post(`/review/admin/update-count`, record)
        },
    }
}