document.addEventListener('DOMContentLoaded', function () {
    let request_calendar = "../json/eventos.json";
    let calendarEl = document.getElementById('calendar');

    // Cargar favoritos desde el localStorage
    function loadFavorites() {
        return JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    }

    // Guardar favoritos en el localStorage
    function saveFavorites(favorites) {
        localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
    }

    // Obtener favoritos al cargar
    let favoriteEvents = loadFavorites();

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function (info, successCallback, failureCallback) {
            fetch(request_calendar)
                .then(response => response.json())
                .then(data => {
                    let events = data.events.map(event => {
                        return {
                            id: event.id, // Asegúrate de que cada evento tenga un ID único
                            title: event.nombre,
                            start: new Date(event.fecha),
                            eventLocation: event.isla,
                            eventDescripcion: event.descripcion,
                            eventConstumbre: event.constumbres,
                            isFavorite: favoriteEvents.includes(event.id) // Comprobar si es favorito
                        }
                    });
                    successCallback(events);
                })
                .catch(failureCallback);
        },
        eventContent: function (info) {
            return {
                html: `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;
                            font-size: 12px; cursor: pointer; font-family: 'Inter', sans-serif;
                            overflow: hidden; max-width: 100%; max-height: 4em; text-align: center;">
                    <div style="overflow: hidden; text-overflow: ellipsis; white-space: normal; max-height: 2em; 
                                line-height: 1; width: 100%; word-break: break-word;">
                        <strong>${info.event.title}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-around; align-items: center; 
                                font-size: 11px; color: #555; overflow: hidden; text-overflow: ellipsis;
                                white-space: normal; max-height: 1.5em; line-height: 1; width: 100%;
                                word-break: break-word;">
                        <span>${info.event.extendedProps.eventLocation}</span>
                        <button class="favorite-btn" style="background: transparent; border: none; 
                                cursor: pointer;">
                            <span style="font-size: 16px; color: ${info.event.extendedProps.isFavorite ? 'gold' : 'gray'};">★</span>
                        </button>
                    </div>
                </div>
                `
            }
        },

        eventClick: function (info) {
            // Alternar el estado de favorito
            let isFavorite = info.event.extendedProps.isFavorite;
            info.event.setExtendedProp('isFavorite', !isFavorite);

            // Actualizar el botón de favoritos
            const button = info.el.querySelector('.favorite-btn span');
            button.style.color = !isFavorite ? 'gold' : 'gray';

            // Actualizar favoritos en el localStorage
            let favorites = loadFavorites();
            if (!isFavorite) {
                favorites.push(info.event.id); // Agregar a favoritos
            } else {
                favorites = favorites.filter(id => id !== info.event.id); // Quitar de favoritos
            }
            saveFavorites(favorites);
            renderFavorites(); // Llamar a renderFavorites para actualizar la vista de favoritos
        },
        eventMouseEnter: function (mouseEnterInfo) {
            let el = mouseEnterInfo.el;
            el.classList.add("relative");

            let newEl = document.createElement("div");
            let newElTitle = mouseEnterInfo.event.title;
            let newElLocation = mouseEnterInfo.event.extendedProps.eventLocation;

            newEl.classList.add("fc-hoverable-event");
            newEl.style = `
                overflow: hidden;
                height: auto;
                background: #D3DBD9;
                z-index: 50;
                padding: 0.75rem;
                font-size: 14px;
                position: absolute;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                width: 300px;
                border-radius: 5px;
                border: 1px solid #A4BDBC;
                white-space: normal;
                overflow-wrap: break-word;
            `;

            newEl.innerHTML = `
                <div><strong>${newElTitle}</strong></div>
                <br>
                <div>${newElLocation}</div>
            `;

            const rect = el.getBoundingClientRect();
            const calendarRect = calendarEl.getBoundingClientRect();

            if (rect.right + 300 > calendarRect.right) {
                newEl.style.right = "0";
                newEl.style.left = "auto";
            } else {
                newEl.style.left = "0";
                newEl.style.right = "auto";
            }

            el.style.position = "relative";
            el.appendChild(newEl);
        },
        eventMouseLeave: function () {
            let el = document.querySelector(".fc-hoverable-event");
            if (el) el.remove();
        }
    });

    calendar.render();

    function renderFavorites() {
        let favoritesContainer = document.getElementById('fiestas-card');
        favoritesContainer.innerHTML = ''; // Limpiar contenido existente
    
        // Obtener los eventos favoritos
        let favoriteIds = loadFavorites();
    
        // Cargar los eventos desde el JSON
        fetch(request_calendar)
            .then(response => response.json())
            .then(data => {
                data.events.forEach(event => {
                    if (favoriteIds.includes(event.id)) {
                        // Crear la tarjeta para cada evento favorito
                        let card = document.createElement('div');
                        card.classList.add('card'); // Agregar la clase de tarjeta
    
                        card.innerHTML = `
                            <h3><strong style="font-size: 24px; margin-bottom: 10px;">${event.nombre}</strong></h3><br>
                            <span style="font-size: 0.9em;">Fecha: ${event.fecha}</span><br>
                            <span style="font-size: 0.9em;">Isla: ${event.isla}</span><br>
                            <p style="margin-bottom: 8px; font-size: 16px;">${event.descripcion}</p>
                            <p style="margin-bottom: 8px; font-size: 16px;">${event.constumbres}</p>
                        `;
    
                        favoritesContainer.appendChild(card);
    
                        // Usar setTimeout para permitir que la tarjeta se muestre con la transición
                        setTimeout(() => {
                            card.classList.add('visible'); // Añadir la clase visible para la animación
                        }, 10); // Retraso para asegurar que la tarjeta se añade al DOM antes de aplicar la clase
                    }
                });
            })
            .catch(error => console.error("Error al cargar los eventos:", error));
    }
    

    // Llamar a renderFavorites para mostrar los favoritos al cargar
    renderFavorites();
});
