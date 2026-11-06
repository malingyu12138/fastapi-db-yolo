import server from '@/utils/requestServer'

const loginAPI = async (data) => {
    return server({
        url: '/api/v1/auth/login',
        method: 'post',
        data
    })
}

const loginCurrentInfo = async () => {
    return server({
        url: '/api/v1/auth/me',
        method: 'get',


    })
}

const logoutCurrentInfo = async () => {
    return server({
        url: '/api/v1/auth/logout',
        method: 'get',


    })
}


export {
    loginAPI,
    loginCurrentInfo,
    logoutCurrentInfo
}