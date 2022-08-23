//C=cloves S=spades H=hearts D=diamonds
let deck=[];
const tipos=['C','D','H','S'];
const especiales=['A','J','K','Q'];

let puntosJugador=0;
let puntosCpu=0;

//referencias html
const btnPedir=document.querySelector('#btnPedir');
const puntosHTML=document.querySelectorAll('small');
const divCartasJugador=document.querySelector('#jugador-cartas');
const divCartasCpu=document.querySelector('#computadora-cartas');
const btnDetener=document.querySelector('#btnDetener');
const btnNuevo=document.querySelector('#btnNuevo');

//crea nueva baraja
const crearDeck=()=>{
    for(let i=2; i<10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo);
        }
    }

    deck=_.shuffle(deck);
    //console.log(deck);
    //console.log(deck.length);
    return deck;
}

crearDeck();

//tomar una carta
const pedirCarta=()=>{

    if(deck.length===0){
        throw 'no hay mas cartas';
    }
    const carta=deck.pop();
    return carta
}

//pedirCarta();

const valorCarta=(carta)=>{
    const valor=carta.substring(0,carta.length-1);
    let puntos=0;

    return (isNaN(valor))?
        (valor==='A')?11:10
        :valor*1;
}

//turno cpu
const turnoCpu=(puntosMin)=>{

    do{

        const carta=pedirCarta();
        puntosCpu=puntosCpu+valorCarta(carta);
        puntosHTML[1].innerText=puntosCpu;

        //<img class="carta" src="assets/cartas/AS.png">
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasCpu.append(imgCarta);

        if(puntosMin>21){
            break;
        }

    }while((puntosCpu<puntosMin)&&(puntosMin<=21));

    setTimeout(()=>{
        (puntosMin===puntosCpu)? alert('Empate')
                            :(puntosMin>21)?alert('Perdedor')
                            :(puntosCpu>21)?alert('Ganaste')
                            :(puntosMin>puntosCpu)?alert('Ganaste')
                            :alert('Perdedor');
    },20);

    /*
    (puntosMin>puntosCpu&&puntosMin<=21)?
    alert('Ganaste')
    :(puntosMin===puntosCpu)?alert('Empate')
    :alert('perdiste');
    */
}

//eventos
btnPedir.addEventListener('click',()=>{
    const carta=pedirCarta();
    puntosJugador=puntosJugador+valorCarta(carta);
    puntosHTML[0].innerText=puntosJugador;

    //<img class="carta" src="assets/cartas/AS.png">
    const imgCarta=document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn('perdedor');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoCpu(puntosJugador);
    }
    else if(puntosJugador===21){
        console.warn('genial');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoCpu(puntosJugador);
    }
});

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoCpu(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck=[];
    deck=crearDeck();
    btnDetener.disabled=false;
    btnPedir.disabled=false;
    puntosJugador=0;
    puntosHTML[0].innerText=puntosJugador;
    puntosCpu=0;
    puntosHTML[1].innerText=puntosCpu;
    divCartasCpu.innerHTML='';
    divCartasJugador.innerHTML='';
});