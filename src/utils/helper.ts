export function getLocalStorageData(key: string): any | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }  catch (error) {
    console.error("Error getting localStorage data:", error);
    return null;
  }
}

export function setLocalStorageData(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage data:", error);
  }
}

export function removeLocalStorageData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage data:", error);
  }
}

export function maskEmail(email: string) {
  const [username, domain] = email.split("@");

  if (!username || !domain) return email;

  const visiblePart = username.slice(0, 4);
  const maskedPart = "*".repeat(
    Math.max(username.length - 4, 0)
  );

  return `${visiblePart}${maskedPart}@${domain}`;
};

// format float vales like 
// 1234.00234 => 1234.00
export function getFloatValue(value: number | string, fractionDigits: number = 2,fallbackOnNull: string = "") {
  // Handle null/undefined
  if (value == null) {
    return fallbackOnNull;
  }

  // Handle strings: trim and detect blank
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return fallbackOnNull;
    }
    // Reassign to trimmed for parsing
    value = trimmed;
  }

  // Try to parse as float
  const num = typeof value === 'number' ? value : parseFloat(value);

  // If parsing failed or value is not a finite number, use fallback
  if (!Number.isFinite(num)) {
    return fallbackOnNull;
  }

  // Return integer as number; decimal as string with two places
  if (Number.isInteger(num)) {
    return num; // e.g., 2
  } else {
    return num.toFixed(fractionDigits); // e.g., "2.50"
  }
}