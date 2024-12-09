const crypto = require("crypto");

// Generate a random 32-byte key and 16-byte IV for AES-256 encryption
const key = crypto.randomBytes(32); // Key must be 32 bytes for AES-256
const iv = crypto.randomBytes(16); // IV must be 16 bytes

const algorithm = "aes-256-cbc"; // AES encryption algorithm

// Function to encrypt data
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt data
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Example Usage
const text = "Hello, Abdurrahman!";
const encryptedText = encrypt(text);
console.log("Encrypted:", encryptedText);

const decryptedText = decrypt(encryptedText);
console.log("Decrypted:", decryptedText);
