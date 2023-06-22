var miBoton = document.getElementById("submit");

miBoton.addEventListener("click", function() {
  if (miBoton.style.backgroundColor === "red") {
    miBoton.style.backgroundColor = "";
  } else {
    miBoton.style.backgroundColor = "red";
  }
})


var disponible = document.getElementById("submit");

disponible.addEventListener("click", function() {
  if (disponible.textContent === "NO DISPONIBLE") {
    disponible.textContent = "DISPONIBLE";
  } else {
    disponible.textContent = "NO DISPONIBLE";
    
  }
})

let intervalId;
      let remainingTime;
      const timer = document.getElementById("timer");
      const hoursInput = document.getElementById("hours");
      const minutesInput = document.getElementById("minutes");

      function startTimer() {
        const hours = parseInt(hoursInput.value);
        const minutes = parseInt(minutesInput.value);
        remainingTime = hours * 3600 + minutes * 60;

        intervalId = setInterval(updateTimer, 1000);
      }

      function stopTimer() {
        clearInterval(intervalId);
      }

      function updateTimer() {
        if (remainingTime <= 0) {
          stopTimer();
          timer.innerHTML = "¡Tiempo terminado!";
        } else {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          timer.innerHTML = `${hours} horas, ${minutes} minutos y ${seconds} segundos transcurridos`;
          remainingTime--;
        }
      }
