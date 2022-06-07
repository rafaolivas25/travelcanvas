$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/country",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                let tabela = document.querySelector("#form_country")
                let html = `` 
  
                for (let i in result)
                {
                  html += `<option value="${result[i].country_id}" class="text-dark">${result[i].country_name}</option>`
                }

  
                tabela.innerHTML = html
            }
  
        });
    }
  
  );
  