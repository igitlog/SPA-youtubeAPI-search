import axios from "axios";

// Ключи на подобии этого никогда не должны быть доступны другим.
// Поэтому вшивать их в код, заливать в систему контроля версий и прочее
// категорически не рекомендуется.

// Это приложение является тестовым, в реальном проекте, эти данные
// нужно хранить в .env, не забывайте об этом.
const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyBK_KikTXh5_TUvW84aZ7yYUintgQXbyZM',
    part: 'snippet',
  }
})

export const youtubeAPI = {
  async getVideo(question, howManyVideo = 12, order = 'relevance') {
    try {
      return await instance
        .get('/search', {
          params: {
            q: question,
            maxResults: howManyVideo,
            order: order
          },
        });
    } catch (err) {
      if (err.response) {
        console.error(err);
        alert("Ошибка 4хх или 5хх, подробнее в можно посмотреть в консоле");
      } else if (err.request) {
        console.error(err);
        alert("Запрос не ушёл или ответ от сервера не получен(Проверьте соединение)");
      } else {
        console.error(err);
        alert("Возникла ошибка не связанная с запром и ответом от сервера");
      }
    }
  }
}