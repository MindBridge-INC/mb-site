function trazerMenuLateral() {
    divMenuLateralDireito.innerHTML = `
    <div
                style=" margin-top: 2vh; display: flex; align-items: center;justify-content: center; margin-bottom: 2vh">
                <img src="./img/icone profs.png" width="80%">
            </div>
            <div style="display: flex;
            align-items: center;
            justify-content: center;">
                <span style="font-family: Fredoka; font-size: 3vh; font-weight: 700; color: #2e2d2d">${sessionStorage.NOME_USUARIO} ${sessionStorage.SOBRENOME_USUARIO}</span>
            </div>
            <div style="display: flex;
            align-items: center;
            justify-content: center; margin-top: 0.5vh">
                <span style="font-family: Arimo; font-size: 2vh; font-weight: 400; color: #2e2d2d">${sessionStorage.TIPO_USUARIO}
                </span>
            </div>

            <div
                style="margin-top: 3vh; gap: 2vh;display: flex; align-items: center; justify-content: center;flex-direction: column;">
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/icone_user.png" width="14%">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./usuario.html">Usuário</a>
                </div>
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/icone_maquina.png" width="15%">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./máquina.html">Máquina</a>
                </div>
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/icone_maquina.png" width="15%">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./sala.html">Sala</a>
                </div>
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/icone_chapeu.png" width="18%" style="margin-left: -3px;">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./aluno.html">Aluno</a>
                </div>
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/icone_chapeu.png" width="18%" style="margin-left: -3px;">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./turma.html">Turma</a>
                </div>
                <div style="width: 90%; display: flex; align-items: center; justify-content: center; gap: 1vh; ">
                    <img src="./img/config.png" width="18%" style="margin-left: -3px;">
                    <a style="display: none;
                    width: 90%;
                    height: 40px;
                    border-radius: 35px;
                    border: 3px solid #D2C6AE;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    font-family: Arimo;
                    font-size: 2vh;
                    font-weight: 700;
                    color: #2e2d2d;
                    cursor: pointer;
                    text-decoration: none;" href="./limites.html">Limites</a>
                </div>
    `
}