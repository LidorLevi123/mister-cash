import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <header className="app-header main-layout full">
            <section className="container flex space-between align-center">
                <div className="logo">MrCash</div>
                <nav className="main-nav">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/contact'>Contacts</NavLink>
                    <NavLink to='/statistic'>Statistics</NavLink>
                </nav>
            </section>
        </header>
    )
}


