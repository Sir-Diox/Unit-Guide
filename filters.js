$(".unit-box").each(function () {
    //if ($(this).attr("uname") == "Flakker") {
    //    alert($(this).attr("w1-aa") == undefined && $(this).attr("w2-aa") == undefined && $(this).attr("w3-aa") == undefined);
    //}
        if ($(this).attr("w1-aa") == undefined && $(this).attr("w2-aa") == undefined && $(this).attr("w3-aa") == undefined) {
            $(this).parent().hide();
            $(this).parent().parent().parent().parent().children().eq(0).hide();
        }
    });