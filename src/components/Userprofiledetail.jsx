'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById, updateBadgeScores } from '../Redux/profile';

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

const RadioGroup = ({ name, value, onChange, disabled }) => (
  <div className="flex gap-4 items-center mt-1">
    <label className="text-sm text-gray-600 flex items-center gap-1">
      <input 
        type="radio" 
        name={name} 
        value="yes" 
        checked={value === 'yes'} 
        onChange={onChange} 
        disabled={disabled} 
        className="mr-1"
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
        disabled={disabled} 
        className="mr-1"
      />
      No
    </label>
  </div>
);

const InfoField = ({ label, value, name, feedback, onFeedbackChange, isValidated, badgeLevel }) => (
  <div className="py-3">
    <div className="flex items-center gap-2">
      <BadgeIcon badgeLevel={badgeLevel} />
      <div className="w-full">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">{label}</label>
        <input
          type="text"
          value={value || ''}
          readOnly
          className="w-full text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 focus:outline-none cursor-not-allowed"
        />
        {value && (
          <RadioGroup
            name={name}
            value={feedback[name]}
            onChange={(e) => onFeedbackChange(name, e.target.value)}
            disabled={isValidated}
          />
        )}
      </div>
    </div>
  </div>
);

const DocumentIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const SubmissionModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-3">Validation Submitted</h3>
      <p className="text-sm text-gray-600 mt-2">Thank you for your feedback.</p>
      <button onClick={onClose} className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">Close</button>
    </div>
  </div>
);

