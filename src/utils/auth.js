// Простая система аутентификации с дополнительной защитой
const ADMIN_CREDENTIALS = {
  email: 'admin@clinic.com',
  password: 'admin123'
};

// Генерируем простой токен на основе времени и случайных данных
const generateToken = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return btoa(timestamp + random); // Простое кодирование base64
};

// Проверяем валидность токена
const isValidToken = (token) => {
  if (!token) return false;
  
  try {
    const decoded = atob(token);
    const timestamp = parseInt(decoded.substring(0, 13));
    
    // Токен действителен 24 часа
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    return (now - timestamp) < dayInMs;
  } catch (error) {
    return false;
  }
};

export const authenticate = (email, password) => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const token = generateToken();
    const sessionData = {
      token,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ip: 'unknown' // В реальном приложении получали бы IP с сервера
    };
    
    localStorage.setItem('adminAuth', JSON.stringify(sessionData));
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  try {
    const authData = localStorage.getItem('adminAuth');
    if (!authData) return false;
    
    const session = JSON.parse(authData);
    
    // Проверяем токен
    if (!isValidToken(session.token)) {
      logout();
      return false;
    }
    
    // Проверяем user agent (дополнительная защита)
    if (session.userAgent !== navigator.userAgent) {
      logout();
      return false;
    }
    
    // Проверяем время сессии (максимум 24 часа)
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    if ((now - session.timestamp) > dayInMs) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('adminAuth');
};

// Дополнительная защита - проверяем целостность localStorage
export const validateAuthIntegrity = () => {
  const authData = localStorage.getItem('adminAuth');
  if (!authData) return false;
  
  try {
    const session = JSON.parse(authData);
    
    // Проверяем структуру данных
    if (!session.token || !session.timestamp || !session.userAgent) {
      logout();
      return false;
    }
    
    // Проверяем формат токена
    if (typeof session.token !== 'string' || session.token.length < 10) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    logout();
    return false;
  }
};
