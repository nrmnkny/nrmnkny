const bcrypt = require('bcryptjs');

const hashPassword = async () => {
  const password = '@en_kenya.';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
};

hashPassword();
