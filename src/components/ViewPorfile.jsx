// Create a new file ViewProfile.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosinstance from "../Connection/Api";
import { toast } from "react-toastify";
import Home from "./UserForm";

const ViewProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosinstance.get(`/profile/user/${userId}`);
        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          toast.error(response.data.message || 'Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdateSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>

      {editMode ? (
        <Home
          isEditMode={true} 
          existingProfile={profile} 
          onUpdateSuccess={handleUpdateSuccess} 
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          {/* Display profile data in read-only format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <p><span className="font-medium">Name:</span> {profile.name}</p>
              <p><span className="font-medium">Email:</span> {profile.email}</p>
              <p><span className="font-medium">Mobile:</span> {profile.mobile}</p>
              <p><span className="font-medium">CNIC:</span> {profile.cnic}</p>
              <p><span className="font-medium">Gender:</span> {profile.gender}</p>
              <p><span className="font-medium">Date of Birth:</span> {new Date(profile.dob).toLocaleDateString()}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {profile.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p><span className="font-medium">Degree:</span> {edu.degreeTitle}</p>
                  <p><span className="font-medium">Institute:</span> {edu.institute}</p>
                  <p><span className="font-medium">Dates:</span> {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p><span className="font-medium">Job Title:</span> {exp.jobTitle}</p>
                  <p><span className="font-medium">Company:</span> {exp.company}</p>
                  <p><span className="font-medium">Dates:</span> {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;