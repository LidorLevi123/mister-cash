import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { utilService } from '../services/util.service'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function Chart({ chartInfo, color }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chartInfo.name,
            },
        },
    }

    const data = {
        labels: getLabels(chartInfo.values),
        datasets: [
            {
                label: chartInfo.description,
                data: getData(chartInfo.values),
                borderColor: color,
                backgroundColor: getLighterColor(color),
            },
        ],
    }

    return <Line options={options} data={data} />
}

function getLabels(values) {
    const labels = values.reduce((acc, val, idx)=> {
        if(idx % 10 === 0) acc.push(utilService.getMonthName(new Date(val.x * 1000)))
        return acc
    }, [])
    return labels
}

function getData(values) {
    const data = values.map(val => val.y).filter((val, idx) => { if(idx % 10 === 0) return val })
    return data
}

function getLighterColor(color) {
    return color.slice(0, color.length-1) + ', 0.5)'
}