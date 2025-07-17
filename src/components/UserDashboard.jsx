'use client'
import React, { useState } from 'react'
import { LayoutDashboard, Calendar } from 'lucide-react'
import Adminpanel from './Adminpanel.jsx' // Make sure this path is correct
import Home from './UserForm.jsx'

function Userdashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div>
           <Home/>
          </div>
        )
      case 'Tasks':
        return (
          <div>
            <h1 className="text-xl font-semibold">Tasks Page</h1>
            <p className="text-gray-600 mt-2">Your task management tools go here.</p>
          </div>
        )
      case 'Calendar':
        return (
          <div>
            <h1 className="text-xl font-semibold">Calendar Page</h1>
            <p className="text-gray-600 mt-2">View your scheduled events here.</p>
          </div>
        )
      default:
        return <div>Page not found.</div>
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-gray-200 p-6">
        <div className="mb-10">
          <img src="/Images/logo.png" className="h-12" alt="Logo" />
        </div>
        <nav className="space-y-4">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'Dashboard'}
            onClick={() => setActiveTab('Dashboard')}
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="Tasks"
            active={activeTab === 'Tasks'}
            onClick={() => setActiveTab('Tasks')}
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="Calendar"
            active={activeTab === 'Calendar'}
            onClick={() => setActiveTab('Calendar')}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
        
        {/* Topbar */}
       

        {/* Page Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition ${
        active ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </div>
  )
}

export default Userdashboard
