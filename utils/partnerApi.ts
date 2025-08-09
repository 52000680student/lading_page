// Partner API utilities

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

interface ResultItem {
  id: number;
  createdDate: string;
  sid: string;
  companyId: number;
  requestDate: string;
  patientName: string;
  dob: string;
  departmentName: string;
  stateName: string;
  address: string;
  serviceTypeName: string;
  subState: number;
  state: number;
}

interface ResultsResponse {
  data: ResultItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

interface ResultsParams {
  search?: string;
  page: number;
  size?: number;
  start?: string;
  end?: string;
  departmentId: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
const KEY_LOGIN = process.env.NEXT_PUBLIC_KEY_LOGIN || '';

// Login API call
export const loginPartner = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const response = await fetch(`${BASE_URL}/connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${KEY_LOGIN}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

// Fetch results API call
export const fetchResults = async (params: ResultsParams, token: string): Promise<ResultsResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.search) searchParams.append('search', params.search);
  searchParams.append('page', params.page.toString());
  searchParams.append('size', (params.size || 50).toString());
  if (params.start) searchParams.append('start', params.start);
  if (params.end) searchParams.append('end', params.end);
  searchParams.append('departmentId', params.departmentId.toString());

  const response = await fetch(`${BASE_URL}/api/la/v1/results-landing-page?${searchParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Token expired');
    }
    throw new Error('Failed to fetch results');
  }

  return response.json();
};

// Format date for API (yyyy/MM/dd)
export const formatDateForApi = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Parse date from API response
export const parseApiDate = (dateString: string): Date => {
  return new Date(dateString);
};