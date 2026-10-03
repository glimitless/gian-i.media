export default function clampPDFPage(index: number, pageCount: number): number {
  return Math.min(Math.max(index, 0), pageCount - 1);
}