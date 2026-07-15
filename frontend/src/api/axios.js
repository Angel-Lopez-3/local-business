import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// El accessToken vive 15 minutos. Si expira mid-session, intentamos
// refrescarlo una sola vez de forma transparente antes de rendirnos.
let isRefreshing = false;
let pendingQueue = [];

const resolveQueue = (error) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const isAuthRoute =
      config?.url?.includes("/auth/login") ||
      config?.url?.includes("/auth/refresh-token") ||
      config?.url?.includes("/auth/register");

    if (response?.status !== 401 || isAuthRoute || config._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then(() => api(config));
    }

    config._retry = true;
    isRefreshing = true;

    try {
      await api.post("/auth/refresh-token");
      resolveQueue(null);
      return api(config);
    } catch (refreshError) {
      resolveQueue(refreshError);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
