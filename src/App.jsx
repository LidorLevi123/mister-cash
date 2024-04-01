import './assets/styles/main.scss'

import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <section className='main-app'>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/statistic' element={<StatisticPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                </Routes>
            </Router>
        </section>
    )
}

export default App
