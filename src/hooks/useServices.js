import { useState, useEffect, useCallback } from 'react';
import { services as defaultServices } from '../data/mockData';

export const useServices = () => {
  const [services, setServices] = useState(() => {
    // Сначала пытаемся загрузить из localStorage
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        if (Array.isArray(parsedServices) && parsedServices.length > 0) {
          return parsedServices;
        }
      } catch (error) {
        console.error('Ошибка парсинга услуг при инициализации:', error);
      }
    }
    // Если нет данных в localStorage, используем данные по умолчанию
    return defaultServices;
  });

  const loadServices = useCallback(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        if (Array.isArray(parsedServices)) {
          // Проверяем, что все элементы массива валидны
          const validServices = parsedServices.filter(service => 
            service && 
            typeof service === 'object' && 
            service.id && 
            (service.title || service.name)
          );
          
          if (validServices.length > 0) {
            setServices(validServices);
          } else {
            console.warn('Нет валидных услуг в localStorage, используем данные по умолчанию');
            setServices(defaultServices);
          }
        } else {
          console.warn('Данные услуг не являются массивом, используем данные по умолчанию');
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Ошибка парсинга услуг:', error);
        console.log('Поврежденные данные:', storedServices);
        // Очищаем поврежденные данные
        localStorage.removeItem('services');
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
    }
  }, []);

  useEffect(() => {
    loadServices();

    const handleStorageChange = (e) => {
      if (e.key === 'services') {
        loadServices();
      }
    };

    const handleDataUpdate = () => {
      loadServices();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated_services', handleDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated_services', handleDataUpdate);
    };
  }, []); // Убираем loadServices из зависимостей

  return services;
};
