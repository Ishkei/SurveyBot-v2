import jwtDecode from "jwt-decode";

interface JWTToken {
  sub: string;
  destinationUrl?: string;
  countryCode: string;
  panelProvider: string;
  demographics_v2: boolean;
  exp?: number;
}

export const getUserGuid = (token: string) => {
  try {
    const { sub }: JWTToken = jwtDecode(token);
    return sub;
  } catch (error) {
    return "";
  }
};

export const decodeToken = (token: string) => {
  try {
    const jwt: JWTToken = jwtDecode(token);
    return jwt;
  } catch (error) {
    return {};
  }
};
