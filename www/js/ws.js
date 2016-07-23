$(function () {
    // example call
    /* button  #btntrabalhos */
    $(document).on("click", "#btnsincronizar", function (evt) {
        $.ajaxSetup({
            async: true
        }); // chamada é síncrona, estamos aguardando retorno
        $.ajax({
            type: 'GET',
            // adaptar para sincronização
            url: 'http://rasystems.esy.es/index.php/trabalhos',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $('#loading').show();
            },
            complete: function () {
                //$("#loading").hide();
            },
            success: function (response) {
                alert(JSON.stringify(response));
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});