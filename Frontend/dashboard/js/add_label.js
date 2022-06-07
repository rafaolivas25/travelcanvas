$(document).ready(function() {


    $('#btnLabel').on('click', function() {

        // prevent form default behaviour

        var uid = localStorage.getItem("user_id");

        // disabled the submit button
        $("#btnLabel").prop("disabled", true);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/est",
            type: "POST",
            data: {
                label:  $(".customRadio1:checked").val(), //Reading text box values using Jquery   
                country: $("#form_country").val(),  
                user: $(uid).val() 
            },

            dataType: 'json',

            error: function (result){
                console.log("ERROR: ", result)
                $("#btnLabel").prop("disabled", false);
            },
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#btnLabel").prop("disabled", false);
            }

        });

    });



});   