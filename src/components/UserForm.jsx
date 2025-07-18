"use client"

import { useState } from "react"
import { useLocation } from "react-router"

// Constants (unchanged)
const GENDERS = ["Male", "Female", "Other"]
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"]
const SHIFT_PREFERENCES = ["Day Shift", "Night Shift", "Flexible", "Remote"]
const WORK_AUTHORIZATIONS = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"]
const DEGREE_TITLES = [
  "Bachelor of Science",
  "Bachelor of Arts",
  "Master of Science",
  "Master of Arts",
  "PhD",
  "Associate Degree",
  "Diploma",
]
const INSTITUTES = [
  "Harvard University",
  "MIT",
  "Stanford University",
  "University of California",
  "Oxford University",
  "Cambridge University",
  "Other",
]
const COMPANIES = ["Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix", "Tesla", "Other"]
const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Other",
]
const JOB_FUNCTIONS = [
  "Software Development",
  "Data Analysis",
  "Project Management",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
const YEARS = Array.from({ length: 50 }, (_, i) => (2024 - i).toString());

// Components (unchanged)
const Section = ({ title, icon, children }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b-2 border-blue-600">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

const Input = ({ label, name, value, onChange, required = false, type = "text" }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
      />
    </div>
  )
}

const Select = ({ name, label, value, onChange, options, defaultOption }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

const CheckboxGroup = ({ legend, options, selectedOptions, onChange }) => {
  return (
    <div className="space-y-4">
      <legend className="text-sm font-semibold text-slate-700">{legend}</legend>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onChange(option)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

const FileUploadButton = ({ label, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <input type="file" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 transition-colors bg-slate-50 text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm text-slate-600">Click to upload file</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Templates (unchanged)
const newEducationTemplate = {
  id: "",
  degreeTitle: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  institute: "",
  website: "",
  degreeFile: null,
}

const newExperienceTemplate = {
  id: "",
  jobTitle: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  company: "",
  website: "",
  experienceFile: null,
  jobFunctions: [],
  industry: "",
}

const VISIBILITY_OPTIONS = ["Public", "Link", "Hide"]

// Main Component
const UserForm = () => {
 const location = useLocation();
  const loggedInEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    personal: {
      name: "",
      mobile: "",
      email: loggedInEmail, // Pre-populate with logged in email
      cnic: "",
      fatherName: "",
      city: "",
      country: "",
      gender: "",
      maritalStatus: "",
      shiftPreferences: [],
      workLocationPreference: "",
      dob: { day: "", month: "", year: "" },
      nationality: "",
      workAuthorization: [],
    },
    visibility: "Public",
    cnic: "Hide",
    fieldVisibilities: {},
    
    education: [{ ...newEducationTemplate, id: Date.now().toString() }],
    experience: [{ ...newExperienceTemplate, id: Date.now().toString() }],
  })

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, [name]: value } }))
  }

  const handleDobChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, dob: { ...prev.personal.dob, [name]: value } } }))
  }

  const handleCheckboxChange = (group, option) => {
    setFormData((prev) => {
      const currentSelection = prev.personal[group]
      const newSelection = currentSelection.includes(option)
        ? currentSelection.filter((item) => item !== option)
        : [...currentSelection, option]
      return { ...prev, personal: { ...prev.personal, [group]: newSelection } }
    })
  }

  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target
    const updated = [...formData[section]]
    updated[index][name] = value
    setFormData((prev) => ({ ...prev, [section]: updated }))
  }

  const handleDynamicFileChange = (section, index, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const updated = [...formData[section]]
    updated[index][section === "education" ? "degreeFile" : "experienceFile"] = file
    setFormData((prev) => ({ ...prev, [section]: updated }))
  }

  const handleDynamicCheckboxChange = (section, index, field, option) => {
    const updated = [...formData[section]]
    const options = updated[index][field] || []
    updated[index][field] = options.includes(option) ? options.filter((o) => o !== option) : [...options, option]
    setFormData((prev) => ({ ...prev, [section]: updated }))
  }

  const addNewEntry = (section) => {
    const newItem =
      section === "education"
        ? { ...newEducationTemplate, id: Date.now().toString() }
        : { ...newExperienceTemplate, id: Date.now().toString() }
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }))
  }

  const removeDynamicItem = (section, id) => {
    setFormData((prev) => ({ ...prev, [section]: prev[section].filter((item) => item.id !== id) }))
  }

  const handleVisibilityChange = (e) => {
    setFormData((prev) => ({ ...prev, visibility: e.target.value }))
  }

  const handleFieldVisibility = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      fieldVisibilities: { ...prev.fieldVisibilities, [field]: value },
    }))
  }

  // New function to handle select all visibility
  const handleSelectAllVisibility = (value) => {
    // Update all personal fields
    const personalFields = Object.keys(formData.personal)
    const newFieldVisibilities = { ...formData.fieldVisibilities }
    
    // Update personal fields
    personalFields.forEach(field => {
      newFieldVisibilities[field] = value
    })
    
    // Update dob fields
    newFieldVisibilities['dob'] = value
    
    // Update education fields
    formData.education.forEach((edu, index) => {
      newFieldVisibilities[`education-${index}-degreeTitle`] = value
      newFieldVisibilities[`education-${index}-startDate`] = value
      newFieldVisibilities[`education-${index}-endDate`] = value
      newFieldVisibilities[`education-${index}-institute`] = value
      newFieldVisibilities[`education-${index}-website`] = value
      newFieldVisibilities[`education-${index}-degreeFile`] = value
    })
    
    // Update experience fields
    formData.experience.forEach((exp, index) => {
      newFieldVisibilities[`experience-${index}-jobTitle`] = value
      newFieldVisibilities[`experience-${index}-startDate`] = value
      newFieldVisibilities[`experience-${index}-endDate`] = value
      newFieldVisibilities[`experience-${index}-company`] = value
      newFieldVisibilities[`experience-${index}-website`] = value
      newFieldVisibilities[`experience-${index}-experienceFile`] = value
      newFieldVisibilities[`experience-${index}-jobFunctions`] = value
      newFieldVisibilities[`experience-${index}-industry`] = value
    })
    
    setFormData(prev => ({
      ...prev,
      visibility: value,
      fieldVisibilities: newFieldVisibilities
    }))
  }

  const renderVisibilityOptions = (field) => {
  // Special case for CNIC - always set to Private and disable changing
  if (field === 'cnic') {
    return (
      <div className="flex gap-6 mt-3 p-3 rounded-lg">
        <span className="text-sm font-medium text-slate-600 min-w-fit">Visibility:</span>
        <div className="flex gap-4">
          {VISIBILITY_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={`vis-${field}`}
                value={option}
                checked={option === "Hide"}
                onChange={() => {}}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                disabled={option !== "Hide"}
              />
              <span className={option === "Hide" ? "text-slate-700" : "text-slate-400"}>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 mt-3 p-3 rounded-lg">
      <span className="text-sm font-medium text-slate-600 min-w-fit">Visibility:</span>
      <div className="flex gap-4">
        {VISIBILITY_OPTIONS.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name={`vis-${field}`}
              value={option}
              checked={formData.fieldVisibilities[field] === option}
              onChange={(e) => handleFieldVisibility(field, e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-slate-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

  

  const LabelWithBadge = ({ label }) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      <span className="font-medium text-slate-800">{label}</span>
    </div>
    
  )
  
const [selectedVisibility, setSelectedVisibility] = useState("");
const [pendingVisibility, setPendingVisibility] = useState("");

const handleSelectChange = (value) => {
  setPendingVisibility(value); // Store the selection but don't apply it yet
};

const handleApply = () => {
  if (pendingVisibility) {
    handleSelectAllVisibility(pendingVisibility); // Apply the selection
    setSelectedVisibility(pendingVisibility);
    setPendingVisibility(""); // Reset pending selection
  }
};
  return (
   <div className="min-h-screen bg-white">
  {/* Premium Header with elegant animation */}
  <div className="bg-white text-gray-900 py-12 shadow-sm border-b border-gray-100 animate-slide-down">
    <div className="max-w-6xl mx-auto px-8">
      <div className="flex items-center gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="absolute -bottom-2 right-0 bg-indigo-700 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            PRO
          </span>
        </div>
        <div className="animate-fade-in-right">
          <h1 className="text-4xl font-bold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Professional Profile
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl">
            Complete your profile to unlock premium career opportunities
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="max-w-6xl mx-auto px-8 py-12">
    <form className="space-y-10">
      {/* Personal Information with elegant section animation */}
      <Section
        icon={
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl hover:rotate-3 transition-transform duration-300 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        }
        title={
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 animate-text-focus-in">
                Personal Information
              </h2>
              <p className="text-gray-500 mt-1 text-sm">Your basic details</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative animate-fade-in-right">
                <select
                  value={pendingVisibility}
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-gray-700 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  <option value="">Visibility Settings</option>
                  {VISIBILITY_OPTIONS.map(option => (
                    <option key={option} value={option}>Set all to {option}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleApply}
                disabled={!pendingVisibility}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pendingVisibility 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        }
      >
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(formData.personal).map(([field, value]) => {
              if (field === "dob") return null
              if (Array.isArray(value)) return null

              return (
                <div key={field} className="space-y-2 animate-fade-in-up">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Input
                        label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        name={field}
                        value={value}
                        onChange={handlePersonalChange}
                        required
                        premiumStyle
                      />
                      {renderVisibilityOptions(field, true)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 animate-fade-in-up-delay">
            <label className="block text-lg font-semibold text-gray-800 mb-4">Date of Birth</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                name="day"
                value={formData.personal.dob.day}
                onChange={handleDobChange}
                options={DAYS}
                defaultOption="Day"
                premiumStyle
              />
              <Select
                name="month"
                value={formData.personal.dob.month}
                onChange={handleDobChange}
                options={MONTHS}
                defaultOption="Month"
                premiumStyle
              />
              <Select
                name="year"
                value={formData.personal.dob.year}
                onChange={handleDobChange}
                options={YEARS}
                defaultOption="Year"
                premiumStyle
              />
            </div>
            {renderVisibilityOptions("dob", true)}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 animate-fade-in-up-delay-2">
            <CheckboxGroup
              legend="Shift Preferences"
              options={SHIFT_PREFERENCES}
              selectedOptions={formData.personal.shiftPreferences}
              onChange={(opt) => handleCheckboxChange("shiftPreferences", opt)}
              premiumStyle
            />
            {renderVisibilityOptions("shiftPreferences", true)}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 animate-fade-in-up-delay-3">
            <CheckboxGroup
              legend="Work Authorization"
              options={WORK_AUTHORIZATIONS}
              selectedOptions={formData.personal.workAuthorization}
              onChange={(opt) => handleCheckboxChange("workAuthorization", opt)}
              premiumStyle
            />
            {renderVisibilityOptions("workAuthorization", true)}
          </div>
        </div>
      </Section>

      {/* Education with staggered animations */}
      <Section 
        title="Education" 
        icon={
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl hover:rotate-3 transition-transform duration-300 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
        }
      >
        <div className="space-y-6">
          {formData.education.map((edu, index) => (
            <div 
              key={edu.id} 
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span>Education {index + 1}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      PREMIUM
                    </span>
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">Add your academic qualifications</p>
                </div>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDynamicItem("education", edu.id)}
                    className="text-gray-400 hover:text-red-500 font-medium text-sm flex items-center gap-1 transition-colors hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-6">
                <Select
                  name="degreeTitle"
                  label="Degree Title"
                  value={edu.degreeTitle}
                  onChange={(e) => handleDynamicChange("education", index, e)}
                  options={DEGREE_TITLES}
                  premiumStyle
                />
                {renderVisibilityOptions(`education-${index}-degreeTitle`, true)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        name="startMonth"
                        value={edu.startMonth}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={MONTHS}
                        premiumStyle
                        hideLabel
                      />
                      <Select
                        name="startYear"
                        value={edu.startYear}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={YEARS}
                        premiumStyle
                        hideLabel
                      />
                    </div>
                    {renderVisibilityOptions(`education-${index}-startDate`, true)}
                  </div>

                  <div className="animate-fade-in-right">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        name="endMonth"
                        value={edu.endMonth}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={MONTHS}
                        premiumStyle
                        hideLabel
                      />
                      <Select
                        name="endYear"
                        value={edu.endYear}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={YEARS}
                        premiumStyle
                        hideLabel
                      />
                    </div>
                    {renderVisibilityOptions(`education-${index}-endDate`, true)}
                  </div>
                </div>

                <Select
                  name="institute"
                  label="Institute"
                  value={edu.institute}
                  onChange={(e) => handleDynamicChange("education", index, e)}
                  options={INSTITUTES}
                  premiumStyle
                />
                {renderVisibilityOptions(`education-${index}-institute`, true)}

                <Input
                  name="website"
                  label="Institute Website"
                  value={edu.website}
                  onChange={(e) => handleDynamicChange("education", index, e)}
                  premiumStyle
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  }
                />
                {renderVisibilityOptions(`education-${index}-website`, true)}

                <FileUploadButton
                  label="Upload Degree"
                  onChange={(e) => handleDynamicFileChange("education", index, e)}
                  premiumStyle
                />
                {renderVisibilityOptions(`education-${index}-degreeFile`, true)}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addNewEntry("education")}
            className="w-full py-3.5 px-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium border-2 border-dashed border-blue-200 flex items-center justify-center gap-2 hover:border-blue-300 hover:shadow-sm group"
          >
            <span className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-ping opacity-75"></span>
            </span>
            Add Another Education
          </button>
        </div>
      </Section>

      {/* Experience with hover animations */}
      <Section 
        title="Experience" 
        icon={
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-xl hover:rotate-3 transition-transform duration-300 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        }
      >
        <div className="space-y-6">
          {formData.experience.map((exp, index) => (
            <div 
              key={exp.id} 
              className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span>Experience {index + 1}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      PREMIUM
                    </span>
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">Add your professional work experience</p>
                </div>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDynamicItem("experience", exp.id)}
                    className="text-gray-400 hover:text-red-500 font-medium text-sm flex items-center gap-1 transition-colors hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-6">
                <Input
                  name="jobTitle"
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleDynamicChange("experience", index, e)}
                  premiumStyle
                />
                {renderVisibilityOptions(`experience-${index}-jobTitle`, true)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        name="startMonth"
                        value={exp.startMonth}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={MONTHS}
                        premiumStyle
                        hideLabel
                      />
                      <Select
                        name="startYear"
                        value={exp.startYear}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={YEARS}
                        premiumStyle
                        hideLabel
                      />
                    </div>
                    {renderVisibilityOptions(`experience-${index}-startDate`, true)}
                  </div>

                  <div className="animate-fade-in-right">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        name="endMonth"
                        value={exp.endMonth}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={MONTHS}
                        premiumStyle
                        hideLabel
                      />
                      <Select
                        name="endYear"
                        value={exp.endYear}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={YEARS}
                        premiumStyle
                        hideLabel
                      />
                    </div>
                    {renderVisibilityOptions(`experience-${index}-endDate`, true)}
                  </div>
                </div>

                <Select
                  name="company"
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleDynamicChange("experience", index, e)}
                  options={COMPANIES}
                  premiumStyle
                />
                {renderVisibilityOptions(`experience-${index}-company`, true)}

                <Input
                  name="website"
                  label="Company Website"
                  value={exp.website}
                  onChange={(e) => handleDynamicChange("experience", index, e)}
                  premiumStyle
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  }
                />
                {renderVisibilityOptions(`experience-${index}-website`, true)}

                <FileUploadButton
                  label="Upload Experience Letter"
                  onChange={(e) => handleDynamicFileChange("experience", index, e)}
                  premiumStyle
                />
                {renderVisibilityOptions(`experience-${index}-experienceFile`, true)}

                <CheckboxGroup
                  legend="Job Functions"
                  options={JOB_FUNCTIONS}
                  selectedOptions={exp.jobFunctions}
                  onChange={(opt) => handleDynamicCheckboxChange("experience", index, "jobFunctions", opt)}
                  premiumStyle
                />
                {renderVisibilityOptions(`experience-${index}-jobFunctions`, true)}

                <Select
                  name="industry"
                  label="Industry"
                  value={exp.industry}
                  onChange={(e) => handleDynamicChange("experience", index, e)}
                  options={INDUSTRIES}
                  premiumStyle
                />
                {renderVisibilityOptions(`experience-${index}-industry`, true)}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addNewEntry("experience")}
            className="w-full py-3.5 px-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium border-2 border-dashed border-blue-200 flex items-center justify-center gap-2 hover:border-blue-300 hover:shadow-sm group"
          >
            <span className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-ping opacity-75"></span>
            </span>
            Add Another Experience
          </button>
        </div>
      </Section>

      {/* Submit Button with elegant animation */}
      <div className="flex justify-center pt-8 animate-fade-in-up">
        <button
          type="submit"
          className="px-14 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg shadow-lg flex items-center gap-3 hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Complete Profile
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute -inset-2 bg-blue-100 rounded-lg opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-300"></span>
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default function Home() {
  return <UserForm />
}