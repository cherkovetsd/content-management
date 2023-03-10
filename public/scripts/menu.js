
let hash = document.location.hash
let button_number;
if (document.location.pathname.indexOf("index.html") != -1) {
    switch (hash) {
        case "":
            button_number = 0;
            break;
        case "#personal_info":
            button_number = 1;
            break;
        case "#lifestyle":
            button_number = 2;
            break;
    }
} else if (document.location.pathname.indexOf("gallery.html") != -1) {
    switch (hash) {
        case "":
            button_number = 3;
            break;
        case "#code":
            button_number = 4;
            break;
        case "#painting":
            button_number = 5;
            break;
        case "#cat":
            button_number = 6;
            break;
        case "#shirt":
            button_number = 7;
            break;
    }
} else {
    button_number = 8;
}
console.log(document.getElementsByClassName("button")[8].textContent)
document.getElementsByClassName("button")[button_number].style.color = "black";
