import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosinstance from "../Connection/Api";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import SuccessMessage from "./SubmissionSuccess";

const COUNTRIES = ["Pakistan", "India", "China", "USA", "UK", "UAE", "Canada", "Other"];
const GENDERS = ["Male", "Female", "Other"];
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];
const RESIDENT_STATUSES = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa", "Other"];
const SHIFT_PREFERENCES = ["Day Shift", "Night Shift", "Flexible", "Remote"];
const WORK_AUTHORIZATIONS = [
  "Pakistan Work Visa",
  "Other Work Visa",
  "Permanent Residency",
  "Citizenship",
  "No Authorization Needed"
];
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
const INSTITUTES = [
  "University of Punjab",
  "Lahore University of Management Sciences (LUMS)",
  "University of Karachi",
  "Quaid-i-Azam University",
  "Aga Khan University",
  "COMSATS University",
  "University of Engineering and Technology",
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
const VISIBILITY_PRESETS = ["Public", "Private", "Hide"];
const VERIFICATION_LEVELS = ["Silver", "Gold", "Platinum"];

const newEducationTemplate = {
  id: "",
  degreeTitle: "",
  startDate: null,
  endDate: null,
  institute: "",
  website: "",
  degreeFile: null,
  degreeTitleVisibility: "Public",
  instituteVisibility: "Public",
  startDateVisibility: "Public",
  endDateVisibility: "Public",
  websiteVisibility: "Public",
  degreeFileVisibility: "Public"
};

const newExperienceTemplate = {
  id: "",
  jobTitle: "",
  startDate: null,
  endDate: null,
  company: "",
  website: "",
  experienceFile: null,
  jobFunctions: [],
  industry: "",
  jobTitleVisibility: "Public",
  companyVisibility: "Public",
  startDateVisibility: "Public",
  endDateVisibility: "Public",
  websiteVisibility: "Public",
  experienceFileVisibility: "Public",
  jobFunctionsVisibility: "Public",
  industryVisibility: "Public"
};

const FileUpload = ({ label, onDrop, file, className = "", disabled = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    disabled
  });

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg" alt="tick" className="w-4 h-4" />
        <label className="block text-xs font-semibold text-slate-700">
          {label}
          <span className="text-red-500 ml-0.5">*</span>
        </label>
      </div>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer 
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">{file.name}</span>
          </div>
        ) : (
          <div>
            <p className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-600'}`}>
              {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, icon, children }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#f4793d]">
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};

const Input = ({ label, name, value, onChange, required = false, type = "text", className = "", disabled = false }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg" alt="tick" className="w-4 h-4" />
        <label className="block text-xs font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-[#f4793d] focus:border-[#f4793d] transition-colors bg-white text-slate-900 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
};

