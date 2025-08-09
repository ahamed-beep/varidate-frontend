'use client'
import React, { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  Bell,
  Settings,
  LifeBuoy,
  Mail,
  LogOut,
  ClipboardList,
  Menu
} from 'lucide-react'
import Home from './UserForm.jsx'
import MiniDashboard from './MiniDashboard.jsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Task from './Task.jsx'
import { fetchProfilePicture } from './Redux/profile.jsx'
import { useSelector } from 'react-redux'
import ProfileValidatorApp from './Userprofiledetail.jsx'
import { logoutUser } from './Redux/Auth.jsx'


function Userdashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProfileId, setSelectedProfileId] = useState(null)

  const userId = localStorage.getItem('userId') || null;
  const dispatch = useDispatch();
  const { picture } = useSelector((state) => state.profile);
  
useEffect(() => {
  if (userId) {
    dispatch(fetchProfilePicture(userId));
  }
}, [dispatch, userId]);

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap();
    toast.success("Logged out successfully");
    navigate('/log');
  } catch (error) {
    toast.error("Logout failed");
  }
};

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId);
    setActiveTab('Directory');
  };

  const handleBackToDirectory = () => {
    setSelectedProfileId(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProfileId(null);
    setSidebarOpen(false);
  }

  const userEmail = localStorage.getItem('userEmail') || 'Email not available';
  const userName = localStorage.getItem('userName') || 'User';

  const renderContent = () => { 
    switch (activeTab) {
      case 'Dashboard':
        return <div className='mt-6'><Home /></div>
      case 'Directory':
        return selectedProfileId ? (
          <div className="mt-6">
            <ProfileValidatorApp id={selectedProfileId} onBack={handleBackToDirectory} />
          </div>
        ) : (
          <div className="mt-6">
            <Task onProfileClick={handleProfileClick} />
          </div>
        )
      case 'Calendar':
        return (
          <div className="mt-6">
            <h1 className="text-xl font-semibold">Calendar Page</h1>
            <p className="text-gray-600 mt-2">View your scheduled events here.</p>
          </div>
        )
      case 'Settings':
        return <div className="mt-6"><h1 className="text-xl font-semibold">Settings Page</h1></div>
      case 'Support':
        return <div className="mt-6"><h1 className="text-xl font-semibold">Support Page</h1></div>
      case 'Contact':
        return <div className="mt-6"><h1 className="text-xl font-semibold">Contact Page</h1></div>
      default:
        return <div className="mt-6">Page not found.</div>
    }
  }

  return (
    <div>
      <div className='block md:hidden'>
        <MiniDashboard />
      </div>
   
      <div className="min-h-screen hidden md:block bg-gray-50">
        <header className="bg-[#f4793d] fixed z-50 h-16 w-full px-4 md:px-6 flex items-center justify-between border-b border-[#f4793d]">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white md:hidden">
              <Menu />
            </button>
            <img src="/Images/logo.png" className="h-10 hidden md:block" alt="Logo" />
            <input
              type="text"
              placeholder="Search task"
              className="px-3 py-1 mt-2 hidden md:block border border-[#f4793d] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white rounded-full w-64"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell size={20} className="text-white" />
            </button>
           <div className="flex items-center space-x-3">
  {picture ? (
    picture.url ? (
      <img
        src={picture.url}
        alt="Profile"
        className="w-10 h-10 rounded-full bg-white object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/Images/profile.png';
        }}
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <span className="text-gray-500 text-xs">No Image</span>
      </div>
    )
  
  ) : (
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
      <span className="text-gray-500 text-xs">Error</span>
    </div>
  )}
  <div className="text-right text-white hidden sm:block">
    <div className="font-medium text-sm">{userName}</div>
    <div className="text-xs text-blue-100">{userEmail}</div>
  </div>
</div>
          </div>
        </header>

        <div className="flex pt-16">
          <aside className={`fixed top-0 md:relative z-40 bg-white border-r border-gray-200 w-64 p-6 space-y-4 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <nav className="fixed space-y-2 mt-4">
              <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleTabChange('Dashboard')} />
              <NavItem icon={<ClipboardList size={20} />} label="Directory" active={activeTab === 'Directory'} onClick={() => handleTabChange('Directory')} />
              <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === 'Calendar'} onClick={() => handleTabChange('Calendar')} />
              <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'Settings'} onClick={() => handleTabChange('Settings')} />
              <NavItem icon={<LifeBuoy size={20} />} label="Support" active={activeTab === 'Support'} onClick={() => handleTabChange('Support')} />
              <NavItem icon={<Mail size={20} />} label="Contact" active={activeTab === 'Contact'} onClick={() => handleTabChange('Contact')} />
              <div className='border-t border-gray pt-4 mt-40'>
                <NavItem
                  icon={<LogOut size={20} />}
                  label="Logout"
                  active={false}
                  onClick={handleLogout}
                />
              </div>
            </nav>
          </aside>

          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition
        ${active ? 'bg-gray-100 text-[#f4793d]' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </div>
  )
}

export default Userdashboard