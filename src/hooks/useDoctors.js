import { useState, useEffect, useCallback } from 'react';
import { doctors as defaultDoctors } from '../data/mockData';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState(() => {
    // Сначала пытаемся загрузить из localStorage
    const storedDoctors = localStorage.getItem('doctors');
    if (storedDoctors) {
      try {
        const parsedDoctors = JSON.parse(storedDoctors);
        if (Array.isArray(parsedDoctors) && parsedDoctors.length > 0) {
          return parsedDoctors;
        }
      } catch (error) {
        console.error('Ошибка парсинга врачей при инициализации:', error);
      }
    }
    // Если нет данных в localStorage, используем данные по умолчанию
    return defaultDoctors;
  });

  const loadDoctors = useCallback(() => {
    const storedDoctors = localStorage.getItem('doctors');
    if (storedDoctors) {
      try {
        const parsedDoctors = JSON.parse(storedDoctors);
        if (Array.isArray(parsedDoctors) && parsedDoctors.length > 0) {
          setDoctors(parsedDoctors);
        } else {
          setDoctors(defaultDoctors);
        }
      } catch (error) {
        console.error('Ошибка парсинга врачей:', error);
        setDoctors(defaultDoctors);
      }
    } else {
      setDoctors(defaultDoctors);
    }
  }, []);

  useEffect(() => {
    loadDoctors();

    const handleStorageChange = (e) => {
      if (e.key === 'doctors') {
        loadDoctors();
      }
    };

    const handleDataUpdate = () => {
      loadDoctors();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated_doctors', handleDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated_doctors', handleDataUpdate);
    };
  }, []); // Убираем loadDoctors из зависимостей

  return doctors;
};
