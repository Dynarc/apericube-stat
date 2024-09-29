let allData = [];
let allUser = [];
let getStatProgress = allFiles.length - 1;
let getAdvancementProgress = allFiles.length - 1;
let advancementFull = getAdvancementFull();

const search = document.querySelector("#search");
const searchList = document.querySelector('#search-list')
const form = document.querySelector("form");
const statType = document.querySelector('#stat-type');
const statName = document.querySelector('#stat-name');
const totalField = document.querySelector('.total');

function getStat(data) {
    fetch('data/' + version + '/stats/' + data)
        .then((response) => response.json())

        .then(async (response) => {
            const userData = response;
            const userName = await fetch(
                "https://api.minetools.eu/uuid/" + data.replace(/(.json)/g, "")
            )
                .then((response) => response.json())
                .then((response) => {
                    return response.name;
                });

            userData.name = userName;
            userData.UUID = data.replace(/(.json)/g, "");
            allUser.push(userName.toLowerCase());

            allData.push(userData);

            if (getStatProgress === 0) {
                getAdvancement();
            } else {
                getStatProgress --;
            }
        })

        .catch((err) => {
            console.error(err);
        });

}

function getAdvancement () {
    allFiles.forEach(file => {
        fetch('data/' + version + '/advancement/' + file)
        .then((response) => response.json())
        .then((response) => {
            const userAdvancement = response;
            allData.forEach(data => {
                if(data.UUID == file.replace(/(.json)/g, "")) data.advancement = userAdvancement;
            });
            if (getAdvancementProgress === 0) {
                allUser.sort();
                getUser();
            } else {
                getAdvancementProgress --;
            }
        })
        .catch((err) => {
            console.error(err);
        });

    });
}

function getAdvancementFull() {
    fetch("data/" + version + "/full-advancement.json")
    .then((response) => response.json())
    .then((response) => {advancementFull = response});
}

function searchUser() {
    const contentZone = document.querySelector(".content");
    totalField.style.display = "none";

    for (let player in allData) {
        let content;
        if (search.value.toLowerCase() == allData[player].name.toLowerCase()) {
            content = `<h1>Les stats de ${allData[player].name}`;
            content += `<img class="mx-4" src="https://mc-heads.net/avatar/${allData[player].UUID}/50" alt="Tête du joueur ${allData[player].name}" title="Tête du joueur ${allData[player].name}">`
            content += '</h1>';
            content += '<button class="btn btn-secondary m-2">Statistiques</button><button class="btn btn-secondary m-2">Recettes débloquées</button><button class="btn btn-secondary m-2">Advancement</button>'
            content += `<table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">type</th>
                <th scope="col">Stat</th>
                <th scope="col">Valeur</th>
              </tr>
            </thead>
            <tbody>`;
            for (let type in allData[player].stats) {

                for (let stat in allData[player].stats[type]) {

                    content += `
                <tr>
                    <td>${type}</td>
                    <td>${stat}</td>
                    <td>${allData[player].stats[type][stat]}</td>
                </tr>
                `;
                }
            }
            content += `
            </tbody>
          </table>`;

            contentZone.innerHTML = content;

            document.querySelectorAll('.content button').forEach(button => {
                button.addEventListener('click', ()=>updateStat(button.innerHTML, player))
            });
        }
    }

}

function updateStat(dataType, player) {
    const dataTable = document.querySelector('table.table.table-striped.table-sm');
    let content = '';
    if(dataType === 'Statistiques') {
        content =   `<table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">type</th>
                                <th scope="col">Stat</th>
                                <th scope="col">Valeur</th>
                            </tr>
                        </thead>
                    <tbody>`;
        for (let type in allData[player].stats) {

            for (let stat in allData[player].stats[type]) {

                content +=  `<tr>
                                <td>${type}</td>
                                <td>${stat}</td>
                                <td>${allData[player].stats[type][stat]}</td>
                            </tr>`;
            }
        }
        content += `
        </tbody>`;
    } else if (dataType === 'Recettes débloquées') {
        content += '<div class="d-flex flex-row justify-content-around flex-wrap">';
        for (const value in advancementFull) {
            let criteria = '';
            let isUnlocked = false;

            if(/^minecraft:recipes/.test(value)){
                for (let crit in advancementFull[value]['criteria']) {
                    if (crit !== 'has_the_recipe') {
                        if (! allData[player].advancement[value]) {
                            criteria += `<p class="m-0 text-danger">${crit}</p>`;
                        } else {
                            criteria += `<p class="m-0">${crit}</p>`;
                        }
                    }
                }
                if (allData[player].advancement[value]) {
                    isUnlocked = true;
                }
                content +=  `<div class='card mx-2 my-2' style='width: 18rem;'>
                                <div class='card-body'>
                                    <h5 class='card-title ${isUnlocked ? 'text-success' : 'text-danger'}'>${value.split('/')[value.split('/').length-1]}</h5></a>
                                    <p class='card-text'>${criteria}</p>
                                </div>
                            </div>`;
            }
        }

        content += '</div>';
    } else if (dataType === 'Advancement') {
        content += '<div class="d-flex flex-row justify-content-around flex-wrap">';
        for (const value in advancementFull) {
            let criteria = '';
            let isUnlocked = false;
            if(/^minecraft:[aehns]/.test(value)){
                if (allData[player].advancement[value]) {
                    if (allData[player].advancement[value].done) {
                        isUnlocked = true;
                    }
                }
                for (let crit in advancementFull[value]['criteria']) {
                    if (crit !== 'DataVersion') {
                        if (! isUnlocked && ( allData[player].advancement[value] && ! allData[player].advancement[value]['criteria'][crit] ) || (! allData[player].advancement[value])) {
                            criteria += `<p class="m-0 text-danger">${crit}</p>`;
                        } else {
                            criteria += `<p class="m-0">${crit}</p>`;
                        }
                    }
                }
                content +=  `<div class='card mx-2 my-2' style='width: 18rem;'>
                                <div class='card-body'>
                                    <h5 class='card-title ${isUnlocked ? 'text-success' : 'text-danger'}'>${value.split('/')[value.split('/').length-1]}</h5></a>
                                    <p class='card-text'>${criteria}</p>
                                </div>
                            </div>`;
            }
        }

        content += '</div>';
    }

    dataTable.innerHTML = content;
}

