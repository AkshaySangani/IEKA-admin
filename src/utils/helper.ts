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

export type TrendType = "high" | "low" | "same";
interface TrendResult {
  type: TrendType;
  difference: number;
  percentage: number;
}

export const getTrend = (current: number, past: number): TrendResult => {
  const difference = current - past;

  const percentage =
    past === 0 ? (current > 0 ? 100 : 0) : Math.abs((difference / past) * 100);

  return {
    type: difference > 0 ? "high" : difference < 0 ? "low" : "same",
    difference: Math.abs(difference),
    percentage: Number(percentage.toFixed(2)),
  };
};

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const twoDigitWords = (num: number): string => {
  if (num < 10) {
    return ones[num];
  }

  if (num < 20) {
    return teens[num - 10];
  }

  const ten = Math.floor(num / 10);
  const one = num % 10;

  return `${tens[ten]}${one ? ` ${ones[one]}` : ""}`;
};

export const numberToWords = (num: number): string => {
  if (num === 0) {
    return "Zero";
  }

  let number = Math.floor(num);
  const parts: string[] = [];

  const crore = Math.floor(number / 10000000);
  number %= 10000000;

  const lakh = Math.floor(number / 100000);
  number %= 100000;

  const thousand = Math.floor(number / 1000);
  number %= 1000;

  const hundred = Math.floor(number / 100);
  number %= 100;

  if (crore) {
    parts.push(`${twoDigitWords(crore)} Crore`);
  }

  if (lakh) {
    parts.push(`${twoDigitWords(lakh)} Lakh`);
  }

  if (thousand) {
    parts.push(`${twoDigitWords(thousand)} Thousand`);
  }

  if (hundred) {
    parts.push(`${ones[hundred]} Hundred`);
  }

  if (number) {
    parts.push(twoDigitWords(number));
  }

  return parts.join(" ");
};


export const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(blobUrl);
};

export const formatAmount = (amount: number) => {
  return `₹ ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
