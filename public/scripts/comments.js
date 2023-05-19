async function getComments(href, id) {
  return await fetch(href + 'comments?mode=user&id=' + id).then((response) =>
    response.json(),
  );
}

async function addComments(href, commentsList, id, container) {
  let comments = document.createElement('div');
  comments.setAttribute('class', 'list_vertical');
  console.log('list: ' + commentsList);
  for (let i = 0; i < commentsList.length; i++) {
    let commentJson = commentsList[i];
    console.log(commentJson);
    let comment = document.createElement('article');
    comment.setAttribute('class', 'article');
    comment.innerHTML =
      '<a href="' +
      href +
      'open/' +
      commentJson['postId'] +
      '">' +
      'Пост: ' +
      commentJson['postHeadline'] +
      '</a>' +
      ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbspКомментарий: ' +
      commentJson['text'] +
      ' &nbsp&nbsp&nbsp&nbsp&nbsp&nbspID: ' +
      commentJson['stringId'];
    comments.appendChild(comment);
  }

  container.appendChild(comments);
}

async function loadComments(href, id, container) {
  if (msg != null) {
    container.removeChild(msg);
    msg = null;
  }
  let gif = document.createElement('img');
  gif.setAttribute(
    'src',
    'https://cdn3.emoji.gg/emojis/9954-breakdancing-cat.gif',
  );
  container.appendChild(gif);
  gif.setAttribute('width', 225);
  gif.setAttribute('width', 225);
  gif.setAttribute('class', 'update_gif');

  try {
    data = (await getComments(href, id)).comments;
    console.log('DATA!');
    console.log(data);
    await addComments(href, data, id, container);
  } catch (e) {
    console.log(e);
    if (msg == null) {
      msg = document.createElement('div');
      msg.setAttribute('class', 'message');
      msg.innerText = '! Что-то пошло не так !';
      container.appendChild(msg);
    }
  } finally {
    container.removeChild(gif);
  }
}

let container = document.getElementById('container');
let msg = null;
let pos = window.location.href.lastIndexOf('my-comments');
let href = window.location.href.substring(0, pos);
console.log('HREF:');
console.log(href);

function onLoad(event) {
  loadComments(href, id, container);
}

function onSubmitEdit(event) {
  const id = document.getElementById('idEdit').value;
  const text = document.getElementById('text').value;
  fetch(href + 'comments', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId: id,
      text: text,
    }),
  }).then((response) => console.log(response.json()));
}

function onSubmitDelete(event) {
  const id = document.getElementById('idDelete').value;
  fetch(href + 'comments', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId: id,
    }),
  });
}

document.addEventListener('DOMContentLoaded', onLoad);

const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', onSubmitEdit);

const deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', onSubmitDelete);
