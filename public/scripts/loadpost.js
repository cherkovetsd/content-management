let list;

async function getPhotos() {
    return await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json());
}

function addPost(container) {
    let frame = document.createElement('div');
    frame.setAttribute('class', 'frame');
    let data = list[0];
    let title = document.createElement('h3');
    title.innerText = data['title'];
    frame.appendChild(title);
    let picture = document.createElement('img');
    picture.setAttribute('src', data['url']);
    picture.setAttribute('width', 450);
    picture.setAttribute('height', 450);
    frame.appendChild(picture);

    let article = document.createElement('div');
    article.setAttribute('class', 'article');
    article.innerText = 'aboba aboba aboba aboba aboba\n aboba aboba aboba aboba aboba';

    let postButton= document.createElement('div');
    postButton.setAttribute('class', 'post_button_holder');
    postButton.innerHTML='<a class="post_button" href="openPost.html">0 комментариев</a>';

    let post = document.createElement('div');
    post.setAttribute('class', 'menu_vertical');
    post.appendChild(frame);
    post.appendChild(article);
    post.appendChild(postButton);

    container.appendChild(post);
}

async function loadPhotos(container) {
    if (msg != null) {
        container.removeChild(msg);
        msg = null;
    }
    let gif = document.createElement("img");
    gif.setAttribute("src", "https://cdn3.emoji.gg/emojis/9954-breakdancing-cat.gif");
    container.appendChild(gif);
    gif.setAttribute("width", 225);
    gif.setAttribute("width", 225);
    gif.setAttribute("class", "update_gif")

    try {
        list = await getPhotos();
            await addPost(container);
    } catch (e) {
        console.log(e)
        if (msg == null) {
            msg = document.createElement("div");
            msg.setAttribute("class", "message");
            msg.innerText = "! Что-то пошло не так !"
            container.appendChild(msg);
        }
    } finally {
        container.removeChild(gif);
    }
}

let container = document.getElementById("container");
let msg = null;
let active=false;

async function loadMorePhotos() {
    if (!active) {
        active = true;
        await loadPhotos(container);
        active = false;
    }
}
function onSubmit(event) {
    event.preventDefault();
    loadMorePhotos();
}

function onLoad(event) {
    loadMorePhotos();
}

document.addEventListener('DOMContentLoaded', onLoad);

const loadpost = document.getElementById("loadpost");
loadpost.addEventListener('submit', onSubmit);