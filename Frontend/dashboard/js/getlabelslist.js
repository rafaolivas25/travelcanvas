$(document).ready(function() {

    function getEstList() {
        
        var uid = console.log(localStorage.getItem("user_id"));

        const lid = [];
        const cid = [];

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/est",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);

                for (let i in result){
                    
                    if(uid == result[i].user_key){

                        lid.push(result[i].labels_key);
                        cid.push(result[i].country_key);

                    }


                }



            }
        });
    }
    getEstList()
    return lid,cid;

});