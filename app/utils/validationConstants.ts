// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number validation regex (supports international formats)
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

// URL validation regex
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// LinkedIn URL validation regex
export const LINKEDIN_URL_REGEX = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;

// GitHub URL validation regex
export const GITHUB_URL_REGEX = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/?$/;

// Website URL validation regex
export const WEBSITE_URL_REGEX = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\/[\w-]*)*\/?$/;

// Date format validation regex (MM/YYYY)
export const DATE_REGEX = /^(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

// Credential ID validation regex (alphanumeric with optional hyphens and underscores)
export const CREDENTIAL_ID_REGEX = /^[a-zA-Z0-9-_]+$/;

// Name validation regex (letters, spaces, and common name characters)
export const NAME_REGEX = /^[a-zA-Z\s\-'\.]+$/;

// Location validation regex (letters, numbers, spaces, and common location characters)
export const LOCATION_REGEX = /^[a-zA-Z0-9\s\-',\.]+$/;

// Institution/Company name validation regex
export const INSTITUTION_REGEX = /^[a-zA-Z0-9\s\-',\.&]+$/;

// Degree/Position title validation regex
export const TITLE_REGEX = /^[a-zA-Z0-9\s\-',\.&]+$/;

// Project name validation regex
export const PROJECT_NAME_REGEX = /^[a-zA-Z0-9\s\-',\.&]+$/;

// Technology name validation regex
export const TECHNOLOGY_REGEX = /^[a-zA-Z0-9\s\-',\.&+#]+$/;

// Achievement/Description validation regex (allows more characters for detailed text)
export const DESCRIPTION_REGEX = /^[a-zA-Z0-9\s\-',\.&!?()]+$/;

// Validation error messages
export const VALIDATION_MESSAGES = {
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  LINKEDIN: 'Please enter a valid LinkedIn profile URL',
  GITHUB: 'Please enter a valid GitHub profile URL',
  WEBSITE: 'Please enter a valid website URL',
  DATE: 'Please enter a valid date in MM/YYYY format',
  CREDENTIAL_ID: 'Please enter a valid credential ID',
  NAME: 'Please enter a valid name',
  LOCATION: 'Please enter a valid location',
  INSTITUTION: 'Please enter a valid institution name',
  TITLE: 'Please enter a valid title',
  PROJECT_NAME: 'Please enter a valid project name',
  TECHNOLOGY: 'Please enter a valid technology name',
  DESCRIPTION: 'Please enter a valid description',
  REQUIRED: 'This field is required',
};

// Validation functions
export const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);
export const validatePhone = (phone: string): boolean => PHONE_REGEX.test(phone);
export const validateUrl = (url: string): boolean => URL_REGEX.test(url);
export const validateLinkedInUrl = (url: string): boolean => LINKEDIN_URL_REGEX.test(url);
export const validateGithubUrl = (url: string): boolean => GITHUB_URL_REGEX.test(url);
export const validateWebsiteUrl = (url: string): boolean => WEBSITE_URL_REGEX.test(url);
export const validateDate = (date: string): boolean => DATE_REGEX.test(date);
export const validateCredentialId = (id: string): boolean => CREDENTIAL_ID_REGEX.test(id);
export const validateName = (name: string): boolean => NAME_REGEX.test(name);
export const validateLocation = (location: string): boolean => LOCATION_REGEX.test(location);
export const validateInstitution = (institution: string): boolean => INSTITUTION_REGEX.test(institution);
export const validateTitle = (title: string): boolean => TITLE_REGEX.test(title);
export const validateProjectName = (name: string): boolean => PROJECT_NAME_REGEX.test(name);
export const validateTechnology = (tech: string): boolean => TECHNOLOGY_REGEX.test(tech);
export const validateDescription = (description: string): boolean => DESCRIPTION_REGEX.test(description);

// Field validation rules
export const FIELD_VALIDATION_RULES = {
  email: {
    required: true,
    validate: validateEmail,
    message: VALIDATION_MESSAGES.EMAIL,
  },
  phone: {
    required: true,
    validate: validatePhone,
    message: VALIDATION_MESSAGES.PHONE,
  },
  website: {
    required: false,
    validate: validateWebsiteUrl,
    message: VALIDATION_MESSAGES.WEBSITE,
  },
  linkedin: {
    required: false,
    validate: validateLinkedInUrl,
    message: VALIDATION_MESSAGES.LINKEDIN,
  },
  github: {
    required: false,
    validate: validateGithubUrl,
    message: VALIDATION_MESSAGES.GITHUB,
  },
  fullName: {
    required: true,
    validate: validateName,
    message: VALIDATION_MESSAGES.NAME,
  },
  location: {
    required: true,
    validate: validateLocation,
    message: VALIDATION_MESSAGES.LOCATION,
  },
  title: {
    required: true,
    validate: validateTitle,
    message: VALIDATION_MESSAGES.TITLE,
  },
  institution: {
    required: true,
    validate: validateInstitution,
    message: VALIDATION_MESSAGES.INSTITUTION,
  },
  degree: {
    required: true,
    validate: validateTitle,
    message: VALIDATION_MESSAGES.TITLE,
  },
  company: {
    required: true,
    validate: validateInstitution,
    message: VALIDATION_MESSAGES.INSTITUTION,
  },
  position: {
    required: true,
    validate: validateTitle,
    message: VALIDATION_MESSAGES.TITLE,
  },
  projectName: {
    required: true,
    validate: validateProjectName,
    message: VALIDATION_MESSAGES.PROJECT_NAME,
  },
  technology: {
    required: true,
    validate: validateTechnology,
    message: VALIDATION_MESSAGES.TECHNOLOGY,
  },
  description: {
    required: true,
    validate: validateDescription,
    message: VALIDATION_MESSAGES.DESCRIPTION,
  },
  credentialId: {
    required: false,
    validate: validateCredentialId,
    message: VALIDATION_MESSAGES.CREDENTIAL_ID,
  },
  credentialUrl: {
    required: false,
    validate: validateUrl,
    message: VALIDATION_MESSAGES.URL,
  },
  date: {
    required: true,
    validate: validateDate,
    message: VALIDATION_MESSAGES.DATE,
  },
}; 