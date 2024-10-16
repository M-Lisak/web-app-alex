import { getDepth } from './getDepth.js'
import { getToken } from './getToken.js'

export const getExchangeRate = async (value) => {
    //кидать проверку на jwt-token, где-то хранить этот jwt-token(наверное в телеграмме)
    const token = await getToken()
    //получаем данные по заявкам
    const depth = await getDepth(token)

    const asks = depth?.asks || []
    const bids = depth?.bids || []
    //price всегда цена в рублях
    
    const filteredAsks = asks.filter(el => el.amount >= value)

    if(filteredAsks.length > 5) {
        filteredAsks.length = 5
    }
    const sumPriceAsks = filteredAsks.reduce((sum, prev) => Number(sum) + Number(prev?.price), 0)

    const filteredBids = bids.filter(el => el.volume >= value)

    if(filteredBids.length > 5) {
        filteredBids.length = 5
    }
    const sumPriceBids = filteredBids.reduce((sum, prev) => Number(sum) + Number(prev?.price), 0)

    return {
        asks: Number(sumPriceAsks/filteredAsks.length),
        bids: Number(sumPriceBids/filteredBids.length)
    }
}

// const val = await getExchangeRate(50000)