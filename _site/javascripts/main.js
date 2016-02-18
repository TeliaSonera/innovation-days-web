function resizeInner() {
    $('.inner').height('');
    $('section').each(function(){
        var highest = 0;
        var top = 0;
        var horizontal = false;
        $(this).find('.inner').each(function(){
            $(this).height() > highest ? highest = $(this).height() : highest = highest;
            if (top == 0) {
                top = $(this).offset().top;
            } else {
                if ($(this).offset().top == top) {
                    horizontal = true;
                }
            }
        });
        if(horizontal) {
            $(this).find('.inner').each(function(){
                $(this).height(highest);
            });
        }
    });
}

function conditionalFields() {
    $('.conditional').each(function(){
        var conditional = $(this);
        var condition = $(this).find('input').attr('data-condition');
        var switcher = $(condition);
        switcher.change(function(){
            if($(this).is(':checked')){
               conditional.show();
            } else {
                conditional.hide();            
            }
        });
    });
}

function burgerClick() {
    if($('.burger').hasClass('open')) {
        $('.burger').removeClass('open');
        $('.nav .grid-12').slideUp();
    } else {
        $('.burger').addClass('open');
        $('.nav .grid-12').slideDown();        
    }
}

$(document).ready(function(){
    resizeInner();
    conditionalFields();
    $(window).resize(function(){
        resizeInner();
    });
    $('.burger').click(function(){
        burgerClick();
    });
    $(window).resize(function(){
        $('.nav .grid-12').css('display', '');
        $('.burger').removeClass('open');
    })
});