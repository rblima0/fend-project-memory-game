var cardEasy = ['fa-ambulance', 'fa-bicycle', 'fa-bus', 'fa-car', 'fa-fighter-jet', 'fa-motorcycle'];
var cardNormal = ['fa-anchor', 'fa-bomb', 'fa-camera', 'fa-cut', 'fa-gamepad', 'fa-gem', 'fa-headphones', 'fa-lightbulb'];
var cardHard = ['fa-baseball-ball', 'fa-basketball-ball', 'fa-bowling-ball', 'fa-football-ball', 'fa-futbol', 'fa-golf-ball', 'fa-table-tennis', 'fa-volleyball-ball', 'fa-quidditch', 'fa-hockey-puck'];

var upsetCards = [];
var match = 0;
var move = 0;
var star = 0;
var difficulty = '';

var initTimer = false;
var seconds = 0;
var minutes = 0;
var sec = 0;


// ADICIONANDO O CARD PELO JS NA PAGINA
function addCard(card) {
    $('.deck').append(`<li class="card"><i class="fa ${card}"></i></li>`);
}

// USANDO A CLASSE SHUFFLE PARA EMBARALHAR AS CARTAS E ADICIONAR NA PAGINA
function randomCard(option) {
    for (var i = 0; i < 2; i++) {
        option = shuffle(option);
        option.forEach(addCard);
    }
}

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

// FUNCAO DO TIMER COM MINUTOS E SEGUNDOS
function startTimer() {
    if(!initTimer){
        initTimer = true;
        function timer(val) { return val > 9 ? val : "0" + val; }
        this.interval = setInterval(function () {
            seconds = timer(++sec % 60);
            minutes = timer(parseInt(sec / 60, 10) % 60);
            $("#seconds").html(seconds);
            $("#minutes").html(minutes);
        }, 1000);
    }
}

// FUNCAO DOS MOVIMENTOS E DAS ESTRELAS
function actionMove(){
    move++;
    $(".move").html(move);

    if(move <= 12) {
        star = 3;
    } else if(move > 12 && move <= 20) {
        $("#third-star").removeClass("fa-star").addClass("fa-star-o");
        star = 2;
    } else if (move > 20 && move <= 28) {
        $("#second-star").removeClass("fa-star").addClass("fa-star-o");
        star = 1;
    } else if (move > 28) {
        $("#first-star").removeClass("fa-star").addClass("fa-star-o");
        star = 0;
    }
}

// FUNÇÃO DE COMBINAÇÃO
function actionMatch(){
    match++;
    $("#match").html(match);
}

function modalWinner() {
    setTimeout(() => { alert("Parabens você venceu ! \n" + "Dificuldade: " + difficulty + "\nMovimentos: " + move + "\nTempo: " + minutes + " minuto " + seconds + " segundos");}, 600);
}

// VENCENDO A PARTIDA
function winnerAction(){
    if(difficulty === 'Facil' && match === 6) {
        modalWinner();
    } else if (difficulty === 'Normal' && match === 8) {
        modalWinner();
    } else if(difficulty === 'Dificil' && match === 10) {
        modalWinner();
    }    
}

// AÇÕES PARA ADICIONAR AS CLASSES (OPEN, SHOW, ERROR, MATCH) QUANDO OUVER CLIQUE NA CLASSE CARD
selected = false;
var cardAction = function() {
	$('.deck').on('click','.card:not(".match, .open")', function() {

        startTimer();
        $(this).toggleClass('open show');
        upsetCards.push($(this));
        
        if (upsetCards.length == 2) {
            actionMove();
            if (upsetCards[0].children().attr("class") === upsetCards[1].children().attr("class")) {
                actionMatch();
                $('.open').addClass('match');
                setTimeout(() => { $('.match').removeClass('open show error'); }, 600);
                winnerAction();
            } else {
                $('.open').addClass('error');
                setTimeout(() => { $('.card').removeClass('open show error'); }, 600);
            }
            upsetCards = [];
        }
        
    });
}

// FUNÇÃO DE DIFICULDADE
function modalOptions() {
    $('#modalOptions').css("display", "block");

    $("#easy").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Facil';
        randomCard(cardEasy);
        cardAction();
    });

    $("#normal").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Normal';
        randomCard(cardNormal);
        cardAction();
    });

    $("#hard").on("click", function() {
        $('#modalOptions').css("display", "none");
        difficulty = 'Dificil';
        randomCard(cardHard);
        cardAction();
    });
}

// FUNCAO DE RESTART
function restartGame () {
    $(".restart").on ("click", function() {
        location.reload();
    });
}
restartGame();

// ORDENANDO FUNCOES PARA INICIAR O GAME
function initGame() {
    modalOptions();
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
 * OK + se as cartas combinam, bloqueie as cartas na posição aberta (coloque esta funcionalidade em outra função que você chama deste)
 * OK + se as cartas não coincidem, remova os cartões da lista e esconda o símbolo do cartão (coloque esta funcionalidade em outra função que você chama deste)
 * OK + incrementar o contador de movimentos e exibi-lo na página (coloque esta funcionalidade em outra função que você chama deste)
 * + se todas as cartas estiverem correspondidas, exiba uma mensagem com a pontuação final (coloque esta funcionalidade em outra função que você chama deste)
 */