const Select = ({ name, label, value, onChange, options, defaultOption, className = "", disabled = false }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg" alt="tick" className="w-4 h-4" />
        {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-[#f4793d] focus:border-[#f4793d] transition-colors bg-white text-slate-900 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const DateInput = ({ label, value, onChange, className = "", disabled = false }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg" alt="tick" className="w-4 h-4" />
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
      </div>
      <DatePicker
        selected={value}
        onChange={date => onChange(date)}
        dateFormat="yyyy-MM-dd"
        className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-[#f4793d] focus:border-[#f4793d] transition-colors bg-white text-slate-900 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        disabled={disabled}
        placeholderText="Select date"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
};

const CheckboxGroup = ({ legend, options, selectedOptions, onChange, className = "", disabled = false }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1">
        <img src="https://i.pinimg.com/564x/29/9d/4e/299d4e690b6a9557188e5c64644f5acd.jpg" alt="tick" className="w-4 h-4" />
        <legend className="text-xs font-semibold text-slate-700">{legend}</legend>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-2 p-2 rounded border border-slate-200 transition-colors ${
              disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:bg-slate-50'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => !disabled && onChange(option)}
              disabled={disabled}
              className={`w-3.5 h-3.5 text-[#f4793d] border-gray-300 rounded focus:ring-[#f4793d] ${
                disabled ? 'cursor-not-allowed' : ''
              }`}
            />
            <span className={`text-xs ${disabled ? 'text-gray-500' : 'text-slate-700'}`}>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const FieldWrapper = ({ children, fieldName, formData, handleFieldVisibility, isCnicField = false, disabled = false }) => {
  const visibility = formData.fieldVisibilities?.[fieldName] || "Public";

  return (
    <div>
      {children}
      {fieldName && !isCnicField && !disabled && (
        <div className="flex flex-col gap-1 mt-1 p-2 rounded bg-slate-50">
          <span className="text-xs font-medium text-slate-600">Visibility:</span>
          <div className="flex gap-2">
            {VISIBILITY_PRESETS.map((option) => (
              <label key={option} className="flex items-center gap-1 text-xs cursor-pointer">
                <input
                  type="radio"
                  name={`vis-${fieldName}`}
                  value={option}
                  checked={visibility === option}
                  onChange={() => handleFieldVisibility(fieldName, option)}
                  className="w-3 h-3 text-[#f4793d] border-gray-300 focus:ring-[#f4793d]"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
      setFormData(prevData => ({
        ...prevData,
        personal: {
          ...prevData.personal,
          name: storedName,
        },
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    personal: {
      name: "",
      mobile: "",
      email: userEmail || "",
      cnic: "",
      fatherName: "",
      city: "",
      country: "",
      gender: "",
      dob: null,
      nationality: "",
      residentStatus: "",
      maritalStatus: "",
      shiftPreferences: [],
      workLocationPreference: "",
      workAuthorization: [],
    },
    fieldVisibilities: {},
    education: [{ ...newEducationTemplate, id: Date.now().toString() }],
    experience: [{ ...newExperienceTemplate, id: Date.now().toString() }],
  });

  const [files, setFiles] = useState({ 
    resume: null, 
    profilePicture: null 
  });
  const [selectedPreset, setSelectedPreset] = useState("");

 useEffect(() => {
    const checkExistingProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axiosinstance.get(`/profile/user/${userId}`);
        
        if (response.data.success) {
          const profile = response.data.data;
          setProfileId(profile._id);
          setEditMode(false);
          
          // Create fieldVisibilities object from profile data
          const fieldVisibilities = {};
          
          // Personal fields visibility - NEW APPROACH
          if (profile.nameVisibility) fieldVisibilities['name'] = profile.nameVisibility;
          if (profile.mobileVisibility) fieldVisibilities['mobile'] = profile.mobileVisibility;
          if (profile.emailVisibility) fieldVisibilities['email'] = profile.emailVisibility;
          if (profile.cnicVisibility) fieldVisibilities['cnic'] = profile.cnicVisibility;
          if (profile.fatherNameVisibility) fieldVisibilities['fatherName'] = profile.fatherNameVisibility;
          if (profile.cityVisibility) fieldVisibilities['city'] = profile.cityVisibility;
          if (profile.countryVisibility) fieldVisibilities['country'] = profile.countryVisibility;
          if (profile.genderVisibility) fieldVisibilities['gender'] = profile.genderVisibility;
          if (profile.dobVisibility) fieldVisibilities['dob'] = profile.dobVisibility;
          if (profile.nationalityVisibility) fieldVisibilities['nationality'] = profile.nationalityVisibility;
          if (profile.residentStatusVisibility) fieldVisibilities['residentStatus'] = profile.residentStatusVisibility;
          if (profile.maritalStatusVisibility) fieldVisibilities['maritalStatus'] = profile.maritalStatusVisibility;
          if (profile.shiftPreferencesVisibility) fieldVisibilities['shiftPreferences'] = profile.shiftPreferencesVisibility;
          if (profile.workAuthorizationVisibility) fieldVisibilities['workAuthorization'] = profile.workAuthorizationVisibility;
          
          // Files visibility
          if (profile.resumeVisibility) fieldVisibilities['resume'] = profile.resumeVisibility;
          if (profile.profilePictureVisibility) fieldVisibilities['profilePicture'] = profile.profilePictureVisibility;
          
          // Education visibility
          profile.education?.forEach((edu, eduIndex) => {
            if (edu.degreeTitleVisibility) fieldVisibilities[`education-${eduIndex}-degreeTitle`] = edu.degreeTitleVisibility;
            if (edu.instituteVisibility) fieldVisibilities[`education-${eduIndex}-institute`] = edu.instituteVisibility;
            if (edu.startDateVisibility) fieldVisibilities[`education-${eduIndex}-startDate`] = edu.startDateVisibility;
            if (edu.endDateVisibility) fieldVisibilities[`education-${eduIndex}-endDate`] = edu.endDateVisibility;
            if (edu.websiteVisibility) fieldVisibilities[`education-${eduIndex}-website`] = edu.websiteVisibility;
            if (edu.degreeFileVisibility) fieldVisibilities[`education-${eduIndex}-degreeFile`] = edu.degreeFileVisibility;
          });
          
          // Experience visibility
          profile.experience?.forEach((exp, expIndex) => {
            if (exp.jobTitleVisibility) fieldVisibilities[`experience-${expIndex}-jobTitle`] = exp.jobTitleVisibility;
            if (exp.companyVisibility) fieldVisibilities[`experience-${expIndex}-company`] = exp.companyVisibility;
            if (exp.startDateVisibility) fieldVisibilities[`experience-${expIndex}-startDate`] = exp.startDateVisibility;
            if (exp.endDateVisibility) fieldVisibilities[`experience-${expIndex}-endDate`] = exp.endDateVisibility;
            if (exp.websiteVisibility) fieldVisibilities[`experience-${expIndex}-website`] = exp.websiteVisibility;
            if (exp.experienceFileVisibility) fieldVisibilities[`experience-${expIndex}-experienceFile`] = exp.experienceFileVisibility;
            if (exp.jobFunctionsVisibility) fieldVisibilities[`experience-${expIndex}-jobFunctions`] = exp.jobFunctionsVisibility;
            if (exp.industryVisibility) fieldVisibilities[`experience-${expIndex}-industry`] = exp.industryVisibility;
          });

          const transformedData = {
            personal: {
              name: profile.name || "",
              mobile: profile.mobile || "",
              email: profile.email || userEmail,
              cnic: profile.cnic || "",
              fatherName: profile.fatherName || "",
              city: profile.city || "",
              country: profile.country || "",
              gender: profile.gender || "",
              dob: profile.dob ? new Date(profile.dob) : null,
              nationality: profile.nationality || "",
              residentStatus: profile.residentStatus || "",
              maritalStatus: profile.maritalStatus || "",
              shiftPreferences: profile.shiftPreferences || [],
              workLocationPreference: profile.workLocationPreference || "",
              workAuthorization: profile.workAuthorization || [],
            },
            fieldVisibilities: fieldVisibilities,
            education: profile.education?.length > 0 
              ? profile.education.map(edu => ({
                  id: edu._id || Date.now().toString(),
                  degreeTitle: edu.degreeTitle || "",
                  institute: edu.institute || "",
                  startDate: edu.startDate ? new Date(edu.startDate) : null,
                  endDate: edu.endDate ? new Date(edu.endDate) : null,
                  website: edu.website || "",
                  degreeFile: edu.degreeFile ? { name: "degree_file", url: edu.degreeFile } : null,
                  degreeTitleVisibility: edu.degreeTitleVisibility || "Public",
                  instituteVisibility: edu.instituteVisibility || "Public",
                  startDateVisibility: edu.startDateVisibility || "Public",
                  endDateVisibility: edu.endDateVisibility || "Public",
                  websiteVisibility: edu.websiteVisibility || "Public",
                  degreeFileVisibility: edu.degreeFileVisibility || "Public"
                }))
              : [{ ...newEducationTemplate, id: Date.now().toString() }],
            experience: profile.experience?.length > 0 
              ? profile.experience.map(exp => ({
                  id: exp._id || Date.now().toString(),
                  jobTitle: exp.jobTitle || "",
                  company: exp.company || "",
                  startDate: exp.startDate ? new Date(exp.startDate) : null,
                  endDate: exp.endDate ? new Date(exp.endDate) : null,
                  website: exp.website || "",
                  experienceFile: exp.experienceFile ? { name: "experience_file", url: exp.experienceFile } : null,
                  jobFunctions: exp.jobFunctions || [],
                  industry: exp.industry || "",
                  jobTitleVisibility: exp.jobTitleVisibility || "Public",
                  companyVisibility: exp.companyVisibility || "Public",
                  startDateVisibility: exp.startDateVisibility || "Public",
                  endDateVisibility: exp.endDateVisibility || "Public",
                  websiteVisibility: exp.websiteVisibility || "Public",
                  experienceFileVisibility: exp.experienceFileVisibility || "Public",
                  jobFunctionsVisibility: exp.jobFunctionsVisibility || "Public",
                  industryVisibility: exp.industryVisibility || "Public"
                }))
              : [{ ...newExperienceTemplate, id: Date.now().toString() }],
          };

          setFormData(transformedData);
          
          // Handle files
          if (profile.resume) {
            setFiles(prev => ({ ...prev, resume: { name: "resume.pdf", url: profile.resume } }));
          }
          if (profile.profilePicture) {
            setFiles(prev => ({ ...prev, profilePicture: { name: "profile.jpg", url: profile.profilePicture } }));
          }
        }
      } catch (error) {
        console.log('No existing profile found - starting fresh');
        setEditMode(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingProfile();
  }, []);

  const handleFileDrop = (field) => (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 && editMode) {
      const file = acceptedFiles[0];
      
      if (field === 'profilePicture' && !file.type.startsWith('image/')) {
        toast.error('Please upload an image file for profile picture');
        return;
      }
      
      if (field === 'resume' && file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file for resume');
        return;
      }

      setFiles(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleRemoveFile = (field) => {
    if (editMode) {
      setFiles(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handlePersonalChange = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
    }
  };

  const handleDobChange = (date) => {
    if (editMode) {
      setFormData(prev => ({ 
        ...prev, 
        personal: { 
          ...prev.personal, 
          dob: date
        } 
      }));
    }
  };

  const handleCheckboxChange = (group, option) => {
    if (editMode) {
      setFormData(prev => {
        const currentSelection = prev.personal[group] || [];
        const newSelection = currentSelection.includes(option)
          ? currentSelection.filter(item => item !== option)
          : [...currentSelection, option];
        
        return { 
          ...prev, 
          personal: { 
            ...prev.personal, 
            [group]: newSelection 
          } 
        };
      });
    }
  };

  const handleDynamicChange = (section, index, e) => {
    if (editMode) {
      const { name, value } = e.target;
      const updated = [...formData[section]];
      updated[index][name] = value;
      setFormData(prev => ({ ...prev, [section]: updated }));
    }
  };

  const handleDynamicDateChange = (section, index, field, date) => {
    if (editMode) {
      const updated = [...formData[section]];
      updated[index][field] = date;
      setFormData(prev => ({ ...prev, [section]: updated }));
    }
  };

  const handleDynamicFileChange = (section, index, e) => {
    if (editMode) {
      const updated = [...formData[section]];
      if (!e.target.files || e.target.files.length === 0) {
        updated[index][section === "education" ? "degreeFile" : "experienceFile"] = null;
      } else {
        const file = e.target.files[0];
        updated[index][section === "education" ? "degreeFile" : "experienceFile"] = file;
      }
      setFormData(prev => ({ ...prev, [section]: updated }));
    }
  };

  const handleDynamicCheckboxChange = (section, index, field, option) => {
    if (editMode) {
      const updated = [...formData[section]];
      const options = updated[index][field] || [];
      updated[index][field] = options.includes(option) 
        ? options.filter(o => o !== option) 
        : [...options, option];
      setFormData(prev => ({ ...prev, [section]: updated }));
    }
  };

  const addNewEntry = (section) => {
    if (editMode) {
      const newItem = section === "education"
        ? { ...newEducationTemplate, id: Date.now().toString() }
        : { ...newExperienceTemplate, id: Date.now().toString() };
      setFormData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    }
  };

  const removeDynamicItem = (section, id) => {
    if (editMode) {
      setFormData(prev => ({ 
        ...prev, 
        [section]: prev[section].filter(item => item.id !== id) 
      }));
    }
  };

  const handleFieldVisibility = (field, value) => {
    if (editMode) {
      setFormData(prev => ({
        ...prev,
        fieldVisibilities: {
          ...prev.fieldVisibilities,
          [field]: value
        }
      }));
    }
  };

  const handleApplyPreset = () => {
    if (editMode && selectedPreset) {
      const newFieldVisibilities = {};
      
      // Personal fields
      Object.keys(formData.personal).forEach(field => {
        if (field !== 'cnic') {
          newFieldVisibilities[field] = selectedPreset;
        }
      });
      
      // Files
      newFieldVisibilities['resume'] = selectedPreset;
      newFieldVisibilities['profilePicture'] = selectedPreset;
      
      // Education fields
      formData.education.forEach((edu, index) => {
        [
          'degreeTitle',
          'institute',
          'startDate',
          'endDate',
          'website',
          'degreeFile'
        ].forEach(field => {
          newFieldVisibilities[`education-${index}-${field}`] = selectedPreset;
        });
      });
      
      // Experience fields
      formData.experience.forEach((exp, index) => {
        [
          'jobTitle',
          'company',
          'startDate',
          'endDate',
          'website',
          'experienceFile',
          'jobFunctions',
          'industry'
        ].forEach(field => {
          newFieldVisibilities[`experience-${index}-${field}`] = selectedPreset;
        });
      });
      
      setFormData(prev => ({
        ...prev,
        fieldVisibilities: newFieldVisibilities
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required files for new profiles
      if (!profileId) {
        if (!files.profilePicture || !files.resume) {
          toast.error('Please upload both profile picture and resume');
          setIsSubmitting(false);
          return;
        }

        // Validate education files
        for (const edu of formData.education) {
          if (!edu.degreeFile) {
            toast.error(`Please upload degree file for education: ${edu.degreeTitle}`);
            setIsSubmitting(false);
            return;
          }
        }

        // Validate experience files
        for (const exp of formData.experience) {
          if (!exp.experienceFile) {
            toast.error(`Please upload experience file for: ${exp.jobTitle} at ${exp.company}`);
            setIsSubmitting(false);
            return;
          }
        }
      }

        const companyNames = formData.experience.map(exp => exp.company).filter(Boolean);
    if (companyNames.length > 0) {
      localStorage.setItem('userCompanies', JSON.stringify(companyNames));
    }

      const formDataToSend = new FormData();
      const userId = localStorage.getItem("userId");
      formDataToSend.append("userId", userId);

      if (profileId) {
        formDataToSend.append("profileId", profileId);
      }

      // Add personal info with visibility
      Object.entries(formData.personal).forEach(([field, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (field === 'dob' && value) {
            formDataToSend.append(field, value.toISOString());
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formDataToSend.append(`${field}[${index}]`, item);
            });
          } else {
            formDataToSend.append(field, value);
          }
          
          // Add visibility for each field (except CNIC which should always be private)
          if (field !== 'cnic') {
            const visibility = formData.fieldVisibilities[field] || 'Public';
            formDataToSend.append(`${field}Visibility`, visibility);
          } else {
            // CNIC should always be private
            formDataToSend.append(`${field}Visibility`, 'Private');
          }
        }
      });

      // Add files with visibility
      if (files.profilePicture instanceof File) {
        formDataToSend.append('profilePicture', files.profilePicture);
        const visibility = formData.fieldVisibilities['profilePicture'] || 'Public';
        formDataToSend.append('profilePictureVisibility', visibility);
      } else if (files.profilePicture?.url) {
        formDataToSend.append('profilePicture', files.profilePicture.url);
        const visibility = formData.fieldVisibilities['profilePicture'] || 'Public';
        formDataToSend.append('profilePictureVisibility', visibility);
      }
      
      if (files.resume instanceof File) {
        formDataToSend.append('resume', files.resume);
        const visibility = formData.fieldVisibilities['resume'] || 'Public';
        formDataToSend.append('resumeVisibility', visibility);
      } else if (files.resume?.url) {
        formDataToSend.append('resume', files.resume.url);
        const visibility = formData.fieldVisibilities['resume'] || 'Public';
        formDataToSend.append('resumeVisibility', visibility);
      }

      // Add education with proper visibility for each field
      formData.education.forEach((edu, index) => {
        // Add basic education fields
        formDataToSend.append(`education[${index}][degreeTitle]`, edu.degreeTitle || '');
        formDataToSend.append(`education[${index}][institute]`, edu.institute || '');
        formDataToSend.append(`education[${index}][website]`, edu.website || '');
        
        // Add dates
        if (edu.startDate) {
          formDataToSend.append(`education[${index}][startDate]`, edu.startDate.toISOString());
        }
        if (edu.endDate) {
          formDataToSend.append(`education[${index}][endDate]`, edu.endDate.toISOString());
        }
        
        // Add degree file
        if (edu.degreeFile instanceof File) {
          formDataToSend.append(`education[${index}][degreeFile]`, edu.degreeFile);
        } else if (edu.degreeFile?.url) {
          formDataToSend.append(`education[${index}][degreeFile]`, edu.degreeFile.url);
        }
        
        // Add visibility for each education field
        const eduFields = ['degreeTitle', 'institute', 'website', 'startDate', 'endDate', 'degreeFile'];
        eduFields.forEach(field => {
          const visibilityKey = `education-${index}-${field}`;
          const visibility = formData.fieldVisibilities[visibilityKey] || 'Public';
          formDataToSend.append(`education[${index}][${field}Visibility]`, visibility);
        });
      });

      // Add experience with proper visibility for each field
      formData.experience.forEach((exp, index) => {
        // Add basic experience fields
        formDataToSend.append(`experience[${index}][jobTitle]`, exp.jobTitle || '');
        formDataToSend.append(`experience[${index}][company]`, exp.company || '');
        formDataToSend.append(`experience[${index}][website]`, exp.website || '');
        formDataToSend.append(`experience[${index}][industry]`, exp.industry || '');
        
        // Add dates
        if (exp.startDate) {
          formDataToSend.append(`experience[${index}][startDate]`, exp.startDate.toISOString());
        }
        if (exp.endDate) {
          formDataToSend.append(`experience[${index}][endDate]`, exp.endDate.toISOString());
        }
        
        // Add experience file
        if (exp.experienceFile instanceof File) {
          formDataToSend.append(`experience[${index}][experienceFile]`, exp.experienceFile);
        } else if (exp.experienceFile?.url) {
          formDataToSend.append(`experience[${index}][experienceFile]`, exp.experienceFile.url);
        }
        
        // Add job functions array
        if (exp.jobFunctions && Array.isArray(exp.jobFunctions)) {
          exp.jobFunctions.forEach((func, funcIndex) => {
            formDataToSend.append(`experience[${index}][jobFunctions][${funcIndex}]`, func);
          });
        }
        
        // Add visibility for each experience field
        const expFields = ['jobTitle', 'company', 'website', 'industry', 'startDate', 'endDate', 'experienceFile', 'jobFunctions'];
        expFields.forEach(field => {
          const visibilityKey = `experience-${index}-${field}`;
          const visibility = formData.fieldVisibilities[visibilityKey] || 'Public';
          formDataToSend.append(`experience[${index}][${field}Visibility]`, visibility);
        });
      });

      // Submit the form
      const endpoint = '/profile';
      const method = profileId ? 'put' : 'post';

      const response = await axiosinstance[method](endpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(profileId ? 'Profile updated successfully!' : 'Profile submitted successfully!');
        
        if (profileId) {
          setEditMode(false);
          // Optionally refresh the data
          window.location.reload();
        } else {
          setProfileId(response.data.data._id);
          setSubmitted(true);
        }
      } else {
        toast.error(response.data.message || 'Failed to submit profile');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      'Failed to submit profile';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f4793d]"></div>
      </div>
    );
  }

  if (submitted) {
    return navigate('/success');
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white text-gray-900 py-4 shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-3">
          <div className="flex-col md:flex-row md:flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#f4793d] to-[#ff8748] p-2 rounded-lg shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#f4793d] to-[#ff8748]">
                  Professional Profile
                </h1>
                <p className="text-gray-500 text-xs mt-1">
                  {profileId ? 'View and edit your profile' : 'Complete your profile'}
                </p>
              </div>
            </div>
            
            {profileId && (
              <button
                onClick={handleEditToggle}
                className={`px-4 py-1.5 rounded text-sm font-medium mt-4 md:mt-0 ${
                  editMode 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-[#f4793d] text-white hover:bg-[#e66e33]'
                }`}
              >
                {editMode ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
       
          <Section>
            <div>
              <div className="flex items-center justify-between mr-2 border-b border-[#f4793d]">
                <div className=" flex gap-2">
                  <div className="bg-gradient-to-r from-gray-100 to-indigo-100 p-1.5 rounded-lg" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f4793d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  </div>
                </div>

                {/* Single-line visibility control */}
                {editMode && (
                  <div className="mb-4 flex items-center gap-2 p-3  rounded-lg ">
                    <span className="text-xs font-medium text-gray-700 whitespace-nowrap"> Visibility:</span>
                    <select
                      value={selectedPreset}
                      onChange={(e) => setSelectedPreset(e.target.value)}
                      className="flex-1 max-w-[120px] px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#f4793d] focus:border-[#f4793d]"
                    >
                      <option value="">Select</option>
                      {VISIBILITY_PRESETS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleApplyPreset}
                      disabled={!selectedPreset}
                      className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap ${
                        !selectedPreset
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#f4793d] text-white hover:bg-[#e66e33]'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldWrapper 
                  fieldName="name" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="Name"
                    name="name"
                    value={formData.personal.name}
                    onChange={handlePersonalChange}
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="mobile" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="Mobile"
                    name="mobile"
                    value={formData.personal.mobile}
                    onChange={handlePersonalChange}
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="email" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="Email"
                    name="email"
                    value={formData.personal.email}
                    onChange={handlePersonalChange}
                    type="email"
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="cnic" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility} 
                  isCnicField
                  disabled={!editMode}
                >
                  <Input
                    label="CNIC"
                    name="cnic"
                    value={formData.personal.cnic}
                    onChange={handlePersonalChange}
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="fatherName" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="Father Name"
                    name="fatherName"
                    value={formData.personal.fatherName}
                    onChange={handlePersonalChange}
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="city" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="City"
                    name="city"
                    value={formData.personal.city}
                    onChange={handlePersonalChange}
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="country" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Select
                    name="country"
                    label="Country"
                    value={formData.personal.country}
                    onChange={handlePersonalChange}
                    options={COUNTRIES}
                    defaultOption="Select Country"
                    required
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="gender" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Select
                    name="gender"
                    label="Gender"
                    value={formData.personal.gender}
                    onChange={handlePersonalChange}
                    options={GENDERS}
                    defaultOption="Select Gender"
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="maritalStatus" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Select
                    name="maritalStatus"
                    label="Marital Status"
                    value={formData.personal.maritalStatus}
                    onChange={handlePersonalChange}
                    options={MARITAL_STATUSES}
                    defaultOption="Select Marital Status"
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="residentStatus" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Select
                    name="residentStatus"
                    label="Resident Status"
                    value={formData.personal.residentStatus}
                    onChange={handlePersonalChange}
                    options={RESIDENT_STATUSES}
                    defaultOption="Select Resident Status"
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="nationality" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <Input
                    label="Nationality"
                    name="nationality"
                    value={formData.personal.nationality}
                    onChange={handlePersonalChange}
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="dob" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <DateInput
                    label="Date of Birth"
                    value={formData.personal.dob}
                    onChange={handleDobChange}
                    disabled={!editMode}
                  />
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="resume" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <FileUpload
                    label="Upload Resume (PDF)"
                    onDrop={handleFileDrop('resume')}
                    file={files.resume}
                    className="col-span-2"
                    disabled={!editMode}
                  />
                  {files.resume && editMode && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('resume')}
                      className="text-xs mt-1 flex items-center gap-1 text-red-500"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove file
                    </button>
                  )}
                </FieldWrapper>

                <FieldWrapper 
                  fieldName="profilePicture" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <FileUpload
                    label="Upload Profile Picture (Image)"
                    onDrop={handleFileDrop('profilePicture')}
                    file={files.profilePicture}
                    className="col-span-2"
                    accept="image/*"
                    disabled={!editMode}
                  />
                  {files.profilePicture && editMode && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('profilePicture')}
                      className="text-xs mt-1 flex items-center gap-1 text-red-500"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove file
                    </button>
                  )}
                </FieldWrapper>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <FieldWrapper 
                  fieldName="shiftPreferences" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <CheckboxGroup
                    legend="Shift Preferences"
                    options={SHIFT_PREFERENCES}
                    selectedOptions={formData.personal.shiftPreferences}
                    onChange={opt => handleCheckboxChange("shiftPreferences", opt)}
                    disabled={!editMode}
                  />
                </FieldWrapper>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <FieldWrapper 
                  fieldName="workAuthorization" 
                  formData={formData} 
                  handleFieldVisibility={handleFieldVisibility}
                  disabled={!editMode}
                >
                  <CheckboxGroup
                    legend="Work Authorization"
                    options={WORK_AUTHORIZATIONS}
                    selectedOptions={formData.personal.workAuthorization}
                    onChange={opt => handleCheckboxChange("workAuthorization", opt)}
                    disabled={!editMode}
                  />
                </FieldWrapper>
              </div>
            </div>
          </Section>

          {/* Education Section */}
          <Section 
            title="Education" 
            icon={
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f4793d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            }
          >
            <div className="space-y-3">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="bg-white rounded-lg p-3 shadow border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <span>Education {index + 1}</span>
                      </h3>
                      <p className="text-gray-500 text-xxs">Academic qualifications</p>
                    </div>
                    {formData.education.length > 1 && editMode && (
                      <button
                        type="button"
                        onClick={() => removeDynamicItem("education", edu.id)}
                        className="text-gray-400 hover:text-red-500 text-xxs flex items-center gap-0.5 mt-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FieldWrapper 
                        fieldName={`education-${index}-degreeTitle`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Select
                          name="degreeTitle"
                          label="Degree Title"
                          value={edu.degreeTitle}
                          onChange={(e) => handleDynamicChange("education", index, e)}
                          options={DEGREE_TITLES}
                          defaultOption="Select Degree"
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`education-${index}-startDate`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <DateInput
                          label="Start Date"
                          value={edu.startDate}
                          onChange={(date) => handleDynamicDateChange("education", index, "startDate", date)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`education-${index}-endDate`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <DateInput
                          label="End Date"
                          value={edu.endDate}
                          onChange={(date) => handleDynamicDateChange("education", index, "endDate", date)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>
                    </div>

                    <div className="space-y-2">
                      <FieldWrapper 
                        fieldName={`education-${index}-institute`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Select
                          name="institute"
                          label="Institute"
                          value={edu.institute}
                          onChange={(e) => handleDynamicChange("education", index, e)}
                          options={INSTITUTES}
                          defaultOption="Select Institute"
                          required
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`education-${index}-website`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Input
                          name="website"
                          label="Institute Website" 
                          value={edu.website}
                          onChange={(e) => handleDynamicChange("education", index, e)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`education-${index}-degreeFile`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <FileUpload
                          label="Upload Degree (PDF/Image)"
                          onDrop={acceptedFiles => handleDynamicFileChange("education", index, { target: { files: acceptedFiles } })}
                          file={edu.degreeFile}
                          className="col-span-2"
                          disabled={!editMode}
                        />
                        {edu.degreeFile && editMode && (
                          <button
                            type="button"
                            onClick={() => handleDynamicFileChange("education", index, { target: { files: [] } })}
                            className="text-xs mt-1 flex items-center gap-1 text-red-500"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Remove file
                          </button>
                        )}
                      </FieldWrapper>
                    </div>
                  </div>
                </div>
              ))}

              {editMode && (
                <button
                  type="button"
                  onClick={() => addNewEntry("education")}
                  className="w-full py-2 px-3 bg-white text-[#f4793d] rounded hover:bg-blue-50 text-xs font-medium border border-dashed border-gray-200 flex items-center justify-center gap-1 hover:border-[#f4793d]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Education
                </button>
              )}
            </div>
          </Section>

          {/* Experience Section */}
          <Section 
            title="Experience" 
            icon={
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f4793d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            }
          >
            <div className="space-y-3">
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="bg-white rounded-lg p-3 shadow border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <span>Experience {index + 1}</span>
                      </h3>
                      <p className="text-gray-500 text-xxs">Work experience</p>
                    </div>
                    {formData.experience.length > 1 && editMode && (
                      <button
                        type="button"
                        onClick={() => removeDynamicItem("experience", exp.id)}
                        className="text-gray-400 hover:text-red-500 text-xxs flex items-center gap-0.5 mt-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FieldWrapper 
                        fieldName={`experience-${index}-jobTitle`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Select
                          name="jobTitle"
                          label="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => handleDynamicChange("experience", index, e)}
                          options={JOB_TITLES}
                          defaultOption="Select Job Title"
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-startDate`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <DateInput
                          label="Start Date"
                          value={exp.startDate}
                          onChange={(date) => handleDynamicDateChange("experience", index, "startDate", date)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-endDate`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <DateInput
                          label="End Date"
                          value={exp.endDate}
                          onChange={(date) => handleDynamicDateChange("experience", index, "endDate", date)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-company`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Select
                          name="company"
                          label="Company"
                          value={exp.company}
                          onChange={(e) => handleDynamicChange("experience", index, e)}
                          options={COMPANIES}
                          defaultOption="Select Company"
                          required
                          disabled={!editMode}
                        />
                      </FieldWrapper>
                    </div>

                    <div className="space-y-2">
                      <FieldWrapper 
                        fieldName={`experience-${index}-website`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Input
                          name="website"
                          label="Company Website"
                          value={exp.website}
                          onChange={(e) => handleDynamicChange("experience", index, e)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-experienceFile`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <FileUpload
                          label="Upload Experience Letter (PDF only)"
                          onDrop={acceptedFiles => handleDynamicFileChange("experience", index, { target: { files: acceptedFiles } })}
                          file={exp.experienceFile}
                          className="col-span-2"
                          accept="application/pdf"
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-jobFunctions`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <CheckboxGroup
                          legend="Job Functions"
                          options={JOB_FUNCTIONS}
                          selectedOptions={exp.jobFunctions}
                          onChange={(opt) => handleDynamicCheckboxChange("experience", index, "jobFunctions", opt)}
                          disabled={!editMode}
                        />
                      </FieldWrapper>

                      <FieldWrapper 
                        fieldName={`experience-${index}-industry`} 
                        formData={formData} 
                        handleFieldVisibility={handleFieldVisibility}
                        disabled={!editMode}
                      >
                        <Select
                          name="industry"
                          label="Industry"
                          value={exp.industry}
                          onChange={(e) => handleDynamicChange("experience", index, e)}
                          options={INDUSTRIES}
                          defaultOption="Select Industry"
                          disabled={!editMode}
                        />
                      </FieldWrapper>
                    </div>
                  </div>
                </div>
              ))}

              {editMode && (
                <button
                  type="button"
                  onClick={() => addNewEntry("experience")}
                  className="w-full py-2 px-3 bg-white text-[#f4793d] rounded hover:bg-blue-50 text-xs font-medium border border-dashed border-gray-200 flex items-center justify-center gap-1 hover:border-[#f4793d]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Experience
                </button>
              )}
            </div>
          </Section>

          {editMode && (
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2.5 bg-gradient-to-r from-[#f4793d] to-[#ff8748] text-white rounded hover:shadow transition-all text-sm font-semibold shadow flex items-center justify-center gap-1 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {profileId ? 'Updating...' : 'Submitting...'}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {profileId ? 'Update Profile' : 'Submit Profile'}
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;