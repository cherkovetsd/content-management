let list;
async function getPosts(href, queries, skip, take) {
  console.log(
    href +
      'posts?skip=' +
      skip +
      '&take=' +
      take +
      (queries.length != 0 ? '&' : '') +
      queries,
  );
  return await fetch(
    href +
      'posts?skip=' +
      skip +
      '&take=' +
      take +
      (queries.length != 0 ? '&' : '') +
      queries,
  ).then((response) => response.json());
}

async function loadRow(container, list, from, to) {
  console.log('LOG:');
  console.log(href);
  console.log(photo_ind);
  let row = document.createElement('div');
  row.setAttribute('class', 'list_horizontal');
  console.log(list);
  for (let i = from; i < to; i++) {
    let data = list[i];
    let imageUrls = data['imageUrls'];
    let headline = document.createElement('div');
    headline.setAttribute('class', 'headline');
    let title = document.createElement('h2');
    title.innerText = data['headline'];
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
    tagsFrame.setAttribute('class', 'menu_horizontal');

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

async function loadPosts(href, queries, container, skip, take) {
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
    const list = (await getPosts(href, queries, skip, take)).posts;
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

let pos = window.location.href.lastIndexOf('?login');
let href;
let queries = ['login', 'fullName', 'headline', 'description', 'tag'];
let queryValues = [undefined, undefined, undefined, undefined, undefined];

if (pos != -1) {
  href = window.location.href.substring(0, pos);
  queryPos = [];
  for (let i = 0; i < 5; i++) {
    queryPos[i] = window.location.href.indexOf(queries[i] + '=');
  }
  for (let i = 0; i < 4; i++) {
    if (!window.location.href.includes(queries[i] + '=&')) {
      queryValues[i] = window.location.href.substring(
        queryPos[i] + queries[i].length + 1,
        queryPos[i + 1] - 1,
      );
    }
  }
  if (queryPos[4] + 4 != window.location.href.length) {
    queryValues[4] = window.location.href.substring(
      queryPos[4] + 4,
      window.location.href.length,
    );
  }
} else {
  href = window.location.href;
}
queryString = '';
for (let i = 0; i < 5; i++) {
  if (queryValues[i] != undefined) {
    queryString += queries[i] + '=' + queryValues[i] + '&';
  }
}

if (queryString[queryString.length - 1] == '&') {
  queryString = queryString.substring(0, queryString.length - 1);
}
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
      queryString,
      container,
      photo_ind,
      photo_ind + 5,
    );
    active = false;
  }
}
