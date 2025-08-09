import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProfileDetailAdmin, updateProfileAccess } from '../Redux/profile';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FilePreview = ({ fileUrl, fileType }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!fileUrl) return null;

  if (fileType === 'pdf') {
    return (
      <div className="mt-2 border rounded-lg p-2 bg-gray-50">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF...</div>}
        >
          <Page pageNumber={pageNumber} width={200} />
        </Document>
        <p className="text-xs mt-1">
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="text-xs bg-gray-200 px-2 py-1 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="text-xs bg-gray-200 px-2 py-1 rounded"
          >
            Next
          </button>
        </div>
        <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-500 mt-2 block"
        >
          Open Full PDF
        </a>
      </div>
    );
  }

  // Assume it's an image if not PDF
  return (
    <div className="mt-2">
      <img 
        src={fileUrl} 
        alt="Preview" 
        className="max-w-full h-auto rounded border"
        style={{ maxHeight: '200px' }}
      />
      <a 
        href={fileUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-blue-500 mt-1 block"
      >
        Open Full Image
      </a>
    </div>
  );
};

const BadgeIcon = ({ badgeLevel = 'Black' }) => {
  const badgeImages = {
    Platinum: "/Images/blue-check.png", 
    Gold: "/Images/gold-check.png",
    Silver: "/Images/silver-checks.png",
    Black: "https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg"
  };

  return (
    <img
      src={badgeImages[badgeLevel]}
      alt={`${badgeLevel} Badge`}
      className="w-5 h-5"
    />
  );
};

