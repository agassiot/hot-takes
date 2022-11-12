var newCommentL = document.querySelector('.new-comment-form');
var delBtnL = document.querySelectorAll('.del-butt');


newCommentL.addEventListener('submit', handleSub);
delBtnL.forEach(x=>x.addEventListener('click', handleClick));


async function handleClick(e){
  let post = document.querySelector('#post-id').value;
  let comment = e.target.getAttribute('data-id');
  await fetch(`/api/posts/${post}/comment/${comment}`, {
    method: 'DELETE',
  });
  return document.location.reload();
};



async function handleSub(e) {
    e.preventDefault();

    let body = await document.querySelector('#comment-body').value.trim();
    let post = document.querySelector('#post-id').value;
    
    if (body && post_id) {
        await fetch(`/api/posts/${post}/comment`, {
          method: 'POST',
          body: JSON.stringify({ body }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
       return document.location.replace(`/post/${post}`);
      }
  };