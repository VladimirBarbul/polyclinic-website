import { useState, useEffect, useCallback } from 'react';
import { clinicInfo as defaultClinicInfo } from '../data/mockData';

export const useContacts = () => {
  const [contacts, setContacts] = useState(() => {
    // Инициализируем с defaultClinicInfo сразу
    return defaultClinicInfo;
  });

  const loadContacts = useCallback(() => {
    const storedContacts = localStorage.getItem('clinicContacts');
    if (storedContacts) {
      try {
        const parsedContacts = JSON.parse(storedContacts);
        if (Array.isArray(parsedContacts) && parsedContacts.length > 0) {
          setContacts(parsedContacts[0]);
        } else if (typeof parsedContacts === 'object') {
          setContacts(parsedContacts);
        }
      } catch (error) {
        console.error('Ошибка парсинга контактов:', error);
        setContacts(defaultClinicInfo);
      }
    } else {
      setContacts(defaultClinicInfo);
    }
  }, []);

  useEffect(() => {
    loadContacts();

    const handleStorageChange = (e) => {
      if (e.key === 'clinicContacts') {
        loadContacts();
      }
    };

    const handleDataUpdate = () => {
      loadContacts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('dataUpdated_clinicContacts', handleDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataUpdated_clinicContacts', handleDataUpdate);
    };
  }, [loadContacts]);

  return contacts;
};
