var database;
(async function () {
    database = await eel.get_database()()
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
}

async function submit_remove_bike() {
    if (Object.keys(database).length > 0) database = await eel.remove_bike(document.getElementById("remove_bike_name").value)();
    close_remove_bike();
}

async function submit_add_ride() {
    if (Object.keys(database).length == 0) return;
    const bike = document.getElementById("add_ride_bike_name").value;
    const distance = document.getElementById("ride_distance_input").value;
}

async function submit_add_reminder() {

}