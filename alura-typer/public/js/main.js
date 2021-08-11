var tempoInicial = $("#tempo-digitacao").text(); //Pegando o valor especificado no texto do html
var campo = $(".campo-digitacao"); //Pegando tudo do campo-digitação

$(function(){ //Atalho para o Jquery chamar uma função document (ao carregar a página statica)
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text(); //text pega o conteúdo dentro da tag, quando passado os parenteses vazios
    var numPalavras = frase.split(" ").length ; //Quebra a string em um array, utilizando o seletor que coloca dentro dos parênteses
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}
//O nome do evento são os nomes do eventos comuns do Javascript, como de click, input, focus, dblclick entre outros.
function inicializaContadores(){
    campo.on("input",function(){ //Ao inserir informação no input textarea 
        var conteudo = campo.val(); //Pegando o valor de dentro do input
        var qtdPalavras = conteudo.split(/\S+/).length -1; //Quebrando a string em array usando uma expressão regular para contar quebras de palavras e outras coisas
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres); //Substituíndo o valor da variável
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text(); //Pegando o valor do tempo de digitação
    campo.one("focus", function(){ // A função one pesquisa no DOM uma única vez
        var cronometroID = setInterval(function(){ //Função setInterval javaScript que é chamada de tempo em tempo.
            tempoRestante--; //Decrementa por conta da setInterval foi chamada e está correndo como um laço.
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID); //Limpa o cronometro
                finalizaJogo();
            }  
        },1000); //Função setInterval recebe como argumento, a função e o tempo
    });
}

function finalizaJogo(){
    campo.attr("disabled",true); //disabled é um parametro que não tem valor, então é passado o true pra ele assumir que será verdadeiro no html
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text(); //Pega a frase
    campo.on("input", function(){ //Escuta o input do campo
        var digitado = campo.val(); //Pega o texto que está sendo digitado
        var comparavel = frase.substr(0,digitado.length); //substr pega o tamanho da frase de 0 até o seu cumprimento atual
        console.log("Digitado: " + digitado);
        console.log("Frase Comparável: " + comparavel);
        if(digitado == comparavel){ //Valida se o texto digitado é igual ao texto de comparação.
            campo.addClass("borda-verde"); //Adiciona borda verde
            campo.removeClass("borda-vermelha"); //Remove borda vermelha
        } else {
            campo.addClass("borda-vermelha"); //Adiciona borda vermelha
            campo.removeClass("borda-verde"); //Remove borda verde
        }
    });
}


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Jheorgenes";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"

    var linha = "<tr>" +
                    "<td>" + usuario + "</td>" + 
                    "<td>" + numPalavras + "</td>" +
                    "<td>" + botaoRemover + "</td>" +    
                "</tr>";

    corpoTabela.append(linha);            
}

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
});

function reiniciaJogo(){
    campo.attr("disabled",false); //Retira a restrinção do input, desabilitando o atributo disabled
    campo.val(""); //Limpando o valor do campo
    $("#contador-palavras").text("0"); //Zerando contador de palavras
    $("#contador-caracteres").text("0"); //Zerando contador de caracteres
    $("#tempo-digitacao").text(tempoInicial); //Reiniciando o tempo com o texto especificado no html inicialmente
    inicializaCronometro(); //Função de inicialização.
    campo.toggleClass("campo-desativado"); //Se existir campo-desativado classe, vai remover, se não, vai adicionar
    campo.removeClass("borda-vermelha"); //removendo cores nas bordas
    campo.removeClass("borda-verde");
}



 