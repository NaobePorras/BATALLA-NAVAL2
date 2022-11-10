const body = document.querySelector("body");
const TableroUno = document.querySelector("#JugadorUno");
const TableroDos = document.querySelector("#JugadorDos");
const ContendorUno = document.querySelector("#ContenedorJugadorUno");
const ContendorDos = document.querySelector("#ContenedorJugadorDos");
const btnRegistrar = document.querySelector("#Registrar");
const Titulo = document.querySelector("#Titulo");
let TableroUnoMatriz;
let TableroDosMatriz;
let Turnos = false;

CrearTableroCompleto(TableroUno, TableroDos, true);

btnRegistrar.addEventListener("click", () =>{
    TableroUnoMatriz = MatrizDeTablero("Uno");
    TableroDosMatriz = MatrizDeTablero("Dos");
    console.log(TableroUnoMatriz);
    console.log(TableroDosMatriz);
    TableroUno.innerHTML = "";
    TableroDos.innerHTML = "";
    btnRegistrar.hidden = true;
    CrearTableroCompleto(TableroUno, TableroDos, false);
    alert("Comienza el jugador uno");
    ContendorUno.hidden = true;
    Titulo.hidden = true;
});

function MatrizDeTablero(NumJugador){
    let Matriz = [  
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"],
                    ["O","O","O","O","O","O","O","O","O","O"]
                ];
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let id = "#" + NumJugador + i.toString() + j.toString();
            let button = document.querySelector(id);
            Matriz[i][j] = button.textContent;
        }
    }
    return Matriz;
}

function CrearTableroCompleto(TableroUno, TableroDos, esParaRegistar){
    CrearTablero(TableroUno, true, esParaRegistar);
    CrearTablero(TableroDos, false, esParaRegistar);
   
}

function CrearTablero(TableroDiv, esJugadorUno, esParaRegistar){
    let jugador = esJugadorUno ? "Uno": "Dos";
    for(let i = 0; i < 10; i++){
        let row = CrearDiv("row", "row" + i);
        for(let j = 0; j < 10; j++){
            let col = CrearDiv("col justify-content-center m-1", "col" + j.toString());
            let button = esParaRegistar ? CrearBoton("btn btn-dark text-light", jugador + i.toString() + j.toString(), "O")
                                        : CrearBotonJugar("btn btn-dark text-light", jugador + i.toString() + j.toString(),"O", esJugadorUno);
            col.append(button);
            row.append(col);
        }
        TableroDiv.append(row);
    } 
}

function CrearDiv(Clase, Id){
    let div = document.createElement("div");
    div.className = Clase;
    div.id = Id;
    return div;
}

function CrearBoton(Clase, Id, Text){
    let button = document.createElement("button");
    button.className = Clase
    button.id = Id;
    button.textContent = Text;
    button.addEventListener("click",() =>{
        button.textContent = "X";
    });
    return button;
}

function CrearBotonJugar(Clase, Id, Text, esJugadorUno){
    let button = document.createElement("button");
    button.className = Clase;
    button.id = Id;
    button.textContent = Text;
    button.addEventListener("click", () => {
        if(Turnos){
            ContendorUno.hidden = true;
            ContendorDos.hidden = false;
            Turnos = false;
        }else{
            ContendorUno.hidden = false;
            ContendorDos.hidden = true;
            Turnos = true;
        }
        let tablero = esJugadorUno ? TableroUnoMatriz : TableroDosMatriz;
        if(tablero[parseInt(button.id[3])][parseInt(button.id[4])] == "X"){
            button.textContent = "X";
        }else{
            button.disabled = true;
        }
        validarGanador(tablero, esJugadorUno);
    });
    return button;
}

function validarGanador(tablero, esJugadorUno){
    let NumJugador = esJugadorUno ? "Uno": "Dos";
    let NumJugadorGanar = esJugadorUno ? "Dos": "Uno";
    let contadorGanador = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let id = "#" + NumJugador + i.toString() + j.toString();
            let button = document.querySelector(id);
            if(tablero[i][j] == button.innerHTML)
                contadorGanador++;
        }
    }
    if(contadorGanador == 100){
        alert("Ganó el jugador " + NumJugadorGanar + "!");
        Titulo.innerHTML = "Resultados";
        Titulo.hidden = false
        ContendorUno.hidden = false;
        ContendorDos.hidden = false;
    }
}
