$(document).ready(function() {


    function getEst() {

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://travelcanvas.herokuapp.com/api/est",
            type: "GET",
            dataType: 'json',
            success: function(result) {
                var total = 0;
                var total_1 = 0;
                var total_2 = 0;
                var total_3 = 0;
                var total_4 = 0;
                console.log(result);
                var uid = localStorage.getItem("user_id");
                console.log(uid);
                let tabela = document.querySelector("#contagem_labels_mapa")
                let html = ``

                for (let i in result){
                    
                    if(uid == result[i].user_key){
                        if(result[i].labels_key == 1){
                            total_1 += 1;
                            total += 1;
                          }else if(result[i].labels_key == 2){
                            total_2 += 1;
                            total += 1;
                          }else if(result[i].labels_key == 3){
                            total_3 += 1;
                            total += 1;
                          }else{
                            total_4 += 1;
                            total += 1;
                          }
                    }
                }

                console.log(total,total_1,total_2,total_3,total_4);
                window.localStorage.setItem("count_labels_total", total);
                window.localStorage.setItem("count_labels_bucket", total_1);
                window.localStorage.setItem("count_labels_visited", total_2);
                window.localStorage.setItem("count_labels_lived", total_3);
                window.localStorage.setItem("count_labels_fav", total_4);

                html += `<div class="col-md-4 mb-4">
                <div class="card shadow text-muted">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col">
                          <p class="medium text-muted mb-0">Contagem total de labels:</p>
                          <span class="h2 mb-0">`+ total +`</span>
                        </div>
                      <div class="col-auto">
                        <span class="fe fe-32 fe-bookmark text-muted mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
                <div class="col-md-2 mb-4">
                    <div class="card shadow bg-info text-white">
                    <div class="card-body">
                        <div class="row align-items-center">
                        <div class="col">
                            <p class="medium text-white mb-0">Bucket list</p>
                            <span class="h2 text-white mb-0">`+ total_1 +`</span>
                            </div>
                        <div class="col-auto">
                            <span class="fe fe-32 fe-list text-white mb-0"></span>
                        </div>
                        </div>
                    </div>
                    </div>
              </div>
              
            <div class="col-md-2 mb-4">
                <div class="card shadow bg-success text-white">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col">
                          <p class="medium text-white mb-0">Já visitei</p>
                          <span class="h2 text-white mb-0">`+ total_2 +`</span>
                        </div>
                      <div class="col-auto">
                        <span class="fe fe-32 fe-check-circle text-white mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  
                  <div class="col-md-2 mb-4">
                <div class="card shadow bg-warning text-white">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col">
                          <p class="medium text-white mb-0">Residente</p>
                          <span class="h2 text-white mb-0">`+ total_3 +`</span>
                        </div>
                      <div class="col-auto">
                        <span class="fe fe-32 fe-home text-white mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  
                  <div class="col-md-2 mb-4">
                <div class="card shadow bg-primary text-white">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col">
                          <p class="medium text-white mb-0">Favorito</p>
                          <span class="h2 text-white mb-0">`+ total_4 +`</span>
                        </div>
                      <div class="col-auto">
                        <span class="fe fe-32 fe-heart text-white mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
                
                tabela.innerHTML = html
            }
        });
    }
    getEst();
});