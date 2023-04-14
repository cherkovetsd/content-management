let list;
async function getPhotos() {
    return await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json());
}

async function loadRow(container, list, from, to) {
    let row = document.createElement("div");
    row.setAttribute('class', 'list_horizontal');
    console.log(list)
    for (let i = from; i < to; i++) {
        let frame = document.createElement('div');
        frame.setAttribute('class', 'frame');
        let data = list[i];
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
        post.setAttribute('class', 'list_vertical');
        post.appendChild(frame);
        post.appendChild(article);
        post.appendChild(postButton);

        row.appendChild(post);
    }
    container.appendChild(row);
}

async function loadPhotos(container, from, to) {
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

    let current_i = from;
    try {
        const list = await getPhotos();
        for (current_i = from; current_i < to; current_i += 3) {
            await loadRow(container, list, current_i, current_i + 3)
        }
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

    console.log(current_i);
    return current_i;
}

let container = document.getElementById("container");
let photo_ind = 0;
let msg = null;
let active=false;
loadMorePhotos();

async function loadMorePhotos() {
    if (!active) {
        active = true;
        photo_ind = await loadPhotos(container, photo_ind, photo_ind + 8);
        active = false;
    }
}