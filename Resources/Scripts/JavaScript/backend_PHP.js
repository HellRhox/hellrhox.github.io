main();
function main() {
    let request = new XMLHttpRequest();
    request.open("GET", "Resources/Scripts/PHP/backend_BP.php");
    request.send();
    request.onreadystatechange = function () {
        console.log(this.response);
    };
}
//# sourceMappingURL=backend_PHP.js.map