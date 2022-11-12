var editL = document.querySelector('.edit-form');
editL.addEventListener('submit', editHandler);



async function editHandler(e){
  e.preventDefault();

  let title = document.querySelector('#post-title').value.trim();
  let body = document.querySelector('#post-body').value.trim();
  let author = document.querySelector('#author').value;
  let id = document.querySelector('#post-id').value;

  if (id && title && body && author) {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
     return document.location.replace('/profile');
    }
  };




