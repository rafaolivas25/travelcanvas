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
                let tabela = document.querySelector("#blog_posts")
                let html = `` 
  
                for (let i in result)
                {
                    html += `
                    <div class="content-text">
                        <a href="blog-details.html">
                        <h4>${result[i].post_title}</h4>
                        </a>
                        <span>By Donult Trum / ${result[i].post_date}</span>
                        <p>${result[i].post_content}</p>

                        <ul class="list-inline social-icons">
                            <li class="list-inline-item"><p><i class="fa fa-thumbs-up"></i>&nbsp; ${result[i].post_likes}</p></li>
                            <li class="list-inline-item"><p><i class="fa fa-thumbs-down"></i>&nbsp; ${result[i].post_dislikes}</p></li>
                            <li class="list-inline-item"><p><i class="fa fa-flag"></i>&nbsp; ${result[i].post_reports}</p></li>
                        </ul>
                        
                        <div class="link-btn">
                            <a href="blog-details.html" class="btn-style-one">Ler mais</a>
                        </div>
                    </div>`
                }
  
                tabela.innerHTML = html
            }
  
        });
    }
  
  );
  