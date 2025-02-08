async function abrirModalItens (titulo) {
    // Create div container
    const div = document.createElement("div");
    div.style.className = "flex center vertical";

    // Create modal navigation
    const modalNav = document.createElement("div");
    modalNav.id = "modal-nav";

    // Create modal container
    const modal = document.createElement("div");
    modal.id = "modal";

    const navText = document.createElement("p");
    navText.textContent = titulo;

    const modalNavClose = document.createElement("div");
    modalNavClose.id = "modal-nav-close";

    const closeImg = document.createElement("img");
    closeImg.src = "Views/mapa/img/icone-fechar.png";
    closeImg.alt = "Close";

    modalNavClose.appendChild(closeImg);

    // Append elements to modal nav
    modalNav.appendChild(navText);
    modalNav.appendChild(modalNavClose);

    let itens = await pegarItens();
    itens.forEach(item => {
        let modalItem = criaItemModal(item);
        modal.appendChild(modalItem);
    });

    div.appendChild(modalNav);
    div.appendChild(modal);

    // Create modal background
    let background = criarBackground();

    // Append div to background
    background.appendChild(div);

    // Add event listener to close the modal
    modalNavClose.addEventListener("click", () => {
        removerBackground();
    });
}

function criaItemModal (item) {
    // Create modal item container
    const modalItem = document.createElement("div");
    modalItem.className = "modal-item";

    // Create modal item description
    const modalItemDescricao = document.createElement("div");
    modalItemDescricao.className = "modal-item-descricao";

    const itemImg = document.createElement("img");
    itemImg.src = "Views/mapa/img/icone-item.png";
    
    const itemText = document.createElement("p");
    itemText.textContent = item.item_descricao;

    modalItemDescricao.appendChild(itemImg);
    modalItemDescricao.appendChild(itemText);

    // Create separator
    const modalDivisor = document.createElement("span");
    modalDivisor.className = "modal-divisor";

    // Create modal actions
    const modalAcoes = document.createElement("div");
    modalAcoes.className = "modal-acoes";

    // ações
    const ampliarImg = document.createElement("img");
    ampliarImg.src = "Views/mapa/img/icone-ampliar.png";
    ampliarImg.addEventListener("click", () => {
        centralizarMapa(Number(item.item_lat), Number(item.item_lng));
        removerBackground();
    });

    const deletarImg = document.createElement("img");
    deletarImg.src = "Views/mapa/img/icone-deletar.png";
    deletarImg.addEventListener("click", () => {
        let markerItem = markers.find(marker => marker.item_id == item.item_id);

        if (markerItem !== null && markerItem !== undefined) {  
            deletaItem(markerItem); // remove o marker depois da confirmacao do servidor
            removerBackground();
        }
    });

    modalAcoes.appendChild(ampliarImg);
    modalAcoes.appendChild(deletarImg);

    // Append everything to modal item
    modalItem.appendChild(modalItemDescricao);
    modalItem.appendChild(modalDivisor);
    modalItem.appendChild(modalAcoes);

    return modalItem;
}
