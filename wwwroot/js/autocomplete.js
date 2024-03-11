window.initializeAutoComplete = (inputId, source) => {
    $(`#${inputId}`).autocomplete({
        source: source,
        open: function () {
            $(this).data("uiAutocomplete").menu.element.css({
                "max-height": "300px",
                "overflow-y": "auto",
                "overflow-x": "hidden"
            });
        }
    });
};
