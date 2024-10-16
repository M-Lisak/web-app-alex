import axios from "axios"
import { generateToken } from "./generateToken.js"

export const getToken = async () => {
    //взять токен из того места, где храним
    const token = ''// взять из того места, где лежит
    const validToken = await testToken(token)

    console.log('validToken', validToken)

    if(validToken) {
        return token
    } else {
        //генерируем новый токен
        const newToken = await generateToken()
        console.log('newToken', newToken)
        return newToken
    }
}

const testToken = async (token) => {
    try {
        const { data } = await axios.get(`https://garantex.org/api/v2/depth?markets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data?.length ? true : false
    } catch (error) {
        console.log('error testToken', error)
        return false
    }
}