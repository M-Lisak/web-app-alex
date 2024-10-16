import axios from 'axios'

export const getDepth = async (token) => {
    try {
        const market = 'usdtrub'
        const { data } = await axios.get(`https://garantex.org/api/v2/depth?market=${market}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log('error getDepth', error)
    }
}