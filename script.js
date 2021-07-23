var locations = {

    // locX: [-39.435425, -33.035265, -34.430225, -34.040225, -36.434525, -37.032525, -38.403525],
    // locY: [158.433525, 132.432525, 125.030125, 135.030125, 134.043525, 111.430525, 154.035265],

    locX: [],
    locY: [],

    setLocations: function() {
        this.locX = [];
        this.locY = [];
        var table = document.getElementById("inputTable");
        var rowCount = table.rows.length;
        var idNumber = parseFloat(table.rows[rowCount - 1].id.replace("tl", ""));
        var j = 0;
        for (i = 0; i < idNumber; i++) {
            if (document.getElementById("lat" + (i + 1)) != null) {
                this.locX[j] = parseFloat(document.getElementById("lat" + (i + 1)).value);
                this.locY[j] = parseFloat(document.getElementById("lon" + (i + 1)).value);
                j++;
            }
        }
    }
}
var centrQty;

const resultHeader = `
<tr id="headers">
    <td>
        Center
    </td>
    <td>
        Latitude
    </td>
    <td>
        Longitude
    </td>
</tr>
<tr id="ol1"/>
    <th>
        <input class="output" type="text" value="Center #1" disabled></input>
    </th>
    <th>
        <input class="output" id="xCentre1" disabled></input>
    </th>
    <th>
        <input class="output" id="yCentre1" disabled></input>
    </th>
</tr>
`;

function run() { //operates by html button
    centrQty = document.getElementById("centers").value;
    console.log("centrQty", centrQty);

    centres.calculate();
    centres.display();
}

function delButton(clickedId) { //operates by html button
    var lineNum = clickedId.replace("del", "");
    if (lineNum > 1) {
        document.getElementById("tl" + lineNum).remove();
    }
}

function add() { //operates by html button
    var linesQty = document.getElementById("newline").value;

    for (i = 0; i < linesQty; i++) {
        var table = document.getElementById("inputTable");
        var rowCount = table.rows.length;

        var idNumber = parseFloat(table.rows[rowCount - 1].id.replace("tl", "")) + 1;

        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        row.id = "tl" + (idNumber);
        lnameCode = `<input class="input" type="text" id="lname${idNumber}"></input>`;
        latCode = `<input class="input" type="number" id="lat${idNumber}"></input>`;
        lonCode = `<input class="input" type="number" id="lon${idNumber}"></input>`;
        buttonCode = `<button class="input" type="button" id="del${idNumber}" onclick="delButton(this.id)">Delete</button>`;

        cell1.innerHTML = lnameCode;
        cell2.innerHTML = latCode;
        cell3.innerHTML = lonCode;
        cell4.innerHTML = buttonCode;
    };
}

const centres = {

    precision: 6,
    centrX: [],
    centrY: [],
    centrCount: [],
    locCentre: [],
    distance: [
        []
    ],
    newLocCentre: [],
    minDistance: [],

    calculate: function() {

        locations.setLocations();

        //initial assignment centre to a location
        j = 0;
        this.locCentre = Array(locations.locX.length).fill(0);
        this.newLocCentre = Array(locations.locX.length).fill(0);

        for (i = 0; i < locations.locX.length; i++) {
            this.locCentre[i] = j;
            j++;
            if (j >= centrQty) { j = 0 };
        }
        //calculating...
        while (true) {
            console.log("calculating...");

            this.centrX = Array(centrQty).fill(0);
            this.centrY = Array(centrQty).fill(0);
            this.centrCount = Array(centrQty).fill(0);
            this.minDistance = Array(locations.locX.length).fill(0);
            this.distance = Array(locations.locX.length).fill(Array(centrQty).fill(0)); //array of arrays

            console.log("calculating average X and Y (location coordinates) for centre");
            //calculating average X and Y (location coordinates) for centre
            for (j = 0; j < centrQty; j++) {
                this.centrCount[j] = 0;
                this.centrX[j] = 0;
                this.centrY[j] = 0;

                for (i = 0; i < locations.locX.length; i++) {
                    if (j == this.locCentre[i]) {
                        this.centrCount[j]++;
                        this.centrX[j] += locations.locX[i];
                        this.centrY[j] += locations.locY[i];
                    }
                }
            }

            for (j = 0; j < centrQty; j++) {
                if (centres.centrCount[j] == 0) { centres.centrCount[j] = 1 }
                this.centrX[j] = (centres.centrX[j] / centres.centrCount[j]).toFixed(this.precision);
                this.centrY[j] = (centres.centrY[j] / centres.centrCount[j]).toFixed(this.precision);
            };

            console.log("calculating distances (SSE)");
            //calculating distances (SSE)
            for (i = 0; i < locations.locX.length; i++) {
                this.distance[i] = [];
                for (j = 0; j < centrQty; j++) {
                    this.distance[i][j] = (Math.pow((centres.centrX[j] - locations.locX[i]), 2) + Math.pow((centres.centrY[j] - locations.locY[i]), 2)).toFixed(this.precision);
                }
            };

            console.log("comparing to find closest");
            //comparing to find closest
            for (i = 0; i < locations.locX.length; i++) {
                this.minDistance[i] = Math.min(...this.distance[i]);
                this.newLocCentre[i] = (this.distance[i]).findIndex((element) => element <= this.minDistance[i]);
            };

            console.log("if closest = assigned - breaking the loop");
            //if closest = assigned - breaking the loop
            done = true;
            for (i = 0; i < locations.locX.length; i++) {
                if (this.newLocCentre[i] != this.locCentre[i]) {
                    done = false;
                };
            };
            if (done == true) { console.log("done"); break; }

            console.log("re-assigning centres to location");
            //re-assigning centres to location
            for (i = 0; i < locations.locX.length; i++) {
                this.locCentre[i] = this.newLocCentre[i];
            };
        };
    },

    display: function() {
        console.log("--------------");
        console.log("Locations", locations);
        console.log("centrQty", centrQty);
        console.log("centrX", centres.centrX);
        console.log("centrY", centres.centrY);
        console.log("centrCount", centres.centrCount);
        console.log("distance", centres.distance);
        console.log("locCentre", centres.locCentre);
        console.log("newLocCentre", centres.newLocCentre);
        console.log("--------------");
        console.log("--------------");

        resultData = resultHeader;
        resultLines = 0; //q-ty of lines needed to display a result , no zeros
        for (j = 0; j < centrQty; j++) {
            if (centres.centrX[j] != 0) { resultLines++; };
        };

        for (i = 1; i < resultLines; i++) {
            resultData += `
            <tr id="ol${i+1}">
                <th>
                    <input class="output" type="text" value="Center #${i+1}" disabled></input>
                </th>
                <th>
                    <input class="output" id="xCentre${i+1}" disabled></input>
                </th>
                <th>
                    <input class="output" id="yCentre${i+1}" disabled></input>
                </th>
            </tr>
            `;
        };

        document.getElementById("results").innerHTML = resultData;

        i = 0;
        for (j = 0; j < centrQty; j++) {
            if (centres.centrX[j] != 0) {
                document.getElementById("xCentre" + (i + 1)).value = centres.centrX[j];
                document.getElementById("yCentre" + (i + 1)).value = centres.centrY[j];
                i++;
            };
        }

        runMap();
    },

}



//centres.calculate();
//centres.display();