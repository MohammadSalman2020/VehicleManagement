function Print()
{
    $(".hideonprint").hide();
    window.print();
    $(".hideonprint").show();
}


window.selectAllInputValue = function (inputId) {
    var input = document.getElementById(inputId);
    if (input) {
        input.select();
    }
};
