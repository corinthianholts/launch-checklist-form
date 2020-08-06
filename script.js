// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

let form = document.getElementById('check-form');


form.addEventListener('submit', function(event){
    let pilotName = document.querySelector('input[name=pilotName]').value;
    let copilotName = document.querySelector('input[name=copilotName]').value;
    let fuel = document.querySelector('input[name=fuelLevel]').value;
    let cargoMass = document.querySelector('input[name=cargoMass]').value;
    
    if(pilotName == '' || copilotName == '' || fuel == '' || cargoMass == ''){
        alert('All fields must have a value!');
        return
    }
        
    if(!isNaN(pilotName) || !isNaN(copilotName)){
        alert('Pilot and Co-pilot names must be strings!');
        return
    }
    
    if(isNaN(fuel) || isNaN(cargoMass)){
        alert('Fuel levels and Cargo mass must be numbers!');
        return
    }
        

    let launchStatus = document.getElementById('launchStatus');
    let fItems = document.getElementById('faultyItems');
    let pStatus = document.getElementById('pilotStatus');
    let coStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    
    //fItems.style.visibility = 'visible';
    pStatus.innerHTML = `${pilotName} is Ready`;
    coStatus.innerHTML = `${copilotName} is Ready`;
    
    if(fuel < 10000){
        fItems.style.visibility = 'visible';
        fuelStatus.innerHTML = 'Not enough fuel for launch!';
        launchStatus.innerHTML = 'Shuttle not ready for launch!';
        launchStatus.style.color = 'Red';
    }   
    else if(cargoMass > 10000){
        fItems.style.visibility = 'visible';
        cargoStatus.innerHTML = 'Too much mass for shuttle to take off!';
        launchStatus.innerHTML = 'Shuttle not ready for launch!';
        launchStatus.style.color = 'red';
    }
    else {
        launchStatus.innerHTML = 'Shuttle is ready for launch!';
        launchStatus.style.color = 'green';
    }
    
    let missionTarget = document.getElementById('missionTarget');
   
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
        response.json().then(function(json){
            missionTarget.innerHTML = ` <h2>Mission Destination</h2>
                <ol>
                   <li>Name: ${json[0].name}</li>
                   <li>Diameter: ${json[0].diameter}</li>
                   <li>Star: ${json[0].star}</li>
                   <li>Distance from Earth: ${json[0].distance}</li>
                   <li>Number of Moons: ${json[0].moons}</li>
                </ol>
                <img src='${json[0].image}'> `
            
        });
    });   
        
    event.preventDefault();
});

