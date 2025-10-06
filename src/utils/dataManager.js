// Кэш для хранения данных в памяти
const dataCache = new Map();

export const getData = (key) => {
  // Проверяем кэш сначала
  if (dataCache.has(key)) {
    return dataCache.get(key);
  }

  // Если нет в кэше, загружаем из localStorage
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      // Сохраняем в кэш
      dataCache.set(key, parsedData);
      return parsedData;
    } catch (error) {
      console.error(`Ошибка парсинга данных для ключа ${key}:`, error);
      return null;
    }
  }
  return null;
};

export const setData = (key, data) => {
  try {
    const jsonData = JSON.parse(JSON.stringify(data));
    localStorage.setItem(key, JSON.stringify(jsonData));
    // Обновляем кэш
    dataCache.set(key, jsonData);
    
    // Уведомляем об изменении данных
    window.dispatchEvent(new CustomEvent(`dataUpdated_${key}`, { detail: jsonData }));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения данных для ключа ${key}:`, error);
    return false;
  }
};

export const addItem = (key, item) => {
  const existingData = getData(key) || [];
  const newData = [...existingData, { ...item, id: Date.now() }];
  return setData(key, newData);
};

export const updateItem = (key, id, updatedItem) => {
  const existingData = getData(key) || [];
  const newData = existingData.map(item => 
    item.id === id ? { ...item, ...updatedItem } : item
  );
  return setData(key, newData);
};

export const deleteItem = (key, id) => {
  const existingData = getData(key) || [];
  const newData = existingData.filter(item => item.id !== id);
  return setData(key, newData);
};

export const getItemById = (key, id) => {
  const data = getData(key) || [];
  return data.find(item => item.id === id);
};

