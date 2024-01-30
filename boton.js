// mostramos el botón al hacer scroll
window.onscroll = function() {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector(".boton-top").classList.add("show");
    } else {
      document.querySelector(".boton-top").classList.remove("show");
    }
  }
  
  // hacemos que el botón nos lleve al inicio de la página
  document.querySelector(".boton-top").addEventListener("click", function() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
  });
  