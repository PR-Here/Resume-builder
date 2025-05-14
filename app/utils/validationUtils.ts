import { FIELD_VALIDATION_RULES, VALIDATION_MESSAGES } from './validationConstants';

interface ValidationError {
  field: string;
  message: string;
}

export const validateField = (field: string, value: string): ValidationError | null => {
  const rules = FIELD_VALIDATION_RULES[field];
  
  if (!rules) {
    return null;
  }

  if (rules.required && !value) {
    return {
      field,
      message: VALIDATION_MESSAGES.REQUIRED,
    };
  }

  if (value && rules.validate && !rules.validate(value)) {
    return {
      field,
      message: rules.message,
    };
  }

  return null;
};

export const validateForm = (fields: Record<string, string>): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.entries(fields).forEach(([field, value]) => {
    const error = validateField(field, value);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};

export const validateDateRange = (startDate: string, endDate: string, isCurrent: boolean): ValidationError | null => {
  if (isCurrent) {
    return null;
  }

  if (!startDate || !endDate) {
    return {
      field: 'date',
      message: VALIDATION_MESSAGES.REQUIRED,
    };
  }

  const start = new Date(startDate.split('/').reverse().join('-'));
  const end = new Date(endDate.split('/').reverse().join('-'));

  if (end < start) {
    return {
      field: 'date',
      message: 'End date must be after start date',
    };
  }

  return null;
};

export const validateUrl = (url: string, type: 'website' | 'linkedin' | 'github' | 'credential'): ValidationError | null => {
  if (!url) {
    return null;
  }

  const rules = FIELD_VALIDATION_RULES[type];
  if (!rules.validate(url)) {
    return {
      field: type,
      message: rules.message,
    };
  }

  return null;
}; 