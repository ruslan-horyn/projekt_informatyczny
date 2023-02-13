import bcrypt from 'bcrypt';

export const hashedPassword = async (
  pass: string,
  amount = 8,
): Promise<string> => {
  const salt = await bcrypt.genSalt(amount);

  return bcrypt.hash(pass, salt);
};

export const doPasswordsMatch = (
  pass: string,
  hashedPass: string,
): Promise<boolean> => bcrypt.compare(pass, hashedPass);
