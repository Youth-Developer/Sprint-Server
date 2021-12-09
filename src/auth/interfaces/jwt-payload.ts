export interface JwtPayload {
  iss: string;
  sub?: string;
  iat?: number;
  exp?: number;
  username?: string;
  userId?: number;
}
