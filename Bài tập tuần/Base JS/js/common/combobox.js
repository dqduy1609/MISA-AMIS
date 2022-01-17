$(document).ready(function () {
    
    $('.m-comboboxjs .m-combobox-button').click(btnComboboxOnClick);
    $('.m-comboboxjs').on('click', '.m-combobox-item', itemComboboxOnClick);
    $(".m-comboboxjs input").keydown(inputComboboxOnKeyDown);

});


function inputComboboxOnKeyUp() {
    switch (event.keyCode) {
        
        case 13:
        case 40:
        case 38:
            break;
        default:
            $(this).siblings('.m-combobox-data').show();    
            let itemDataElement = $(this.parentElement).data('itemDataElement');
            // Build html cho các combobox data item:
            $(this).siblings(".m-combobox-data").html(itemDataElement);
            const valueInput = this.value;
            let items = $(this).siblings(".m-combobox-data").children();

            for(const item of items){
                let text = item.textContent;
                if(!text.toLowerCase().includes(valueInput.toLowerCase())){
                    item.remove();
                }
            }
            $(this).siblings('.m-combobox-data').show();
            break;
    }
    
}

function inputComboboxOnKeyDown(){
    $(this).siblings('.m-combobox-data').show();
    let items = $(this).siblings('.m-combobox-data').children();

    let itemHovered =items.filter('.m-combobox-item-hover');

    switch (event.keyCode) {
        case 40:
            if (itemHovered.length > 0) {
                
                let nextElement = itemHovered.next();
    
                nextElement.addClass('m-combobox-item-hover');

                itemHovered.removeClass('m-combobox-item-hover');
            }
            else{
                let firstItem = items[0];
                firstItem.classList.add('m-combobox-item-hover');
            }
            $(this).siblings('.m-combobox-data').show();
            break;
        case 38:
            if (itemHovered.length > 0) {
                let preElement = itemHovered.prev();
                preElement.addClass('m-combobox-item-hover');
                itemHovered.removeClass('m-combobox-item-hover');
            }
            else{
                let lastItem = items[items.length-1];
                lastItem.classList.add('m-combobox-item-hover');
            }
            $(this).siblings('.m-combobox-data').show();
            break; 
        case 13:
            if (itemHovered.length == 1) {
                itemHovered = itemHovered[0];
                let text = itemHovered.textContent;
                let value = itemHovered.getAttribute('value');
                let parentElement = itemHovered.parentElement; 
                $(parentElement).siblings('input').val(text);
                $(itemHovered).siblings('input').val(text);

                let parentComboboxElement = $(this).parents('.m-comboboxjs');
                parentComboboxElement.attr('value', value);
                parentComboboxElement.data('value', value);
                parentComboboxElement.attr('nameSelectedItem', text);

                $(parentElement).hide();
                $('.m-combobox-data').next().focus();
            }
            
            break; 
        default:
            $(this).siblings('.m-combobox-data').hide();
            break;
    }
}


function btnComboboxOnClick(){
    let cbxData = $(this).siblings('.m-combobox-data');
    cbxData.toggle();
    
}

function itemComboboxOnClick(){
    const text = this.textContent;

    const value = this.getAttribute('value');

    let parentElement = this.parentElement; 

    $(parentElement).siblings('input').val(text);
    $(this).siblings('input').val(text);

    let parentComboboxElement = $(this).parents('.m-comboboxjs');
    parentComboboxElement.attr('value', value);
    parentComboboxElement.data('value', value);
    parentComboboxElement.attr('nameSelectedItem', text);
    $(parentElement).hide();
}