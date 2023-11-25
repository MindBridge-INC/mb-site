function permissoes(){
   var tipoUsuario = sessionStorage.TIPO_USUARIO
 
   if (tipoUsuario == "Técnico") {
      console.log("Técnico");
      painelacademico.style.display = "none";
  } else if (tipoUsuario == "Coordenação") {
      console.log("Coordenação ou Administrador");
      painelTecnico.style.display = "none";
      painelMaquina.style.display = "none";
  }
} 