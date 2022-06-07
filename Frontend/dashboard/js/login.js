$(document).ready(function() {

    function getUsersList() {

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/users",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
            }
        });
    }
    getUsersList();

    $('#btnLogin').on('click', function(event) {

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnLogin").prop("disabled", true);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/users/login",
            type: "POST",
            data: {
                email: $("#txt_email").val().trim(),
                password: $("#txt_password").val().trim()
            },

            dataType: 'json',

            error: function (result){
                alert("Username or Password are Incorrect")
                console.log("ERROR: ", result)

                $("#btnLogin").prop("disabled", false);
            },
            success: function(result) {
                console.log("SUCCESS : ", result);
                window.location.href = "map.html"


                window.localStorage.setItem("user_id", JSON.stringify(result.user_id));
                $("#btnLogin").prop("disabled", false);
            }

        });

    });



});