const ProfileValidatorApp = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProfile, loading, error } = useSelector((state) => state.profile);

  const [feedback, setFeedback] = useState({});
  const [showLetter, setShowLetter] = useState({});
  const [showDegree, setShowDegree] = useState({});
  const [isValidated, setIsValidated] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileById(id));
    }
  }, [id, dispatch]);

  const handleFeedbackChange = (key, value) => {
    if (isValidated) return;
    setFeedback((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      const votes = {};
      Object.keys(feedback).forEach(key => {
        votes[key] = feedback[key];
      });

      const resultAction = await dispatch(
        updateBadgeScores({
          id: selectedProfile._id,
          votes
        })
      );

      if (updateBadgeScores.fulfilled.match(resultAction)) {
        setIsValidated(true);
        setShowSubmissionModal(true);
      } else if (updateBadgeScores.rejected.match(resultAction)) {
        throw new Error(resultAction.payload?.message || 'Failed to update badge scores');
      }
    } catch (error) {
      console.error('Update error:', error);
      setSubmitError(error.message);
    }
  };

  const toggleFile = (setter, index) => setter((prev) => ({ ...prev, [index]: !prev[index] }));

  if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-600 font-semibold text-lg">Loading profile...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;
  if (!selectedProfile) return <div className="flex justify-center items-center min-h-screen text-gray-600">Profile not found.</div>;

  const currentProfile = selectedProfile;

  // Helper function to safely access nested badge levels
  const getNestedBadge = (arrayName, index, fieldName) => {
    if (!currentProfile[arrayName] || !currentProfile[arrayName][index]) return 'Black';
    return currentProfile[arrayName][index][`${fieldName}Badge`] || 'Black';
  };

  // Personal Info Fields
  const personalFields = [
    { label: 'Name', value: currentProfile.name, key: 'nameBadgeScore', badgeLevel: currentProfile.nameBadge },
    { label: "Father's Name", value: currentProfile.fatherName, key: 'fatherNameBadgeScore', badgeLevel: currentProfile.fatherNameBadge },
    { label: 'Gender', value: currentProfile.gender, key: 'genderBadgeScore', badgeLevel: currentProfile.genderBadge },
    { label: 'Date of Birth', value: currentProfile.dob ? new Date(currentProfile.dob).toLocaleDateString() : '', key: 'dobBadgeScore', badgeLevel: currentProfile.dobBadge },
    { label: 'CNIC', value: currentProfile.cnic, key: 'cnicBadgeScore', badgeLevel: currentProfile.cnicBadge },
  ];

  // Contact Info Fields
  const contactFields = [
    { label: 'Email', value: currentProfile.email, key: 'emailBadgeScore', badgeLevel: currentProfile.emailBadge },
    { label: 'Phone', value: currentProfile.mobile, key: 'mobileBadgeScore', badgeLevel: currentProfile.mobileBadge },
    { label: 'Address', value: currentProfile.address, key: 'addressBadgeScore', badgeLevel: currentProfile.addressBadge },
    { label: 'City', value: currentProfile.city, key: 'cityBadgeScore', badgeLevel: currentProfile.cityBadge },
    { label: 'Country', value: currentProfile.country, key: 'countryBadgeScore', badgeLevel: currentProfile.countryBadge },
  ];

  // Other Fields
  const otherFields = [
    { label: 'Nationality', value: currentProfile.nationality, key: 'nationalityBadgeScore', badgeLevel: currentProfile.nationalityBadge },
    { label: 'Resident Status', value: currentProfile.residentStatus, key: 'residentStatusBadgeScore', badgeLevel: currentProfile.residentStatusBadge },
    { label: 'Verification Level', value: currentProfile.verificationLevel },
    { label: 'Website', value: currentProfile.website, key: 'websiteBadgeScore', badgeLevel: currentProfile.websiteBadge },
    { 
      label: 'Shift Preferences', 
      value: currentProfile.shiftPreferences?.join(', '), 
      key: 'shiftPreferencesBadgeScore',
      badgeLevel: currentProfile.shiftPreferencesBadge 
    },
    { 
      label: 'Work Authorization', 
      value: currentProfile.workAuthorization?.join(', '), 
      key: 'workAuthorizationBadgeScore',
      badgeLevel: currentProfile.workAuthorizationBadge 
    }
  ];

  // Filter out empty fields
  const filterFields = (fields) => fields.filter(field => field.value !== undefined && field.value !== null && field.value !== '');

  return (
    <>
      {showSubmissionModal && <SubmissionModal onClose={() => setShowSubmissionModal(false)} />}
      <main className="bg-orange-50 min-h-screen p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={currentProfile.profilePicture} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover" 
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{currentProfile.name}</h1>
              <p className="text-sm text-gray-600">{currentProfile.experience?.[0]?.jobTitle}</p>
            </div>
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
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
                    isValidated={isValidated}
                    badgeLevel={field.badgeLevel}
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
                    isValidated={isValidated}
                    badgeLevel={field.badgeLevel}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">Other Information</h3>
                {filterFields(otherFields).map((field) => (
                  <InfoField 
                    key={field.key || field.label}
                    label={field.label}
                    value={field.value}
                    name={field.key}
                    feedback={feedback}
                    onFeedbackChange={handleFeedbackChange}
                    isValidated={isValidated}
                    badgeLevel={field.badgeLevel}
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
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('experience', i, 'jobTitle')}
                    />
                    <InfoField 
                      label="Company" 
                      value={exp.company} 
                      name={`exp-company-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('experience', i, 'company')}
                    />
                    <InfoField 
                      label="Industry" 
                      value={exp.industry} 
                      name={`exp-industry-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('experience', i, 'industry')}
                    />
                    <InfoField 
                      label="Job Functions" 
                      value={exp.jobFunctions?.join(', ')} 
                      name={`exp-jobFunctions-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('experience', i, 'jobFunctions')}
                    />
                    <InfoField 
                      label="Period" 
                      value={`${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}`} 
                      name={`exp-period-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('experience', i, 'period')}
                    />
                    <InfoField 
                      label="Verification Level" 
                      value={exp.verificationLevel} 
                      name={`exp-verificationLevel-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={exp.verificationLevel === 'Silver' ? 'Silver' : 'Black'}
                    />

                    {exp.experienceFile && (
                      <div className="mt-3">
                        <button 
                          type="button" 
                          onClick={() => toggleFile(setShowLetter, i)} 
                          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 transition"
                        >
                          <DocumentIcon className="w-4 h-4" />
                          {showLetter[i] ? 'Hide' : 'View'} Experience Document
                        </button>
                        {showLetter[i] && (
                          <div className="mt-2">
                            {exp.experienceFile.endsWith('.pdf') ? (
                              <iframe 
                                src={exp.experienceFile} 
                                className="w-full h-96 rounded border" 
                                title="Experience Document"
                              />
                            ) : (
                              <img src={exp.experienceFile} alt="Experience Document" className="w-full rounded" />
                            )}
                          </div>
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
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('education', i, 'degreeTitle')}
                    />
                    <InfoField 
                      label="Institute" 
                      value={edu.institute} 
                      name={`edu-institute-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('education', i, 'institute')}
                    />
                    <InfoField 
                      label="Period" 
                      value={`${new Date(edu.startDate).toLocaleDateString()} - ${new Date(edu.endDate).toLocaleDateString()}`} 
                      name={`edu-period-${i}`}
                      feedback={feedback}
                      onFeedbackChange={handleFeedbackChange}
                      isValidated={isValidated}
                      badgeLevel={getNestedBadge('education', i, 'period')}
                    />
                   

                    {edu.degreeFile && (
                      <div className="mt-3">
                        <button 
                          type="button" 
                          onClick={() => toggleFile(setShowDegree, i)} 
                          className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 transition"
                        >
                          <DocumentIcon className="w-4 h-4" />
                          {showDegree[i] ? 'Hide' : 'View'} Degree Certificate
                        </button>
                        {showDegree[i] && (
                          <div className="mt-2">
                            {edu.degreeFile.endsWith('.pdf') ? (
                              <iframe 
                                src={edu.degreeFile} 
                                className="w-full h-96 rounded border" 
                                title="Degree Certificate"
                              />
                            ) : (
                              <img src={edu.degreeFile} alt="Degree Certificate" className="w-full rounded" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentProfile.resume && (
                <div>
                  <h3 className="text-lg font-semibold text-orange-600">Resume</h3>
                  <div className="mt-3">
                    <button 
                      type="button" 
                      onClick={() => toggleFile(setShowLetter, 'resume')} 
                      className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-800 transition"
                    >
                      <DocumentIcon className="w-4 h-4" />
                      {showLetter['resume'] ? 'Hide' : 'View'} Resume
                    </button>
                    {showLetter['resume'] && (
                      <div className="mt-2">
                        {currentProfile.resume.endsWith('.pdf') ? (
                          <iframe 
                            src={currentProfile.resume} 
                            className="w-full h-96 rounded border" 
                            title="Resume"
                          />
                        ) : (
                          <img src={currentProfile.resume} alt="Resume" className="w-full rounded" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isValidated || Object.keys(feedback).length === 0}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isValidated ? 'Validation Submitted' : 'Submit Validation'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default ProfileValidatorApp;