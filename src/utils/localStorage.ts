export function setItem(key: string, value: object) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
}

export function getItem(key: string) {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
