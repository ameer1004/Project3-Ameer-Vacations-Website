import crypto from "crypto";
export const hash = (value: string, algorithm = "sha256") => {
  return crypto.createHash(algorithm).update(value).digest("hex");
};