function displayGraph1() {
    const content = document.querySelector(".content");
    content.innerHTML = `<canvas id="myChart" width="400" height="400" style="max-height: 90vh"></canvas>`;
    const ctx = document.querySelector('#myChart');
    const dataValue = [];
    const dataLabel = [];
    let total = 0;

    allData.forEach(playerData => {
        if (playerData.stats[statType.value] && playerData.stats[statType.value]['minecraft:' + statName.value]) {

            total += playerData.stats[statType.value]['minecraft:' + statName.value];

            dataValue.push({ name: playerData.name, value: playerData.stats[statType.value]['minecraft:' + statName.value] });
            dataValue.sort(function (a, b) {
                return b.value - a.value;
            });

        }
    });

    totalField.innerHTML = `Total : ${new Intl.NumberFormat('de-DE').format(total)}`;
    totalField.style.display = "inline-block";

    const data = {
        datasets: [{
            label: statName.value,
            data: dataValue,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            datalabels: {
                align: 'end',
                anchor: 'end',
                rotation: 315
            }
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            parsing: {
                xAxisKey: 'name',
                yAxisKey: 'value'
            },
            plugins: {
                datalabels: {
                    color: 'black',
                    display: function (context) {
                        return context.dataset.data[context.dataIndex].value;
                    },
                    font: {
                        weight: 'bold'
                    },
                    formatter: (val) => {return val.value}
                }
            },
            aspectRatio: 5 / 3,
            layout: {
                padding: {
                    top: 24,
                    right: 16,
                    bottom: 0,
                    left: 8
                }
            },
            elements: {
                line: {
                    fill: false
                },
                point: {
                    hoverRadius: 7,
                    radius: 5
                }
            },
        },
    };

    const myChart = new Chart(ctx, config);

}

let dataValue = [] ;

function displayGraph() {
    dataValue = [["Player", statName.value, { role: "style" }]];
    const barStyle = 'stroke-color: red; stroke-opacity: 1; stroke-width: 1; fill-color: #ffc7d2; fill-opacity: 0.8;';
    const dataLabel = [];
    let total = 0;

    allData.forEach(playerData => {
        console.log(playerData.name);
        if (playerData.stats[statType.value] && playerData.stats[statType.value]['minecraft:' + statName.value]) {

            total += playerData.stats[statType.value]['minecraft:' + statName.value];

            dataValue.push([playerData.name, playerData.stats[statType.value]['minecraft:' + statName.value], barStyle]);
        }
    });

    dataValue.sort(function (a, b) {
        return b[1] - a[1];
    });

    console.log(dataValue);

    totalField.innerHTML = `Total : ${new Intl.NumberFormat('de-DE').format(total)}`;
    totalField.style.display = "inline-block";

    const content = document.querySelector(".content");
    content.innerHTML = `<div id="columnchart_values" style="width: 100%; height: 100%;"></div>`;
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
    let data = google.visualization.arrayToDataTable(dataValue);

    let view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation",
        },
        2]);

    let options = {
        title: dataValue[0][1],
        width: '150%',
        height: '100%',
        chartArea: {
            width: '80%',
            height: '80%'
        },
        crosshair: {
            trigger: 'selection'
        },
        bar: { groupWidth: "80%" },
        legend: { position: "none" },
        animation: {
            duration: 1000,
            easing: 'out',
        },
        hAxis: {
            textStyle: {
                fontSize: 12
            },
            slantedText: true,
            slantedTextAngle: 45,
        },
        axes: {
            x: {
                0: { side: 'top', label: 'White to move'} // Top x-axis.
            }
        },
        annotations: {
            alwaysOutside: true,
            style: 'line',
            textStyle: {
                fontSize: 12,
                auraColor: 'none',
                color: '#555',
                bold: true,
            },
        },
    };
    let chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
}

