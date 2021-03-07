/** Class for building a carusel on the webpage */
class Carusel {

    public constructor() {
    }
    /**Starts the carusel build and loads the BigProjects-Index.json file */
    public carusel() {
        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.open("GET", "Resources/Texts/BigProjects-Index.json", true)
        xhttp.responseType = 'json';
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.buildList(xhttp.response.length);
                xhttp.response.forEach((item: index, pos: number) => {
                    this.readListItem(item, pos);
                })
            }
            else if (xhttp.status != 200) {
                console.log(xhttp.readyState);
            }
        }
    }
    /**reads each item of BigProjects-Index.json and loads the indexed files */
    private readListItem(item: index, pos: number) {
        let request: XMLHttpRequest = new XMLHttpRequest();
        let changed: boolean = true;
        request.open("GET", " Resources/Texts/" + item.title + ".json", true);
        request.responseType = 'json';
        request.send();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                this.buildCarousel(request.response, pos);
            }
        }
    }
    /**builds the overview of the carusel*/
    private buildList(number: number) {
        let text: string;
        let active: string;
        text = "";
        for (let i = 0; i < number; i++) {
            if (i === 0) {
                active = ' class="active"';
            }
            else {
                active = ' class';
            }
            text += "<li data-target=\"#myCarousel\" data-slide-to=" + i + active + "></li>";
        }
        let element = document.getElementsByClassName("carousel-indicators").item(0);
        element.insertAdjacentHTML('afterbegin', text);
    }
    /**takes each project file indext by BigProjects-Index.json and turns them into a card for the carusel slide */
    public buildCarousel(carouselItems: projects, pos: number) {
        let str: string;
        if (pos === 0) {
            str = '<div class="carousel-item active">' + "\n";
        }
        else {
            str = '<div class="carousel-item">' + "\n";
        }
        if (carouselItems.color == null) {
            carouselItems.color = "#777";
        }
        if (carouselItems.picture == null) {
            str += '<svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice\" focusable=\"false\" role=\"img\"><rect width=\"100%\" height=\"100%\" fill="' + carouselItems.color + '"/></svg>' + "\n";
        }
        else {
            str += '<img class="bd-img" width="100%" height="100%" src="' + carouselItems.picture + '"/>'
        }
        str += '<div class="container">' + "\n";
        str += '<div class="carousel-caption text-left">' + "\n";
        str += "<h1>" + carouselItems.title + "</h1>" + "\n";
        str += "<p>" + carouselItems.info + "</p>" + "\n";
        if (carouselItems.button == true) {
            str += '<p><a class="btn btn-lg btn-primary" href="' + carouselItems.link + '" role="button">' + carouselItems.button_picture + " " + carouselItems.buttonLinksTo + '</a></p>' + "\n";
        }
        str += "</div>" + "\n";
        str += "</div>" + "\n";
        str += "</div>" + "\n";
        this.addCaruselToHTML(str)
    }
    /**Adds the html of the carusel to the rest of the site */
    private addCaruselToHTML(html: string) {
        let element = document.getElementById("carousel-frame");
        //console.log(html);
        element.insertAdjacentHTML("beforeend", html);
    }
}
/**Class for building a list of smaller projects on the webpage*/
class SmallProjects {

    public constructor() { }

    public smallProjects() {
        let spRequest: XMLHttpRequest = new XMLHttpRequest();
        spRequest.open("GET", "Resources/Texts/SmallProjects-Index.json", true)
        spRequest.responseType = 'json'
        spRequest.send();
        spRequest.onreadystatechange = () => {
            if (spRequest.readyState == 4 && spRequest.status == 200) {
                //console.log(spRequest.response);
                spRequest.response.forEach((item: index) => {
                    //console.log(spRequest)
                    this.readSmallProjectIndex(item);
                });
            }
        }
    }

    private readSmallProjectIndex(item: index) {
        let request: XMLHttpRequest = new XMLHttpRequest();
        let changed: boolean = true;
        request.open("GET", "Resources/Texts/" + item.title + ".json", true);
        request.responseType = 'json';
        request.send();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                this.buildSmallProjects(request.response);
            }
        }

    }

    private buildSmallProjects(smallProject: projects) {
        let str: string;
        str = '<div class="col-lg-4">' + "\n";
        if (smallProject.color == null) {
            smallProject.color = "#777";
        }
        if (smallProject.picture == null) {
            str += '<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">' + "\n"
            str += '<title>Placeholder</title>' + "\n"
            str += '<rect width="100%" height="100%" fill="' + smallProject.color + '"/>' + "\n";
            str += '<text class="placeholder" font-size="45" text-anchor="middle" alignment-baseline="central" fill="#fff"> <tspan x="50%" dy="60%">' + smallProject.short + '</tspan></text></svg>'
        }
        else {
            str += '<img class="bd-img rounded-circle" width="140" height="140" src=' + smallProject.picture + '" alt="' + smallProject.short + '"/>'
        }
        str += "<h2>" + smallProject.title + "</h2>" + "\n";
        str += "<p>" + smallProject.info + "</p>" + "\n";
        if (smallProject.button == true && smallProject.button_picture != null) {
            str += '<p><a class="btn btn-secondary" href=' + smallProject.link + ' role="button">' + smallProject.button_picture + " " + smallProject.buttonLinksTo + '</a></p>' + "\n";
        } else if (smallProject.button == true) {
            str += '<p><a class="btn btn-secondary" href=' + smallProject.link + ' role="button">' + smallProject.buttonLinksTo + '</a></p>' + "\n";
        }
        str += "</div>" + "\n";
        this.addSmallProjectToHTML(str)
    }


    private addSmallProjectToHTML(html: string) {
        let element = document.getElementById("sp");
        //console.log(html);
        element.insertAdjacentHTML("beforeend", html);
    }
}

/* IDEA change script to load/unload content under the header so i can use a single url?
 * 
 */


/*MAIN*/
let carusel: Carusel = new Carusel;
let smallProjects: SmallProjects = new SmallProjects;

document.addEventListener("DOMContentLoaded", () => { start(true) });

function start(firstRun: boolean) {
    if (firstRun) {
        document.getElementById("Projects").addEventListener("click", changeActivNavItem);
        document.getElementById("Skills").addEventListener("click", changeActivNavItem);
        document.getElementById("Contact").addEventListener("click", changeActivNavItem);
        document.getElementById("Title").addEventListener("click", changeMode);
    }

    let activNavItem = document.getElementsByClassName("nav-item active")[0].children[0].textContent
    if (activNavItem == "Projects") {
        loadSubSite(activNavItem);
        carusel.carusel();
        smallProjects.smallProjects();
    }
    else if (activNavItem == "Skills") {
        loadSubSite(activNavItem)

    }
    else if (activNavItem == "Contact") {
        loadSubSite(activNavItem)
    }
}
/** Changes the active NavItem to the clicked one*/
function changeActivNavItem(e: Event) {
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

function loadSubSite(name: String) {
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
        }
        else if (xhttp.status != 200) {
            console.log("HTTP Error " + xhttp.status + "\nwhile loading " + name.toLowerCase + ".html file");
        }
    }
}

function changeMode() {
    //TODO Dark/Light Mode switch. (cokies ?)
    console.log("Give it to me Baby");
    console.log("aha aha");
}

/** Objecttypes from the JSONS */

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