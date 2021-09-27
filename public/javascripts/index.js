
var start_state = true;
hashmap = new Map();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createLevels() {
    x = document.getElementById("elevators")
    for(y = 0; y < 20; y++){
      var row = x.insertRow(0);
      for(z = 0; z < 5; z++) {
        var cell = row.insertCell(z);
        if(y === hashmap.get(z+1)) {
            cell.id = "elevator" + (z + 1).toString();
        }else {
            cell.id = "inactive";
        }
      }
    }
    start_state = false;
  }

  async function moveUp(elevator, floor) {
      hashmap.set(elevator, floor);
      console.log("moving to floor: " + floor.toString());
      floor = 19 - floor;
      building = document.getElementById("elevators");
      elevatorId = "elevator" + elevator.toString();
      console.log("FLOOR: " + floor);
      console.log("LENGTH OF TABLE " + building.rows.length);
      for(var row = building.rows.length - 1; row != floor && row > 0; row--) {
          console.log("HERE")
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

  async function moveDown(elevator, floor) {
    hashmap.set(elevator, floor);
    building = document.getElementById("elevators");
    elevatorId = "elevator" + elevator.toString();
    floor = 19 - floor;
    console.log("FLOOR: " + floor);
    for(var row = 0; row < floor  && row <= building.rows.length; row++){
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
    for(let i = 0; i<21; i++) {
      //console.log("TEST")
      if (i === 0){
        const btn = document.createElement("button");
        btn.className = "btn btn-success btn-square-md";
        btn.innerText = "B";
        //btn.onclick = console.log("Button" + i.toString() + "pressed");

        btn.addEventListener("click", function(){moveElevator(i)})
        //btn.onclick = moveElevator(i);
        div.appendChild(btn);
      } 
      else{   
        const btn = document.createElement("button");
        btn.className = "btn btn-dark btn-square-md";
        btn.innerText = i.toString();
        btn.addEventListener("click", function(){moveElevator(i)})
        div.appendChild(btn);
      }
    }
  }

  function initMap() {
    //console.log("TEST")
    min = Math.ceil(0);
    max = Math.floor(20);
    for(var i = 1; i < 6; i++) {
      var location = Math.floor(Math.random() * (max - min) + min);
      hashmap.set(i, location);
      console.log(hashmap.get(i));
    }
  }

  function moveElevator(floor) {
    console.log("Move to floor: " + floor.toString());
    closest_elevator = 0;
    min_floor_dif = 100;
    for(const [key, value] of hashmap) {
      if (Math.abs(value-floor) < min_floor_dif) {
        min_floor_dif = Math.abs(value-floor);
        closest_elevator = key;
      }
    }
    console.log(closest_elevator + " " + hashmap.get(closest_elevator));
    if(floor <= hashmap.get(closest_elevator)) {
      console.log("DOWN")
      moveDown(closest_elevator, floor);
    }else {
      console.log("UP")
      moveUp(closest_elevator, floor);
    }
  }