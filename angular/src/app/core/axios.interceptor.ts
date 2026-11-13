import axios from 'axios';
import { environment } from '@environment/environment';
import {
  WORD_KEY_AUTHORIZATION_GLOBAL,
  WORD_KEY_BEARER_GLOBAL,
} from '@const/app.const';
import { getAccessToken, getAuthRole, setAccessToken, clearAccessToken } from './token.store';

let refreshPromise: Promise<string> | null = null;

function isAdminUrl(url: string): boolean {
  return /authadmin|admin/i.test(url || '');
}

function getTokenPair(): { isAdmin: boolean; access: string | null; refresh: string | null } {
  const role = getAuthRole();
  const isAdmin = role === 'admin' || (role === null && true);
  const access = getAccessToken();
  const refresh = null; // refresh vive en cookie httpOnly
  return { isAdmin, access, refresh };
}

export async function refreshAccessToken(isAdmin: boolean): Promise<string> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    const role = isAdmin ? 'admin' : 'final';
    const endpoint = isAdmin ? 'authadmin/refresh' : 'authuser/refresh';
    try {
      const res = await axios.post(environment.apiUrl + endpoint, {}, { withCredentials: true });
      const data = res.data;
      const newAccess = typeof data === 'string' ? data : (data?.access_token || data?.token || '');
      if (newAccess) setAccessToken(newAccess, role);
      return newAccess;
    } catch (e) {
      clearAccessToken();
      window.location.href = '/';
      throw e;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

export function setupAxiosInterceptors(): void {
  axios.interceptors.request.use((config) => {
    const url = config.url || '';
    // No adjuntar token a los endpoints de auth (login/refresh/logout)
    if (/auth(admin|user)\/(login|refresh|logout)/i.test(url)) {
      return config;
    }
    const access = getAccessToken();
    const role = getAuthRole();
    const isAdmin = role ? role === 'admin' : isAdminUrl(url);
    if (access) {
      config.headers = config.headers || {};
      (config.headers as any)[WORD_KEY_AUTHORIZATION_GLOBAL] =
        `${WORD_KEY_BEARER_GLOBAL} ${access}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error?.config;
      if (!original || original._retry) {
        return Promise.reject(error);
      }
      if (error?.response?.status !== 401) {
        return Promise.reject(error);
      }
      original._retry = true;
      const isAdmin = isAdminUrl(original.url || '');
      try {
        const newToken = await refreshAccessToken(isAdmin);
        original.headers = original.headers || {};
        (original.headers as any)[WORD_KEY_AUTHORIZATION_GLOBAL] =
          `${WORD_KEY_BEARER_GLOBAL} ${newToken}`;
        return axios(original);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  );
}
