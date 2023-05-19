let list;

async function getPost(href, id) {
  return await fetch(href + 'posts/' + id).then((response) => response.json());
}

async function getComments(href, id) {
  return await fetch(href + 'comments?mode=post&id=' + id).then((response) =>
    response.json(),
  );
}

async function addPost(href, data, id, container) {
  let headline = document.createElement('div');
  headline.setAttribute('class', 'headline');
  let title = document.createElement('h2');
  title.innerText = data['headline'];
  headline.appendChild(title);

  let frame = document.createElement('div');
  frame.setAttribute('class', 'flex_container');

  let imageUrls = data['imageUrls'];
  for (let i = 0; i < imageUrls.length; i++) {
    let imageUrl = imageUrls[i];
    let picture = document.createElement('img');
    picture.setAttribute('class', 'image');
    picture.setAttribute('src', imageUrl);
    picture.setAttribute('width', 450);
    picture.setAttribute('height', 450);
    frame.appendChild(picture);
  }

  let article = document.createElement('div');
  article.setAttribute('class', 'article');
  article.innerHTML = data['fullName'] + ': ' + data['description'];

  let postButton = document.createElement('div');
  postButton.setAttribute('class', 'post_button_holder');
  postButton.innerHTML =
    '<a class="post_button" href="openPost.html">0 комментариев</a>';

  let commentsList = (await getComments(href, id)).comments;
  console.log(commentsList);

  let commentsFrame = document.createElement('div');
  commentsFrame.setAttribute('class', 'article');

  let comments = document.createElement('div');
  comments.setAttribute('class', 'list_vertical');
  commentsFrame.innerHTML = '<h2> Комментарии: </h2>';

  for (let i = 0; i < commentsList.length; i++) {
    let commentJson = commentsList[i];
    let comment = document.createElement('article');
    comment.innerText = commentJson['fullName'] + ': ' + commentJson['text'];
    comments.appendChild(comment);
  }
  commentsFrame.appendChild(comments);
  commentsFrame.appendChild(document.createElement('br'));

  let tagsFrame = document.createElement('div');
  tagsFrame.setAttribute('class', 'list_horizontal');

  const tags = data['tags'];
  for (let j = 0; j < tags.length; j++) {
    let tagHolder = document.createElement('div');
    tagHolder.setAttribute('class', 'post_button_holder');
    tagHolder.innerHTML =
      '<a class="post_button" href="' +
      href +
      '?login=&fullName=&headline=&description=&tag=' +
      tags[j] +
      '">' +
      tags[j] +
      '</a>';
    tagsFrame.appendChild(tagHolder);
  }

  let post = document.createElement('div');
  post.setAttribute('class', 'list_vertical');
  post.appendChild(headline);
  post.appendChild(frame);
  post.appendChild(article);
  post.appendChild(tagsFrame);
  post.appendChild(document.createElement('br'));
  post.appendChild(commentsFrame);
  post.appendChild(document.createElement('br'));

  container.appendChild(post);
}

async function loadPost(href, id, container) {
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
    data = await getPost(href, id);
    console.log('DATA!');
    console.log(data);
    await addPost(href, data, id, container);
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
let pos = window.location.href.lastIndexOf('open');
let href = window.location.href.substring(0, pos);
console.log('HREF:');
console.log(href);

function onSubmit(event) {
  event.preventDefault();
  const text = document.getElementById('text').value;
  fetch(href + 'comments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: 'me',
      text: text,
      postId: id,
    }),
  });
}

function onLoad(event) {
  if (id != '') {
    loadPost(href, id, container);
  }
}

document.addEventListener('DOMContentLoaded', onLoad);

const loadpost = document.getElementById('form');
loadpost.addEventListener('submit', onSubmit);
