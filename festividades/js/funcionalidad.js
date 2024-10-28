//Array de objetos con sus atributos
let filtroIsla;
let filtroMes;
let fiestasFiltradas;
let fiestasCanarias = [
    {
        nombre: "Caballos Fufos",
        fecha: "09/28/2025",
        isla: "La Palma",
        descripcion: "Es una festividad que lleva más de cien años en la Villa y Puerto de Tazacorte." + "<br>" +
            "Los caballos bailan al ritmo del 'Vuela, Vuela, Palomita', una adaptación de un corrido mexicano." + "<br>" +
            "Esta tradición, originaria de los carnavales cubanos y traída por emigrantes palmeros," + "<br>" +
            "se incorporó a las fiestas de septiembre en honor a San Miguel.",
        constumbres: "Los caballos decorados bailan al ritmo del 'Vuela, Vuela, Palomita'," + "<br>" +
            "acompañados de la jirafa y la burra, entrecruzándose al ritmo de la danza."
    },
    {
        nombre: "Los Indianos",
        fecha: "02/12/2025",
        isla: "La Palma",
        descripcion: "Fiesta que parodia el retorno de los canarios emigrados a Cuba, cargados de riquezas." + "<br>" +
            "Es parte del carnaval palmero, en donde los asistentes lanzan polvos de talco y lucen vestimentas blancas.",
        constumbres: "Se visten de trajes blancos, con accesorios elegantes, simulando riqueza y elegancia." + "<br>" +
            "El público lanza polvos de talco en una divertida batalla."
    },
    {
        nombre: "Fiestas del Pino",
        fecha: "09/08/2025",
        isla: "Gran Canaria",
        descripcion: "Fiesta religiosa y cultural en honor a la Virgen del Pino, patrona de Gran Canaria." + "<br>" +
            "Miles de peregrinos visitan Teror para participar en procesiones y ofrendas.",
        constumbres: "Se celebran procesiones, ofrendas, bailes folclóricos y música canaria," + "<br>" +
            "además de ferias con productos locales y artesanías."
    },
    {
        nombre: "Romería de San Benito",
        fecha: "07/11/2025",
        isla: "Tenerife",
        descripcion: "Romería tradicional en honor a San Benito Abad, patrono de los campesinos, celebrada en La Laguna." + "<br>" +
            "Es una de las romerías más importantes de Canarias.",
        constumbres: "Participan grupos folclóricos, carretas decoradas y ganado, mientras los asistentes" + "<br>" +
            "visten trajes típicos y comparten comida tradicional."
    },
    {
        nombre: "Bajada de la Virgen de los Reyes",
        fecha: "07/05/2025",
        isla: "El Hierro",
        descripcion: "Es la principal fiesta de El Hierro, celebrada cada cuatro años en honor a la Virgen de los Reyes." + "<br>" +
            "Su imagen es llevada en procesión por toda la isla.",
        constumbres: "La procesión recorre más de 40 km, con danzas y música, destacando la tradicional Danza de los Pastores."
    },
    {
        nombre: "Fiestas Lustrales de Nuestra Señora de Guadalupe",
        fecha: "12/12/2024",
        isla: "La Gomera",
        descripcion: "Fiesta en honor a la Virgen de Guadalupe, patrona de La Gomera, celebrada cada cinco años." + "<br>" +
            "La imagen de la Virgen es trasladada desde su ermita a los diferentes municipios de la isla.",
        constumbres: "Se realizan procesiones, ofrendas y danzas tradicionales, acompañadas de actos culturales y festivos."
    },
    {
        nombre: "Fiestas de la Virgen de Candelaria",
        fecha: "08/15/2025",
        isla: "Tenerife",
        descripcion: "Fiesta en honor a la Virgen de Candelaria, patrona de Canarias, celebrada en la villa de Candelaria." + "<br>" +
            "Miles de peregrinos acuden cada año a rendir homenaje a la Virgen.",
        constumbres: "Procesiones, ofrendas florales, actos religiosos y actividades culturales marcan esta celebración."
    },
    {
        nombre: "Fiestas de la Virgen de la Peña",
        fecha: "09/08/2025",
        isla: "Fuerteventura",
        descripcion: "Fiesta religiosa en honor a la Virgen de la Peña, patrona de Fuerteventura." + "<br>" +
            "Los fieles acuden en romería al santuario de la Virgen en la Vega de Río Palmas.",
        constumbres: "Se celebran procesiones, ofrendas y actos festivos, donde la música y la gastronomía local son protagonistas."
    },
    {
        nombre: "Carnaval de Puerto del Rosario",
        fecha: "09/22/2025",
        isla: "Fuerteventura",
        descripcion: "El Carnaval de Puerto del Rosario es una de las fiestas más populares de Fuerteventura." + "<br>" +
            "Destacan las coloridas comparsas, los desfiles de carrozas y los concursos de disfraces.",
        constumbres: "Las calles se llenan de música, desfiles y actos donde los disfraces y las murgas son los principales atractivos."
    },
    {
        nombre: "Fiesta de Nuestra Señora del Carmen",
        fecha: "07/16/2025",
        isla: "Lanzarote",
        descripcion: "Fiesta en honor a la Virgen del Carmen, patrona de los marineros, celebrada especialmente en Arrecife y otros puertos de la isla." + "<br>" +
            "Los pescadores llevan la imagen de la Virgen en procesión marítima.",
        constumbres: "La procesión marítima es la tradición más destacada, donde barcos decorados acompañan a la Virgen en su recorrido por el mar."
    }
];
/*
var json_content = JSON.stringify(fiestasCanarias, null, 2);
var link = document.createElement("a");
var file = new Blob([json_content], {type: 'JSON'});
link.href = URL.createObjectURL(file);
link.download = "js_data.json";
link.click();
*/
function mostrarFiestas(fiestas) {
    let container = document.getElementById('mostrar');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar las tarjetas
    fiestas.forEach(fiesta => { //Cada tarjeta se creara dinamicamente con este diseño
        container.innerHTML += `
            <div class="fiesta-card">
                <h3>${fiesta.nombre}</h3>
                <p><strong>Fecha:</strong> ${fiesta.fecha}</p>
                <p><strong>Isla:</strong> ${fiesta.isla}</p>
                <p>${fiesta.descripcion}</p>
                <p><strong>Constumbres:</strong> ${fiesta.constumbres}</p>
            </div>
        `;
    });
}
//Mostramos todas las fiestas de primeras
mostrarFiestas(fiestasCanarias);
//Funcion donde se va a filtrar el Array 
function aplicarFiltros() {
    // Obtener la isla seleccionada (solo un radio seleccionado)
    filtroIsla = document.querySelector('.filtroIsla:checked')?.value;

    // Obtener el mes seleccionado (solo un radio seleccionado)
    filtroMes = document.querySelector('.filtroMes:checked')?.value;

    // Filtrar las fiestas según la isla seleccionada, si hay alguna
    fiestasFiltradas = fiestasCanarias;

    // Filtrar por isla si se ha seleccionado alguna
    if (filtroIsla) {
        fiestasFiltradas = fiestasFiltradas.filter(fiesta => fiesta.isla === filtroIsla);
    }

    // Filtrar por mes si se ha seleccionado algún mes
    if (filtroMes) {
        fiestasFiltradas = fiestasFiltradas.filter(fiesta => fiesta.fecha.includes(filtroMes));
    }

    // Mostrar las fiestas filtradas
    mostrarFiestas(fiestasFiltradas);
}
function mostrarFavoritas(){

}

