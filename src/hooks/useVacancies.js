import { useState, useEffect, useCallback } from 'react';
import { vacancies as defaultVacancies } from '../data/mockData';

export const useVacancies = () => {
  const [vacancies, setVacancies] = useState(() => {
    // Сначала пытаемся загрузить из localStorage
    const storedVacancies = localStorage.getItem('vacancies');
    if (storedVacancies) {
      try {
        const parsedVacancies = JSON.parse(storedVacancies);
        if (Array.isArray(parsedVacancies) && parsedVacancies.length > 0) {
          return parsedVacancies;
        }
      } catch (error) {
        console.error('Ошибка парсинга вакансий при инициализации:', error);
      }
    }
    // Если нет данных в localStorage, используем данные по умолчанию
    return defaultVacancies;
  });

  const loadVacancies = useCallback(() => {
    const storedVacancies = localStorage.getItem('vacancies');
    if (storedVacancies) {
      try {
        const parsedVacancies = JSON.parse(storedVacancies);
        if (Array.isArray(parsedVacancies) && parsedVacancies.length > 0) {
          setVacancies(parsedVacancies);
        } else {
          setVacancies(defaultVacancies);
        }
      } catch (error) {
        console.error('Ошибка парсинга вакансий:', error);
        setVacancies(defaultVacancies);
      }
    } else {
      setVacancies(defaultVacancies);
    }
  }, []);

  useEffect(() => {
    loadVacancies();

    const handleStorageChange = (e) => {
      if (e.key === 'vacancies') {
        loadVacancies();
      }
    };

    const handleDataUpdate = () => {
      loadVacancies();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated_vacancies', handleDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated_vacancies', handleDataUpdate);
    };
  }, []); // Убираем loadVacancies из зависимостей

  return vacancies;
};
