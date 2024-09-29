import * as crypto from "crypto";

const algorithm = "aes-256-cbc"; // Encryption algorithm
const secretKey = process.env.SECRET_KEY || "my_secret_key_1234567890123456"; // 32 chars for aes-256
const iv = crypto.randomBytes(16); // Initialization vector

// Function to encrypt a message
export function encrypt(text: string): { iv: string; content: string } {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    content: encrypted,
  };
}

// Function to decrypt a message
export function decrypt(hash: { iv: string; content: string }): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(hash.iv, "hex")
  );

  let decrypted = decipher.update(hash.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
