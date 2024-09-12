# Customer Anonymization Service

## Опис

Цей сервіс стежить за появою та зміною документів у колекції MongoDB `customers` і копіює їх до колекції `customers_anonymised`, анонімізуючи особисті дані покупців.

## Вимоги

- Node.js v18+
- MongoDB
- Наявність файлу `.env` з налаштуваннями підключення до бази даних.

## Налаштування

1. Встановіть залежності:

   ```bash
   npm install
   ```

2. Створіть файл .env у кореневій директорії з наступним вмістом:

   ```bash
    DB_URI=mongodb:uri
   ```

## Запуск

1. Збирає проект з TypeScript у JavaScript, створюючи папку dist для запуску серверних скриптів.

```bash
npm run build
```

2. Запускає основний сервер, який слухає зміни в колекції customers і анонімізує дані користувачів у колекції customers_anonymised.

```bash
npm run start
```

3. Генерує випадкові записи покупців у колекції customers для тестування.

```bash
npm run generate
```
