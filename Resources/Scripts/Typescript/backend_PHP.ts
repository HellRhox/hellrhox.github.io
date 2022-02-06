document.addEventListener("touchstart", function () {
}, true);
document.addEventListener("DOMContentLoaded", () => {
    startPHP(true)
});
//helloo
// @ts-ignore
function startPHP(firstRun: boolean) {
    if (firstRun) {
        document.getElementById("Projects").addEventListener("click", changeActiveNavItemPHP);
        document.getElementById("Skills").addEventListener("click", changeActiveNavItemPHP);
        document.getElementById("Contact").addEventListener("click", changeActiveNavItemPHP);
    }

    let activNavItem = document.getElementsByClassName("nav-item active")[0].children[0].textContent
    if (activNavItem == "Projects") {
        loadsubSitephp(activNavItem);
        buildCarusel();
        // smallProjects.smallProjects();
    } else if (activNavItem == "Skills") {
        loadsubSitephp(activNavItem)

    } else if (activNavItem == "Contact") {
        loadsubSitephp(activNavItem)
    }
}

// @ts-ignore
/** Changes the active NavItem to the clicked one*/
function changeActiveNavItemPHP(e: Event) {
    //@ts-ignore
    let navItem: HTMLElement = e.currentTarget;
    let activNavItem: HTMLCollection = document.getElementsByClassName("nav-item active")
    if (activNavItem.length <= 1) {
        activNavItem[0].children[0].setAttribute("class", "nav-link");
        activNavItem[0].setAttribute("class", "nav-item");
    }
    navItem.setAttribute("class", "nav-link disabled");
    navItem.parentElement.setAttribute("class", "nav-item active");
    start(false);
}

function loadsubSitephp(name: String) {
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    xhttp.open("GET", "Resources/Subsites/" + name.toLowerCase() + ".html", true)
    xhttp.responseType = 'text';
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let oldsubsite = document.getElementsByClassName("content").item(0);
            if (oldsubsite != null) {
                oldsubsite.remove()
            }
            document.getElementById("stickyHead").insertAdjacentHTML("afterend", xhttp.response);
        } else if (xhttp.status != 200) {
            console.log("HTTP Error " + xhttp.status + "\nwhile loading " + name.toLowerCase + ".html file");
        }
    }
}


function buildCarusel() {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("GET", "Resources/Scripts/PHP/backend.php", true);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            console.log(this.response);
            let element = document.getElementsByClassName("carousel-indicators").item(0);
            element.insertAdjacentHTML('afterbegin', this.response);
            console.log(this.response);
        } else if (request.status != 200) {
            console.log(request.readyState);
        }
    }
}


interface projects {
    title: string;
    short: string;
    info: string;
    picture: string;
    color: string;
    button: boolean;
    button_picture: string;
    buttonLinksTo: string;
    link: string;
}

interface index {
    title: string;
}