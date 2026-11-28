var database;
(async function () {
    database = await eel.get_database()()
    updateGUI()
})();

function open_add_ride() {
    const bikeSelect = document.getElementById("add_ride_bike_name");
    while (bikeSelect.hasChildNodes()) {
    bikeSelect.removeChild(bikeSelect.firstChild);
    }
    if (Object.keys(database).length > 0) {
        Object.keys(database).forEach((key) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            bikeSelect.appendChild(option);
        });
    } else {            
        const option = document.createElement("option");
        option.value = null;
        option.textContent = "You have no bikes added";
        bikeSelect.appendChild(option);
    }
    document.getElementById("add_ride_popup").showModal();
}

function close_add_ride() {
    document.getElementById("add_ride_popup").close();
    document.getElementById("ride_distance_input").value = "";
}

function open_add_reminder() {
    const bikeSelect = document.getElementById("add_reminder_bike_name");
    while (bikeSelect.hasChildNodes()) {
    bikeSelect.removeChild(bikeSelect.firstChild);
    }
    if (Object.keys(database).length > 0) {
        Object.keys(database).forEach((key) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            bikeSelect.appendChild(option);
        });
    } else {            
        const option = document.createElement("option");
        option.value = null;
        option.textContent = "You have no bikes added";
        bikeSelect.appendChild(option);
    }
    document.getElementById("add_reminder_popup").showModal();
}

function close_add_reminder() {
    document.getElementById("add_reminder_popup").close();
    document.getElementById("service_reminder_what").value = "";
    document.getElementById("service_reminder_when").value = "";
}

function open_remove_bike() {
    const bikeSelect = document.getElementById("remove_bike_name");
    while (bikeSelect.hasChildNodes()) {
    bikeSelect.removeChild(bikeSelect.firstChild);
    }
    if (Object.keys(database).length > 0) {
        Object.keys(database).forEach((key) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            bikeSelect.appendChild(option);
        });
    } else {            
        const option = document.createElement("option");
        option.value = null;
        option.textContent = "You have no bikes added";
        bikeSelect.appendChild(option);
    }
    document.getElementById("remove_bike_popup").showModal();
}

function open_add_bike() {
    document.getElementById("add_bike_popup").showModal();
}

function close_remove_bike() {
    document.getElementById("remove_bike_popup").close();
}

function close_add_bike() {
    document.getElementById("add_bike_popup").close();
    document.getElementById("add_bike_name").value = "";
}

async function submit_add_bike() {
    database = await eel.add_bike(document.getElementById("add_bike_name").value)();
    close_add_bike();
    updateGUI();
}

async function submit_remove_bike() {
    if (Object.keys(database).length > 0) database = await eel.remove_bike(document.getElementById("remove_bike_name").value)();
    close_remove_bike();
    updateGUI();
}

async function submit_add_ride() {
    if (Object.keys(database).length == 0) return;
    const bike = document.getElementById("add_ride_bike_name").value;
    const distance = document.getElementById("ride_distance_input").value;
    for (var i = 0; i < database[bike].length; i++) {
        database[bike][i]["untilService"] -= distance;
    }
    database = await eel.set_bike(bike, database[bike])();
    close_add_ride();
    updateGUI();
}

async function submit_add_reminder() {
    if (Object.keys(database).length == 0) return;
    const bike = document.getElementById("add_reminder_bike_name").value;
    const name = document.getElementById("service_reminder_what").value;
    const distance = document.getElementById("service_reminder_when").value;
    
    database[bike].push({untilService: distance, name: name, distance: distance});
    database = await eel.set_bike(bike, database[bike])();
    close_add_reminder();
    updateGUI();
}

function resetServiceList() {
    document.getElementById("service_list").innerHTML = "";
}

function addServiceToList(name, miles) {
    document.getElementById("service_list").innerHTML += `<br><li><button class="add_log">Has Been Serviced</button>${name + " - " + Math.abs(miles).toString() + ( miles > 0 ? " miles until service" : " miles since service needed" ) }</li>`
}

function updateGUI() {
    resetServiceList();
    const keys = Object.keys(database);
    var isEmpty = true;
    var serviceList = [];
    for (var i = 0; i < keys.length; i++) {
        for(var i2 = 0; i2 < database[keys[i]].length; i2++) {
            isEmpty = false;
            serviceList.push([database[keys[i]][i2]["name"], database[keys[i]][i2]["untilService"]]);
        }
    }
    serviceList.sort((a, b) => a[1] - b[1]);
    if (isEmpty) {
        document.getElementById("service_list").innerHTML = "No Service Reminders Added";
    } else {
        for (var i = 0; i < serviceList.length; i++) {
            addServiceToList(...serviceList[i]);
        }
    }
}