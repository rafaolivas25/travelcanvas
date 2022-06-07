$(document).ready(

  function(){
      $.ajax({
          url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/userstype",
          type: "GET",
          dataType: 'json',
          success: function(result) {
              console.log(result);
              $('#name').text(result)
              var obj = JSON.stringify(result);
              console.log(obj);
              let tabela = document.querySelector("#tabela_users")
              let html = ""
              let buttons = 
              `<button class="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="text-muted sr-only">Action</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Edit</a>
                <a class="dropdown-item" href="#">Remove</a>
                <a class="dropdown-item" href="#">Assign</a>
              </div>`; 

              for (let i in result)
              {
                html += `<tr><td>${result[i].user_id}</td>`

                if(result[i].type_id === 1){
                  badge = 'badge-info' ;
                } else if(result[i].type_id === 2){
                  badge = 'badge-success' ;
                } else if(result[i].type_id === 3){
                  badge = 'badge-warning' ;
                } else if(result[i].type_id === 4){
                  badge = 'badge-primary' ;
                }else{
                  badge = 'badge-dark' ;
                }
             html+= `
                <td><span class="badge badge-pill ${badge}">${result[i].type_name}</span></td>
                <td>${result[i].user_name}</td>
                <td>${result[i].country_name}</td>
                <td>${result[i].user_email}</td>
                <td>${buttons}</td></tr>`
              }

              tabela.innerHTML = html
              $(".display").DataTable();
          }

      });
  }

);
