import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProfile, fetchProfileById, updateBadgeScores } from './Redux/profile';

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

const RadioGroup = ({ name, value, onChange, isDisabled }) => (
  <div className="flex gap-4 items-center mt-1">
    <label className="text-sm text-gray-600 flex items-center gap-1">
      <input 
        type="radio" 
        name={name} 
        value="yes" 
        checked={value === 'yes'} 
        onChange={onChange} 
        disabled={isDisabled}
        className={`mr-1 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      />
      Yes
    </label>
    <label className="text-sm text-gray-600 flex items-center gap-1">
      <input 
        type="radio" 
        name={name} 
        value="no" 
        checked={value === 'no'} 
        onChange={onChange} 
        disabled={isDisabled}
        className={`mr-1 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      />
      No
    </label>
  </div>
);

const DocumentViewer = ({ fileUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">
            {fileUrl.endsWith('.pdf') ? 'PDF Document' : 'Image Document'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {fileUrl.endsWith('.pdf') ? (
            <iframe
              src={fileUrl}
              className="w-full h-full min-h-[70vh] border rounded"
              title="Document Viewer"
              frameBorder="0"
            />
          ) : (
            <div className="flex justify-center">
              <img 
                src={fileUrl} 
                alt="Document" 
                className="max-w-full max-h-[70vh] object-contain rounded border"
              />
            </div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end">
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Download Document
          </a>
        </div>
      </div>
    </div>
  );
};

const SubmissionModal = ({ onClose, message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-3">Validation Submitted</h3>
      <p className="text-sm text-gray-600 mt-2">{message || 'Thank you for your feedback.'}</p>
      <button 
        onClick={onClose} 
        className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Close
      </button>
    </div>
  </div>
);

const ProfileValidatorApp = ({ id, onBack }) => {
  const dispatch = useDispatch();
  const { 
    selectedProfile, 
    loading, 
    error, 
    updatedProfile
  } = useSelector((state) => state.profile);

  const [validationError, setValidationError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [initialFeedback, setInitialFeedback] = useState({});
  const [showLetter, setShowLetter] = useState({});
  const [showDegree, setShowDegree] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [validatedFields, setValidatedFields] = useState([]);
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData?.profileData) {
      setUserProfileData(userData.profileData);
    }
  }, []);

// In the ProfileValidatorApp component, ensure you're using the latest profile data
useEffect(() => {
  if (!id) return;
  
  setValidationError(null);
  setFeedback({});
  setInitialFeedback({});
  setShowLetter({});
  setShowDegree({});
  setIsEditing(false);
  setShowSubmissionModal(false);
  setHasVoted(false);
  setValidatedFields([]);

  dispatch(clearSelectedProfile());
  dispatch(fetchProfileById(id));

  return () => {
    dispatch(clearSelectedProfile());
  };
}, [id, dispatch]);

// Add this effect to update user profile data when it changes
useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData?.profileData) {
    setUserProfileData(userData.profileData);
  }
}, [selectedProfile]); // Add selectedProfile as dependency

  useEffect(() => {
    if (!selectedProfile || !id) return;
    
    const voterId = localStorage.getItem('userId');
    if (!voterId) return;

    const votedFields = getVotedFields(selectedProfile, voterId);
    
    if (votedFields.length > 0) {
      const initialFeedbackState = {};
      const validatedFieldsList = [];
      
      votedFields.forEach(field => {
        initialFeedbackState[field.path] = field.voteValue;
        validatedFieldsList.push(field.path);
      });
      
      setFeedback(initialFeedbackState);
      setInitialFeedback(initialFeedbackState);
      setValidatedFields(validatedFieldsList);
      setHasVoted(true);
    }
  }, [selectedProfile, id]);

  const getVotedFields = (profile, voterId) => {
    if (!profile || !voterId) return [];
    
    const votedFields = [];
    
    profile.education?.forEach((edu, eduIndex) => {
      const eduFields = [
        'degreeTitle', 'institute', 'startDate', 'endDate', 'degreeFile', 'website'
      ];
      
      eduFields.forEach(field => {
        const votedBy = edu[`${field}VotedBy`];
        if (votedBy && votedBy.map(String).includes(voterId)) {
          votedFields.push({
            path: `edu-${field}-${eduIndex}`,
            voteValue: 'yes'
          });
        }
      });
    });
    
    profile.experience?.forEach((exp, expIndex) => {
      const expFields = [
        'jobTitle', 'company', 'startDate', 'endDate', 'experienceFile',
        'jobFunctions', 'industry', 'website'
      ];
      
      expFields.forEach(field => {
        const votedBy = exp[`${field}VotedBy`];
        if (votedBy && votedBy.map(String).includes(voterId)) {
          votedFields.push({
            path: `exp-${field}-${expIndex}`,
            voteValue: 'yes'
          });
        }
      });
    });
    
    return votedFields;
  };

const canValidateField = (fieldType, fieldValue, index = null, profileData = null) => {
  if (!userProfileData || !fieldValue) return false;
  
  switch(fieldType) {
    case 'education-degreeTitle':
      return userProfileData.education.some(
        edu => edu.degreeTitle === fieldValue
      );
    case 'education-institute':
      return userProfileData.education.some(
        edu => edu.institute === fieldValue
      );
    case 'education-startDate':
    case 'education-endDate':
      // Validate dates only if institute matches
      const edu = profileData?.education?.[index];
      if (!edu) return false;
      return userProfileData.education.some(
        validatorEdu => validatorEdu.institute === edu.institute
      );
    case 'education-website':
      return userProfileData.education.some(
        edu => edu.website === fieldValue
      );
    case 'experience-company':
      return userProfileData.experience.some(
        exp => exp.company === fieldValue
      );
    case 'experience-industry':
      return userProfileData.experience.some(
        exp => exp.industry === fieldValue
      );
    case 'experience-jobTitle':
      return userProfileData.experience.some(
        exp => exp.jobTitle === fieldValue
      );
    case 'experience-startDate':
    case 'experience-endDate':
      // Validate dates only if company matches
      const exp = profileData?.experience?.[index];
      if (!exp) return false;
      return userProfileData.experience.some(
        validatorExp => validatorExp.company === exp.company
      );
    case 'experience-jobFunctions':
      return userProfileData.experience.some(validatorExp => 
        validatorExp.jobFunctions?.some(jf => 
          fieldValue.includes(jf)
        )
      );
    case 'experience-website':
      return userProfileData.experience.some(
        exp => exp.website === fieldValue
      );
    case 'education-degreeFile':
      // Validate file if degree title matches
      const eduForFile = profileData?.education?.[index];
      if (!eduForFile) return false;
      return userProfileData.education.some(
        validatorEdu => validatorEdu.degreeTitle === eduForFile.degreeTitle
      );
    case 'experience-experienceFile':
      // Validate file if job title matches
      const expForFile = profileData?.experience?.[index];
      if (!expForFile) return false;
      return userProfileData.experience.some(
        validatorExp => validatorExp.jobTitle === expForFile.jobTitle
      );
    default:
      return false;
  }
};

 const InfoField = ({
  label,
  value,
  name,
  feedback,
  onFeedbackChange,
  isLocked,
  badgeLevel,
  visibility,
  isEditing,
  fieldType,
  fieldValue,
  index,
  profileData
}) => {
    const shouldShowField = visibility === 'Public';
    const canValidate = canValidateField(fieldType, fieldValue, index, profileData);

    const shouldShowRadio = canValidate && shouldShowField && value;
    const isRadioDisabled = !shouldShowRadio || (!isEditing && isLocked);

    return (
      <div className="py-3">
        <div className="flex items-center gap-2">
          <BadgeIcon badgeLevel={badgeLevel} />
          <div className="w-full">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
              {label}
              {canValidate && (
                <span className="ml-2 text-green-600 text-xs">(You can validate)</span>
              )}
            </label>
            {shouldShowField ? (
              <>
                <input
                  type="text"
                  value={value || ''}
                  readOnly
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
                />
                {shouldShowRadio && (
                  <RadioGroup
                    name={name}
                    value={feedback[name]}
                    onChange={(e) => onFeedbackChange(name, e.target.value)}
                    isDisabled={isRadioDisabled}
                  />
                )}
              </>
            ) : (
              <div className="text-sm text-gray-500 italic">This field is private</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleFeedbackChange = (key, value) => {
    setFeedback((prev) => ({ ...prev, [key]: value }));
  };

  const hasNewValidations = () => {
    const newKeys = Object.keys(feedback).filter(key => !(key in initialFeedback));
    if (newKeys.length > 0) return true;
    
    for (const key in feedback) {
      if (initialFeedback[key] && feedback[key] !== initialFeedback[key]) {
        return true;
      }
    }
    
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError(null);

    if (Object.keys(feedback).length === 0) {
      setValidationError("Please provide at least one validation before submitting.");
      return;
    }

    try {
      const resultAction = await dispatch(
        updateBadgeScores({
          id: selectedProfile._id,
          votes: { ...feedback, voterId: localStorage.getItem('userId') }
        })
      );

      if (updateBadgeScores.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Validation failed");
      }

      setShowSubmissionModal(true);
      setHasVoted(true);
      setIsEditing(false);
      setInitialFeedback(feedback);
      const newValidatedFields = Object.keys(feedback).filter(key => !validatedFields.includes(key));
      setValidatedFields(prev => [...prev, ...newValidatedFields]);
    } catch (error) {
      console.error('Validation submission error:', error);
      setValidationError(error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFeedback(initialFeedback);
  };

  const toggleFile = (setter, index) => setter((prev) => ({ ...prev, [index]: !prev[index] }));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 font-semibold text-lg">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!selectedProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Profile not found.
      </div>
    );
  }

  const currentProfile = updatedProfile || selectedProfile;

  const getNestedBadge = (arrayName, index, fieldName) => {
    if (!currentProfile[arrayName] || !currentProfile[arrayName][index]) return 'Black';
    return currentProfile[arrayName][index][`${fieldName}Badge`] || 'Black';
  };

  const getNestedVisibility = (arrayName, index, fieldName) => {
    if (!currentProfile[arrayName] || !currentProfile[arrayName][index]) return 'Private';
    return currentProfile[arrayName][index][`${fieldName}Visibility`] || 'Private';
  };

  const personalFields = [
    { 
      label: 'Name', 
      value: currentProfile.name, 
      key: 'nameBadgeScore', 
      badgeLevel: currentProfile.nameBadge,
      visibility: currentProfile.nameVisibility 
    },
    { 
      label: "Father's Name", 
      value: currentProfile.fatherName, 
      key: 'fatherNameBadgeScore', 
      badgeLevel: currentProfile.fatherNameBadge,
      visibility: currentProfile.fatherNameVisibility 
    },
    { 
      label: 'Gender', 
      value: currentProfile.gender, 
      key: 'genderBadgeScore', 
      badgeLevel: currentProfile.genderBadge,
      visibility: currentProfile.genderVisibility 
    },
    {
      label: 'Date of Birth',
      value: currentProfile.dob ? new Date(currentProfile.dob).toLocaleDateString() : '',
      key: 'dobBadgeScore',
      badgeLevel: currentProfile.dobBadge,
      visibility: currentProfile.dobVisibility
    },
    { 
      label: 'CNIC', 
      value: currentProfile.cnic, 
      key: 'cnicBadgeScore', 
      badgeLevel: currentProfile.cnicBadge,
      visibility: currentProfile.cnicVisibility 
    },
    { 
      label: 'Profile Picture', 
      value: currentProfile.profilePicture ? 'Uploaded' : '', 
      key: 'profilePictureBadgeScore', 
      badgeLevel: currentProfile.profilePictureBadge,
      visibility: currentProfile.profilePictureVisibility 
    },
    { 
      label: 'Marital Status', 
      value: currentProfile.maritalStatus, 
      key: 'maritalStatusBadgeScore', 
      badgeLevel: currentProfile.maritalStatusBadge,
      visibility: currentProfile.maritalStatusVisibility 
    },
  ];

  const contactFields = [
    { 
      label: 'Email', 
      value: currentProfile.email, 
      key: 'emailBadgeScore', 
      badgeLevel: currentProfile.emailBadge,
      visibility: currentProfile.emailVisibility 
    },
    { 
      label: 'Phone', 
      value: currentProfile.mobile, 
      key: 'mobileBadgeScore', 
      badgeLevel: currentProfile.mobileBadge,
      visibility: currentProfile.mobileVisibility 
    },
    { 
      label: 'Address', 
      value: currentProfile.address, 
      key: 'addressBadgeScore', 
      badgeLevel: currentProfile.addressBadge,
      visibility: currentProfile.addressVisibility 
    },
    { 
      label: 'City', 
      value: currentProfile.city, 
      key: 'cityBadgeScore', 
      badgeLevel: currentProfile.cityBadge,
      visibility: currentProfile.cityVisibility 
    },
    { 
      label: 'Country', 
      value: currentProfile.country, 
      key: 'countryBadgeScore', 
      badgeLevel: currentProfile.countryBadge,
      visibility: currentProfile.countryVisibility 
    },
  ];

  const otherFields = [
    { 
      label: 'Nationality', 
      value: currentProfile.nationality, 
      key: 'nationalityBadgeScore', 
      badgeLevel: currentProfile.nationalityBadge,
      visibility: currentProfile.nationalityVisibility 
    },
    { 
      label: 'Resident Status', 
      value: currentProfile.residentStatus, 
      key: 'residentStatusBadgeScore', 
      badgeLevel: currentProfile.residentStatusBadge,
      visibility: currentProfile.residentStatusVisibility 
    },
    { 
      label: 'Shift Preferences', 
      value: currentProfile.shiftPreferences?.join(', '), 
      key: 'shiftPreferencesBadgeScore', 
      badgeLevel: currentProfile.shiftPreferencesBadge,
      visibility: currentProfile.shiftPreferencesVisibility 
    },
    { 
      label: 'Work Authorization', 
      value: currentProfile.workAuthorization?.join(', '), 
      key: 'workAuthorizationBadgeScore', 
      badgeLevel: currentProfile.workAuthorizationBadge,
      visibility: currentProfile.workAuthorizationVisibility 
    },
    { 
      label: 'Resume', 
      value: currentProfile.resume ? 'Uploaded' : '', 
      key: 'resumeBadgeScore', 
      badgeLevel: currentProfile.resumeBadge,
      visibility: currentProfile.resumeVisibility 
    },
  ];

  const educationFields = (edu, index) => [
    {
      label: 'Degree Title',
      value: edu.degreeTitle,
      name: `edu-degreeTitle-${index}`,
      badgeLevel: edu.degreeTitleBadge,
      visibility: edu.degreeTitleVisibility,
      fieldType: 'education-degreeTitle',
      fieldValue: edu.degreeTitle
    },
    {
      label: 'Institute',
      value: edu.institute,
      name: `edu-institute-${index}`,
      badgeLevel: edu.instituteBadge,
      visibility: edu.instituteVisibility,
      fieldType: 'education-institute',
      fieldValue: edu.institute
    },
    {
      label: 'Start Date',
      value: edu.startDate ? new Date(edu.startDate).toLocaleDateString() : '',
      name: `edu-startDate-${index}`,
      badgeLevel: edu.startDateBadge,
      visibility: edu.startDateVisibility,
      fieldType: 'education-startDate',
      fieldValue: edu.startDate
    },
    {
      label: 'End Date',
      value: edu.endDate ? new Date(edu.endDate).toLocaleDateString() : '',
      name: `edu-endDate-${index}`,
      badgeLevel: edu.endDateBadge,
      visibility: edu.endDateVisibility,
      fieldType: 'education-endDate',
      fieldValue: edu.endDate
    },
    {
      label: 'Website',
      value: edu.website,
      name: `edu-website-${index}`,
      badgeLevel: edu.websiteBadge,
      visibility: edu.websiteVisibility,
      fieldType: 'education-website',
      fieldValue: edu.website
    },
    {
      label: 'Degree File',
      value: edu.degreeFile ? 'Uploaded' : '',
      name: `edu-degreeFile-${index}`,
      badgeLevel: edu.degreeFileBadge,
      visibility: edu.degreeFileVisibility,
      fieldType: 'education-degreeFile',
      fieldValue: edu.degreeFile
    }
  ];

  const experienceFields = (exp, index) => [
    {
      label: 'Job Title',
      value: exp.jobTitle,
      name: `exp-jobTitle-${index}`,
      badgeLevel: exp.jobTitleBadge,
      visibility: exp.jobTitleVisibility,
      fieldType: 'experience-jobTitle',
      fieldValue: exp.jobTitle
    },
    {
      label: 'Company',
      value: exp.company,
      name: `exp-company-${index}`,
      badgeLevel: exp.companyBadge,
      visibility: exp.companyVisibility,
      fieldType: 'experience-company',
      fieldValue: exp.company
    },
    {
      label: 'Start Date',
      value: exp.startDate ? new Date(exp.startDate).toLocaleDateString() : '',
      name: `exp-startDate-${index}`,
      badgeLevel: exp.startDateBadge,
      visibility: exp.startDateVisibility,
      fieldType: 'experience-startDate',
      fieldValue: exp.startDate
    },
    {
      label: 'End Date',
      value: exp.endDate ? new Date(exp.endDate).toLocaleDateString() : '',
      name: `exp-endDate-${index}`,
      badgeLevel: exp.endDateBadge,
      visibility: exp.endDateVisibility,
      fieldType: 'experience-endDate',
      fieldValue: exp.endDate
    },
    {
      label: 'Job Functions',
      value: exp.jobFunctions?.join(', '),
      name: `exp-jobFunctions-${index}`,
      badgeLevel: exp.jobFunctionsBadge,
      visibility: exp.jobFunctionsVisibility,
      fieldType: 'experience-jobFunctions',
      fieldValue: exp.jobFunctions
    },
    {
      label: 'Industry',
      value: exp.industry,
      name: `exp-industry-${index}`,
      badgeLevel: exp.industryBadge,
      visibility: exp.industryVisibility,
      fieldType: 'experience-industry',
      fieldValue: exp.industry
    },
    {
      label: 'Website',
      value: exp.website,
      name: `exp-website-${index}`,
      badgeLevel: exp.websiteBadge,
      visibility: exp.websiteVisibility,
      fieldType: 'experience-website',
      fieldValue: exp.website
    },
    {
      label: 'Experience File',
      value: exp.experienceFile ? 'Uploaded' : '',
      name: `exp-experienceFile-${index}`,
      badgeLevel: exp.experienceFileBadge,
      visibility: exp.experienceFileVisibility,
      fieldType: 'experience-experienceFile',
      fieldValue: exp.experienceFile
    }
  ];

  const filterFields = (fields) => fields.filter(field => field.value !== undefined && field.value !== null && field.value !== '');

  return (
    <>
      {showSubmissionModal && (
        <SubmissionModal 
          onClose={() => setShowSubmissionModal(false)} 
          message="Your validation has been submitted successfully"
        />
      )}
      
      <main className="bg-orange-50 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-[#f4793d] hover:text-orange-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            {currentProfile.profilePictureVisibility === 'Public' ? (
              <img
                src={currentProfile.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">Hidden</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentProfile.nameVisibility === 'Public' 
                  ? currentProfile.name 
                  : 'Anonymous User'}
              </h1>
              <p className="text-sm text-gray-600">
                {currentProfile.experience?.[0]?.jobTitleVisibility === 'Public' 
                  ? currentProfile.experience?.[0]?.jobTitle 
                  : 'Hidden'}
              </p>
            </div>
          </div>

          {validationError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Personal Information</h3>
                {filterFields(personalFields).map((field) => (
                  <div key={field.key} className="py-3">
                    <div className="flex items-center gap-2">
                      <BadgeIcon badgeLevel={field.badgeLevel} />
                      <div className="w-full">
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                          {field.label}
                        </label>
                        {field.visibility === 'Public' ? (
                          <input
                            type="text"
                            value={field.value || ''}
                            readOnly
                            className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
                          />
                        ) : (
                          <div className="text-sm text-gray-500 italic">This field is private</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Contact Information</h3>
                {filterFields(contactFields).map((field) => (
                  <div key={field.key} className="py-3">
                    <div className="flex items-center gap-2">
                      <BadgeIcon badgeLevel={field.badgeLevel} />
                      <div className="w-full">
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                          {field.label}
                        </label>
                        {field.visibility === 'Public' ? (
                          <input
                            type="text"
                            value={field.value || ''}
                            readOnly
                            className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
                          />
                        ) : (
                          <div className="text-sm text-gray-500 italic">This field is private</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Other Information</h3>
                {filterFields(otherFields).map((field) => (
                  <div key={field.key} className="py-3">
                    <div className="flex items-center gap-2">
                      <BadgeIcon badgeLevel={field.badgeLevel} />
                      <div className="w-full">
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                          {field.label}
                        </label>
                        {field.visibility === 'Public' ? (
                          <input
                            type="text"
                            value={field.value || ''}
                            readOnly
                            className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
                          />
                        ) : (
                          <div className="text-sm text-gray-500 italic">This field is private</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-600">Experience</h3>
                {currentProfile.experience?.map((exp, i) => (
                  <div key={i} className="mt-4 border-b pb-4">
                    {filterFields(experienceFields(exp, i)).map((field) => (
                      <InfoField
                        key={field.name}
                        label={field.label}
                        value={field.value}
                        name={field.name}
                        feedback={feedback}
                        onFeedbackChange={handleFeedbackChange}
                        isLocked={validatedFields.includes(field.name) && !isEditing}
                        badgeLevel={field.badgeLevel}
                        visibility={field.visibility}
                        isEditing={isEditing}
                        fieldType={field.fieldType}
                        fieldValue={field.fieldValue}
                      />
                    ))}
                    {exp.experienceFile && getNestedVisibility('experience', i, 'experienceFile') === 'Public' && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => toggleFile(setShowLetter, i)}
                          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 transition"
                        >
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                          {showLetter[i] ? 'Hide' : 'View'} Experience Document
                        </button>
                        {showLetter[i] && (
                          <DocumentViewer 
                            fileUrl={exp.experienceFile} 
                            onClose={() => toggleFile(setShowLetter, i)} 
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600">Education</h3>
                {currentProfile.education?.map((edu, i) => (
                  <div key={i} className="mt-4 border-b pb-4">
                    {filterFields(educationFields(edu, i)).map((field) => (
                      <InfoField
                        key={field.name}
                        label={field.label}
                        value={field.value}
                        name={field.name}
                        feedback={feedback}
                        onFeedbackChange={handleFeedbackChange}
                        isLocked={validatedFields.includes(field.name) && !isEditing}
                        badgeLevel={field.badgeLevel}
                        visibility={field.visibility}
                        isEditing={isEditing}
                        fieldType={field.fieldType}
                        fieldValue={field.fieldValue}
                      />
                    ))}
                    {edu.degreeFile && getNestedVisibility('education', i, 'degreeFile') === 'Public' && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => toggleFile(setShowDegree, i)}
                          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 transition"
                        >
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                          {showDegree[i] ? 'Hide' : 'View'} Degree Certificate
                        </button>
                        {showDegree[i] && (
                          <DocumentViewer 
                            fileUrl={edu.degreeFile} 
                            onClose={() => toggleFile(setShowDegree, i)} 
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            {hasVoted && !isEditing && (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Edit Validation
              </button>
            )}
            
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              disabled={(!isEditing && hasVoted) || (!hasNewValidations() && isEditing)}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {hasVoted ? (isEditing ? 'Save Changes' : 'Validation Submitted') : 'Submit Validation'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default ProfileValidatorApp;