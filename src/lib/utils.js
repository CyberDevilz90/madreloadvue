import { ref } from "vue";

const dateToday = ref("");
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
const year = today.getFullYear();
dateToday.value = `${year}-${month}-${day}`;

export function formatPrice(value) {
  if (value === undefined || value === null) {
    return 'N/A'; // Atau nilai default yang sesuai
  }

  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}

export const currentDate = dateToday
export const currentMonth = month
export const currentYear = year