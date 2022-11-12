var editL = document.querySelectorAll('.edit-butt');
var delBtnL = document.querySelectorAll('.del-butt');
var postL = document.querySelector('.newpost');

postL.addEventListener('submit', handlePost)
delBtnL.forEach(x=>x.addEventListener('click', handleClick));
editL.forEach(x=>x.addEventListener('click', editHandler));



async function handlePost(e) {
  e.preventDefault();
  
  let title = document.querySelector('#post-title').value.trim();
  let body = document.querySelector('#post-body').value.trim();
  let author = document.querySelector('#author').value;

  if (title && body && author) {
    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      return document.location.replace('/profile');
  }
};

async function handleClick(e){
  if (e.target.hasAttribute('data-id')) {
    let id = e.target.getAttribute('data-id');
    
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
      return document.location.replace('/profile');
  }
};

async function editHandler (e) {
  e.target.hasAttribute('data-id') ? document.location.replace(`/edit/${e.target.getAttribute('data-id')}`) : console.log('post missing');
  };







  