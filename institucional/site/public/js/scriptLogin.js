var usuarios = ["admin", "rubi", "safira", "esmeralda"];
var senhas = ["admin", "1234", "1234", "1234"];
const validaEnter = document.getElementById("iptSenha");

function entrar() {
    var usuario = iptUsuario.value;
    var senha = iptSenha.value;
    var usuarioEncontrado = false;

    if (usuario == "" || senha == "") {
        msgErro.innerHTML = "Por favor, preencha todos os campos";
        document.getElementById("msgErro").style.color = "rgb(194,66,41)"
    } else {
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i] == usuario && senhas[i] == senha) {
                usuarioEncontrado = true;
            }
        }
        if (usuarioEncontrado) {
            msgErro.innerHTML = "Aguarde...";
            document.getElementById("msgErro").style.color = "rgb(51,105,45)"
        } else {
            msgErro.innerHTML = "Nome de usuário ou senha incorretos";
            document.getElementById("msgErro").style.color = "rgb(194,66,41)"
        }
    }
}

validaEnter.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        entrar();
    }
});