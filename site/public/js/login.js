function abrirLogin() {
    document.getElementById('backgroundBlur').style.display = 'block';
    aparecerLogin.innerHTML = `
    <section class="alinhamento">
        <section class="paineisLogin">
            <section style="width: 100%; margin-top: -2%; margin-bottom: 3%">
                <a style="margin-left: 85%;" href="javascript:void(0);" onclick="fecharLogin()"><img src="./assets/img/x.png" width="7%"></a>
            </section>
            <section style="display: flex; align-items: center; justify-content: center;">
                <a href="./portalacademico.html" style="margin-left: 7vh;"><img src="./assets/img/painel academico.png" width="80%"></a>
                <a href="./portalaluno.html"><img src="./assets/img/painel aluno.png"  width="80%"></a>
            </section>
        </section>
    </section>
    ` ;
}

function fecharLogin() {
    document.getElementById('backgroundBlur').style.display = 'none';
    aparecerLogin.innerHTML = "";
}