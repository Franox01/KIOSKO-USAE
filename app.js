function toggleDisponibilidad(modulo) {
  var boton = document.getElementById('modulo' + modulo).querySelector('button');
  var temporizador = document.getElementById('temporizador' + modulo);
  var intervalo;

  if (boton.classList.contains('disponible')) {
    // Si está en "Disponible", cambiamos a "No Disponible" y mostramos el temporizador
    boton.classList.remove('disponible');
    boton.classList.add('nodisponible');
    boton.textContent = 'No Disponible';

    temporizador.style.display = 'block';

    // Obtener las horas y minutos ingresados por el usuario
    var horasInput = prompt('Ingrese las horas que no estará disponible (0-24):');
    var minutosInput = prompt('Ingrese los minutos que no estará disponible (0-59):');

    // Validación de entrada
    var horas = horasInput ? parseInt(horasInput) : 0;
    var minutos = parseInt(minutosInput);

    if ((horasInput && isNaN(horas)) || isNaN(minutos) || horas < 0 || horas > 24 || minutos < 0 || minutos > 59) {
      alert('Por favor, ingrese valores válidos para las horas y los minutos.');
      return;
    }

    var tiempoRestante = (horas * 60 + minutos) * 60;

    intervalo = setInterval(function() {
      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        boton.classList.remove('nodisponible');
        boton.classList.add('disponible');
        boton.textContent = 'Disponible';
        temporizador.style.display = 'none';
      } else {
        var horasRestantes = Math.floor(tiempoRestante / 3600);
        var minutosRestantes = Math.floor((tiempoRestante % 3600) / 60);
        var segundosRestantes = tiempoRestante % 60;

        temporizador.textContent = 'Tiempo restante: ' + horasRestantes + ' horas ' + minutosRestantes + ' minutos ' + segundosRestantes + ' segundos';

        // Enviamos el evento del temporizador actualizado al iframe padre (página principal)
        window.parent.postMessage({ modulo: modulo, tiempoRestante: temporizador.textContent }, "*");

        tiempoRestante--;
      }
    }, 1000);
  } else {
    // Si el módulo ya está marcado como "No Disponible", restablecemos la disponibilidad
    boton.classList.remove('nodisponible');
    boton.classList.add('disponible');
    boton.textContent = 'Disponible';
    temporizador.style.display = 'none';

    clearInterval(intervalo);
  }
}
