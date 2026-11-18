export const handleLanguageChange = (val) => {
  const newLanguage = val;
  localStorage.setItem("selectedLanguage", newLanguage);
};
