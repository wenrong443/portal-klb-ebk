import { jwtDecrypt } from "seedwork/jwtVerify"

const axiosInterceptors = {
    decorate: function (axios) {
        axios.interceptors
            .response
            .use((response) => [null, response.data],
                (error) => {
                    const decryptedJwt = jwtDecrypt(localStorage.getItem('token'))
                    if (error.response.status === 401 || !decryptedJwt) {
                        localStorage.clear()
                        window.location = '/login'
                    }
                    return [error.response.data]
                })
    }
}
export default axiosInterceptors;
