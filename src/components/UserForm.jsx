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

  const renderVisibilityOptions = (field) => (
    <div className="flex gap-6 mt-3 p-3 bg-slate-50 rounded-lg border">
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
  )

  const LabelWithBadge = ({ label }) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      <span className="font-medium text-slate-800">{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">User Profile Form</h1>
          <p className="text-slate-300">Complete your professional profile information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form className="space-y-8">
          {/* Personal Information */}
          <Section title="Personal Information" icon="👤">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="mb-8">
                <label className="block text-lg font-semibold text-slate-800 mb-4">Overall Field Visibility</label>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    {VISIBILITY_OPTIONS.map((option) => (
                      <label key={option} className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          value={option}
                          checked={formData.visibility === option}
                          onChange={handleVisibilityChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="font-medium text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Add Select All dropdown */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">Set all fields to:</span>
                    <select
                      value=""
                      onChange={(e) => handleSelectAllVisibility(e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
                    >
                      <option value="">Select visibility for all fields</option>
                      {VISIBILITY_OPTIONS.map(option => (
                        <option key={option} value={option}>Set all to {option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid gap-8">
                {Object.entries(formData.personal).map(([field, value]) => {
                  if (field === "dob") return null
                  if (Array.isArray(value)) return null

                  return (
                    <div key={field} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10">
                          <img src='https://static.vecteezy.com/system/resources/previews/009/391/666/non_2x/winner-glass-award-clipart-design-illustration-free-png.png' />
                        </div>
                        <div className="flex-1">
                          <Input
                            label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            name={field}
                            value={value}
                            onChange={handlePersonalChange}
                            required
                          />
                          {renderVisibilityOptions(field)}
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-slate-800">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-4">
                    <Select
                      name="day"
                      value={formData.personal.dob.day}
                      onChange={handleDobChange}
                      options={DAYS}
                      defaultOption="Day"
                    />
                    <Select
                      name="month"
                      value={formData.personal.dob.month}
                      onChange={handleDobChange}
                      options={MONTHS}
                      defaultOption="Month"
                    />
                    <Select
                      name="year"
                      value={formData.personal.dob.year}
                      onChange={handleDobChange}
                      options={YEARS}
                      defaultOption="Year"
                    />
                  </div>
                  {renderVisibilityOptions("dob")}
                </div>

                <div className="space-y-4">
                  <CheckboxGroup
                    legend="Shift Preferences"
                    options={SHIFT_PREFERENCES}
                    selectedOptions={formData.personal.shiftPreferences}
                    onChange={(opt) => handleCheckboxChange("shiftPreferences", opt)}
                  />
                  {renderVisibilityOptions("shiftPreferences")}
                </div>

                <div className="space-y-4">
                  <CheckboxGroup
                    legend="Work Authorization"
                    options={WORK_AUTHORIZATIONS}
                    selectedOptions={formData.personal.workAuthorization}
                    onChange={(opt) => handleCheckboxChange("workAuthorization", opt)}
                  />
                  {renderVisibilityOptions("workAuthorization")}
                </div>
              </div>
            </div>
          </Section>

          {/* Education */}
          <Section title="Education" icon="🎓">
            <div className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <LabelWithBadge label={`Education ${index + 1}`} />
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDynamicItem("education", edu.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
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
                    />
                    {renderVisibilityOptions(`education-${index}-degreeTitle`)}

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        name="startMonth"
                        label="Start Month"
                        value={edu.startMonth}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={MONTHS}
                      />
                      <Select
                        name="startYear"
                        label="Start Year"
                        value={edu.startYear}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={YEARS}
                      />
                    </div>
                    {renderVisibilityOptions(`education-${index}-startDate`)}

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        name="endMonth"
                        label="End Month"
                        value={edu.endMonth}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={MONTHS}
                      />
                      <Select
                        name="endYear"
                        label="End Year"
                        value={edu.endYear}
                        onChange={(e) => handleDynamicChange("education", index, e)}
                        options={YEARS}
                      />
                    </div>
                    {renderVisibilityOptions(`education-${index}-endDate`)}

                    <Select
                      name="institute"
                      label="Institute"
                      value={edu.institute}
                      onChange={(e) => handleDynamicChange("education", index, e)}
                      options={INSTITUTES}
                    />
                    {renderVisibilityOptions(`education-${index}-institute`)}

                    <Input
                      name="website"
                      label="Institute Website"
                      value={edu.website}
                      onChange={(e) => handleDynamicChange("education", index, e)}
                    />
                    {renderVisibilityOptions(`education-${index}-website`)}

                    <FileUploadButton
                      label="Upload Degree"
                      onChange={(e) => handleDynamicFileChange("education", index, e)}
                    />
                    {renderVisibilityOptions(`education-${index}-degreeFile`)}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addNewEntry("education")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Another Education
              </button>
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience" icon="💼">
            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <LabelWithBadge label={`Experience ${index + 1}`} />
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDynamicItem("experience", exp.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
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
                    />
                    {renderVisibilityOptions(`experience-${index}-jobTitle`)}

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        name="startMonth"
                        label="Start Month"
                        value={exp.startMonth}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={MONTHS}
                      />
                      <Select
                        name="startYear"
                        label="Start Year"
                        value={exp.startYear}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={YEARS}
                      />
                    </div>
                    {renderVisibilityOptions(`experience-${index}-startDate`)}

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        name="endMonth"
                        label="End Month"
                        value={exp.endMonth}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={MONTHS}
                      />
                      <Select
                        name="endYear"
                        label="End Year"
                        value={exp.endYear}
                        onChange={(e) => handleDynamicChange("experience", index, e)}
                        options={YEARS}
                      />
                    </div>
                    {renderVisibilityOptions(`experience-${index}-endDate`)}

                    <Select
                      name="company"
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleDynamicChange("experience", index, e)}
                      options={COMPANIES}
                    />
                    {renderVisibilityOptions(`experience-${index}-company`)}

                    <Input
                      name="website"
                      label="Company Website"
                      value={exp.website}
                      onChange={(e) => handleDynamicChange("experience", index, e)}
                    />
                    {renderVisibilityOptions(`experience-${index}-website`)}

                    <FileUploadButton
                      label="Upload Experience Letter"
                      onChange={(e) => handleDynamicFileChange("experience", index, e)}
                    />
                    {renderVisibilityOptions(`experience-${index}-experienceFile`)}

                    <CheckboxGroup
                      legend="Job Functions"
                      options={JOB_FUNCTIONS}
                      selectedOptions={exp.jobFunctions}
                      onChange={(opt) => handleDynamicCheckboxChange("experience", index, "jobFunctions", opt)}
                    />
                    {renderVisibilityOptions(`experience-${index}-jobFunctions`)}

                    <Select
                      name="industry"
                      label="Industry"
                      value={exp.industry}
                      onChange={(e) => handleDynamicChange("experience", index, e)}
                      options={INDUSTRIES}
                    />
                    {renderVisibilityOptions(`experience-${index}-industry`)}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addNewEntry("experience")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Another Experience
              </button>
            </div>
          </Section>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="px-12 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold text-lg shadow-lg"
            >
              Submit Profile
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