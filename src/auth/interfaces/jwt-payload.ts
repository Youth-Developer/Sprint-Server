export interface JwtPayload {
  username: string;
  userId: number;
  iss?: string;
  sub?: string;
  iat?: Date;
  exp?: Date;
  jti?: string;
}
