function filterTable(searchValue) {
    var table = document.getElementById("invoiceTable");
    var rows = table.querySelectorAll("tbody tr");

    rows.forEach(function (row) {
        var cells = row.getElementsByTagName("td");
        var found = false;

        Array.from(cells).forEach(function (cell) {
            if (cell.textContent.toUpperCase().indexOf(searchValue.toUpperCase()) > -1) {
                found = true;
            }
        });

        row.style.display = found ? "" : "none";
    });
}