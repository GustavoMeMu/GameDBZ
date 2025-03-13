import Swal from "sweetalert2";
import Game from "./Game.js";

let btn_player1 = document.getElementById("btn_player1");
let btn_player2 = document.getElementById("btn_player2");
let player1,
  player2,
  pj1 = "",
  pj2 = "",
  aceptar = 0;
  
const ataques = {
    "Goku": {
      "color": "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
      "atk": "Puño del Dragón",
      "esp": "¡Ka… me… ha… me… ¡¡HAAAA!!",
      "ki": "Kaio-ken!",
      "curar": "Semilla del Ermitaño"
    },
    "Veguetta": {
      "color": "linear-gradient(135deg, #0A2472, #FFD700, #A0A0A0)",
      "atk": "Destello Final ",
      "esp": "Big Bang Attack ¡Es el fin para ti!",
      "ki": "Te Matare Insecto!! ¡HAAAAAAAAAA!!",
      "curar": "Semilla del Ermitaño"
    },
    "Trunks": {
      "color": "linear-gradient(135deg, #6A0DAD, #1E3A8A, #A0A0A0)",
      "atk": "¡Espada del Trueno!",
      "esp": "Burning Attack ¡Esta es mi técnica especial, no puedes esquivarla!",
      "ki": "Tambien soy un Super Saiyajin Haaaaaaaa",
      "curar": "Medicina del Futuro"
    },
    "Vegito": {
      "color": "linear-gradient(135deg, #0A2472, #FFA500, #FFD700)",
      "atk": "¡Final Kamehameha!",
      "esp": "¡No podrás tocarme ni con toda tu fuerza!",
      "ki": "¡Este es el poder de Vegito! Haaaaaaaaa...",
      "curar": "¡Eso ni me hizo cosquillas!"
    },    
    "Gohan": {
      "color": "linear-gradient(135deg, #4B0082, #FF0000, #FFD700)",
      "atk": "!Masenko!",
      "esp": "Esto Es Por Usted Señor Piccolo Makankosappoooo",
      "ki": "Lucho para proteger a las personas que amo, no porque me guste pelear ¡HAAAAAAAAAA!!",
      "curar": "Semilla del Ermitaño"
    },
    "Pikoro": {
      "color": "linear-gradient(135deg, #00A86B, #4B0082, #FFFFFF)",
      "atk": "Golpe Destello del Demonio!",
      "esp": "¡Es hora de probar mi ataque definitivo! Makankōsappō",
      "ki": "A veces, debemos sacrificar todo por algo más grande que nosotros mismos. ¡HAAAAAAAAAA!!",
      "curar": "Regeneración Namekiana"
    },
    "Gogeta": {
      "color": "linear-gradient(135deg, #00BFFF, #000000, #FFA500)",
      "atk": "Super Onda Explosiva!!",
      "esp": "¡Este es el poder del guerrero definitivo! Stardust Breaker",
      "ki": "Yo no soy Goku, ni tampoco Vegeta, ahora mi deber es acabar contigo. ¡HAAAAAAAAAA!!",
      "curar": "Poder Fusionado"
    },
    "Cell": {
      "color": "linear-gradient(135deg, #228B22, #000000, #FFD700)",
      "atk": "Solar Kamehameha!",
      "esp": "Soy la culminación de la perfección. Todo lo demás es inferior a mí. ¡AutoExplosion!",
      "ki": "Absorcion de Energia AHORAA!",
      "curar": "Autoregeneración"
    }
}
  
