window.onscroll = function() {stickyHeader()};
    
    var header = document.getElementById("stickyHead");
    
    var sticky = header.offsetTop;
    //console.log(sticky)
    
    function stickyHeader() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }