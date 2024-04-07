import './assets/styles/main.scss'
import { userService } from './services/user.service'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { StatisticPage } from './pages/StatisticPage'
import { LoginPage } from './pages/LoginPage'
import { ContactPage } from './pages/ContactPage'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'

function RouteGuard({ children }) {
    const user = userService.getLoggedInUser() 
    if (!user) return <Navigate to='/login' />
    return <>{children}</>
}

function App() {
    return (
        <>
            <Router>
                <section className='main-app main-layout'>
                    <AppHeader />
                    <Routes>
                        <Route path='/' element={<RouteGuard><HomePage /></RouteGuard>} />
                        <Route path='/statistic' element={<StatisticPage />} />
                        <Route path='/contact' element={<RouteGuard><ContactPage /></RouteGuard>} />
                        <Route path='/contact/:contactId' element={<RouteGuard><ContactDetails /></RouteGuard>} />
                        <Route path='/contact/edit/:contactId?' element={<RouteGuard><ContactEdit /></RouteGuard>} />
                        <Route path='/login' element={<LoginPage />} />
                    </Routes>
                </section>
            </Router>
        </>
    )
}

export default App
