function Print()
{
    $(".hideonprint").hide();
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

