import { useState, useEffect, useCallback } from 'react';
import { services as defaultServices } from '../data/mockData';

export const useServices = () => {
  const [services, setServices] = useState(() => {
    return defaultServices;
  });

  const loadServices = useCallback(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        if (Array.isArray(parsedServices) && parsedServices.length > 0) {
          setServices(parsedServices);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Ошибка парсинга услуг:', error);
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
  }, [loadServices]);

  return services;
};
