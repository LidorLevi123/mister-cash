import { useEffect, useState } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export function StatisticPage() {

    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        loadChartData()
    }, [])

    async function loadChartData() {
        const data = await bitcoinService.getChartsData()
        setChartData(data)
    }

    if(!chartData) return <div>Loading...</div>

    return (
        <section className='statistic-page'>
            <Chart chartInfo={chartData.marketPrice} color='rgb(0, 205, 68)'/>
            <Chart chartInfo={chartData.tradeVolume} color='rgb(255, 99, 132)'/>
            <Chart chartInfo={chartData.avgBlockSize} color='rgb(1, 94, 232)'/>
        </section>
    )
}