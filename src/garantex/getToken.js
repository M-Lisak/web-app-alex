// import axios from "axios"
// import { generateToken } from "./generateToken.js"

// export const getToken = async () => {
//     //взять токен из того места, где храним
//     const token = ''// взять из того места, где лежит
//     const validToken = await testToken(token)

//     if(validToken) {
//         return token
//     } else {
//         //генерируем новый токен
//         return await generateToken()
//     }
// }

// const testToken = async (token) => {
//     try {
//         const { data } = await axios.get(`https://garantex.org/api/v2/depth?markets`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         return data?.length ? true : false
//     } catch (error) {
//         return false
//     }
// }