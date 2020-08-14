(function checkReload() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                location.reload();
            } else {
                setTimeout(checkReload, 1000);
            }
        }
    }
    xmlhttp.open("GET", "/auto-reload", true);
    xmlhttp.send(null);
})();