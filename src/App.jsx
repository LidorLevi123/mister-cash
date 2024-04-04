import './assets/styles/main.scss'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { StatisticPage } from './pages/StatisticPage'
import { ContactPage } from './pages/ContactPage'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'

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
                        <Route path='/contact/:contactId' element={<ContactDetails />} />
                        <Route path='/contact/edit/:contactId?' element={<ContactEdit />} />
                    </Routes>
                </section>
            </Router>
        </>
    )
}

export default App
