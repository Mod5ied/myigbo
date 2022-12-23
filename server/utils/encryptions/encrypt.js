import bcrypt from "bcrypt";

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function compareHashed({ rawPassword, hashedPassword }) {
  return await bcrypt.compare(rawPassword, hashedPassword);
}

function hashEmail(email) {
  const separatorIndex = email.indexOf("@");
  if (separatorIndex < 3) {
    return email.slice(0, separatorIndex).replace(/./g, "*") + email.slice(separatorIndex);
  }
  return email.slice(0, 2) + email.slice(2, separatorIndex).replace(/./g, "*") + email.slice(separatorIndex);
}

export { encryptPassword, compareHashed, hashEmail };
