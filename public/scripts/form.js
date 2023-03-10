function addText(container, text) {
    let item = document.createElement('p');
    let item_text = document.createTextNode(text);
    item.appendChild(item_text);
    container.appendChild(item);
}

function getContainer(id) {
    let containers = document.getElementById("containers");
    let container = containers.getElementsByClassName("container")[id];
    return container
}

function addToJSON(id, text) {
    console.log(localStorage["form"])
    console.log(id.toString())
    let storageDictionary = JSON.parse(localStorage["form"]);
    console.log(storageDictionary)
    storageDictionary[id].push(text);
    localStorage["form"] = JSON.stringify(storageDictionary);
}

function onSubmit(event) {
    event.preventDefault();
    let form = document.getElementById("form");
    let radio_list = form.getElementsByClassName("radio");
    let id;
    for (let i = 0; i < radio_list.length; i++) {
        if (radio_list[i].checked) {
           id = i;
           break;
        }
    }
    let text = form['text'].value;
    addToJSON(id, text);
    addText(getContainer(id), text);
}

function onLoad() {
    if (localStorage["form"]) {
        let containers_json = JSON.parse(localStorage["form"]);
        for (let id = 0; id < 3; id++) {
            let items = containers_json[id];
            let container = getContainer(id);
            for (let i in items) {
                addText(container, items[i])
            }
        }
    } else {
        localStorage['form'] = JSON.stringify({"0":[], "1":[], "2":[]});
    }
}

const form = document.getElementById("form");
form.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', onLoad);