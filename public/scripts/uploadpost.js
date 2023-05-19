function onSubmit(event) {
  event.preventDefault();
  const headline = document.getElementById('headline').value;
  const photos = document.getElementById('photos').value.split(' ');
  const tags = document.getElementById('tags').value.split(' ');
  const description = document.getElementById('description').value;
  fetch(href + 'posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: 'me',
      headline: headline,
      description: description,
      imageUrls: photos,
      tags: tags,
    }),
  });
}

let pos = window.location.href.lastIndexOf('upload');
let href = window.location.href.substring(0, pos);
const loadpost = document.getElementById('form');
loadpost.addEventListener('submit', onSubmit);
