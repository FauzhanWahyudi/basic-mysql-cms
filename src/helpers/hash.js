import bcrypt from "bcryptjs";

export default async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
  // return hashed.substring(0, 54);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);

  // const salt = await bcrypt.genSalt(10);
  // const hashed = await bcrypt.hash(password, salt);
  // const shortHash = hashed.substring(0, 54);
  // console.log("🚀 ~ comparePassword ~ hash:", hash);
  // console.log("🚀 ~ comparePassword ~ shortHash:", shortHash);
  // return bcrypt.compare(shortHash, hash);
}
