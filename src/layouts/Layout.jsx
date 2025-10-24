import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="d-flex layout-container">
      {/* Sidebar - Left Column */}
      <Sidebar />
      
      {/* Main Content Area - Right Column */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="main-content flex-grow-1 p-4 children-container">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
