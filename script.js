// const allFiles = [
//     "2aa434f8-43c1-4f68-9e6f-f33fa1c3f5ab.json",
//     "2da6e0c4-e346-4f86-84ba-a9af35832e92.json",
//     "03b49dde-0e42-41b0-b6b0-b31b79c21845.json",
//     "3e042019-6bfe-4b4e-9bd1-2454e6e0ce1c.json",
//     "3f09598b-6a48-4ba4-9e86-29ac6ef71b04.json",
//     "5a7705f6-466a-46b9-9aa7-ab8befa76b41.json",
//     "5b2253bf-43e4-4060-9aee-f81ab31846c6.json",
//     "6c76e146-4a06-4a97-9490-d6b33554f2c6.json",
//     "7f80738e-63a6-4e8b-a82d-7d9c13a690f8.json",
//     "8dc56bce-514e-4911-b28b-348eed12f672.json",
//     "8e40b961-6371-4e0d-86f6-883bc503d322.json",
//     "15bf95bb-5644-46bf-bd32-f7dbb7dcc907.json",
//     "23c7a264-7992-4d02-92f4-aca3206aba92.json",
//     "38c8dfe7-52a5-4a0e-86fe-afdcbb3c5720.json",
//     "39b7e9de-cce1-4293-873c-51db9ff1096c.json",
//     "42f9cb4b-33a1-48a8-bca3-c711fd43af6c.json",
//     "43fbbcba-35fc-463a-9da4-e61951d342bd.json",
//     "45f6f560-a45b-430c-85a7-73057e0d6226.json",
//     "47ee7c7e-c399-4db3-9159-93d554799b2d.json",
//     "54d41ea7-773e-4aea-9fe9-2b3bc58ccb1c.json",
//     "58b7486c-7747-44ce-bbe5-eadb9f6e49f9.json",
//     "58e9903d-15ac-497a-9d38-691e4f55ceaf.json",
//     "71b83681-db3b-4cab-a8cf-0b8d7ea5a1d0.json",
//     "72aa76dd-dd87-4b39-ac0f-e109c1b37560.json",
//     "92e39042-ccc5-4172-982a-8c3b0a533edc.json",
//     "99bcd744-8020-4ac8-a5b4-9a1cd951d7e0.json",
//     "317e701c-ac35-41c3-a200-0c841f173c17.json",
//     "422a8697-defe-45ae-95d5-02faa61ab5b7.json",
//     "756fd2d0-c15d-4e24-a30c-6d37ec71e8ac.json",
//     "782bd130-328b-43e8-93ca-fd40bf48c7e1.json",
//     "809ca5a4-15b9-4aa8-944e-d0296106ba68.json",
//     "898d3de0-40e9-4646-a4e5-696373a8af9e.json",
//     "1141d40a-51a3-4dbc-87a1-f1ed8c9d4a8f.json",
//     "5130edd9-019a-40d3-9dc2-0a2721aa0c3e.json",
//     "6787ec20-0a07-4edb-8f38-55e6c281e171.json",
//     "7693f0b8-c7c8-42c7-909c-e5a172dbbf04.json",
//     "43935ca2-0118-41ad-ae6a-6ba2f23be11a.json",
//     "66429a50-1e51-4b8d-8edd-8665522786b9.json",
//     "68744e40-37d3-4701-919f-71076b10d5ba.json",
//     "865061e8-5617-4486-be73-e4f896d3d1fe.json",
//     "45630533-aecd-498e-b3b1-a7b6ad8e122b.json",
//     "a701039f-4b3f-4999-9e3a-6f4325e400c9.json",
//     "aa95d4ac-325b-4914-baeb-3e17e99f45b9.json",
//     "b9da3470-6926-4cb1-8070-ef22459e249b.json",
//     "c6f99899-e3de-4cc7-8899-276838966ec0.json",
//     "c5766efa-2367-46fa-9bc8-01e2f6629e3d.json",
//     "ca14531a-77bc-4aad-a3fa-dfe034c22839.json",
//     "cc3e6f48-82ca-4309-9152-2c4033d138e2.json",
//     "cc145f63-c755-4cb1-b9b1-93aa9bc87799.json",
//     "d3abf5cc-4a64-4b3d-8639-6530cbc72c6e.json",
//     "d1681b66-343f-4c26-b7ac-69c39aac86b9.json",
//     "d925650c-6439-43f2-956c-d05bd3db3f34.json",
//     "db517b91-16e6-4107-a567-93bef811dfbe.json",
//     "dc14cc1e-a8e9-4996-9667-d286d77cb86e.json",
//     "dc833b85-3cba-4ebd-8f4d-febc09f02422.json",
//     "dddaea70-b0d6-4dce-ab77-b733f85ee0a4.json",
//     "fdd877f0-7396-4b4b-8dba-3e91fd21d1b3.json",
// ];

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
    fetch('data/stats/' + data)
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
        fetch('data/advancement/' + file)
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
    fetch("data/full-advancement.json")
    .then((response) => response.json())
    .then((response) => {advancementFull = response});
}

function searchUser() {
    const contentZone = document.querySelector(".content");
    totalField.style.display = "none";

    for (let player in allData) {
        let content;
        if (search.value.toLowerCase() == allData[player].name.toLowerCase()) {
            content = `<h1>Les stats de ${allData[player].name}</h1>`;
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