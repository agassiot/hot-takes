document.querySelector('#logout').addEventListener('click', logout);


async function logout () {
   await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
    return document.location.replace('/');
};

