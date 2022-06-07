$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/users",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                var total = 0;
                let tabela = document.querySelector("#contagem_users")
                let html = ``
  
                for (let i in result)
                {
                    total += 1;

                }

                html += `<p class="small text-muted mb-0">Total Utilizadores</p>
                <span class="h2 mb-0">`+ total +`</span>`
  
                tabela.innerHTML = html
            }
  
        });
    }
  
  );
  