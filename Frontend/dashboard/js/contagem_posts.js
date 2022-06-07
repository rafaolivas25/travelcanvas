$(document).ready(

    function(){
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/blog",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#name').text(result)
                var obj = JSON.stringify(result);
                console.log(obj);
                var total = 0;
                let tabela = document.querySelector("#contagem_posts")
                let html = ``
  
                for (let i in result)
                {
                    total += 1;

                }

                html += `<p class="small text-white mb-0">Posts:</p>
                <span class="h2 mb-0 text-white">`+ total +`</span>`
  
                tabela.innerHTML = html
            }
  
        });
    }
  
  );
  