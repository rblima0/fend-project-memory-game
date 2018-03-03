var gameCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

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

var upsetCards = [];

var listener = function () {

	$('.card').on('click', function () {
        if ($(this).hasClass('open show') || $(this).hasClass('match')) { 
            return true; 
        }

        $(this).addClass('open show');
        upsetCards.push($(this));
        
    });
}


function initGame() {
    randomCard();
    listener();
};

initGame();

/*
 * Crie uma lista que contenha todos os seus cartões
 * Exibir os cartões na página
 * - Arraste a lista de cartões usando o método "shuffle" fornecido abaixo
 * - faça um loop através de cada cartão e crie seu HTML
 * - adicione o HTML de cada cartão à página

 * configurar o ouvinte de eventos para um cartão. Se um cartão for clicado:
 * - exiba o símbolo do cartão (coloque esta funcionalidade em outra função que você chama deste)
 * - adicione o cartão a uma * lista * de cartões "abertos" (coloque esta funcionalidade em outra função que você chama deste)
 * - se a lista já tiver outro cartão, verifique se as duas cartas correspondem
 * + se as cartas combinam, bloqueie as cartas na posição aberta (coloque esta funcionalidade em outra função que você chama deste)
 * + se as cartas não coincidem, remova os cartões da lista e esconda o símbolo do cartão (coloque esta funcionalidade em outra função que você chama deste)
 * + incrementar o contador de movimentos e exibi-lo na página (coloque esta funcionalidade em outra função que você chama deste)
 * + se todas as cartas estiverem correspondidas, exiba uma mensagem com a pontuação final (coloque esta funcionalidade em outra função que você chama deste)
 */
