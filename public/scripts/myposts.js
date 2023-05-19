async function getPosts(href, login, skip, take) {
  return await fetch(
    href + 'posts?skip=' + skip + '&take=' + take + '&login=' + login,
  ).then((response) => response.json());
}

async function loadRow(container, list, from, to) {
  let row = document.createElement('div');
  row.setAttribute('class', 'list_horizontal');
  for (let i = from; i < to; i++) {
    let data = list[i];
    let imageUrls = data['imageUrls'];
    let headline = document.createElement('div');
    headline.setAttribute('class', 'headline');
    let title = document.createElement('h2');
    title.innerText = data['headline'] + ' ; ID: ' + data['stringId'];
    headline.appendChild(title);
    let frame = document.createElement('div');
    frame.setAttribute('class', 'flex_container');
    for (let j = 0; j < imageUrls.length; j++) {
      let imageUrl = imageUrls[j];
      let picture = document.createElement('img');
      picture.setAttribute('class', 'image');
      picture.setAttribute('src', imageUrl);
      picture.setAttribute('width', 450);
      picture.setAttribute('height', 450);
      frame.appendChild(picture);
    }

    let article = document.createElement('div');
    article.setAttribute('class', 'article');
    article.innerText = data['fullName'] + ': ' + data['description'];

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

    let postButton = document.createElement('div');
    postButton.setAttribute('class', 'post_button_holder');
    postButton.innerHTML =
      '<a class="post_button" href="' +
      href +
      'open/' +
      data['stringId'] +
      '">' +
      'Комментариев: ' +
      data['commentCnt'] +
      '</a>';

    let post = document.createElement('div');
    post.setAttribute('class', 'list_vertical');
    post.appendChild(headline);
    post.appendChild(frame);
    post.appendChild(article);
    post.appendChild(postButton);
    post.appendChild(tagsFrame);

    row.appendChild(post);
  }
  container.appendChild(row);

  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));
}

async function loadPosts(href, login, container, skip, take) {
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

  let current_i = skip;
  try {
    const list = (await getPosts(href, login, skip, take)).posts;
    take = Math.min(take, list.length);
    for (current_i = 0; current_i < take; current_i++) {
      await loadRow(container, list, current_i, Math.min(current_i + 1, take));
    }
  } catch (e) {
    if (msg == null) {
      msg = document.createElement('div');
      msg.setAttribute('class', 'message');
      msg.innerText = '! Что-то пошло не так !';
      container.appendChild(msg);
    }
  } finally {
    container.removeChild(gif);
  }

  return skip + take;
}

let pos = window.location.href.lastIndexOf('my-posts');
let href = window.location.href.substring(0, pos);
let container = document.getElementById('container');
let photo_ind = 0;
let msg = null;
let active = false;
loadMorePosts();

async function loadMorePosts() {
  if (!active) {
    active = true;
    photo_ind = await loadPosts(
      href,
      login,
      container,
      photo_ind,
      photo_ind + 5,
    );
    active = false;
  }
}

function onSubmitEdit(event) {
  const id = document.getElementById('idEdit').value;
  const headline = document.getElementById('headline').value;
  const photos = document.getElementById('photos').value.split(' ');
  const description = document.getElementById('description').value;

  event.preventDefault();

  fetch(href + 'posts', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: id,
      headline: headline,
      description: description,
      imageUrls: photos,
    }),
  });
}

function onSubmitDelete(event) {
  event.preventDefault();
  const id = document.getElementById('idDelete').value;
  fetch(href + 'posts', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: id,
    }),
  });
}

const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', onSubmitEdit);

const deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', onSubmitDelete);
