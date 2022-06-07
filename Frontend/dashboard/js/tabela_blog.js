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
                let tabela = document.querySelector("#tabela_blog")
                let html = `` 
                let buttons = 
              `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="text-muted sr-only">Action</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Edit</a>
                <a class="dropdown-item" href="#">Remove</a>
              </div>`;
  
                for (let i in result)
                {
                    html += `<tr><td>${result[i].post_id}</td>
                <td>${result[i].post_title}</td>
                <td>${result[i].post_content}</td>
                <td>author</td>
                <td>${result[i].post_date}</td>
                <td>${result[i].post_categories_id}</td>
                <td>${result[i].post_tags_id}</td>
                <td>${result[i].post_likes}</td>
                <td>${result[i].post_dislikes}</td>
                <td>${result[i].post_reports}</td>
                <td>${buttons}</td></tr>`
                }
  
                tabela.innerHTML = html
                $(".display").DataTable();
            }
  
        });
    }
  
  );
  