// Функция для валидации украинских номеров телефонов
export const validateUkrainianPhone = (phone) => {
  if (!phone) return false;
  
  // Убираем все пробелы, дефисы и скобки
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Проверяем различные форматы украинских номеров
  const patterns = [
    /^\+380\d{9}$/,           // +380XXXXXXXXX
    /^380\d{9}$/,             // 380XXXXXXXXX
    /^0\d{9}$/,               // 0XXXXXXXXX
    /^\+38\d{10}$/,           // +38XXXXXXXXXX
    /^38\d{10}$/              // 38XXXXXXXXXX
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
};

// Функция для форматирования номера телефона
export const formatUkrainianPhone = (phone) => {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Если номер начинается с +380, оставляем как есть
  if (cleanPhone.startsWith('+380')) {
    return cleanPhone;
  }
  
  // Если номер начинается с 380, добавляем +
  if (cleanPhone.startsWith('380')) {
    return '+' + cleanPhone;
  }
  
  // Если номер начинается с 0, заменяем на +380
  if (cleanPhone.startsWith('0')) {
    return '+380' + cleanPhone.substring(1);
  }
  
  // Если номер начинается с 38, добавляем +
  if (cleanPhone.startsWith('38')) {
    return '+' + cleanPhone;
  }
  
  return phone;
};

// Функция для получения сообщения об ошибке
export const getPhoneErrorMessage = () => {
  return 'Введіть коректний український номер телефону (наприклад: +380501234567, 0501234567)';
};
