$(document).ready(function(){

    //ANIMAÇÃO DE PRESSIONAR BOTÃO
	function pressButton(button){
		button.mousedown(function () {
			$(this).css("transform", "scale(0.95)").css("transition", ".1s");
		}).mouseover(function () { 
			$(this).css("transform", "scale(1)").css("transition", ".1s");
		}).mouseleave(function () { 
			$(this).css("transform", "scale(1)").css("transition", ".1s");
		})
		.mouseup(function () { 
			$(this).css("transform", "scale(1)").css("transition", ".1s");
		});
	}

	const safeUnsafeShowPwdBtn = () =>{
        if($("#input").attr("type") == "text"){
            $("#input").attr("type", "password");
            $("#icon-view-pwd").attr("src", "./icons/safe.png")
                                .attr("title", "SEGURO NO MOMENTO")
								.attr("alt", "SEGURO NO MOMENTO");
			enableDisableAButton($("#btn-copy-pwd"), "btn-copy-pwd", true);
        }else{
            $("#input").attr("type", "text");
            $("#icon-view-pwd").attr("src", "./icons/unsafe.png")
                                .attr("title", "INSEGURO NO MOMENTO")
                                .attr("alt", "INSEGURO NO MOMENTO");
			enableDisableAButton($("#btn-copy-pwd"), "btn-copy-pwd", false);		
        }        
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
	//FUNÇÃO QUE ATIVA E DESATIVA UM BOTAO INDIVIDUALMENTE
	function enableDisableAButton(button, btnClass, toDisable){
		button.prop("disabled", toDisable);
		if(toDisable){
			button.removeClass(btnClass).addClass("btn-disabled");
		}else{
			button.removeClass("btn-disabled").addClass(btnClass);		
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
	
    


	//FUNÇÃO QUE CRIA UMA SENHA ALEATÓRIA
    function makePwd(){
        let characters;
        let pwd;
        let maxLength;
        let arrayLength;

		//FUNÇÃO QUE GERA UM NÚMERO ALEATÓRIO
        const random = (min, max) => {
            return Math.trunc(Math.random() * (max + 1 - min) + min);
        }
    
        characters = "\' \" \@ \# \$ \% \+ \´ \` \^ \> \< \| \\ 1 2 3 4 5 6 7 8 9 0 - = ! ¨ & * ( ) _ ¹ ² ³ £ ¢ ¬ § [ { ª ~ ] } º / ? ° ; : . , q w e r t y u i o p a s d f g h j k l ç z x c v b n m Q W E R T Y U I O P A S D F G H J K L Ç Z X C V B N M á à ã â ä é è ê ë í ì î ï ó ò õ ô ö ú ù û ü ý ÿ Á À Ã Â Ä É È Ê Ë Í Ì Î Ï Ó Ò Õ Ô Ö Ú Ù Û Ü Ý Ÿ 1 2 3 4 5 6 7 8 9 0 "+"	 ";
        characters = characters.split(" ");

        characters.push(" ");
        
        pwd = "";
        maxLength = random(6, 127);
        arrayLength = characters.length-1;
		
        for(let i = 0; i < maxLength; i++){
			pwd += characters[random(0, arrayLength)];		
        }
            
        return pwd;
    }
	//FUNÇÃO QUE MOSTRA E ESCONDE UM ALET
	const showHideKAlert = (toDo) =>{
		if(toDo == "show"){
			$("#div-fade-alert").css("display", "flex");
			setTimeout(() => {
				$("#div-fade-alert").css("opacity", 1)
									.css("visibility", "visible");		
			}, 100);
		}else if(toDo == "hide"){
			$("#div-fade-alert").css("opacity", 0)
								.css("visibility", "hidden");
			setTimeout(() => {
				$("#div-fade-alert").css("display", "none");
			}, 200);
		}
	}
	//FUNÇÃO QUE CRIA UM ALERT PASSANDO UM TEXTO
	const Kalert = (text) => {
		showHideKAlert("show");
		let kalertText = document.createTextNode(text);
		let kalertPTag = document.createElement("p");
		kalertPTag.appendChild(kalertText);
		$("#div-alert-area").append(kalertPTag);
	}

    const copyTextFrom = (element) =>{
        element.select();
        document.execCommand("copy");
        console.log(element);
    }
    //FUNÇÃO QUE ATIVA E DESATIVA CA COPIA DA HASH
	const enableDisableHashCopy = (toDisable) =>{
		$("#btn-copy-hash").prop("disabled", toDisable);
		if(toDisable){
			$("#btn-copy-hash").removeClass("btn-copy-hash").addClass("btn-copy-hash-disabled");
		}else{
			$("#btn-copy-hash").removeClass("btn-copy-hash-disabled").addClass("btn-copy-hash");
		}
	};



    //BOTAO QUE ATIVA E DESATIVA A VISUALIZAÇÃO DO QUE FOI DIGITADO
    $("#btn-view-pwd").click(function(){
		safeUnsafeShowPwdBtn();
    });

    //ENQUANTO DIGITA
    $("#input").on("input", function(){
        nonClickedHashButtons("null");
        verifyNumOfCharacters();
    });


    $("#btn-erase-pwd").click(function(){    
        $("#input").val("");
    });

    //CLIQUE DO BOTAO DE APAGAR TUDO
    $("#btn-erase-pwd").dblclick(function(){
        $("#input").val("");
        $("#hash").val("");
        nonClickedHashButtons("null");
        verifyNumOfCharacters();
		enableDisableAButton($("#btn-copy-pwd"), "btn-copy-pwd", true);
		enableDisableHashCopy($("#btn-copy-hash"), "#btn-copy-hash", true);
		$("#input").attr("type", "password");
		enableDisableViewPwdButton(true);
		$("#input").focus();
    });


    //CHAMADA DOS BOTOES DE HASH AO SEREM CLICADOS
    $(".btns").each(function(){
        let button = $(this).attr("id");
        let hashType = button.split("-");
        hashType = hashType[1];
        $(this).click(function(){
			clickedHashButton(hashType);
			enableDisableHashCopy(false);
        });
    });


    $("#btn-make-pwd").click(function(){
        $("#input").val(makePwd());
        verifyNumOfCharacters();
	});
 
	//CLIQUE DO BOTAO QUE COPIA CONTEÚDO DA CAIXA DE SENHA
	$("#btn-copy-pwd").click(function(){
		console.log($("#input").val());
		if($("#input").val().length > 0){
			copyTextFrom($("#input"));
			$("#input").attr("disabled", true);
			Kalert("Senha copiada para a área de tranferência.");	
		}
	});

    //CLICK DO BOTAO DE COPIAR HASH
	$("#btn-copy-hash").click(function(){
		console.log($("#hash").val());
		if($("#hash").val().length > 0){
			copyTextFrom($("#hash"));
			Kalert("Hash copiada para a área de tranferência.");	
		}
	});

	//FUNÇÃO DO BOTAO OK DO ALERT
	$("#btn-alert-ok").click(function(){
		showHideKAlert("hide");
		$("#input").attr("disabled", false);
		setTimeout(() => {
			$("#div-alert-area").empty();			
		}, 200);
		$("#input").focus();
	});

    //ATIVAR ANIMAÇÃO DE PRESSIONAR BOTAO EM TODOS OS BOTOES
    $("button").each(function () {
        pressButton($(this));
    });

	//INICIA BOTOES DE COPIA DESABILITADOS
	enableDisableAButton($("#btn-copy-pwd"), "btn-copy-pwd", true);
	enableDisableHashCopy($("#btn-copy-hash"), "#btn-copy-hash", true);
	
    //INICIA OS BOTOES DESABILITADOS
	verifyNumOfCharacters();

	//INICIA COM O CURSOR DENTRO DA CAIXA DE SENHA
	$("#input").focus();
});
