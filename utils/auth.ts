// Token management utilities

interface TokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
  timestamp: number;
}

interface DecodedToken {
  exp: number;
  companyId: number;
  [key: string]: any;
}

// Save token to localStorage
export const saveToken = (tokenData: Omit<TokenData, 'timestamp'>): void => {
  const tokenWithTimestamp: TokenData = {
    ...tokenData,
    timestamp: Date.now()
  };
  localStorage.setItem('partner_token', JSON.stringify(tokenWithTimestamp));
};

// Get token from localStorage
export const getToken = (): TokenData | null => {
  try {
    const tokenStr = localStorage.getItem('partner_token');
    if (!tokenStr) return null;
    return JSON.parse(tokenStr);
  } catch {
    return null;
  }
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('partner_token');
};

// Check if token is expired
export const isTokenExpired = (token: TokenData): boolean => {
  const now = Date.now();
  const expirationTime = token.timestamp + (token.expires_in * 1000);
  return now >= expirationTime;
};

// Decode JWT token to get companyId
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

// Get valid token (check expiration)
export const getValidToken = (): string | null => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    removeToken();
    return null;
  }
  return token.access_token;
};

// Get company ID from token
export const getCompanyId = (): number | null => {
  const token = getValidToken();
  if (!token) return null;
  
  const decoded = decodeToken(token);
  
  // Try different possible field names for companyId, including 'company' claim
  const companyId = decoded?.company || 0;
  
  return companyId ? Number(companyId) : null;
};