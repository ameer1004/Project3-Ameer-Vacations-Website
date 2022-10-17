declare module "express-session" {
  interface SessionData {
    user_id?: string;
    username?: string;
    isAdmin?: number;
  }
}

export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Vacation {
  vacationID: number;
  description: string;
  location: string;
  picture: string;
  dateGo: string;
  dateBack: string;
  price: number;
  followersNum: number;
}
