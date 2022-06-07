$(document).ready(function() {

    var uk = [];
    var ck = [];
    var lk = [];

    function getEst() {

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/est",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);


                for (let i in result){
                    uk.push(result[i].user_key);
                    ck.push(result[i].country_key);
                    lk.push(result[i].labels_key);
                }
                console.log(uk,ck,lk);

                window.localStorage.setItem("user_key", uk);
                window.localStorage.setItem("country_key", ck);
                window.localStorage.setItem("labels_key", lk);
            }
        });
    }
    getEst();
});
