export const formatDateInput = (value: string): string => {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Handle empty input
  if (!digits) return '';
  
  // Format based on input length
  if (digits.length <= 2) {
    // Just the month
    return digits;
  } else if (digits.length <= 4) {
    // Month and year
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    // Full date (MM/YYYY)
    return `${digits.slice(0, 2)}/${digits.slice(2, 6)}`;
  }
};

export const validateDate = (value: string): boolean => {
  // Remove any non-digit characters
  const digits = value.replace(/\D/g, '');
  
  if (!digits) return true;
  
  // Validate month
  if (digits.length >= 2) {
    const month = parseInt(digits.slice(0, 2));
    if (month < 1 || month > 12) return false;
  }
  
  // Validate year
  if (digits.length >= 4) {
    const year = parseInt(digits.slice(2, 6));
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 10) return false;
  }
  
  return true;
};

export const formatDateForDisplay = (value: string): string => {
  if (!value) return '';
  
  const parts = value.split('/');
  if (parts.length !== 2) return value;
  
  const [month, year] = parts;
  return `${month}/${year}`;
}; 