const iniciar_player1 = () => {
  document.getElementById("player1").classList.add("d-none");
  aceptar++;
  if (aceptar == 2) {
    document.getElementById("iniciar_juego").classList.remove("d-none");
    let timerInterval;
    Swal.fire({
      title: "INICIAR COMABTE",
      html: "EN <b>3</b> segundos",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let timeLeft = Swal.getTimerLeft();
        let secondsLeft = Math.floor(timeLeft / 1000);
        timer.textContent = secondsLeft;

        timerInterval = setInterval(() => {
          timeLeft = Swal.getTimerLeft();
          secondsLeft = Math.floor(timeLeft / 1000);
          if (timer) {
            timer.textContent = secondsLeft;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
        Swal.fire({
          title: "Inicia el Jugador 1",
          text: "El Jugador 2 no podrá hacer nada hasta que el Jugador 1 haga un movimiento.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }
};
const iniciar_player2 = () => {
  document.getElementById("player2").classList.add("d-none");
  aceptar++;
  if (aceptar == 2) {
    document.getElementById("iniciar_juego").classList.remove("d-none");
    let timerInterval;
    Swal.fire({
      title: "INICIAR COMABTE",
      html: "EN <b>3</b> segundos",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let timeLeft = Swal.getTimerLeft();
        let secondsLeft = Math.floor(timeLeft / 1000);
        timer.textContent = secondsLeft;

        timerInterval = setInterval(() => {
          timeLeft = Swal.getTimerLeft();
          secondsLeft = Math.floor(timeLeft / 1000);
          if (timer) {
            timer.textContent = secondsLeft;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
        Swal.fire({
          title: "Inicia el Jugador 1",
          text: "El Jugador 2 no podrá hacer nada hasta que el Jugador 1 haga un movimiento.",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }
};
let sonidoActivo1 = null;
let seleccion1 = document.getElementById("player1_seleccion");
seleccion1.addEventListener("click", (event) => {
  pj1 = event.target.alt == undefined ? "" : event.target.alt;
  if (sonidoActivo1) {
    sonidoActivo1.pause();
    sonidoActivo1.currentTime = 0;
  }

  const sonido = new Audio(`./public/audio/${pj1}.mp3`);
  sonido.play();
  sonidoActivo1 = sonido;
  seleccion1.querySelectorAll("img").forEach((temp_img) => {
    temp_img.classList.remove("btn-warning");
    temp_img.classList.add("btn-danger");
  });
  event.target.classList.remove("btn-danger");
  event.target.classList.add("btn-warning");
});

let sonidoActivo = null;
let seleccion2 = document.getElementById("player2_seleccion");
seleccion2.addEventListener("click", (event) => {
  pj2 = event.target.alt == undefined ? "" : event.target.alt;
  if (sonidoActivo) {
    sonidoActivo.pause();
    sonidoActivo.currentTime = 0;
  }
  const sonido = new Audio(`./public/audio/${pj2}.mp3`);
  sonido.play();
  sonidoActivo = sonido;
  seleccion2.querySelectorAll("img").forEach((temp_img) => {
    temp_img.classList.remove("btn-warning");
    temp_img.classList.add("btn-primary");
  });
  event.target.classList.remove("btn-danger");
  event.target.classList.add("btn-warning");
});

btn_player1.addEventListener("click", () => {
  let user_name1 = document.getElementById("user_name1").value;
  let audio = new Audio('./public/audio/SELECCION.mp3');
  if (user_name1 == "") {
    Swal.fire({
      title: "Advertencia Jugador 1",
      text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
      icon: "warning",
    });
  } else {
    player1 = new Game(user_name1);
    if (pj1 == "") {
      Swal.fire({
        title: "Advertencia Jugador 1",
        text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
        icon: "warning",
      });
    } else {
      document.getElementById("p1").innerText = user_name1.toUpperCase();
      document.getElementById("avatar1").src = `./public/img/${pj1}/base.png`;
      audio.play();
      iniciar_player1();
    }
  }
});

btn_player2.addEventListener("click", () => {
  let user_name2 = document.getElementById("user_name2").value;
  let audio = new Audio('./public/audio/SELECCION.mp3');
  if (user_name2 == "") {
    Swal.fire({
      title: "Advertencia Jugador 2",
      text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
      icon: "warning",
    });
  } else {
    player2 = new Game(user_name2);
    if (pj2 == "") {
      Swal.fire({
        title: "Advertencia Jugador 2",
        text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
        icon: "warning",
      });
    } else {
      document.getElementById("p2").innerText = user_name2.toUpperCase();
      document.getElementById("avatar2").src = `./public/img/${pj2}/base.png`;
      audio.play();
      iniciar_player2();
    }
  }
});


let turnoJugador1 = true;
let turnoJugador2 = true;
let turnoEspecialJugador1 = 1; 
let turnoEspecialJugador2 = 1 ;  
let victoriasJugador1 = 0;
let victoriasJugador2 = 0;

document.addEventListener("DOMContentLoaded", () => {
  const contador = document.getElementById("contador");
  if (contador) {
    contador.style.display = "none";
  }
});

const mostrarContador = () => {
  const contador = document.getElementById("contador");
  contador 
    ? (contador.style.display = "block") 
    : console.error("El elemento con id 'contador' no se encontró en el DOM.");
};

const evaluarVida = (jugador, oponente) => {
  const vidaElemento = document.getElementById(`vida_${jugador.id}`);
  if (!vidaElemento) {
    console.error(`Elemento con id "vida_${jugador.id}" no encontrado`);
    return;
  }

  if (jugador.getVida() <= 0) {
    jugador.setVida(0);
    vidaElemento.style.width = `0%`;
    vidaElemento.innerText = `0%`;

    finalizarCombate(oponente);
  }
};

const finalizarCombate = (ganador) => {
  let nombreGanador;

  if (ganador === player1) {
    nombreGanador = "Jugador 1";
    victoriasJugador1++;
  } else if (ganador === player2) {
    nombreGanador = "Jugador 2";
    victoriasJugador2++;
  } else {
    console.error("Ganador no identificado correctamente");
    return;
  }

  document.getElementById("victorias_py1").innerText = victoriasJugador1;
  document.getElementById("victorias_py2").innerText = victoriasJugador2;
  document.getElementById("derrotas_py1").innerText = victoriasJugador2;
  document.getElementById("derrotas_py2").innerText = victoriasJugador1;

  mostrarContador();

  Swal.fire({
    title: `¡${nombreGanador} ha ganado!`,
    text: `¿Quieres jugar otra vez?`,
    icon: "success",
    backdrop: "rgba(0,0,0,0.6)",
    showCancelButton: true,
    confirmButtonText: "¡Revancha!",
    cancelButtonText: "No, salir",
  }).then((result) => {
    result.isConfirmed ? resetearCombate() : location.reload();
  });
};

const resetearCombate = () => {
  player1.reiniciar();
  player2.reiniciar();

  const vidaActualizar = (id, porcentaje) => {
    const elemento = document.getElementById(id);
    elemento.style.width = `${porcentaje}%`;
    elemento.innerText = `${porcentaje}%`;
  };

  vidaActualizar("vida_py1", 100);
  vidaActualizar("vida_py2", 100);
  vidaActualizar("ki_py1", 100);
  vidaActualizar("ki_py2", 100);
  vidaActualizar("energia_py1", 100);
  vidaActualizar("energia_py2", 100);

  player1.setSemilla(3);
  player2.setSemilla(3);

  document.getElementById("semillas_py1").innerText = "3";
  document.getElementById("semillas_py2").innerText = "3";

  turnoJugador1 = true;
  turnoJugador2 = false;
  turnoEspecialJugador1 = 1;
  turnoEspecialJugador2 = 1;

  ["btn_atk_py1", "btn_esp_py1", "btn_ermi_py1", "btn_ki_py1"].forEach(
    (btn) => (document.getElementById(btn).disabled = false)
  );

  ["btn_atk_py2", "btn_esp_py2", "btn_ermi_py2", "btn_ki_py2"].forEach(
    (btn) => (document.getElementById(btn).disabled = true)
  );
};



document.getElementById("btn_atk_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }

  if (player2.getVida() <= 0) {
    finalizarCombate(player1);
    return;
  }
  
  if (player1.getVida() <= 0) {
    finalizarCombate(player2);
    return;
  }

  if (player1.getEnergia() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player1.getKi() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  player1.atk_basico(player2);
  evaluarVida(player2, player1);

  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getEnergia()) * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;
  if (player2.getVida() <= 0) {
    finalizarCombate(player1); 
    return;
  }
  permitirSonido = true;
  Swal.fire({
    text: "Toma Estooo",
    title: ataques[pj1]["atk"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj1]["color"]}`,
    imageUrl: `./public/img/${pj1}/basico.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque básico",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 
  turnoJugador2 = true;
  turnoEspecialJugador1++;  
  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;

});

document.getElementById("btn_esp_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }

  if (turnoEspecialJugador1 < 2) { 
    permitirSonido = false;
    Swal.fire({
      title: "¡Espera!",
      text: "Debes esperar al segundo turno para usar el ataque especial.",
      icon: "warning",
      backdrop: `rgba(255, 255, 0, 0.5)`,
    });
    return; 
  }
  
  if (player2.getVida() <= 0) {
    finalizarCombate(player1);
    return;
  }
  
  if (player1.getVida() <= 0) {
    finalizarCombate(player2);
    return;
  }

  if (player1.getEnergia() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  //
  if (player1.getEnergia() <= 62) {
    permitirSonido = false;
    Swal.fire({
      title: "¡No puedes hacer un ataque especial!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player1.getKi() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  //
  if (player1.getKi() <= 66) {
    permitirSonido = false;
    Swal.fire({
      title: "¡No tienes ki!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  if (turnoEspecialJugador1 >= 2) {
    player1.atk_especial(player2);
    evaluarVida(player2, player1);

  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getEnergia()) * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;
  if (player1.getVida() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: rgba(255, 0, 0, 0.5),
    });
    return;
  }
permitirSonido = true;
  Swal.fire({
    text: "Ahora si Acabare Contigo!!! TOMA ESTOOOOOO",
    title: ataques[pj1]["esp"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj1]["color"]}`,
    imageUrl: `./public/img/${pj1}/especial.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  });
   turnoEspecialJugador1 = 1;
  }

  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;


});

document.getElementById("btn_ermi_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }
  
  if (
    player1.getVida() >= 100 && 
    player1.getKi() >= 80 && 
    player1.getEnergia() >= 90
  ) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Barras llenas!",
      text: "Tu Vida, Ki y Energía ya están al máximo. Usar una semilla no tendría efecto.",
      icon: "info",
      backdrop: `rgba(50, 205, 50, 0.5)`,
    });
    return; // Detener el uso de la semilla
  }

  player1.semilla_ermi();

  let vida_actual = player1.getVida();
  let porcentaje = parseInt((vida_actual * 100) / 100);
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;

  let ki_actual = player1.getKi();
  porcentaje = parseInt((ki_actual * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  let energia_actual = player1.getEnergia();
  porcentaje = parseInt((energia_actual * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  let semillas_actuales = player1.getSemilla();
  semillas_actuales = semillas_actuales < 0 ? 0 : semillas_actuales;
  document.getElementById("semillas_py1").innerText = `${semillas_actuales}`;
permitirSonido=true;
  Swal.fire({
    text: "Tomare Esto Para Recuperarme",
    title: ataques[pj1]["curar"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj1]["color"]}`,
    imageUrl: `./public/img/${pj1}/curar.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperación con semilla del ermitaño",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 

  if (player1.getSemilla() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Semillas Agotadas!",
      text: "Has agotado todas tus semillas del ermitaño.",
      icon: "error",
      backdrop: `rgba(50, 205, 50, 0.5)`,
    });
    document.getElementById("btn_ermi_py1").disabled = true;
  }
  turnoJugador1 = false;
  turnoEspecialJugador1++; 
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;
});

document.getElementById("btn_ki_py1").addEventListener("click", () => {
  if (!turnoJugador1) {
    return; 
  }
  if (player1.getKi() >= 80) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki al Máximo!",
      text: "Tu ki ya está al 100%, no puedes cargar más. Es momento de Atacar!!",
      icon: "warning",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  player1.aumentar_ki();
  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;
  permitirSonido = true;
  Swal.fire({
    text: "Ahhhhhhhhhhhhhhhh",
    title: ataques[pj1]["ki"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj1]["color"]}`,
    imageUrl: `./public/img/${pj1}/energia.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperando Kiiiii",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 

  turnoJugador1 = false;
  turnoEspecialJugador1++; 
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;
});

document.getElementById("btn_atk_py2").addEventListener("click", () => {

  if (turnoJugador1) {
    return; 
  }
  if (player1.getVida() <= 0) {
    finalizarCombate("player2");
    return;
  }
  
  if (player2.getVida() <= 0) {
    finalizarCombate("player1");
    return;
  }

  if (player2.getEnergia() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player2.getKi() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }


  player2.atk_basico(player1);
  evaluarVida(player1, player2);
  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getEnergia()) * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;
  if(player1.getVida() <= 0){
    finalizarCombate(player2)
    return;
  }
  permitirSonido = true;
  Swal.fire({
    text: "¡Vamos a ver si puedes conmigo! Tomaaaaaaa",
    title: ataques[pj2]["atk"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj2]["color"]}`,
    imageUrl: `./public/img/${pj2}/basico.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque básico",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 
  turnoJugador1 = true;
  turnoEspecialJugador2++; 
  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;

});

document.getElementById("btn_esp_py2").addEventListener("click", () => {

  if (turnoJugador1) {
    return; 
  }
  if (turnoEspecialJugador2 < 2) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Espera!",
      text: "Debes esperar al segundo turno para usar el ataque especial.",
      icon: "warning",
      backdrop: `rgba(255, 255, 0, 0.5)`,
    });
    return; 
  }

  if (player1.getVida() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: `rgba(255, 0, 0, 0.5)`,
    });
    return;
  }

  if (player2.getEnergia() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  if (player2.getEnergia() <= 66) {
    permitirSonido = false;
    Swal.fire({
      title: "¡No puedes hacer un ataque especial!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player2.getKi() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  //
  if (player2.getKi() <= 66) {
    permitirSonido = false;
    Swal.fire({
      title: "¡No tienes ki!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  if (turnoEspecialJugador2 >= 2) {
    player2.atk_especial(player1);
    evaluarVida(player1, player2);

  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getEnergia()) * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;
  if (player1.getVida() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 1 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: rgba(255, 0, 0, 0.5),
    });
    return;
  }
permitirSonido = true;
  Swal.fire({
    text: "Ahora si Acabare Contigo!!! TOMA ESTOOOOOO",
    title: ataques[pj2]["esp"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj2]["color"]}`,
    imageUrl: `./public/img/${pj2}/especial.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  });
   turnoEspecialJugador2 = 1;
  }
  
  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;
});

document.getElementById("btn_ermi_py2").addEventListener("click", () => {
  if (turnoJugador1) {
    return; 
  }
  if (player2.getSemilla() <= 0) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Semillas Agotadas!",
      text: "Has agotado todas tus semillas del ermitaño.",
      icon: "error",
      backdrop: `rgba(50, 205, 50, 0.5)`,
    });
    document.getElementById("btn_ermi_py2").disabled = true;
    return;  
  }
  player2.semilla_ermi();  
  let vida_actual = player2.getVida();
  let porcentaje = parseInt((vida_actual * 100) / 100);
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;
  
  let ki_actual = player2.getKi();
  porcentaje = parseInt((ki_actual * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;
  
  let energia_actual = player2.getEnergia();
  porcentaje = parseInt((energia_actual * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;
  
  let semillas_actuales = player2.getSemilla();
  semillas_actuales = semillas_actuales < 0 ? 0 : semillas_actuales;
  document.getElementById("semillas_py2").innerText = `${semillas_actuales}`;
  
  permitirSonido = true;
  Swal.fire({
    text: "Esto Me Va a Salvar",
    title: ataques[pj2]["curar"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj2]["color"]}`,
    imageUrl: `./public/img/${pj2}/curar.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperación con semilla del ermitaño",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 
  

  turnoJugador1 = true;
  turnoEspecialJugador2++; 
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;
});

document.getElementById("btn_ki_py2").addEventListener("click", () => {
  if (turnoJugador1) {
    return;
  }
  if (player2.getKi() >= 80) {
    permitirSonido = false;
    Swal.fire({
      title: "¡Ki al Máximo!",
      text: "Tu ki ya está al 100%, no puedes cargar más. Es momento de Atacar!!",
      icon: "warning",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  player2.aumentar_ki();
  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;
  permitirSonido = true;
  Swal.fire({
    text: "Ahora Si Acabare Contigo AAAAAHHHHHHHH!!!!",
    title: ataques[pj2]["ki"],
    width: 600,
    color: "#ffffff",
    background: `${ataques[pj2]["color"]}`,
    imageUrl: `./public/img/${pj2}/energia.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperando Kiiiii",
    backdrop: "none",
    showConfirmButton: false,
    timer: 1500
  }); 
  turnoJugador1 = true;
  turnoEspecialJugador2++; 
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;
});
let permitirSonido = true;
function playSound(soundId) {
  if (!permitirSonido) return; 
  const sound = document.getElementById(soundId);
  sound.currentTime = 0;
  sound.play();
}
document.getElementById('btn_atk_py1').addEventListener('click', function () {
  playSound('atk_basico_sound');
});
document.getElementById('btn_esp_py1').addEventListener('click', function () {
  playSound('atk_especial_sound');
});
document.getElementById('btn_ermi_py1').addEventListener('click', function () {
  playSound('ermi_sound');
});
document.getElementById('btn_ki_py1').addEventListener('click', function () {
  playSound('ki_sound');
});
document.getElementById('btn_atk_py2').addEventListener('click', function () {
  playSound('atk_basico_sound');
});
document.getElementById('btn_esp_py2').addEventListener('click', function () {
  playSound('atk_especial_sound');
});
document.getElementById('btn_ermi_py2').addEventListener('click', function () {
  playSound('ermi_sound');
});
document.getElementById('btn_ki_py2').addEventListener('click', function () {
  playSound('ki_sound');
});
