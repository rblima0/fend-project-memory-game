var gameCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var upsetCards = [];
var match = 0;

// CLASSE PARA RANDOMIZAR AS CARTAS
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// ADICIONANDO O CARD PELO JS NA PAGINA
function addCard(card) {
    $('.deck').append(`<li class="card"><i class="fa ${card}"></i></li>`);
}

// USANDO A CLASSE SHUFFLE PARA EMBARALHAR AS CARTAS E ADICIONAR NA PAGINA
function randomCard() {
    for (var i = 0; i < 2; i++) {
        gameCards = shuffle(gameCards);
        gameCards.forEach(addCard);
    }
}

// AÇÕES PARA ADICIONAR AS CLASSES (OPEN, SHOW, ERROR, MATCH) QUANDO OUVER CLIQUE NA CLASSE CARD 
var cardAction = function() {
	$('.card').on('click', function() {

        $(this).toggleClass('open show');
		upsetCards.push($(this));

        if (upsetCards.length >= 2) {
            if (upsetCards[0][0].firstChild.className == upsetCards[1][0].firstChild.className) {
                console.log("consegui...");
                $('.open').addClass('match');
                match++;
                console.log(match);
                setTimeout(() => { $('.match').removeClass('open show error'); }, 600);
                winner();
            } else {
                $('.open').addClass('error');
                setTimeout(() => { $('.open').toggleClass('open show error'); }, 600);
            }
            upsetCards = [];
        }
        
    });
}

// FUNCAO DO TIMER com minutos e segundos
var sec = 0;
function timer(val) { return val > 9 ? val : "0" + val; }
setInterval(function () {
    $("#seconds").html(timer(++sec % 60));
    $("#minutes").html(timer(parseInt(sec / 60, 10) % 60));
}, 1000);

// VENCENDO A PARTIDA
function winner(){
    if(match === 8) {
        console.log("Venceu o jogo");
        console.log(timer());
    }
}


// ORDENANDO FUNCOES PARA INICIAR O GAME
function initGame() {
    randomCard();
    cardAction();
};

initGame();

/*
 * OK - Crie uma lista que contenha todos os seus cartões
 * OK - Exibir os cartões na página
 * OK - Arraste a lista de cartões usando o método "shuffle" fornecido abaixo
 * OK - faça um loop através de cada cartão e crie seu HTML
 * OK - adicione o HTML de cada cartão à página

 * OK - configurar o ouvinte de eventos para um cartão. Se um cartão for clicado:
 * OK - exiba o símbolo do cartão (coloque esta funcionalidade em outra função que você chama deste)
 * - adicione o cartão a uma * lista * de cartões "abertos" (coloque esta funcionalidade em outra função que você chama deste)
 * OK - se a lista já tiver outro cartão, verifique se as duas cartas correspondem
 * 
 * + se as cartas combinam, bloqueie as cartas na posição aberta (coloque esta funcionalidade em outra função que você chama deste)
 * + se as cartas não coincidem, remova os cartões da lista e esconda o símbolo do cartão (coloque esta funcionalidade em outra função que você chama deste)
 * + incrementar o contador de movimentos e exibi-lo na página (coloque esta funcionalidade em outra função que você chama deste)
 * + se todas as cartas estiverem correspondidas, exiba uma mensagem com a pontuação final (coloque esta funcionalidade em outra função que você chama deste)
 */
