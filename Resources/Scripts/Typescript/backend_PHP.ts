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
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("post", "Resources/Scripts/PHP/backend.php/", true)
    request.onload = () => {
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

    request.send(JSON.stringify(subsiteBody));
}


function buildCarousel() {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("post", "Resources/Scripts/PHP/backend.php", true);
    request.onload = () => {
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
    request.send(JSON.stringify(carouselBody));
}
