function Print() {
    $(".hideonprint").hide();

    // Add CSS for print media dynamically
    var printCSS = '<style>@media print { thead { display: table-header-group; } tbody:before { content: ""; display: table-header-group; } @page { size: auto; margin: 5mm; } body { zoom: 90%; }</style>';
    $("head").append(printCSS);

    window.print();
    $(".hideonprint").show();
}

window.selectAllInputValue = function (inputId) {
    var input = document.getElementById(inputId);
    if (input) {
        if (input.value === '0') {
            input.value = ''; // Clear the value
        } else {
            input.select(); // Select the input
        }
    }
};


function setSessionStorageItem(key, value) {
    sessionStorage.setItem(key, value);
}

function getSessionStorageItem(key) {
    return sessionStorage.getItem(key);
}

