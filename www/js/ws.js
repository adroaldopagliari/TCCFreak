$(function () {
            // example call
            /* button  #btntrabalhos */
            $(document).on("click", "#btnsincronizar", function (evt) {
                    $.ajaxSetup({
                        async: true
                    }); // chamada é síncrona, estamos aguardando retorno


                    db.findTrabalhoAll(function (trabalhos) {

                            for (var i = 0; i < trabalhos.length; i++) {

                                $.ajax({
                                    type: 'GET',
                                    // adaptar para sincronização
                                    url: 'http://rasystems.esy.es/index.php/itrabalho/'+
                                    trabalhos[i].codtra + '/' +
                                    trabalhos[i].nomtra + '/' +
                                    trabalhos[i].nomcur,

                                    /*data: {
                                        "id": trabalhos[i].codtra,
                                        "nomtra": trabalhos[i].nomtra,
                                        "nomcur": trabalhos[i].nomcur
                                    },*/

                                    dataType: 'json',
                                    contentType: 'application/json; charset=utf-8',
                                    beforeSend: function () {
                                        $('#loading').show();
                                    },
                                    complete: function () {
                                        //$("#loading").hide();
                                    },
                                    success: function (response) {
                                        //alert(JSON.stringify(response));
                                    },
                                    error: function (error) {
                                        console.log(error);
                                    }
                                });

                            }

                        }


                    });
            });