import axios from "axios"
import { generateToken } from "./generateToken.js"

export const getToken = async () => {
    //взять токен из того места, где храним
    const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjkxMTAwMzEsImV4cCI6MTcyOTE5NjQzMSwic3ViIjoic2Vzc2lvbiIsImlzcyI6ImJhcm9uZyIsImF1ZCI6WyJwZWF0aW8iXSwianRpIjoiMkRDOUM4RUYwQUU0MzEwRjE4MkJENzFFIiwidWlkIjoiSUQxNjVBRTdCNTE1IiwiZW1haWwiOiJrb3JvbGV2ZGlyZWN0QGdtYWlsLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJsZXZlbCI6Miwic3RhdGUiOiJhY3RpdmUiLCJhcGlfa2lkIjoiMDI0MDQ3OGUtOGQ1My00M2EwLTkyMmYtZTUxMmYwMDJmMWM5In0.aFGwNgNGq538DFibK8k6UocJx8feys63ov_MpyT83rPmaE3-J5iVKvSvSxgJmAMP8mJ7SvweaiglF62j51HSmR-rZSmBx6YMuEUU9D0a-f3ons6kUKHJcKAQbwoV328S-a3cc0p1MHXCf0rt3Qf12MRAs-1Bz04GjmqvW9H5zFxzuXP4DoiDGEoVTJUJXKtMZvnWZU2b4FEfm-_DvxVGUJjpj1iKJ1VQ9hoPjAR2zFe3XVcy77osmmFGkGNbF0m2ERRYELTBudQ0MEK-fsLD8ygMMbysEmMdeYPsRH8DIrUS9NrsiZsO08USTDqn5Uuoav-_G8rJ-SR_YQ9eaMFUIA'// взять из того места, где лежит
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
        const { data } = await axios.get(`https://garantex.org/api/v2/markets`, {
            headers: {
                "Accept": '/',
                Referer: 'http://localhost:3000',
                "Origin": 'http://localhost:3000/',
                "Authorization": `Bearer ${token}`
            }
        })
        return data?.length ? true : false
    } catch (error) {
        console.log('error testToken', error)
        return false
    }
}