import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAdmin, updateUserAccessAdmin} from '../Redux/Auth';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { 
    adminUsers, 
    adminLoading, 
    adminError 
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsersAdmin());
  }, [dispatch]);

const handleAccessChange = async (userId, currentAccess) => {
  try {
    await dispatch(updateUserAccessAdmin({ 
      userId, 
      hasAccess: !currentAccess 
    })).unwrap();
    
    toast.success(`Access ${!currentAccess ? 'granted' : 'revoked'} successfully`);
  } catch (error) {
    toast.error(`Failed to update access: ${error}`);
  }
};

  if (adminLoading) return <div className="text-center py-4">Loading users...</div>;
  if (adminError) return <div className="text-red-500 text-center py-4">Error: {adminError}</div>;
  if (!adminUsers || adminUsers.length === 0) return <div className="text-center py-4">No users found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Verified</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Access</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {adminUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{user.firstname} {user.lastname}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.verified ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleAccessChange(user._id, user.hasAccess)}
                    className={`px-3 py-1 rounded-md text-white ${
                      user.hasAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {user.hasAccess ? 'Allowed' : 'Blocked'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;