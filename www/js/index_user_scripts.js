var db = new WebSqlDB(sucesso, erro);

function sucesso() {
    console.log("sucesso DV");
}

function erro(error) {
    console.log("Erro de DB: " + error);
}

var padAssinatura;

/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {

        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            // listar dados dos trabalhos
            db.findAlunoAll(function (alunos) {
                // limpando a lista
                $("#lstalunos").html("");
                for (var i = 0; i < alunos.length; i++) {
                    // adicionando os itens na lista
                    $("#lstalunos").prepend(
                        '<ion-item id="' + alunos[i].codalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + alunos[i].codalu + '" class="button button-positive"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        '<img src="' + alunos[i].fotalu + '" height="32" width="32"> ' +
                        alunos[i].nomalu + ' - ' + alunos[i].nomcur + '</ion-item>'
                    );
                }
            });

            /*global activate_subpage */
            //document.getElementById("addaluno").style.display = "block";
            //document.getElementById("addaluno").style.visibility = "visible";
            activate_subpage("#sblalunos");
            return false;
        });

        /* button  #btnvoltaraluno */
        $(document).on("click", "#btnvoltaraluno", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
            return false;
        });

        /* button  #btnsalvaraluno */
        $(document).on("click", "#btnsalvaraluno", function (evt) {
            db.insertAluno(JSON.stringify({
                "nomalu": $("#txtnomealuno").val(),
                "nomcur": $("#txtnomecurso").val(),
                "fotalu": $("#imgaluno").attr('src')
            }), function (status) {
                if (status == true) {
                    // capturando os dados do aluno da tela        
                    navigator.notification.alert(
                        "Aluno cadastrado com sucesso!"
                    );
                }
            });

            return false;
        });

        /* button  #btntrabalhos */


        /* button  #btnassinatura */
        /* $(document).on("click", "#btnassinatura", function (evt) {
             var canvas = document.getElementById("canvasAssinatura");
             padAssinatura = new SignaturePad(canvas);
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight - ((window.innerHeight * 25) / 100);

             activate_subpage("#sbassinatura");
             return false;
         });*/

        /* button  #btnmenu */
        $(document).on("click", "#btnmenu", function (evt) {
            /*global uib_sb */
            /* Other possible functions are: 
              uib_sb.open_sidebar($sb)
              uib_sb.close_sidebar($sb)
              uib_sb.toggle_sidebar($sb)
               uib_sb.close_all_sidebars()
             See js/sidebar.js for the full sidebar API */

            uib_sb.toggle_sidebar($("#sbmenu"));
            return false;
        });

        $(document).on("click", "#imgaluno", function (evt) {
            navigator.camera.getPicture(
                onSuccessFoto,
                onErrorFoto, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                }
            );
        });

        /* button  #btnsair */
        $(document).on("click", "#btnsair", function (evt) {
            navigator.notification.confirm(
                'Deseja realmente sair?',
                function (buttonIndex) {
                    if (buttonIndex == 1) {
                        navigator.app.exit();
                    }
                },
                'Sair',
                'Sim,Não'
            );
            return false;
        });

        /* button  #btntrabalhos */


        /* button  #btntrabalhos */
        $(document).on("click", "#btntrabalhos", function (evt) {
            // listar dados dos trabalhos
            db.findTrabalhoAll(function (trabalhos) {
                // limpando a lista
                $("#lsttrabalhos").html("");
                for (var i = 0; i < trabalhos.length; i++) {
                    // adicionando os itens na lista
                    $("#lsttrabalhos").prepend(
                        '<ion-item id="' + trabalhos[i].nomtra + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + trabalhos[i].codtra + '" class="button button-positive" onClick=editTrabalho("' + trabalhos[i].codtra + '")><i class="icon icon ion-edit"></i> </button> ' +
                        ' <button id="' + trabalhos[i].codtra + '" name = "' + i + '" class="button button-assertive" onClick=deleteTrabalho("' + trabalhos[i].codtra + '")><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        trabalhos[i].nomtra + ' - ' + trabalhos[i].nomcur + '</ion-item>'
                    );
                }
            });

            /*global activate_subpage */
            activate_subpage("#sbltrabalhos");
            return false;
        });

        /* button  #btncadastrartrabalho */
        $(document).on("click", "#btncadastrartrabalho", function (evt) {
            console.log($("#txtnometrabalho").val());
            console.log($("#txtnomecursotra").val());
            db.insertTrabalho(JSON.stringify({
                "nomtra": $("#txtnometrabalho").val(),
                "nomcur": $("#txtnomecursotra").val()
            }), function (status) {
                if (status == true) {
                    // capturando os dados do aluno da tela        
                    navigator.notification.alert(
                        "Trabalho cadastrado com sucesso!"
                    );
                }
            });
            return false;
        });

        /* button  #btnvoltartrabalho */
        $(document).on("click", "#btnvoltartrabalho", function (evt) {
            /*global activate_subpage */
            activate_subpage("#page_55_16");
            return false;
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();


function editTrabalho(codtra) {
    console.log("Editar: " + codtra);

}

function deleteTrabalho(codtra) {
    db.deleteTrabalho(JSON.stringify({
        "codtra": codtra
    }), function (status) {
        if (status == true) {
            // removendo elementos
            var item = document.getElementById(codtra);
            item.parentNode.removeChild(item);
        }
    });
    
    $("#btntrabalhos").click();
}

function saveAssinatura() {
    //$("#img").html(padAssinatura.toDataURL());
    activate_subpage("#page_55_16");
    return false;
}

function clearAssinatura() {
    padAssinatura.clear();
}

function onErrorFoto(erroFoto) {
    alert("Erro na captura da foto!" + erroFoto);
}

function onSuccessFoto(foto) {
    // exibindo a foto
    $("#imgaluno").attr("src",
        "data:image/jpeg;base64," +
        foto);
}

function addAluno() {
    activate_subpage("#sbalunos");
}

function addTrabalho() {
    activate_subpage("#sbtrabalhos");
}