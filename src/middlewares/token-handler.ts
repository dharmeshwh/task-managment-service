import jwt from "jsonwebtoken";

export interface IVerifyTokenResponse {
  userId: string;
}

// Function to verify the JWT token and return the decoded data
export const verifyToken = async (token): Promise<IVerifyTokenResponse> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(`No JWT_SECRET exists`);
    }
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
