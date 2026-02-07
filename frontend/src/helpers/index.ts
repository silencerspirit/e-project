export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '');

  return [digits.slice(0, 1), digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)].join(
    ' ',
  );
}
