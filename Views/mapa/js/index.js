const statusSuccess = 0;
let background = null;

async function pegarItens () {
    return await fetch("itens/pegar")
    .then(response => response.json())
    .then(data => {
        return data.status === statusSuccess ? data.itens : null;
    })
    .catch(err => {
        console.log(err);
    });
}

async function enviaItem (item) {
    await fetch("itens/adicionar", {
        method: "POST", // HTTP method
        headers: {
            "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // servidor manda de volta o item com o id
        if (data.status === statusSuccess) {
            criarMarker(data.item);
        }
    })
    .catch(error => console.error("Error:", error));    
}
async function deletaItem (markerItem) {
    await fetch("itens/deletar", {
        method: "POST", // HTTP method
        headers: {
            "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify({
            item_id: markerItem.item_id
        })
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        if (data.status === statusSuccess) {
            removerMarker(markerItem.marker);
        }
    })
    .catch(error => console.error("Error:", error));
}

function criarBackground () {
    background = document.createElement("div");
    background.id = "background";

    document.body.appendChild(background);
    
    // animacao opacidade
    anime({
        targets: background,
        opacity: [0, 1],
        duration: 100,
        easing: "easeInOutQuad"
    });

    return background;
}
function removerBackground () {
    // animacao opacidade
    anime({
        targets: background,
        opacity: [1, 0],
        duration: 100,
        easing: "easeInOutQuad",
        complete: function () {
            document.body.removeChild(background);
        }
    });
}

const buttonConsultar = document.getElementById("button-consultar");
buttonConsultar.addEventListener("click", () => {
    abrirModalItens("Itens");
});
