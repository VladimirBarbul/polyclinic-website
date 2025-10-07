// Утилита для очистки кэша и принудительного обновления данных
export const clearCacheAndReload = () => {
  // Очищаем localStorage
  localStorage.clear();
  
  // Перезагружаем страницу
  window.location.reload();
};

// Функция для обновления только контактов клиники
export const updateClinicContacts = () => {
  const { clinicInfo } = require('../data/mockData');
  localStorage.setItem('clinicContacts', JSON.stringify([clinicInfo]));
  
  // Отправляем событие обновления
  window.dispatchEvent(new Event('dataUpdated_clinicContacts'));
};
