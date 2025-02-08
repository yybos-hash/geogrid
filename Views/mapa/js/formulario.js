function criarFormulario (botaoCallback) {
    // Create div container
    const div = document.createElement("div");
    div.style.className = "flex center vertical";

    // Create modal container
    const formulario = document.createElement("div");
    formulario.id = "formulario";

    // Create navigation bar
    const formularioNav = document.createElement("div");
    formularioNav.id = "formulario-nav";

    const title = document.createElement("p");
    title.textContent = "Criar Item";

    const closeButton = document.createElement("div");
    closeButton.id = "formulario-nav-close";

    const closeImg = document.createElement("img");
    closeImg.src = "Views/mapa/img/icone-fechar.png";
    closeImg.alt = "Fechar";
    
    // Close button functionality
    closeButton.appendChild(closeImg);
    closeButton.addEventListener("click", () => {
        removerBackground();
    });

    // Create form container
    const formularioInfo = document.createElement("div");
    formularioInfo.id = "formulario-info";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Descrição...";

    const button = document.createElement("button");
    button.textContent = "Criar";
    button.addEventListener("click", () => {
        if (input.value.trim() === "") { return; }

        botaoCallback(input.value.trim());
        removerBackground();
    });

    // Append elements
    formularioNav.appendChild(title);
    formularioNav.appendChild(closeButton);
    
    formularioInfo.appendChild(input);
    formularioInfo.appendChild(button);
    
    formulario.appendChild(formularioInfo);

    div.appendChild(formularioNav);
    div.appendChild(formulario);
    
    // Create modal background
    let background = criarBackground();

    // Append modal to background
    background.appendChild(div);
}
