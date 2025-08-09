import { BarChart2, ClipboardList, Database, Settings, Shield, Users } from 'lucide-react'
import React from 'react'

const AdminHome = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Statistics</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-gray-600">Total Users</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">System Health</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="text-gray-600">Uptime</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">42</p>
              <p className="text-gray-600">New Today</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ClipboardList className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <Users className="mx-auto text-blue-600" size={20} />
            <p className="mt-2 text-center">Manage Users</p>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <Settings className="mx-auto text-green-600" size={20} />
            <p className="mt-2 text-center">System Settings</p>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
            <BarChart2 className="mx-auto text-purple-600" size={20} />
            <p className="mt-2 text-center">View Analytics</p>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <Database className="mx-auto text-orange-600" size={20} />
            <p className="mt-2 text-center">Check Logs</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminHome