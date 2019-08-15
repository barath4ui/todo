//Global variables

let myObj;
let message;
let xhttp = new XMLHttpRequest();
    
    
    
    function bg(){
      var h = document.getElementById("bgChange");
      var b = document.createAttribute("style");
      var bg = "bg-00";
      b.value = "background-image: url(img/" + bg +".jpg);";
      h.setAttributeNode(b);
    }

    function loadDoc(){ 
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          displayData();
          document.getElementById("root").innerHTML = message;  
        }
      };
      xhttp.open( "GET", "https://api.spacexdata.com/v3/launches", true);
      xhttp.send();
    }

    function displayData(){
      message += "<ul class='list-group'>"
      for (x in myObj) {

        let rocket_imgUrl=  myObj[x].links.mission_patch_small;
        let rocket_year = myObj[x].launch_year;
        let rocket_name = myObj[x].mission_name;
        let rocket_status = myObj[x].launch_success;

        if(rocket_imgUrl == null){
           rocket_imgUrl = "https://dummyimage.com/120/cccccc/ffffff";
        }
        
        message+= `<li>
              <div class="list-item">
                  <div class="list-info row">
                      <div class="list-img col-md-3">
                      <img src="${rocket_imgUrl}" alt="" title="" width="120px" />
                      </div>
                      <div class="list-text col-md-9">
                      <h2>${rocket_name} <span>- ${rocket_year}</span></h2>
                      <h4>${rocket_status}</h4>
                      <a href="#" class="btn btn-secondary btn-sm btn-success">View More</a>
                      </div>
                  </div>
              </div>
          </li>`;
      }
      message += "</ul>" ;
    }

    bg();
    loadDoc();