let modal = null;

async function abrirModalItens (titulo) {
    // Create div container
    modal = document.createElement("div");
    modal.style.className = "flex center vertical";

    // Create modal navigation
    const modalNav = document.createElement("div");
    modalNav.id = "modal-nav";

    // Create modal container
    const modalDiv = document.createElement("div");
    modalDiv.id = "modal";

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
        modalDiv.appendChild(modalItem);
    });

    modal.appendChild(modalNav);
    modal.appendChild(modalDiv);

    // Create modal background
    let background = criarBackground();

    // Append modal to background
    background.appendChild(modal);

    // Add event listener to close the modal
    modalNavClose.addEventListener("click", () => {
        fecharModalItens();
    });
}

function criaItemModal (item) {
    // Create modal item container
    const modalItem = document.createElement("div");
    modalItem.className = "modal-item";

    // Create modal item description
    const modalItemDescricao = document.createElement("div");
    modalItemDescricao.className = "modal-item-descricao";
    modalItemDescricao.addEventListener("click", () => {
        centralizarMapa(Number(item.item_lat), Number(item.item_lng));
        fecharModalItens();
    });

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
        fecharModalItens();
    });

    const deletarImg = document.createElement("img");
    deletarImg.src = "Views/mapa/img/icone-deletar.png";
    deletarImg.addEventListener("click", () => {
        let markerItem = markers.find(marker => marker.item_id == item.item_id);

        if (markerItem !== null && markerItem !== undefined) {  
            minimizarModalItens(() => {                
                    let botao1 = {
                        texto: "Sim",
                        funcao: function () {
                            deletaItem(markerItem); // remove o marker depois da confirmacao do servidor
                            fecharModalItens();
                        }
                    };

                    let botao2 = {
                        texto: "Não",
                        funcao: function () {
                            minimizarMensagem(() => {
                                maximizarModalItens();
                            });
                        }
                    };

                    criarMensagem("Deletar Item?", botao1, botao2);
            });
        }
    });

    const editarImg = document.createElement("img");
    editarImg.src = "Views/mapa/img/icone-editar.png";
    editarImg.addEventListener("click", () => {
        let markerItem = markers.find(marker => marker.item_id == item.item_id);

        if (markerItem !== null && markerItem !== undefined) {
            // animacao minimizar modal itens
            minimizarModalItens(() => {
                let botao = {
                    texto: "Editar",
                    funcao: function (input) {
                        // callback do botao
                        markerItem.item_descricao = input;
                        editaItem(markerItem);
                    }
                };
                let input = {
                    valor: markerItem.item_descricao,
                    placeholder: "Descrição..."
                };

                // cria formulario depois que foi minimizado
                criarFormulario("Editar Item", botao, input);
            });       
        }
    });

    modalAcoes.appendChild(ampliarImg);
    modalAcoes.appendChild(deletarImg);
    modalAcoes.appendChild(editarImg);

    // Append everything to modal item
    modalItem.appendChild(modalItemDescricao);
    modalItem.appendChild(modalDivisor);
    modalItem.appendChild(modalAcoes);

    return modalItem;
}

function fecharModalItens () {
    modal = null;
    removerBackground();
}

function minimizarModalItens (callbackComplete) {
    anime({
        targets: modal,
        opacity: [1, 0],
        duration: 200,
        complete: function () {
            modal.style.display = "none";
            callbackComplete();
        }
    });
}
function maximizarModalItens () {
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 200,
        begin: function () {
            modal.style.display = "block";
        }
    });
}