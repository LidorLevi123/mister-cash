import './assets/styles/main.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <>
            <Router>
                <section className='main-app main-layout'>
                    <AppHeader />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/statistic' element={<StatisticPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                    </Routes>
                </section>
            </Router>
        </>
    )
}

export default App
