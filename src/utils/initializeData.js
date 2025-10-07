import { doctors, services, vacancies, clinicInfo } from '../data/mockData';

export const initializeData = () => {
  try {
    // Инициализируем данные только если их нет в localStorage
    if (!localStorage.getItem('doctors')) {
      localStorage.setItem('doctors', JSON.stringify(doctors));
    }
    
    if (!localStorage.getItem('services')) {
      localStorage.setItem('services', JSON.stringify(services));
    }
    
    if (!localStorage.getItem('vacancies')) {
      localStorage.setItem('vacancies', JSON.stringify(vacancies));
    }
    
    // Всегда обновляем контакты клиники, чтобы исправить название
    localStorage.setItem('clinicContacts', JSON.stringify([clinicInfo]));
    
    console.log('Data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
    // Если localStorage не работает, данные будут загружаться из mockData
  }
};
