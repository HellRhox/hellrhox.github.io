main()

function main(){
    let request:XMLHttpRequest=new XMLHttpRequest();
    request.open("GET","Resources/Scripts/PHP/backend_BP.php");
    request.send();
    request.onreadystatechange=function(){
        console.log(this.response);
    }
}