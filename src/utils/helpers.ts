export function isAxiosError(
  error: unknown,
): error is import('axios').AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as Record<string, unknown>).isAxiosError === true
  );
}

export function compareValues(
  a: unknown,
  b: unknown,
  direction: 'ascending' | 'descending',
) {
  const aNum = Number(a);
  const bNum = Number(b);

  if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
    return direction === 'ascending' ? aNum - bNum : bNum - aNum;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    if (a < b) return direction === 'ascending' ? -1 : 1;
    if (a > b) return direction === 'ascending' ? 1 : -1;
  }
  return 0;
}
