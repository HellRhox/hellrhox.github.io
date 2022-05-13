document.addEventListener("touchstart", function () {
}, true);
document.addEventListener("DOMContentLoaded", () => {
    startPHP(true)
});

function startPHP(firstRun: boolean) {
    if (firstRun) {
        document.getElementById("Projects").addEventListener("click", changeActiveNavItemPHP);
        document.getElementById("Skills").addEventListener("click", changeActiveNavItemPHP);
        document.getElementById("Contact").addEventListener("click", changeActiveNavItemPHP);
    }

    let activNavItem = document.getElementsByClassName("nav-item active")[0].children[0].textContent
    if (activNavItem == "Projects") {
        loadsubSitephp(activNavItem);
        buildCarousel();
        buildSmallProjects()
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
    let api: Api = new Api();
    let callback = (request: XMLHttpRequest) => {
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(request.response);
            let oldsubsite = document.getElementsByClassName("content").item(0);
            if (oldsubsite != null) {
                oldsubsite.remove()
            }
            document.getElementById("stickyHead").insertAdjacentHTML("afterend", response.data);
        } else if (request.status != 200) {
            let response = JSON.parse(request.response);
            console.log("HTTP Error " + response.code + "\nMessage: " + response.message);
        }
    }
    type body = {
        function: String
        subsite: String
    };
    let subsiteBody: body = {
        function: 'switchSite',
        subsite: name
    };

    api.makeCall(HTTPMethod.POST, callback, subsiteBody);
}


function buildCarousel() {
    let api: Api = new Api();
    let callback = (request: XMLHttpRequest) => {
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(request.response);
            /**
             * inserte listItems
             */
            let element = document.getElementsByClassName("carousel-indicators").item(0);
            element.insertAdjacentHTML('afterbegin', response.data.listItems);
            /**
             * insert Carousel
             */
            element = document.getElementById("carousel-frame");
            element.insertAdjacentHTML("beforeend", response.data.carouselItems);
        } else if (request.status != 200) {
            let response = JSON.parse(request.response);
            console.log(response.message);
        }
    }
    type body = {
        function: String
    };
    let carouselBody: body = {
        function: "buildCarousel"
    }
    api.makeCall(HTTPMethod.POST, callback, carouselBody)
}

function buildSmallProjects() {
    let api: Api = new Api();
    type body = {
        function: String
    };
    let smallProjectsBody: body = {
        function: "buildSmallProjects"
    }
    /**
     * can be ignored because the callback will be called with the right variable existing.
     * @ts-ignore  */
    let callback = (request: XMLHttpRequest) => {
        let response
        // @ts-ignore
        if (request.readyState == 4 && request.status == 200) {
            // @ts-ignore
            response = JSON.parse(request.response);
            // @ts-ignore
        } else if (request.status != 200) {
            // @ts-ignore
            response = JSON.parse(request.response);
        }
        console.log(response.data);
    };
    api.makeCall(HTTPMethod.POST, callback, smallProjectsBody)
}

const enum HTTPMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    OPTION = 'option',
}

class Api {
    static readonly PHP_PATH = "Resources/Scripts/PHP/backend.php";
    public readonly request: XMLHttpRequest;

    constructor() {
        this.request = new XMLHttpRequest();
    }

    makeCall(method: HTTPMethod, callback: (request: XMLHttpRequest) => any, body?: object): void {
        this.request.open(method, Api.PHP_PATH, true);
        this.request.onload = event => callback(this.request);
        if (typeof body !== 'undefined') {
            this.request.send(JSON.stringify(body));
        } else {
            this.request.send();
        }
    }
}