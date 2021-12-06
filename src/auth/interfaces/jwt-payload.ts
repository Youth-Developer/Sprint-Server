export interface JwtPayload {
  iss: string;
  sub?: string;
  username?: string;
  userId?: number;
  email?: string;
}
