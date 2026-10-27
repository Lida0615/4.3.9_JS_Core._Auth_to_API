const baseUrl = 'http://94.198.50.185:8031';

const login = 'test@example.com';
const password = 'string';
const name = 'Kristina';
const surname = 'Kristina';

async function register() {
  const response = await fetch(baseUrl + '/api/users/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
      name: name,
      surname: surname,
    }),
  });

  const result = await response.text();
  console.log('Регистрация:');
  console.log(result);
}

async function loginUser() {
  const response = await fetch(baseUrl + '/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  });

  const result = await response.json();
  console.log('Авторизация:');
  console.log(result);

  return result.accessToken;
}

async function getCurrentUser(token) {
  const response = await fetch(baseUrl + '/api/users/current/get', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const result = await response.json();
  console.log('Текущий пользователь:');
  console.log(result);
}

async function main() {
  await register();
  const token = await loginUser();
  await getCurrentUser(token);
}

main();
