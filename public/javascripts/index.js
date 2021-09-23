
var start_state = true;
var hashmap = new Map();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createLevels() {
    x = document.getElementById("elevators")
    for(y = 0; y < 20; y++){
      var row = x.insertRow(0);
      for(z = 0; z < 5; z++) {
        var cell = row.insertCell(z);
        if(y === 0) {
            cell.id = "elevator" + (z + 1).toString();
        }else {
            cell.id = "inactive";
        }
      }
    }
    start_state = false;
  }

  async function moveUp(elevator, floor) {
      building = document.getElementById("elevators");
      elevatorId = "elevator" + elevator.toString();
      for(var row = building.rows.length - 1; row >= floor; row--) {
          //console.log("HERE")
          for(var col = 0; col < 5; col++){
              if(building.rows[row].cells[col].id == elevatorId) {
                console.log("HERE")
                await sleep(2000);
                building.rows[row].cells[col].id = "inactive"
                building.rows[row - 1].cells[col].id = elevatorId;
              }
          }
      }

  }

  async function quiet(ms) {
    await sleep(ms);
  }

  async function moveDown(elevator, floor) {
    await sleep(22000);;
    building = document.getElementById("elevators");
    elevatorId = "elevator" + elevator.toString();
    for(var row = 0; row <= (20 - floor); row++){
      console.log("AWAKEN")
      for(var col = 0; col < 5; col++) {
        if(building.rows[row].cells[col].id == elevatorId) {
          await sleep(2000);
          building.rows[row].cells[col].id = "inactive"
          building.rows[row + 1].cells[col].id = elevatorId;
        }
      }
    }
  }
  
  function addButtons(){
    div = document.getElementById("div-small");
    for(var i = 0; i<21; i++) {
      console.log("TEST")
      if (i === 0){
        const btn = document.createElement("button");
        btn.className = "btn btn-success btn-square-md";
        btn.innerText = "B";
        div.appendChild(btn);
      } 
      else{   
        const btn = document.createElement("button");
        btn.className = "btn btn-dark btn-square-md";
        btn.innerText = i.toString();
        div.appendChild(btn);
      }
    }
  }