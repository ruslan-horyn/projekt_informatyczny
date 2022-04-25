import bcrypt from 'bcrypt';

export const hashedPassword = async (
  pass: string,
  amount: number = 8,
): Promise<string> => {
  const salt = await bcrypt.genSalt(amount);

  return bcrypt.hash(pass, salt);
};

export const doPasswordsMatch = async (
  pass: string,
  hashedPass: string = '',
): Promise<boolean> => bcrypt.compare(pass, hashedPass);