function updateStatList() {
    let statList = []
    allData.forEach(player => {
        if (player.stats[statType.value]) {
            for (const type in player.stats[statType.value]) {
                if (!statList.includes(type)) {
                    statList.push(type);
                }
            }
        }
    });

    statList.sort();

    const stats = document.querySelector('#stat-list');

    stats.innerHTML = '';
    let allStats = '';

    statList.forEach(stat => {
        allStats += `<option value="${stat.replace('minecraft:', '')}">`;
    });

    stats.innerHTML = allStats;

    statName.value = '';
}

function getUser() {
    let allPlayers = '';
    allUser.forEach(user => {
        allPlayers += `<option value="${user}">`;
    });
    searchList.innerHTML = allPlayers;
}


function noSubmit(event) {
    event.preventDefault();
}

allFiles.forEach((file) => {
    getStat(file);
})

search.addEventListener("change", searchUser);
search.addEventListener("change", () => { search.placeholder = search.value; search.value = '' });

statType.addEventListener("change", updateStatList);
statName.addEventListener("change", displayGraph);
statName.addEventListener("change", () => { statName.placeholder = statName.value; statName.value = '' });

form.addEventListener("submit", noSubmit);
statName.parentElement.addEventListener("submit", noSubmit);



function updateStatElement(bool) {
    const statTypeElement = document.querySelector("#stat-type");
    const statNameElement = document.querySelector("#stat-name");
    const totalElement = document.querySelector(".total");

    statTypeElement.hidden = bool;
    statNameElement.hidden = bool;
    totalElement.hidden = bool;
}

const infoType = document.querySelector("#info-type");
const contentPage = document.querySelector(".content");
infoType.addEventListener("change",(e)=>{
    let content = "";
    contentPage.innerHTML = "";

    switch (infoType.value) {
        case "statistics":
            updateStatElement(false);
            break;
        case "recipes":
            updateStatElement(true);
            content += '<div class="d-flex flex-row justify-content-around flex-wrap">';
            for (const value in advancementFull) {
                let criteria = "";
                let player = "";

                if(/^minecraft:recipes/.test(value)){
                    for (let crit in advancementFull[value]['criteria']) {
                        criteria += `<p class="m-0">${crit}</p>`;
                    }

                    allData.forEach(element => {
                        if(element.advancement[value]) {
                            player += "<small>" + element["name"] + "</small>";
                            player += " - "
                        }
                    });
                    player = player.slice(0,player.length - 3);

                    if(!player){
                        player = "<b>Personne n'a obtenu cette recette</b>"
                    }

                    content +=  `<div class='card mx-2 my-2' style='width: 18rem;'>
                                    <div class='card-body'>
                                        <h5 class='card-title'>${value.split('/')[value.split('/').length-1]}</h5></a>
                                        <p class='card-text'>${criteria}</p>
                                        ${player}
                                    </div>
                                </div>`;
                }
            }
            content += '</div>';
            contentPage.innerHTML = content
            break;
        case "advancements":
            updateStatElement(true);
            content += '<div class="d-flex flex-row justify-content-around flex-wrap">';
            for (const value in advancementFull) {
                let criteria = "";
                let player = "";
                if(/^minecraft:[aehns]/.test(value)){
                    for (let crit in advancementFull[value]['criteria']) {
                        if (crit !== 'DataVersion') {
                            criteria += `<p class="m-0">${crit}</p>`;
                        }
                    }

                    allData.forEach(element => {
                        if (element.advancement[value] && element.advancement[value].done) {
                            player += "<small>" + element["name"] + "</small>";
                            player += " - ";
                        }
                    });
                    player = player.slice(0,player.length - 3);

                    if(!player){
                        player = "<b>Personne n'a obtenu cet advancement</b>"
                    }

                    content +=  `<div class='card mx-2 my-2' style='width: 18rem;'>
                                    <div class='card-body'>
                                        <h5 class='card-title'>${value.split('/')[value.split('/').length-1]}</h5></a>
                                        <p class='card-text'>${criteria}</p>
                                        ${player}
                                    </div>
                                </div>`;
                }
            }

            content += '</div>';
            contentPage.innerHTML = content
            break;
        default:
            content = "ERROR CHOOSE STAT TYPE ALLOWED";
            break;
    }

    if(content) {
        contentPage.innerHTML = content;
    }
})


document.createElement("select")