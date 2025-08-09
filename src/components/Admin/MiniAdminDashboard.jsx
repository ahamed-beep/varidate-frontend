'use client'
import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Mail,
  LogOut,
  ClipboardList,
  Search,
  Menu,
  BarChart2,
  Shield,
  Database
} from 'lucide-react'
import AdminHome from './AdminHome.jsx'
import { logouts } from '../Redux/Auth.jsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import UserManagement from './UserManagement.js'

function MiniAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logouts())
    localStorage.removeItem('isLoggedIn')
    toast.success("Logged out successfully")
    navigate('/')
  }

  const userEmail = localStorage.getItem('userEmail') || 'admin@example.com'
  const userName = localStorage.getItem('userName') || 'Admin'

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <div className="mt-6"><AdminHome /></div>
      case 'Users':
        return <div className="mt-6"><UserManagement /></div>
      case 'Analytics':
        return (
          <div className="mt-6">
            <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
          </div>
        )
      default:
        return <div className="mt-6">Page not found.</div>
    }
  }

  const handleTab = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen block md:hidden bg-gray-50">
      <header className="bg-[#f4793d] fixed z-50 w-full border-b border-[#f4793d]">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
              <Menu />
            </button>
            <img src="/Images/logo.png" className="h-10" alt="Logo" />
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setShowSearch(!showSearch)} className="text-white">
              <Search />
            </button>
            <button className="relative">
              <Bell size={20} className="text-white" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="px-4 py-2 bg-white shadow">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4793d]"
            />
          </div>
        )}
      </header>

      <div className="flex pt-16">
        <aside className={`fixed z-40 bg-white border-r border-gray-200 w-full h-full p-6 space-y-4 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <nav className="space-y-2 mt-4">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleTab('Dashboard')} />
            <NavItem icon={<Users size={20} />} label="User Management" active={activeTab === 'Users'} onClick={() => handleTab('Users')} />
            <NavItem icon={<BarChart2 size={20} />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => handleTab('Analytics')} />
            <NavItem icon={<Database size={20} />} label="System Logs" active={activeTab === 'Logs'} onClick={() => handleTab('Logs')} />
            <div className="border-t border-gray-300 pt-4 mt-6">
              <NavItem icon={<LogOut size={20} />} label="Logout" active={false} onClick={handleLogout} />
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition
        ${active ? 'bg-blue-100 text-[#f4793d]' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </div>
  )
}

export default MiniAdminDashboard