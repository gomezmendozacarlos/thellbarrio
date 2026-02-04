document.addEventListener('DOMContentLoaded', function() {
initConcerts();
console.log('Concerts.js v2.0 initialized - New mobile-first layout');
});
const concertsData = [
{
id: 1,
year: 2026,
month: 2,
day: 14,
venue: 'Carnaval Alternativo 2026',
city: 'Autlan de Navarro, JAL',
ticketUrl: '',
},
{
id: 2,
year: 2026,
month: 4,
day: 4,
venue: 'Urbano',
city: 'Queretaro, QRO',
ticketUrl: "",
},
{
id: 3,
year: 2026,
month: 5,
day:22,
venue: 'TBA',
city: 'Merida, YUC',
ticketUrl: null,
},
{
id: 4,
year: 2026,
month: 5,
day:23,
venue: '',
city: 'Cancun, QROO',
ticketUrl: null,
},
{
id: 6,
year: 2026,
month: 6,
day:6,
venue: 'C3 Stage',
city: 'Guadalajara, JAL',
ticketUrl: null,
},
{
id: 7,
year: 2026,
month: 6,
day:13,
venue: 'Fuck Off Room',
city: 'CDMX',
ticketUrl: null,
}
];
function initConcerts() {
console.log('🎵 Iniciando sistema de conciertos v2.0');
console.log('📅 Datos de conciertos:', concertsData);
renderConcerts();
}
function renderConcerts() {
const concertsContainer = document.getElementById('concerts-container');
const noConcertsMessage = document.getElementById('no-concerts');
if (!concertsContainer) {
console.warn('Concerts container not found');
return;
}
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
const currentDay = today.getDate();
console.log('📅 Fecha actual:', `${currentDay}/${currentMonth}/${currentYear}`);
console.log('🎪 Total conciertos:', concertsData.length);
const futureConcerts = concertsData.filter(concert => {
const isFuture = concert.year > currentYear ||
(concert.year === currentYear && concert.month > currentMonth) ||
(concert.year === currentYear && concert.month === currentMonth && concert.day >= currentDay);
console.log('🎵 Concierto:', concert.venue, `${concert.day}/${concert.month}/${concert.year}`, 'Es futuro?', isFuture);
return isFuture;
});
console.log('🔮 Conciertos futuros encontrados:', futureConcerts.length);
if (futureConcerts.length === 0) {
console.log('❌ No hay conciertos futuros, mostrando mensaje');
concertsContainer.classList.add('hidden');
noConcertsMessage?.classList.remove('hidden');
return;
}
noConcertsMessage?.classList.add('hidden');
concertsContainer.classList.remove('hidden');
futureConcerts.sort((a, b) => {
if (a.year !== b.year) return a.year - b.year;
if (a.month !== b.month) return a.month - b.month;
return a.day - b.day;
});
concertsContainer.innerHTML = '';
futureConcerts.forEach(concert => {
const concertElement = createConcertElement(concert);
concertsContainer.appendChild(concertElement);
});
}
function createConcertElement(concert) {
const concertDiv = document.createElement('div');
concertDiv.className = 'bg-white rounded-lg card-shadow hover:card-shadow-hover p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-4 border-orange-primary transition-all duration-300 border border-gray-100';
const monthNames = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const tempDate = new Date(concert.year, concert.month - 1, concert.day);
const dayOfWeek = dayNames[tempDate.getDay()];
const monthShort = monthNames[concert.month];
const dayNumber = concert.day.toString().padStart(2, '0');
concertDiv.innerHTML = `
<!-- Lado izquierdo: Día semana, Mes, Día, Venue -->
<div class="flex-1 mb-4 sm:mb-0">
<div class="flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
<!-- Fecha mobile-first -->
<div class="flex items-center space-x-2 text-sm sm:text-base">
<span class="text-gray-700 font-semibold uppercase">${dayOfWeek}</span>
<span class="text-gray-700 font-semibold capitalize">${monthShort}</span>
<span class="text-gray-700 font-semibold uppercase">${dayNumber}</span>
</div>
<!-- Venue -->
<div class="mt-2 sm:mt-0">
<h3 class="text-base sm:text-lg font-semibold text-gray-900">${concert.venue}</h3>
</div>
</div>
</div>
<!-- Lado derecho: Ciudad y botón -->
<div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
<!-- Ciudad -->
<div class="text-sm sm:text-base text-gray-600 font-medium">
${concert.city}
</div>
<!-- Botón de boletos -->
<div class="flex-shrink-0 ">
${createTicketButton(concert)}
</div>
</div>
`;
return concertDiv;
}
function createTicketButton(concert) {
if (concert.ticketUrl) {
return `
<a href="${concert.ticketUrl}"
target="_blank"
rel="noopener noreferrer"
class="btn-primary inline-block text-center text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 min-w-[100px] sm:min-w-[120px]"
onclick="trackTicketClick('${concert.id}')">
Boletos
</a>
`;
} else {
return `
<div class="opacity-0 invisible min-w-[100px] sm:min-w-[120px]" aria-hidden="true">
<div class="btn-primary inline-block text-center text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
Boletos
</div>
</div>
`;
}
}
function trackTicketClick(concertId) {
console.log(`Ticket click tracked for concert ID: ${concertId}`);
}
function addConcert(concertData) {
concertsData.push({
...concertData,
id: Date.now() // Simple ID generation
});
renderConcerts();
}
function updateConcert(concertId, updatedData) {
const concertIndex = concertsData.findIndex(concert => concert.id === concertId);
if (concertIndex !== -1) {
concertsData[concertIndex] = {
...concertsData[concertIndex],
...updatedData
};
renderConcerts();
}
}
function removeConcert(concertId) {
const concertIndex = concertsData.findIndex(concert => concert.id === concertId);
if (concertIndex !== -1) {
concertsData.splice(concertIndex, 1);
renderConcerts();
}
}
if (window.ThellBarrio) {
window.ThellBarrio.concerts = {
add: addConcert,
update: updateConcert,
remove: removeConcert,
data: concertsData
};
}