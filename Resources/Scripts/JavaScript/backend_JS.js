carusel();
smallProjects();
function carusel() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "Resources/Texts/BigProjects-Index.json", true);
    xhttp.responseType = 'json';
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buildList(this.response.length);
            this.response.forEach((item, pos) => {
                readListItem(item, pos);
            });
        }
    };
}
function smallProjects() {
    let spRequest = new XMLHttpRequest();
    spRequest.open("GET", "Resources/Texts/SmallProjects-Index.json", true);
    spRequest.responseType = 'json';
    spRequest.send();
    spRequest.onreadystatechange = () => {
        if (spRequest.readyState == 4 && spRequest.status == 200) {
            console.log(spRequest.response);
            spRequest.response.forEach((item) => {
                //console.log(spRequest)
                readSmallProjectIndex(item);
            });
        }
    };
}
/** buildig everything for the big projects */
function buildList(number) {
    let text;
    text = "";
    for (let i = 0; i < number; i++) {
        text += "<li data-target=\"#myCarousel\" data-slide-to=" + i + "></li>";
    }
    let element = document.getElementsByClassName("carousel-indicators").item(0);
    element.insertAdjacentHTML('afterbegin', text);
}
function readListItem(item, pos) {
    let request = new XMLHttpRequest();
    let changed = true;
    request.open("GET", " Resources/Texts/" + item.title + ".json", true);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buildCarousel(this.response, pos);
        }
    };
}
function buildCarousel(carouselItems, pos) {
    let str;
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
        str += '<img class="bd-img" width="100%" height="100%" src="' + carouselItems.picture + '"/>';
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
    addCaruselToHTML(str);
}
function addCaruselToHTML(html) {
    let element = document.getElementById("carousel-frame");
    //console.log(html);
    element.insertAdjacentHTML("beforeend", html);
}
/** Building smallprojects */
function readSmallProjectIndex(item) {
    let request = new XMLHttpRequest();
    let changed = true;
    request.open("GET", "Resources/Texts/" + item.title + ".json", true);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buildSmallProjects(this.response);
        }
    };
}
function buildSmallProjects(smallProject) {
    let str;
    str = '<div class="col-lg-4">' + "\n";
    if (smallProject.color == null) {
        smallProject.color = "#777";
    }
    if (smallProject.picture == null) {
        str += '<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140">' + "\n";
        str += '<title>Placeholder</title>' + "\n";
        str += '<rect width="100%" height="100%" fill="' + smallProject.color + '"/>' + "\n";
        str += '<text class="placeholder" x="25%" y="60%" fill="#fff">' + smallProject.short + '</text></svg>';
    }
    else {
        str += '<img class="bd-img rounded-circle" width="140" height="140" src=' + smallProject.picture + '" alt="' + smallProject.short + '"/>';
    }
    str += "<h2>" + smallProject.title + "</h2>" + "\n";
    str += "<p>" + smallProject.info + "</p>" + "\n";
    if (smallProject.button == true && smallProject.button_picture != null) {
        str += '<p><a class="btn btn-secondary" href=' + smallProject.link + ' role="button">' + smallProject.button_picture + " " + smallProject.buttonLinksTo + '</a></p>' + "\n";
    }
    else if (smallProject.button == true) {
        str += '<p><a class="btn btn-secondary" href=' + smallProject.link + ' role="button">' + smallProject.buttonLinksTo + '</a></p>' + "\n";
    }
    str += "</div>" + "\n";
    addSmallProjectToHTML(str);
}
function addSmallProjectToHTML(html) {
    let element = document.getElementById("sp");
    //console.log(html);
    element.insertAdjacentHTML("beforeend", html);
}
//# sourceMappingURL=backend_JS.js.map