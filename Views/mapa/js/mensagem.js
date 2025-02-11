let mensagem = null;

function criarMensagem (titulo, botao1, botao2) {
    // Create div container
    mensagem = document.createElement("div");
    mensagem.style.className = "flex center vertical";

    // Create modal container
    const mensagemDiv = document.createElement("div");
    mensagemDiv.id = "mensagem";

    // Create navigation bar
    const mensagemNav = document.createElement("div");
    mensagemNav.id = "mensagem-nav";

    const titleNav = document.createElement("p");
    titleNav.textContent = titulo;

    const closeButton = document.createElement("div");
    closeButton.id = "mensagem-nav-close";

    const closeImg = document.createElement("img");
    closeImg.src = "Views/mapa/img/icone-fechar.png";
    closeImg.alt = "Fechar";
    
    // Close button functionality
    closeButton.appendChild(closeImg);
    closeButton.addEventListener("click", () => {
        removerBackground();
    });

    // Create form container
    const mensagemInfo = document.createElement("div");
    mensagemInfo.id = "mensagem-info";

    const titleInfo = document.createElement("h1");
    titleInfo.textContent = titulo;

    const button1 = document.createElement("button");
    button1.textContent = botao1.texto;
    button1.addEventListener("click", botao1.funcao);

    const button2 = document.createElement("button");
    button2.textContent = botao2.texto;
    button2.addEventListener("click", botao2.funcao);

    // Append elements
    mensagemNav.appendChild(titleNav);
    mensagemNav.appendChild(closeButton);
    
    mensagemInfo.appendChild(button1);
    mensagemInfo.appendChild(button2);
    
    mensagemDiv.appendChild(titleInfo);
    mensagemDiv.appendChild(mensagemInfo);

    mensagem.appendChild(mensagemNav);
    mensagem.appendChild(mensagemDiv);
    
    // Create modal background
    let background = criarBackground();

    // Append modal to background
    background.appendChild(mensagem);
}
function fecharMensagem () {
    mensagem = null;
    removerBackground();
}

function minimizarMensagem (callbackComplete) {
    anime({
        targets: mensagem,
        opacity: [1, 0],
        duration: 200,
        complete: function () {
            mensagem.style.display = "none";
            callbackComplete();
        }
    }); 
}
