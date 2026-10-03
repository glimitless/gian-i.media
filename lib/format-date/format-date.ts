import type { EightDigitDate } from "@/types/archive";

export default function formatDate(date:EightDigitDate){
  const str = String(date);
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
}