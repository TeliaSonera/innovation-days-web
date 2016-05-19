var HRTemplate2 = Handlebars.compile($('#hr-template2').html());
var loadComplete = 0;

function whenComplete() {
    $('.problem p').each(function(){
            var str = $(this).text();
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $(this).html(str)
            $(this).linkify();
        });
        $('.solution p').each(function(){
            var str = $(this).text();
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $(this).html(str)
            $(this).linkify();
        });
        $('.like').each(function(){
            var id = $(this).attr('id');
            if (document.cookie.indexOf(id + "love=true") > -1) {$(this).addClass('loveit')}
            var likes = ratings[$(this).attr('id')];
            $(this).find('span').text(likes);
        });
        $('.like').click(function(){
            if ($(this).hasClass('loveit')) {
                var id = $(this).attr('id');
                $('#entry_748787593').val(id);
                $('#ss-submit2').click();
                var a = parseInt($(this).find('span').text()) - 1;
                $(this).find('span').text(a);  
                $(this).removeClass('loveit');
                var d = new Date();
                var a=d.getTime()+(28*24*60*60*1000);
                d.setTime(d.getTime()+(28*24*60*60*1000));
                var expires = "expires="+d.toGMTString();
                document.cookie = id + "love=false; domain=" + document.location.host + "; path=/; " + expires;
            } else {
                var id = $(this).attr('id');
                $('#entry_387011848').val(id);
                $('#ss-submit').click();
                var a = parseInt($(this).find('span').text()) + 1;
                $(this).find('span').text(a); 
                $(this).addClass('loveit');
                var d = new Date();
                var a=d.getTime()+(28*24*60*60*1000);
                d.setTime(d.getTime()+(28*24*60*60*1000));
                var expires = "expires="+d.toGMTString();
                console.log(document.location.host);
                document.cookie = id + "love=true; domain=" + document.location.host + "; path=/; " + expires;
            }
        });
    ul = $('#fuckups'); // your parent ul element
    ul.children().each(function(i,div){ul.prepend(div)});
    $('#fuckups').show();
    $('.toggler').click(function(){
        $(this).toggleClass('active');
        $(this).parent().find('.problem').toggle();
        $(this).parent().find('.solution').toggle();
    });
}

$('#dummytemplate').sheetrock({
    url: "https://docs.google.com/spreadsheets/d/1GXh1FVbgoxRYsUXaiqrwfxvJMhYooJB6WXM-7T3nZ6w/edit#gid=0",
    query: "select G",
    fetchSize: 1,
    callback: function (a, b, c) {        
        var ratingstring = c.rows[1].cells.STRING;
        var splitted = ratingstring.split(',');
        ratings = {splitted : splitted};
        for (var i = 0; i < 78; i++) {
            var pair = ratings.splitted[i].split(':');
            ratings[pair[0]] = pair[1]
        }
        loadComplete++;
        if (loadComplete > 1) {whenComplete()}
    }
});

$('#fuckups').sheetrock({
    url: mySpreadsheet1,
    query: "select B,D,E,F",
    fetchSize: 40,
    rowTemplate: HRTemplate2,
    callback: function (a, b, c) {
        loadComplete++;
        if (loadComplete > 1) {whenComplete()}
    }
});

