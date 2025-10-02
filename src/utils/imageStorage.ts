const STORAGE_KEY = 'urbanswag_images';

export const getImageUrls = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return Array(6).fill('');
};

export const saveImageUrls = (urls: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};