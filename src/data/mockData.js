// API Configuration
export const API_BASE_URL = "http://localhost:5000/api/v1";

// MOCK DATA (Only for Summary - Detailed data is now fetched)
export const MOCK_ATTENDANCE_SUMMARY = {
  totalPresents: 20,
  totalAbsents: 2,
  totalHalfDays: 1,
  totalWeekOffs: 4,
  totalHolidays: 2,
};

/**
 * Utility function to format Date object to YYYY-MM-DD string.
 * @param {Date} date - The date object to format.
 */
export const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Calculates the default start date (30 days ago) and end date (today).
 */
export const calculateDefaultDates = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  return {
    defaultStartDate: formatDate(thirtyDaysAgo),
    defaultEndDate: formatDate(today),
  };
};

const { defaultStartDate, defaultEndDate } = calculateDefaultDates();
export { defaultStartDate, defaultEndDate };
