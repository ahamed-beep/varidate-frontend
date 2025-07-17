export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
export const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
export const SHIFT_PREFERENCES = ['Morning', 'Afternoon', 'Night', 'Rotating'];
export const WORK_AUTHORIZATIONS = ['Citizen', 'Permanent Resident', 'Work Permit', 'Student Visa'];

export const DEGREE_TITLES = ['Matriculation/O-Level', 'Intermediate/A-Level', 'Bachelors', 'Masters', 'PhD'];
export const INSTITUTES = ['University of Example', 'Example College', 'Tech Institute', 'Another University'];

export const JOB_FUNCTIONS = ['Software Development', 'Project Management', 'Quality Assurance', 'Sales', 'Marketing', 'Human Resources'];
export const INDUSTRIES = ['Information Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing'];
export const COMPANIES = ['Tech Solutions Inc.', 'Global Innovations', 'Creative Minds LLC', 'Data Corp'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export const YEARS = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());