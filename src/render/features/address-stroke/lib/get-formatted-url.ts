export const getFormattedUrl = (input: string): string => {
  // Регулярка для проверки полного URL
  const urlPattern = /^(https?:\/\/)/i;
  // Регулярка для проверки доменного имени (без протокола)
  const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (urlPattern.test(input)) {
    // Если уже содержит http:// или https://, ничего не меняем
    return input;
  } else if (domainPattern.test(input)) {
    // Если это домен без протокола, добавляем https://
    return `https://${input}`;
  } else {
    // В остальных случаях считаем, что это поисковый запрос, и отправляем в Google
    const searchQuery = encodeURIComponent(input);
    return `https://www.google.com/search?q=${searchQuery}`;
  }
};