const VisibilityBadge = ({ visibility }) => {
  const visibilityColors = {
    Public: 'bg-green-100 text-green-800',
    Private: 'bg-blue-100 text-blue-800',
    Hide: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${visibilityColors[visibility] || 'bg-gray-100'}`}>
      {visibility}
    </span>
  );
};

const FieldDisplay = ({ label, value, badgeLevel, visibility, isDate = false, isFile = false }) => {
  if (!value && value !== 0) return null;
  
  const getFileType = (url) => {
    if (!url) return '';
    if (url.toLowerCase().endsWith('.pdf')) return 'pdf';
    return 'image'; // default to image for other file types
  };

  return (
    <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {visibility && <VisibilityBadge visibility={visibility} />}
          {badgeLevel && <BadgeIcon badgeLevel={badgeLevel} />}
        </div>
      </div>
      
      {isFile ? (
        <FilePreview fileUrl={value} fileType={getFileType(value)} />
      ) : (
        <p className="text-sm font-semibold text-gray-900 break-words">
          {isDate ? new Date(value).toLocaleDateString() : value.toString()}
        </p>
      )}
    </div>
  );
};

const ArrayFieldDisplay = ({ label, items, getBadgeLevel, getVisibility }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{label}</h4>
      <div className="space-y-6 pl-4 border-l-2 border-gray-200">
        {items.map((item, index) => (
          <div key={index} className="space-y-4 bg-gray-50 p-4 rounded-lg">
            {Object.entries(item).map(([key, value]) => {
              if (key === '_id' || key === 'updatedBy' || key.includes('VotedBy') || 
                  key.includes('BadgeScore')) {
                return null;
              }
              
              if (key.includes('Badge')) {
                return null; // Handled with the fields
              }
              
              if (key.includes('Visibility')) {
                return null; // Handled with the fields
              }
              
              if (Array.isArray(value)) {
                return (
                  <div key={key} className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <label className="text-xs text-gray-500 uppercase">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex items-center gap-2">
                        {getVisibility(key, index) && <VisibilityBadge visibility={getVisibility(key, index)} />}
                        {getBadgeLevel(key, index) && <BadgeIcon badgeLevel={getBadgeLevel(key, index)} />}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {value.map((v, i) => (
                        <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 text-xs rounded-full">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
              
              if (typeof value === 'object') {
                return null;
              }
              
              const isFileField = key.toLowerCase().includes('file') || 
                                key.toLowerCase().includes('picture') ||
                                key.toLowerCase().includes('resume');
              
              return (
                <FieldDisplay 
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={value}
                  badgeLevel={getBadgeLevel(key, index)}
                  visibility={getVisibility(key, index)}
                  isDate={key.toLowerCase().includes('date')}
                  isFile={isFileField}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);
  
  const { 
    adminProfileDetail, 
    adminProfileLoading, 
    adminProfileError 
  } = useSelector((state) => state.profile);

const handleAccessChange = async (newAccess) => {
  try {
    console.log(`Changing access to ${newAccess} for profile ${id}`);
    setIsUpdatingAccess(true);
    
    // Dispatch the update
    const resultAction = await dispatch(updateProfileAccess({ id, hasAccess: newAccess }));
    
    if (updateProfileAccess.fulfilled.match(resultAction)) {
      console.log('Update successful:', resultAction.payload);
      // Optional: Show success message
    } else {
      console.error('Update failed:', resultAction.error);
    }
    
  } catch (error) {
    console.error("Error in handleAccessChange:", error);
  } finally {
    setIsUpdatingAccess(false);
  }
};

  useEffect(() => {
    dispatch(fetchProfileDetailAdmin(id));
  }, [dispatch, id]);

  if (adminProfileLoading) return <div className="text-center py-8">Loading profile details...</div>;
  if (adminProfileError) return <div className="text-red-500 text-center py-8">Error: {adminProfileError}</div>;
  if (!adminProfileDetail) return null;

  const getBadgeLevel = (fieldName) => {
    return adminProfileDetail[`${fieldName}Badge`] || 'Black';
  };

  const getVisibility = (fieldName) => {
    return adminProfileDetail[`${fieldName}Visibility`] || 'Public';
  };

  const getNestedBadgeLevel = (arrayName, index, fieldName) => {
    if (!adminProfileDetail[arrayName] || !adminProfileDetail[arrayName][index]) return 'Black';
    return adminProfileDetail[arrayName][index][`${fieldName}Badge`] || 'Black';
  };

  const getNestedVisibility = (arrayName, index, fieldName) => {
    if (!adminProfileDetail[arrayName] || !adminProfileDetail[arrayName][index]) return 'Public';
    return adminProfileDetail[arrayName][index][`${fieldName}Visibility`] || 'Public';
  };

  // Filter out fields we don't want to display directly
  const excludedFields = [
    '_id', '__v', 'createdAt', 'updatedAt', 'userId', 
    'totalBadgeScore',
    ...Object.keys(adminProfileDetail).filter(key => 
      key.includes('BadgeScore') || 
      key.includes('VotedBy')
    )
  ];

  // Group fields by category for better organization
  const fieldCategories = {
    personalInfo: [
      'name', 'fatherName', 'gender', 'dob', 'cnic', 'profilePicture',
      'nationality', 'residentStatus', 'maritalStatus'
    ],
    contactInfo: [
      'mobile', 'email', 'address', 'city', 'country'
    ],
    preferences: [
      'shiftPreferences', 'workAuthorization'
    ],
    documents: [
      'profilePicture', 'resume'
    ]
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-4">
        <Link 
          to="/admin-dashboard"
          className="flex items-center text-[#f4793d] hover:text-orange-700"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Profiles
        </Link>
      </div>

      <div className="bg-white rounded-lg max-w-6xl mx-auto p-6 shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b">
          <div className="relative">
            <img
              src={adminProfileDetail.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#f4793d]"
            />
            <div className="absolute -bottom-2 -right-2">
              <VisibilityBadge visibility={getVisibility('profilePicture')} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {adminProfileDetail.name}
              </h1>
              <BadgeIcon badgeLevel={getBadgeLevel('name')} />
              <VisibilityBadge visibility={getVisibility('name')} />
            </div>
            <p className="text-sm text-gray-600">
              {adminProfileDetail.experience?.[0]?.jobTitle || 'No position specified'}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-gray-500">
                Total Points: {adminProfileDetail.totalBadgeScore || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal and Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Personal Information</h3>
              <div className="space-y-3">
                {fieldCategories.personalInfo.map(field => {
                  if (field === 'profilePicture') return null; // Handled in header
                  
                  return (
                    <FieldDisplay
                      key={field}
                      label={field.replace(/([A-Z])/g, ' $1').trim()}
                      value={adminProfileDetail[field]}
                      badgeLevel={getBadgeLevel(field)}
                      visibility={getVisibility(field)}
                      isDate={field === 'dob'}
                    />
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {fieldCategories.contactInfo.map(field => (
                  <FieldDisplay
                    key={field}
                    label={field.replace(/([A-Z])/g, ' $1').trim()}
                    value={adminProfileDetail[field]}
                    badgeLevel={getBadgeLevel(field)}
                    visibility={getVisibility(field)}
                  />
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Preferences</h3>
              <div className="space-y-3">
                {fieldCategories.preferences.map(field => {
                  const value = adminProfileDetail[field];
                  if (!value) return null;
                  
                  return (
                    <div key={field} className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="flex items-center gap-2">
                          <VisibilityBadge visibility={getVisibility(field)} />
                          <BadgeIcon badgeLevel={getBadgeLevel(field)} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(value) ? (
                          value.map((item, idx) => (
                            <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 text-xs rounded-full">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">{value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Documents</h3>
              <FieldDisplay
                label="Resume"
                value={adminProfileDetail.resume}
                badgeLevel={getBadgeLevel('resume')}
                visibility={getVisibility('resume')}
                isFile={true}
              />
            </div>
          </div>

          {/* Right Column - Experience and Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Experience</h3>
              {adminProfileDetail.experience?.length > 0 ? (
                <ArrayFieldDisplay
                  label="Work Experience"
                  items={adminProfileDetail.experience}
                  getBadgeLevel={(fieldName, index) => getNestedBadgeLevel('experience', index, fieldName)}
                  getVisibility={(fieldName, index) => getNestedVisibility('experience', index, fieldName)}
                />
              ) : (
                <p className="text-gray-500 italic">No experience listed</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Education</h3>
              {adminProfileDetail.education?.length > 0 ? (
                <ArrayFieldDisplay
                  label="Education History"
                  items={adminProfileDetail.education}
                  getBadgeLevel={(fieldName, index) => getNestedBadgeLevel('education', index, fieldName)}
                  getVisibility={(fieldName, index) => getNestedVisibility('education', index, fieldName)}
                />
              ) : (
                <p className="text-gray-500 italic">No education listed</p>
              )}
            </div>
          </div>
        </div>
      </div>
<select
  value={adminProfileDetail?.hasAccess ? 'true' : 'false'}
  onChange={(e) => handleAccessChange(e.target.value === 'true')}
  disabled={isUpdatingAccess}
  className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-orange-500"
>
  <option value="true">Active</option>
  <option value="false">Disabled</option>
</select>
    </div>
  );
};

export default AdminProfileDetail;