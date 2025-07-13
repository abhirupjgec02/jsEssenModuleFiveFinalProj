let newDiv = "";
let options = {
    timeZone: '', 
    hour12: true, 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric'
};

function searchResultProcessing(img, item){
    img.classList.toggle("zoom-in");
    newDiv = document.createElement("div");
    newDiv.className = "customContainer";

    const textarea = document.createElement("textarea");
    textarea.id = item.name + "_textarea";
    textarea.rows = 4;
    textarea.cols = 50;
    textarea.placeholder = item.name + " : " + item.description;

    options.timeZone = item.timeZone;
    const localTime = new Date().toLocaleTimeString('en-US', options);
    const timeLabel = document.createElement("h2");
    timeLabel.innerHTML = localTime;
    console.log(`Local time at ${item.name} is : ${localTime}`);

    const table = document.createElement("table");
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");

    cell1.appendChild(img);
    cell2.appendChild(textarea);
    cell3.appendChild(timeLabel);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
    table.cellSpacing = "30";

    newDiv.appendChild(table);
    document.body.appendChild(newDiv);
}

function showCities(zoomPic){
    const heading = document.createElement("h2");
    heading.textContent = "Cities";
    document.getElementById("recomCities").appendChild(heading);
    let imgCount = 3;

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
      .then(data => {
        for(const country of data.countries){
            for(const city of country.cities){
                const img = document.createElement("img");
                img.src = city.imageUrl;
                img.width = 100;
                img.height = 100;
                img.alt = city.name;
                img.title = city.name;
                if(zoomPic){
                    searchResultProcessing(img, city);
                    imgCount--;
                    if(imgCount === 0)
                        break;
                } else {
                    document.getElementById("recomResultCities").appendChild(img);
                }
            }
            if(imgCount === 0)
                break;
        }
      }).catch(error => {
        console.error('Error:', error);
        document.getElementById("recomResultCities").innerHTML = 'An error occurred while fetching data.';
      });
}

function showArches(zoomPic){
    const heading = document.createElement("h2");
    heading.textContent = "Architectures";
    document.getElementById("recomArch").appendChild(heading);

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
      .then(data => {
        for(const temple of data.temples){
            const temImg = document.createElement("img");
            temImg.src = temple.imageUrl;
            temImg.width = 100;
            temImg.height = 100;
            temImg.alt = temple.name;
            temImg.title = temple.name;
            if(zoomPic){
                searchResultProcessing(temImg, temple);
            } else {
                document.getElementById("recomResultArch").appendChild(temImg);
            }
        }
      }).catch(error => {
        console.error('Error:', error);
        document.getElementById("recomResultArch").innerHTML = 'An error occurred while fetching data.';
      });
}

function showBeaches(zoomPic){
    const heading = document.createElement("h2");
    heading.textContent = "Leisures And Beaches";
    document.getElementById("recomBeaches").appendChild(heading);

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
      .then(data => {
        for(const beach of data.beaches){
            const bImg = document.createElement("img");
            bImg.src = beach.imageUrl;
            bImg.width = 100;
            bImg.height = 100;
            bImg.alt = beach.name;
            bImg.title = beach.name;
            if(zoomPic){
                searchResultProcessing(bImg, beach);
            } else {
                document.getElementById("recomResultBeaches").appendChild(bImg);
            }
        }
      }).catch(error => {
        console.error('Error:', error);
        document.getElementById("recomResultBeaches").innerHTML = 'An error occurred while fetching data.';
      });
}

function clearDivisions(){
    document.getElementById("recomCities").innerHTML = "";
    document.getElementById("recomResultCities").innerHTML = "";
    document.getElementById("recomArch").innerHTML = "";
    document.getElementById("recomResultArch").innerHTML = "";
    document.getElementById("recomBeaches").innerHTML = "";
    document.getElementById("recomResultBeaches").innerHTML = "";
    
    let elements = document.querySelectorAll(".customContainer");
    if(elements){
        elements.forEach(element => element.remove());
    }
}

function showRecommendations(){
    document.getElementById("searchInput").value = "";
    clearDivisions();
    showCities(false);
    showArches(false);
    showBeaches(false);
}

showRecommendations();

function filterBySearchKeyWords(){
    const input = document.getElementById("searchInput").value.toLowerCase();
    if(input.includes('coun') || input.includes('cit')) {
        clearDivisions();
        showCities(true);
    } else if(input.includes('arch') || input.includes('tem')) {
        clearDivisions();
        showArches(true);
    } else if(input.includes('bea')) {
        clearDivisions();
        showBeaches(true);
    }
}

btnSearch.addEventListener('click', filterBySearchKeyWords);


btnClear.addEventListener('click', showRecommendations);

