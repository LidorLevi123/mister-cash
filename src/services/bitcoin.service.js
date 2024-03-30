import axios from 'axios'
import { utilService } from './util.service'

export const bitcoinService = {
    getRate,
    getChartsData
}

async function getRate(coins) {
    try {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        return res.data
    } catch (err) {
        console.log('Could not get BTC rate', err)
    }
}

async function getChartsData() {
    try {
        let chartsData = utilService.loadFromStorage('chartDB') || null
        if(chartsData) return chartsData

        const queryParams = '?timespan=5months&format=json&cors=true'
        const res1 = await axios.get(`https://api.blockchain.info/charts/trade-volume${queryParams}`)
        const res2 = await axios.get(`https://api.blockchain.info/charts/avg-block-size${queryParams}`)
        const res3 = await axios.get(`https://api.blockchain.info/charts/market-price${queryParams}`)

        chartsData = { 
            tradeVolume: res1.data, 
            avgBlockSize: res2.data, 
            marketPrice: res3.data 
        }

        utilService.saveToStorage('chartDB', chartsData)
        return chartsData
    } catch (err) {
        console.log('Something went wrong when trying to GET charts data', err)
    }
}