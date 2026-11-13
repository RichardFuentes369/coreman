import axios from 'axios';
import { environment } from '@environment/environment';
import {
  STORAGE_KEY_TOKEN_ADMIN,
  STORAGE_KEY_TOKEN_FINAL,
  WORD_KEY_AUTHORIZATION_GLOBAL,
  WORD_KEY_BEARER_GLOBAL,
} from '@const/app.const';

const REFRESH_ADMIN = 'refresh_token_admin';
const REFRESH_FINAL = 'refresh_token_final';

let refreshPromise: Promise<string> | null = null;

function isAdminUrl(url: string): boolean {
  return /authadmin|admin/i.test(url || '');
}

function getTokenPair(): { isAdmin: boolean; access: string | null; refresh: string | null } {
  const adminAccess = localStorage.getItem(STORAGE_KEY_TOKEN_ADMIN);
  const finalAccess = localStorage.getItem(STORAGE_KEY_TOKEN_FINAL);
  const isAdmin = !!adminAccess && !finalAccess ? true : (adminAccess ? true : false);
  // Si ambos existen, preferir admin (la mayoría de endpoints lo son)
  const access = adminAccess || finalAccess;
  const refresh = adminAccess
    ? localStorage.getItem(REFRESH_ADMIN)
    : localStorage.getItem(REFRESH_FINAL);
  return { isAdmin: !!adminAccess, access, refresh };
}

async function doRefresh(isAdmin: boolean): Promise<string> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    const refreshKey = isAdmin ? REFRESH_ADMIN : REFRESH_FINAL;
    const accessKey = isAdmin ? STORAGE_KEY_TOKEN_ADMIN : STORAGE_KEY_TOKEN_FINAL;
    const endpoint = isAdmin ? 'authadmin/refresh' : 'authuser/refresh';
    const refresh = localStorage.getItem(refreshKey) || localStorage.getItem(accessKey) || '';
    try {
      const res = await axios.post(environment.apiUrl + endpoint, { token: refresh });
      const data = res.data;
      const newAccess = typeof data === 'string' ? data : (data?.access_token || data?.token || '');
      const newRefresh = typeof data === 'string' ? null : (data?.refresh_token || null);
      if (newAccess) localStorage.setItem(accessKey, newAccess);
      if (newRefresh) localStorage.setItem(refreshKey, newRefresh);
      return newAccess;
    } catch (e) {
      // Logout forzado
      localStorage.removeItem(accessKey);
      localStorage.removeItem(refreshKey);
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
    const { isAdmin, access } = getTokenPair();
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
        const newToken = await doRefresh(isAdmin);
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
