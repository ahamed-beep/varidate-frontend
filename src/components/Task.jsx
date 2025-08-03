'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicProfiles } from '../Redux/profile';
import { Search } from 'lucide-react';

const Task = ({ onProfileClick }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const userId = localStorage.getItem('userId');
  const { publicProfiles = [], publicProfilesLoading } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchPublicProfiles(userId));
  }, [dispatch, userId]);

  const getMongooseDoc = (doc) => doc?._doc || doc;

  const shouldShowField = (visibility) => visibility === 'Public';

  const getAllUniqueValues = () => {
    const values = publicProfiles.flatMap((profile) => {
      const edu = getMongooseDoc(profile.education?.[0] || {});
      const exp = getMongooseDoc(profile.experience?.[0] || {});

      return [
        shouldShowField(profile.nameVisibility) ? profile.name : null,
        shouldShowField(profile.emailVisibility) ? profile.email : null,
        shouldShowField(profile.mobileVisibility) ? profile.mobile : null,
        shouldShowField(edu?.degreeTitleVisibility) ? edu?.degreeTitle : null,
        shouldShowField(edu?.instituteVisibility) ? edu?.institute : null,
        shouldShowField(exp?.jobTitleVisibility) ? exp?.jobTitle : null,
        shouldShowField(exp?.industryVisibility) ? exp?.industry : null,
      ];
    });

    return [...new Set(values.filter(Boolean))];
  };

  const filteredProfiles = publicProfiles.filter((profile) => {
    const edu = getMongooseDoc(profile.education?.[0] || {});
    const exp = getMongooseDoc(profile.experience?.[0] || {});

    const fields = [
      shouldShowField(profile.nameVisibility) ? profile.name : null,
      shouldShowField(profile.emailVisibility) ? profile.email : null,
      shouldShowField(profile.mobileVisibility) ? profile.mobile : null,
      shouldShowField(edu?.degreeTitleVisibility) ? edu?.degreeTitle : null,
      shouldShowField(edu?.instituteVisibility) ? edu?.institute : null,
      shouldShowField(exp?.jobTitleVisibility) ? exp?.jobTitle : null,
      shouldShowField(exp?.industryVisibility) ? exp?.industry : null,
    ].filter(Boolean);

    const matchesSearch = fields.some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilter =
      !filterValue ||
      fields.some((field) => field === filterValue);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] py-14 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          🌟 <span className="text-[#f4793d]">Featured Public Profiles</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div className="relative w-full md:w-[50%]">
            <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, degree, or job..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#f4793d] focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-full md:w-[50%] border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#f4793d] bg-white"
          >
            <option value="">🎯 Filter by Any Field</option>
            {getAllUniqueValues().map((val, idx) => (
              <option key={idx} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {publicProfilesLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f4793d]"></div>
            <p className="mt-2 text-gray-600">Loading profiles...</p>
          </div>
        ) : (
          filteredProfiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-lg">
              {publicProfiles.length > 0 
                ? "No profiles match your filter criteria."
                : "No public profiles available yet."}
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile) => {
                const edu = getMongooseDoc(profile.education?.[0] || {});
                const exp = getMongooseDoc(profile.experience?.[0] || {});

                return (
                  <div
                    key={profile._id}
                    onClick={() => onProfileClick(profile._id)}
                    className="group bg-white border border-gray-200 hover:border-[#f4793d] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {shouldShowField(profile.profilePictureVisibility) ? (
                        <img
                          src={profile.profilePicture}
                          alt={profile?.name || 'User'}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#f4793d] shadow"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                          <span className="text-xs text-gray-500">Hidden</span>
                        </div>
                      )}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#f4793d]">
                          {shouldShowField(profile.nameVisibility) 
                            ? profile?.name 
                            : 'Anonymous User'}
                        </h2>
                        {shouldShowField(profile.emailVisibility) && profile?.email && (
                          <p className="text-sm text-gray-500">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 space-y-2">
                      <p>
                        <strong>📞</strong> {shouldShowField(profile.mobileVisibility) 
                          ? profile.mobile 
                          : 'Not available'}
                      </p>
                      {shouldShowField(profile.genderVisibility) && profile?.gender && (
                        <p><strong>⚧️</strong> {profile.gender}</p>
                      )}
                    </div>

                    <div className="mt-4 space-y-1 text-sm">
                      <p className="text-gray-500 font-medium">🎓 Education:</p>
                      {shouldShowField(edu?.degreeTitleVisibility) && edu?.degreeTitle ? (
                        <span className="inline-block bg-orange-100 text-[#f4793d] px-3 py-1 text-xs rounded-full">
                          {edu.degreeTitle}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not specified</span>
                      )}

                      <p className="mt-3 text-gray-500 font-medium">💼 Experience:</p>
                      {shouldShowField(exp?.jobTitleVisibility) && exp?.jobTitle ? (
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full">
                          {exp.jobTitle} at {shouldShowField(exp?.companyVisibility) ? exp.company : 'Hidden'}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not specified</span>
                      )}
                    </div>

                    <div className="mt-5 text-right">
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