
const miModulo=(()=>{

    'use strict'

    //C=cloves S=spades H=hearts D=diamonds
    let deck=[];
    const tipos=['C','D','H','S'],
        especiales=['A','J','K','Q'];

    let puntosJugadores=[];

    //referencias html
    const btnPedir=document.querySelector('#btnPedir'),
        btnDetener=document.querySelector('#btnDetener'),
        btnNuevo=document.querySelector('#btnNuevo');
        
    const puntosHTML=document.querySelectorAll('small'),
        divCartasJugadores=document.querySelectorAll('.divCartas');
    

    //crea nueva baraja
    const crearDeck=()=>{
        deck=[];

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

        return _.shuffle(deck);
    }


    const inicializarJuego =(numJugadores=2)=>{
        deck=crearDeck();
        puntosJugadores=[];
        for(let i=0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem=>elem.innerText=0);
        divCartasJugadores.forEach(elem=>elem.innerHTML='');

        btnDetener.disabled=false;
        btnPedir.disabled=false;
    }

    //tomar una carta
    const pedirCarta=()=>{

        return (deck.length===0)? console.error('no hay mas cartas'):deck.pop();
        //if(deck.length===0){
        //    throw 'no hay mas cartas';
        //}
        //return deck.pop();
    }

    //tener valor de carta

    const valorCarta=(carta)=>{
        const valor=carta.substring(0,carta.length-1);
        let puntos=0;

        return (isNaN(valor))?
            (valor==='A')?11:10
            :valor*1;
    }

    //turno 0 jugador y ultimo es cpu
    const acumularPuntos=(carta,turno)=>{

        puntosJugadores[turno]=puntosJugadores[turno]+valorCarta(carta);
        puntosHTML[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    //crear carta y dibujarla
    const crearCarta=(carta, turno)=>{
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador=()=>{

        const [puntosMin,puntosCpu]=puntosJugadores;

        setTimeout(()=>{
            (puntosMin===puntosCpu)? alert('Empate')
                                :(puntosMin>21)?alert('Perdedor')
                                :(puntosCpu>21)?alert('Ganaste')
                                :(puntosMin>puntosCpu)?alert('Ganaste')
                                :alert('Perdedor');
        },30);
    }

    //turno cpu
    const turnoCpu=(puntosMin)=>{
        let puntosCpu=0;

        do{

            const carta=pedirCarta();
            puntosCpu=acumularPuntos(carta,puntosJugadores.length-1);

            crearCarta(carta,puntosJugadores.length-1);

        }while((puntosCpu<puntosMin)&&(puntosMin<=21));

        determinarGanador();
    }

    //eventos
    btnPedir.addEventListener('click',()=>{

        const carta=pedirCarta();
        const puntosJugador=acumularPuntos(carta,0);

        crearCarta(carta,0);

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
        turnoCpu(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click',()=>{
        
        inicializarJuego();
        
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();



