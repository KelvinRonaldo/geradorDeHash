$(document).ready(function(){
    //BOTAO QUE ATIVA E DESATIVA A VISUALIZAÇÃO DO QUE FOI DIGITADO
    $("#btn-view-pwd").click(function(){
        if($("#input").attr("type") == "text"){
            $("#input").attr("type", "password");
            $("#icon-view-pwd").attr("src", "./icons/safe.png")
                                .attr("title", "SEGURO NO MOMENTO")
                                .attr("alt", "SEGURO NO MOMENTO");
        }else{
            $("#input").attr("type", "text");
            $("#icon-view-pwd").attr("src", "./icons/unsafe.png")
                                .attr("title", "INSEGURO NO MOMENTO")
                                .attr("alt", "INSEGURO NO MOMENTO");
        }        
    });
    
    // A FAZER arrumar aqui
    // ARRUMAR arrumar aqui
    //ANIMAÇÃO DE PRESSIONAR BOTÃO
	function pressButton(button){
		button.mousedown(function () {
			$(this).css("transform", "scale(0.95)").css("transition", ".1s");
		})
		.mouseup(function () { 
			$(this).css("transform", "scale(1)").css("transition", ".1s");
		});
	}

    //ENQUANTO DIGITA
    $("#input").on("input", function(){
        nonClickedHashButtons("null");
        verifyNumOfCharacters();
    });

    //CLIQUE DO BOTAO DE APAGAR
    $("#btn-erase-pwd").click(function(){
        $("#input").val("");
        $("#hash").val("");
        nonClickedHashButtons("null");
        verifyNumOfCharacters();
    });

    //VERIFICA A QUANTIDADE DE CARACTERES QUE HA NA CAIXA DE TEXTO
    //SE MAIS QUE 0, HABILITA OS BOTOES, DO CONTRATRIO, DESABILITA
    function verifyNumOfCharacters(){
        if($("#input").val().length <= 0){
            enableDisableHashButtons(true);
            enableDisableViewPwdButton(true);
        }else{
            enableDisableHashButtons(false);
            enableDisableViewPwdButton(false);
        }
    }

	
	//FUNÇÃO QUE ATIVA E DESATIVA TODOS OS BOTOES
    function enableDisableAllButtons(button, btnClass, toDisable) {
		button.prop("disabled", toDisable);
		if(toDisable){
			button.removeClass(btnClass).addClass("btn-disabled");
            $("#icon-view-pwd").attr("src", "./icons/safeDisabled.png");
		}else{
			button.removeClass("btn-disabled").addClass(btnClass);
            $("#icon-view-pwd").attr("src", "./icons/safe.png");
		}
	}	
	//FUNÇÃO QUE ATIVA E DESATIVA O BOTAO DE VER A SENHA
    function enableDisableViewPwdButton(toDisable) {
		let btnClass = $("#btn-view-pwd").attr("id");
		enableDisableAllButtons($("#btn-view-pwd"), btnClass, toDisable);
    }
    //FUNÇÃO QUE HABILITA E DESABILITA BOTOES DE HASH
    function enableDisableHashButtons(toDisable) {
        $(".btns").each(function(){
			let btnClass = $(this).attr("id");
			enableDisableAllButtons($(this), btnClass, toDisable);
        });
    }

    //MUDA O ESTILO E DESABILITA O BOTAO CLICADO E HABILITA OS NÃO CLICADOS
    function clickedHashButton(hashType){
        let button = `btn-${hashType}`;
        $(`#${button}`).removeClass(button)
                       .addClass("btn-activated")
                       .prop("disabled", true);
        nonClickedHashButtons(hashType)
    }

    //MUDA O ESTILO E HABILITA DEMAIS BOTOES NÃO CLICADOS
    function nonClickedHashButtons(hashType){
        let btnId = `btn-${hashType}`;
        $(".btns").each(function(){
            if($(this).attr("id") != btnId){
                let button = $(this).attr("id");
                $(`#${button}`).removeClass("btn-activated")
                			   .addClass(`${button}`)
                			   .prop("disabled", false);
            }
        });
    }

    //CHAMADA DOS BOTOES DE HASH AO SEREM CLICADOS
    $(".btns").each(function(){
        let button = $(this).attr("id");
        let hashType = button.split("-");
        hashType = hashType[1];
        $(this).click(function(){
			clickedHashButton(hashType);
        })
    });

    //INICIA OS BOTOES DESABILITADOS
	verifyNumOfCharacters();
	
	//ATIVAR ANIMAÇÃO DE PRESSIONAR BOTAO
	pressButton($("#btn-view-pwd"));
	pressButton($("#btn-erase-pwd"));
	$(".btns").each(function(){
		pressButton($(this));
	});
});
