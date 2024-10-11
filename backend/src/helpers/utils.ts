const bcrypt = require('bcrypt');
const saltRounds = 10;
import { v4 as uuidv4 } from 'uuid';
export const hashPassword = async (plainPassword: string) => {
  try {
    const h = await bcrypt.hash(plainPassword, saltRounds);
    return h;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashPass: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashPass);
  } catch (error) {
    console.log(error);
  }
};

export function removeVietnameseTones(str: string): string {
  const map = {
    à: 'a',
    á: 'a',
    â: 'â',
    ả: 'a',
    ã: 'a',
    ạ: 'a',
    ầ: 'a',
    ấ: 'a',
    ậ: 'a',
    ẫ: 'a',
    ẩ: 'a',
    ă: 'a',
    ẳ: 'a',
    ẵ: 'a',
    ặ: 'a',
    ắ: 'a',
    ằ: 'a',
    è: 'e',
    é: 'e',
    ẻ: 'e',
    ẽ: 'e',
    ê: 'e',
    ể: 'e',
    ễ: 'e',
    ế: 'e',
    ề: 'e',
    ệ: 'e',
    ẹ: 'e',
    ì: 'i',
    í: 'i',
    ỉ: 'i',
    ĩ: 'i',
    ị: 'i',
    ò: 'o',
    ô: 'o',
    ổ: 'o',
    ộ: 'o',
    ồ: 'o',
    ố: 'o',
    ỗ: 'o',
    ó: 'o',
    ỏ: 'o',
    õ: 'o',
    ọ: 'o',
    ù: 'u',
    ú: 'u',
    ủ: 'u',
    ũ: 'u',
    ư: 'u',
    ừ: 'u',
    ứ: 'u',
    ự: 'u',
    ử: 'u',
    ữ: 'u',
    ụ: 'u',
    ỳ: 'y',
    ý: 'y',
    ỷ: 'y',
    ỹ: 'y',
    ỵ: 'y',
    đ: 'd',
  };
  return str.replace(
    /[àáảâãạèéẻẽêẹìíỉĩịòóỏõôọùúủũụỳýỷỹỵđ]/g,
    (match) => map[match],
  );
}

export function generateRandomNumericId(): string {
  return Math.floor(Math.random() * 10000000000).toString();
}
