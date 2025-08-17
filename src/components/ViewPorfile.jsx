// ProfileValidatorApp.js
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById, updateBadgeScores, checkCanValidate, clearValidationErrors, resetValidationState, clearSelectedProfile } from './Redux/profile';

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

const InfoField = ({
  label,
  value,
  name,
  feedback,
  onFeedbackChange,
  isLocked,
  badgeLevel,
  visibility,
  canValidate,
  isEditing,
}) => {
  const shouldShowField = visibility === 'Public';
  const shouldShowRadio = canValidate && shouldShowField && value;
  const isRadioDisabled = !shouldShowRadio || (isLocked && !isEditing);

  return (
    <div className="py-3">
      <div className="flex items-center gap-2">
        <BadgeIcon badgeLevel={badgeLevel} />
        <div className="w-full">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
            {label}
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

const SubmissionModal = ({ onClose, message, commonCompanies }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-3">Validation Submitted</h3>
      <p className="text-sm text-gray-600 mt-2">{message || 'Thank you for your feedback.'}</p>
      {commonCompanies && commonCompanies.length > 0 && (
        <div className="mt-3 p-2 bg-blue-50 rounded">
          <p className="text-xs text-blue-700">
            Validated based on shared experience at: <strong>{commonCompanies.join(', ')}</strong>
          </p>
        </div>
      )}
      <button 
        onClick={onClose} 
        className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Close
      </button>
    </div>
  </div>
);

const ValidationNotAllowedModal = ({ onClose, error }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-3">Validation Not Allowed</h3>
      <p className="text-sm text-gray-600 mt-2">{error}</p>
      <button 
        onClick={onClose}
        className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Go Back
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
    updatedProfile, 
    canValidate, 
    validationCheckLoading,
    validationCheckError,
    commonCompanies,
    validationMessage
  } = useSelector((state) => state.profile);

  const [validationError, setValidationError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [initialFeedback, setInitialFeedback] = useState({});
  const [showLetter, setShowLetter] = useState({});
  const [showDegree, setShowDegree] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showValidationBlockedModal, setShowValidationBlockedModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [validatedFields, setValidatedFields] = useState([]);

  // MAIN EFFECT: Reset everything when profile ID changes
  useEffect(() => {
    if (!id) return;

    console.log(`Profile ID changed to: ${id} - Resetting all states`);
    
    // Reset ALL local UI states immediately
    setValidationError(null);
    setFeedback({});
    setInitialFeedback({});
    setShowLetter({});
    setShowDegree({});
    setIsEditing(false);
    setShowSubmissionModal(false);
    setShowValidationBlockedModal(false);
    setHasVoted(false);
    setValidatedFields([]);

    // Reset redux validation state
    dispatch(resetValidationState());
    dispatch(clearSelectedProfile());

    // Fetch the fresh profile
    dispatch(fetchProfileById(id));

    // Cleanup function
    return () => {
      console.log('Cleaning up ProfileValidatorApp');
      dispatch(clearSelectedProfile());
      dispatch(resetValidationState());
    };
  }, [id, dispatch]);

  // SECONDARY EFFECT: Handle profile-specific logic after profile loads
  useEffect(() => {
    if (!selectedProfile || !id) return;

    console.log('Selected profile loaded, processing validation state');
    
    const voterId = localStorage.getItem('userId');
    if (!voterId) return;

    // Reset local states for new profile
    setHasVoted(false);
    setValidatedFields([]);
    setFeedback({});
    setInitialFeedback({});

    // Check for previously voted fields
    const votedFields = getVotedFields(selectedProfile, voterId);
    console.log('Found voted fields:', votedFields);
    
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
      console.log('Set initial feedback state:', initialFeedbackState);
    }

    // Check validation permission for this profile
    dispatch(checkCanValidate({ profileId: id, userId: voterId }));
  }, [selectedProfile, id, dispatch]);

  const getVotedFields = (profile, voterId) => {
    if (!profile || !voterId) return [];
    
    const votedFields = [];
    
    const rootFields = [
      'name', 'fatherName', 'gender', 'dob', 'cnic', 'profilePicture',
      'mobile', 'email', 'address', 'city', 'country', 'nationality',
      'residentStatus', 'maritalStatus', 'shiftPreferences', 'workAuthorization',
      'resume'
    ];
    
    rootFields.forEach(field => {
      const votedBy = profile[`${field}VotedBy`];
      if (votedBy && votedBy.map(String).includes(voterId)) {
        votedFields.push({
          path: `${field}BadgeScore`,
          voteValue: 'yes'
        });
      }
    });
    
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

  const handleFeedbackChange = (key, value) => {
    if (!isEditing || !canValidate) return;
    console.log(`Feedback change: ${key} = ${value}`);
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

    if (!canValidate) {
      setShowValidationBlockedModal(true);
      return;
    }

    if (Object.keys(feedback).length === 0) {
      setValidationError("Please provide at least one validation before submitting.");
      return;
    }

    try {
      console.log('Submitting validation:', feedback);
      
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
      
      console.log('Validation submitted successfully');
    } catch (error) {
      console.error('Validation submission error:', error);
      setValidationError(error.message);
    }
  };

  const handleEdit = () => {
    console.log('Edit mode enabled');
    setIsEditing(true);
    dispatch(clearValidationErrors());
  };

  const handleCancelEdit = () => {
    console.log('Edit mode cancelled');
    setIsEditing(false);
    setFeedback(initialFeedback);
  };

  const toggleFile = (setter, index) => setter((prev) => ({ ...prev, [index]: !prev[index] }));

  if (loading || validationCheckLoading) {
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

  if (validationCheckError && !canValidate) {
    return (
      <>
        <ValidationNotAllowedModal 
          onClose={onBack}
          error={validationCheckError || validationMessage || "You cannot validate this profile."}
        />
        <div className="bg-orange-50 min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Validation Not Allowed</h2>
              <p className="text-gray-600 mb-4">
                {validationCheckError || "You can only validate profiles from colleagues who worked at the same companies as you."}
              </p>
              <button 
                onClick={onBack}
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
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

  const filterFields = (fields) => fields.filter(field => field.value !== undefined && field.value !== null && field.value !== '');

  return (
    <>
      {showSubmissionModal && (
        <SubmissionModal 
          onClose={() => setShowSubmissionModal(false)} 
          message="Your validation has been submitted successfully"
          commonCompanies={commonCompanies}
        />
      )}
      {showValidationBlockedModal && (
        <ValidationNotAllowedModal 
          onClose={() => setShowValidationBlockedModal(false)}
          error={validationCheckError || validationMessage || "You cannot validate this profile."}
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

        {commonCompanies && commonCompanies.length > 0 && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded max-w-4xl mx-auto">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">
                Validation allowed - Shared companies: <strong>{commonCompanies.join(', ')}</strong>
              </span>
            </div>
          </div>
        )}
        
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
                  <InfoField
                    key={field.key}
                    label={field.label}
                    value={field.value}
                    name={field.key}
                    feedback={feedback}
                    onFeedbackChange={handleFeedbackChange}
                    isLocked={validatedFields.includes(field.key)}
                    badgeLevel={field.badgeLevel}
                    visibility={field.visibility}
                    canValidate={canValidate}
                    isEditing={isEditing}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Contact Information</h3>
                {filterFields(contactFields).map((field) => (
                  <InfoField
                    key={field.key}
                    label={field.label}
                    value={field.value}
                    name={field.key}
                    feedback={feedback}
                    onFeedbackChange={handleFeedbackChange}
                    isLocked={validatedFields.includes(field.key)}
                    badgeLevel={field.badgeLevel}
                    visibility={field.visibility}
                    canValidate={canValidate}
                    isEditing={isEditing}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Other Information</h3>
                {filterFields(otherFields).map((field) => (
                  <InfoField
                    key={field.key}
                    label={field.label}
                    value={field.value}
                    name={field.key}
                    feedback={feedback}
                    onFeedbackChange={handleFeedbackChange}
                    isLocked={validatedFields.includes(field.key)}
                    badgeLevel={field.badgeLevel}
                    visibility={field.visibility}
                    canValidate={canValidate}
                    isEditing={isEditing}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-600">Experience</h3>
                {currentProfile.experience?.map((exp, i) => (
                  <div key={i} className="mt-4 border-b pb-4">
                    <InfoField
                      label="Job Title"
                      value={exp.jobTitle}
                      name={`exp-jobTitle-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isLocked={validatedFields.includes(`exp-jobTitle-${i}`)}
                      badgeLevel={getNestedBadge('experience', i, 'jobTitle')}
                      visibility={getNestedVisibility('experience', i, 'jobTitle')}
                      canValidate={canValidate}
                      isEditing={isEditing}
                    />
                    <InfoField
                      label="Company"
                      value={exp.company}
                      name={`exp-company-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isLocked={validatedFields.includes(`exp-company-${i}`)}
                      badgeLevel={getNestedBadge('experience', i, 'company')}
                      visibility={getNestedVisibility('experience', i, 'company')}
                      canValidate={canValidate}
                      isEditing={isEditing}
                    />
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
                    <InfoField
                      label="Degree"
                      value={edu.degreeTitle}
                      name={`edu-degreeTitle-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isLocked={validatedFields.includes(`edu-degreeTitle-${i}`)}
                      badgeLevel={getNestedBadge('education', i, 'degreeTitle')}
                      visibility={getNestedVisibility('education', i, 'degreeTitle')}
                      canValidate={canValidate}
                      isEditing={isEditing}
                    />
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
              disabled={(!isEditing && hasVoted) || (!hasNewValidations() && isEditing) || !canValidate}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {!canValidate ? 'Validation Not Allowed' : 
               hasVoted ? (isEditing ? 'Save Changes' : 'Validation Submitted') : 'Submit Validation'}
            </button>
          </div>

          {!canValidate && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="font-medium">
                  You can only validate profiles from colleagues who worked at the same companies as you.
                </span>
              </div>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default ProfileValidatorApp;