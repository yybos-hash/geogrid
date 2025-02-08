let map = null;
let markers; // uma array com todos os markers e seus itens

async function initMap () {
    map = new google.maps.Map(document.getElementById("google-map"), {
        center: { lat: -28.484735, lng: -49.0061087 },
        zoom: 14,
        mapId: "DEMO_MAP_ID",
        /*
        não da pra usar styles com um mapId, e não da pra usar markers sem um mapId
        styles: [
            {
                featureType: "poi", // Hide all POIs (stores, restaurants, etc.)
                elementType: "labels", // Hide their labels
                stylers: [{ visibility: "off" }]
            }
        ]
        */
    });

    // evento click no mapa
    map.addListener("click", (event) => {
        criarFormulario((descricao) => {
            // callback para o evento click do botao
            // envia o item pro servidor e só adiciona no mapa depois que o servidor devolver o item com o id gerado
            let item = {
                "item_lat": event.latLng.lat(),
                "item_lng": event.latLng.lng(),
                "item_descricao": descricao
            };

            enviaItem(item);
        });
    });

    markers = [];

    // pegar todos os itens
    let itens = await pegarItens();
    itens.forEach(item => {
        criarMarker(item);        
    });
}

function criarMarker (item) {
    if (map === null) { return; }

    let imgMarker = document.createElement("img");
    imgMarker.src = "Views/mapa/img/icone-item.png";

    let marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: Number(item.item_lat), lng: Number(item.item_lng) },
        map: map,
        content: imgMarker,
        title: item.item_descricao
    });

    let markerItem = {
        marker: marker,
        item_id: item.item_id,
        item_descricao: item.item_descricao,
        item_lat: item.item_lat,
        item_lng: item.item_lng
    };
    markers.push(markerItem);
}
function removerMarker (marker) {
    marker.setMap(null);
    markers = markers.filter(markerItem => markerItem.marker !== marker);
}

function centralizarMapa (lat, lng) {
    if (map === null) { return; }
    
    map.panTo({ lat: lat, lng: lng });
    map.setZoom(16);
}