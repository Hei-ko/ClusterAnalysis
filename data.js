var locationsDemo = {
    cityName: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Hamilton', 'Quebec', 'Winnipeg', 'Kitchener', 'London', 'Saint catharines-niagara', 'Victoria', 'Windsor', 'Halifax', 'Oshawa', 'Gatineau', 'Saskatoon', 'Regina', 'Barrie', 'Abbotsford', 'Sherbrooke', 'Trois-rivieres', 'Kelowna', 'Saint johns', 'Guelph', 'Kingston', 'Chicoutimi-jonquiere', 'Sudbury', 'Thunder bay'],
    cityX: [43.65, 45.52, 49.28, 51.05, 45.42, 53.57, 43.26, 46.82, 49.88, 43.46, 42.97, 43.18, 48.43, 42.3, 44.67, 43.89, 45.42, 52.15, 50.45, 44.38, 49.06, 45.4, 46.35, 49.89, 47.58, 43.56, 44.23, 48.43, 46.49, 48.42],
    cityY: [-79.38, -73.57, -123.13, -114.06, -75.71, -113.54, -79.85, -71.23, -97.17, -80.5, -81.24, -79.24, -123.37, -83.03, -63.61, -78.86, -75.71, -106.66, -104.61, -79.68, -122.3, -71.9, -72.57, -119.46, -52.69, -80.26, -76.5, -71.08, -81.01, -89.28],

    fillout: function() {
        //creating html
        var linesQty = this.cityName.length;

        for (i = 0; i < linesQty - 1; i++) {
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

        //filling 
        for (i = 0; i < this.cityName.length; i++) {
            document.getElementById("lname" + (i + 1)).value = this.cityName[i];
            document.getElementById("lat" + (i + 1)).value = this.cityX[i];
            document.getElementById("lon" + (i + 1)).value = this.cityY[i];
        }
    }
}

window.onload = function() {
    locationsDemo.fillout();
}