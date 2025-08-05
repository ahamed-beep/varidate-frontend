'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicProfiles } from '../Redux/profile';
import { Search } from 'lucide-react';

const Task = ({ onProfileClick }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    degreeTitle: '',
    jobTitle: '',
    company: '',
    industry: '',
    jobFunctions: '',
    shiftPreferences: ''
  });

  const userId = localStorage.getItem('userId');
  const { publicProfiles = [], publicProfilesLoading } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchPublicProfiles(userId));
  }, [dispatch, userId]);

  const getMongooseDoc = (doc) => doc?._doc || doc;

  const shouldShowField = (visibility) => visibility === 'Public';

  // Get all unique values for each filter category
  const getFilterOptions = () => {
    const options = {
      degreeTitles: new Set(),
      jobTitles: new Set(),
      companies: new Set(),
      industries: new Set(),
      jobFunctions: new Set(),
      shiftPreferences: new Set()
    };

    // Add predefined options first
    DEGREE_TITLES.forEach(title => options.degreeTitles.add(title));
    JOB_TITLES.forEach(title => options.jobTitles.add(title));
    COMPANIES.forEach(company => options.companies.add(company));
    INDUSTRIES.forEach(industry => options.industries.add(industry));
    JOB_FUNCTIONS.forEach(func => options.jobFunctions.add(func));
    SHIFT_PREFERENCES.forEach(shift => options.shiftPreferences.add(shift));

    // Add options from profiles
    publicProfiles.forEach((profile) => {
      // Education fields
      profile.education?.forEach(edu => {
        const education = getMongooseDoc(edu);
        if (shouldShowField(education?.degreeTitleVisibility) && education?.degreeTitle) {
          options.degreeTitles.add(education.degreeTitle);
        }
      });

      // Experience fields
      profile.experience?.forEach(exp => {
        const experience = getMongooseDoc(exp);
        if (shouldShowField(experience?.jobTitleVisibility) && experience?.jobTitle) {
          options.jobTitles.add(experience.jobTitle);
        }
        if (shouldShowField(experience?.companyVisibility) && experience?.company) {
          options.companies.add(experience.company);
        }
        if (shouldShowField(experience?.industryVisibility) && experience?.industry) {
          options.industries.add(experience.industry);
        }
        if (shouldShowField(experience?.jobFunctionsVisibility) && experience?.jobFunctions?.length) {
          experience.jobFunctions.forEach(jf => options.jobFunctions.add(jf));
        }
      });

      // Profile fields
      if (shouldShowField(profile.shiftPreferencesVisibility) && profile.shiftPreferences?.length) {
        profile.shiftPreferences.forEach(sp => options.shiftPreferences.add(sp));
      }
    });

    return {
      degreeTitles: Array.from(options.degreeTitles).sort(),
      jobTitles: Array.from(options.jobTitles).sort(),
      companies: Array.from(options.companies).sort(),
      industries: Array.from(options.industries).sort(),
      jobFunctions: Array.from(options.jobFunctions).sort(),
      shiftPreferences: Array.from(options.shiftPreferences).sort()
    };
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      degreeTitle: '',
      jobTitle: '',
      company: '',
      industry: '',
      jobFunctions: '',
      shiftPreferences: ''
    });
    setSearchTerm('');
  };

  const filteredProfiles = publicProfiles.filter((profile) => {
    // Check search term against visible fields
    const searchFields = [
      shouldShowField(profile.nameVisibility) ? profile.name : null,
      shouldShowField(profile.emailVisibility) ? profile.email : null,
      shouldShowField(profile.mobileVisibility) ? profile.mobile : null
    ].filter(Boolean);

    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Check education filters
    const matchesDegree = filters.degreeTitle === '' || 
      profile.education?.some(edu => {
        const education = getMongooseDoc(edu);
        return shouldShowField(education?.degreeTitleVisibility) && 
               education?.degreeTitle === filters.degreeTitle;
      });

    // Check experience filters
    const matchesExperience = 
      (filters.jobTitle === '' || 
        profile.experience?.some(exp => {
          const experience = getMongooseDoc(exp);
          return shouldShowField(experience?.jobTitleVisibility) && 
                 experience?.jobTitle === filters.jobTitle;
        })) &&
      (filters.company === '' || 
        profile.experience?.some(exp => {
          const experience = getMongooseDoc(exp);
          return shouldShowField(experience?.companyVisibility) && 
                 experience?.company === filters.company;
        })) &&
      (filters.industry === '' || 
        profile.experience?.some(exp => {
          const experience = getMongooseDoc(exp);
          return shouldShowField(experience?.industryVisibility) && 
                 experience?.industry === filters.industry;
        })) &&
      (filters.jobFunctions === '' || 
        profile.experience?.some(exp => {
          const experience = getMongooseDoc(exp);
          return shouldShowField(experience?.jobFunctionsVisibility) && 
                 experience?.jobFunctions?.includes(filters.jobFunctions);
        }));

    // Check profile filters
    const matchesProfile = 
      filters.shiftPreferences === '' || 
      (shouldShowField(profile.shiftPreferencesVisibility) && 
       profile.shiftPreferences?.includes(filters.shiftPreferences));

    return matchesSearch && matchesDegree && matchesExperience && matchesProfile;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">
          🌟 <span className="text-[#f4793d]">Featured Public Profiles</span>
        </h1>

        {/* Search Bar */}
        <div className="relative w-full mb-6 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] focus:outline-none text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button 
              onClick={resetFilters}
              className="text-sm text-[#f4793d] hover:underline px-3 py-1 rounded-md hover:bg-orange-50 transition-colors"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Degree Title Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Degree Title</label>
              <select
                value={filters.degreeTitle}
                onChange={(e) => handleFilterChange('degreeTitle', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Degree Titles</option>
                {filterOptions.degreeTitles.map((title, idx) => (
                  <option key={`degree-${idx}`} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Title Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <select
                value={filters.jobTitle}
                onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Job Titles</option>
                {filterOptions.jobTitles.map((title, idx) => (
                  <option key={`job-${idx}`} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <select
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Companies</option>
                {filterOptions.companies.map((company, idx) => (
                  <option key={`company-${idx}`} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Industries</option>
                {filterOptions.industries.map((industry, idx) => (
                  <option key={`industry-${idx}`} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Functions Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Job Functions</label>
              <select
                value={filters.jobFunctions}
                onChange={(e) => handleFilterChange('jobFunctions', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Job Functions</option>
                {filterOptions.jobFunctions.map((func, idx) => (
                  <option key={`func-${idx}`} value={func}>
                    {func}
                  </option>
                ))}
              </select>
            </div>

            {/* Shift Preferences Filter */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Shift Preferences</label>
              <select
                value={filters.shiftPreferences}
                onChange={(e) => handleFilterChange('shiftPreferences', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:border-[#f4793d] bg-white"
              >
                <option value="">All Shift Preferences</option>
                {filterOptions.shiftPreferences.map((shift, idx) => (
                  <option key={`shift-${idx}`} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {publicProfilesLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f4793d]"></div>
            <p className="mt-2 text-gray-600">Loading profiles...</p>
          </div>
        ) : (
          filteredProfiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#f4793d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {publicProfiles.length > 0 
                  ? "No profiles match your filter criteria"
                  : "No public profiles available yet"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {publicProfiles.length > 0 
                  ? "Try adjusting your filters or search term"
                  : "Check back later or create a public profile"}
              </p>
              {publicProfiles.length > 0 && (
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-[#f4793d] text-white rounded-md hover:bg-[#e06d35] transition-colors text-sm font-medium"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile) => {
                const edu = getMongooseDoc(profile.education?.[0] || {});
                const exp = getMongooseDoc(profile.experience?.[0] || {});

                return (
                  <div
                    key={profile._id}
                    onClick={() => onProfileClick(profile._id)}
                    className="group bg-white border border-gray-200 hover:border-[#f4793d] rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {shouldShowField(profile.profilePictureVisibility) ? (
                        <img
                          src={profile.profilePicture || '/default-avatar.png'}
                          alt={profile?.name || 'User'}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#f4793d] shadow"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                          <span className="text-xs text-gray-500">Hidden</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#f4793d] truncate">
                          {shouldShowField(profile.nameVisibility) 
                            ? profile?.name 
                            : 'Anonymous User'}
                        </h2>
                        {shouldShowField(profile.emailVisibility) && profile?.email && (
                          <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 space-y-2 mb-4">
                      <p className="truncate">
                        <span className="font-medium">📞</span> {shouldShowField(profile.mobileVisibility) 
                          ? profile.mobile 
                          : 'Not available'}
                      </p>
                      {shouldShowField(profile.genderVisibility) && profile?.gender && (
                        <p><span className="font-medium">⚧️</span> {profile.gender}</p>
                      )}
                    </div>

                    <div className="mt-auto space-y-3">
                      <div>
                        <p className="text-gray-500 font-medium text-sm">🎓 Education:</p>
                        {shouldShowField(edu?.degreeTitleVisibility) && edu?.degreeTitle ? (
                          <span className="inline-block bg-orange-100 text-[#f4793d] px-2.5 py-1 text-xs rounded-full mt-1">
                            {edu.degreeTitle}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Not specified</span>
                        )}
                      </div>

                      <div>
                        <p className="text-gray-500 font-medium text-sm">💼 Experience:</p>
                        {shouldShowField(exp?.jobTitleVisibility) && exp?.jobTitle ? (
                          <div className="mt-1 space-y-1">
                            <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 text-xs rounded-full">
                              {exp.jobTitle}
                            </span>
                            {shouldShowField(exp?.companyVisibility) && exp?.company && (
                              <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 text-xs rounded-full ml-1">
                                at {exp.company}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Not specified</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                      <span className="text-xs text-[#f4793d] font-medium group-hover:underline">View Profile →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Task;

// Constants for dropdown options
const DEGREE_TITLES = [
  "Bachelor of Science",
  "Bachelor of Arts", 
  "Master of Science",
  "Master of Arts",
  "PhD",
  "Associate Degree",
  "Diploma",
  "Other"
];

const JOB_TITLES = [
  "Software Engineer",
  "Data Analyst",
  "Project Manager",
  "Marketing Specialist",
  "Sales Executive",
  "HR Manager",
  "Accountant",
  "Operations Manager",
  "Other"
];

const COMPANIES = [
  "Systems Limited",
  "Techlogix",
  "ArhamSoft",
  "10Pearls",
  "Contour Software",
  "Netsol",
  "Avanza Solutions",
  "Other"
];

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Other"
];

const JOB_FUNCTIONS = [
  "Software Development",
  "Data Analysis",
  "Project Management",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations"
];

const SHIFT_PREFERENCES = [
"Day Shift", "Night Shift", "Flexible", "Remote"
];