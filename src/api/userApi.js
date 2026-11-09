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

const searchRsyield = async (data) => {
    return server({
        url: '/api/v1/books/rsyield', // 代理会自动处理 /api 前缀
        method: 'post',
        data
    })
}


export {
    loginAPI,
    loginCurrentInfo,
    logoutCurrentInfo,
    searchRsyield
}