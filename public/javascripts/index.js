
start_state = true;

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
  }

  async function moveUp(elevator, floor) {
      building = document.getElementById("elevators")
      elevatorId = "elevator" + elevator.toString();
      for(var row = building.rows.length - 1; row > floor; row--) {
          //console.log("HERE")
          for(var col = 1; col < 5; col++){
              if(building.rows[row].cells[col].id == elevatorId) {
                console.log("HERE")
                await sleep(2000);
                building.rows[row].cells[col].id = "inactive"
                building.rows[row - 1].cells[col].id = elevatorId;
              }
          }
      }

  }