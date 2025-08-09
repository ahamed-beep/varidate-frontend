import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProfileDetailAdmin, updateProfileAccess } from '../Redux/profile';

const AdminProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { 
    adminProfileDetail, 
    adminProfileLoading, 
    adminProfileError 
  } = useSelector((state) => state.profile);
  
  const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileDetailAdmin(id));
  }, [dispatch, id]);

  const handleAccessChange = async (newAccess) => {
    try {
      setIsUpdatingAccess(true);
      await dispatch(updateProfileAccess({
        id,
        hasAccess: newAccess
      })).unwrap();
      dispatch(fetchProfileDetailAdmin(id));
    } catch (error) {
      console.error("Failed to update access:", error);
    } finally {
      setIsUpdatingAccess(false);
    }
  };

  // Integrated Badge Component
  const BadgeIcon = ({ badgeLevel = 'Black' }) => {
    const badgeColors = {
      Platinum: 'bg-blue-100 text-blue-800',
      Gold: 'bg-yellow-100 text-yellow-800',
      Silver: 'bg-gray-100 text-gray-800',
      Black: 'bg-black text-white'
    };
  
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${badgeColors[badgeLevel]}`}>
        {badgeLevel}
      </span>
    );
  };

  // Integrated VisibilityBadge Component
  const VisibilityBadge = ({ visibility }) => {
    const visibilityColors = {
      Public: 'bg-green-100 text-green-800',
      Private: 'bg-blue-100 text-blue-800',
      Hide: 'bg-red-100 text-red-800'
    };
  
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${visibilityColors[visibility]}`}>
        {visibility}
      </span>
    );
  };

  // Integrated FieldDisplay Component
  const FieldDisplay = ({ label, value, badgeLevel, visibility, isDate = false }) => {
    if (!value) return null;
  
    return (
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="flex items-center gap-2">
            {visibility && <VisibilityBadge visibility={visibility} />}
            {badgeLevel && <BadgeIcon badgeLevel={badgeLevel} />}
          </div>
        </div>
        <p className="text-gray-900">
          {isDate ? new Date(value).toLocaleDateString() : value}
        </p>
      </div>
    );
  };

  // Integrated ArrayFieldDisplay Component
  const ArrayFieldDisplay = ({ items, type }) => {
    if (!items || items.length === 0) return null;
  
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            {type === 'experience' && (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.jobTitle} at {item.company}</h4>
                  <div className="flex gap-2">
                    <VisibilityBadge visibility={item.jobTitleVisibility} />
                    <BadgeIcon badgeLevel={item.jobTitleBadge} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </p>
                {item.jobFunctions?.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">Responsibilities:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.jobFunctions.map((func, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {type === 'education' && (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.degreeTitle}</h4>
                  <div className="flex gap-2">
                    <VisibilityBadge visibility={item.degreeTitleVisibility} />
                    <BadgeIcon badgeLevel={item.degreeTitleBadge} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {item.institute} • {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (adminProfileLoading) return <div className="text-center py-8">Loading profile details...</div>;
  if (adminProfileError) return <div className="text-red-500 text-center py-8">Error: {adminProfileError}</div>;
  if (!adminProfileDetail) return null;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/admin/profiles" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Profiles
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header with Access Control */}
          <div className="bg-gray-800 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 relative">
                <img
                  src={adminProfileDetail.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
                <div className="absolute bottom-0 right-0">
                  <VisibilityBadge visibility={adminProfileDetail.profilePictureVisibility} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">
                    {adminProfileDetail.name}
                  </h1>
                  <BadgeIcon badgeLevel={adminProfileDetail.nameBadge} />
                  <VisibilityBadge visibility={adminProfileDetail.nameVisibility} />
                </div>
                <p className="text-gray-300 mb-4">
                  {adminProfileDetail.experience?.[0]?.jobTitle || 'No position specified'}
                </p>
                
                {/* Access Control Section */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <span className="mr-2">Account Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      adminProfileDetail.hasAccess 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {adminProfileDetail.hasAccess ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccessChange(true)}
                      disabled={isUpdatingAccess || adminProfileDetail.hasAccess}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        adminProfileDetail.hasAccess
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isUpdatingAccess ? 'Enabling...' : 'Enable Access'}
                    </button>
                    
                    <button
                      onClick={() => handleAccessChange(false)}
                      disabled={isUpdatingAccess || !adminProfileDetail.hasAccess}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        !adminProfileDetail.hasAccess
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {isUpdatingAccess ? 'Disabling...' : 'Disable Access'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">Personal Information</h3>
                  <FieldDisplay 
                    label="Full Name" 
                    value={adminProfileDetail.name}
                    badgeLevel={adminProfileDetail.nameBadge}
                    visibility={adminProfileDetail.nameVisibility}
                  />
                  <FieldDisplay 
                    label="Father's Name" 
                    value={adminProfileDetail.fatherName}
                    badgeLevel={adminProfileDetail.fatherNameBadge}
                    visibility={adminProfileDetail.fatherNameVisibility}
                  />
                  <FieldDisplay 
                    label="Gender" 
                    value={adminProfileDetail.gender}
                    badgeLevel={adminProfileDetail.genderBadge}
                    visibility={adminProfileDetail.genderVisibility}
                  />
                  <FieldDisplay 
                    label="Date of Birth" 
                    value={adminProfileDetail.dob}
                    isDate={true}
                    badgeLevel={adminProfileDetail.dobBadge}
                    visibility={adminProfileDetail.dobVisibility}
                  />
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact Information</h3>
                  <FieldDisplay 
                    label="Mobile" 
                    value={adminProfileDetail.mobile}
                    badgeLevel={adminProfileDetail.mobileBadge}
                    visibility={adminProfileDetail.mobileVisibility}
                  />
                  <FieldDisplay 
                    label="Email" 
                    value={adminProfileDetail.email}
                    badgeLevel={adminProfileDetail.emailBadge}
                    visibility={adminProfileDetail.emailVisibility}
                  />
                  <FieldDisplay 
                    label="Address" 
                    value={adminProfileDetail.address}
                    badgeLevel={adminProfileDetail.addressBadge}
                    visibility={adminProfileDetail.addressVisibility}
                  />
                </div>
              </div>

              {/* Right Column - Professional Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Experience Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">Work Experience</h3>
                  {adminProfileDetail.experience?.length > 0 ? (
                    <ArrayFieldDisplay 
                      items={adminProfileDetail.experience} 
                      type="experience"
                    />
                  ) : (
                    <p className="text-gray-500">No experience added</p>
                  )}
                </div>

                {/* Education Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">Education</h3>
                  {adminProfileDetail.education?.length > 0 ? (
                    <ArrayFieldDisplay 
                      items={adminProfileDetail.education} 
                      type="education"
                    />
                  ) : (
                    <p className="text-gray-500">No education added</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileDetail;