window.initializeAutoComplete = (inputId, source) => {
    $(`#${inputId}`).autocomplete({
        source: source
    });
};