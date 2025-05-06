let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(!token) window.location = '/login';


const elForm = document.querySelector('.js-form');
const fakeData = [
    { fullname: 'Ali Karimov', dateIn: '01/05/2025', timeIn: '09:00', dateOut: '', timeOut: '' },
    { fullname: 'Dilnoza Ismoilova', dateIn: '02/05/2025', timeIn: '10:30', dateOut: '', timeOut: '' },
    { fullname: 'Bekzod Toshmatov', dateIn: '03/05/2025', timeIn: '14:15', dateOut: '', timeOut: '' }
];

let editingRow = null;

// function populateTable() {
//     const table = document.getElementById('workerTable').getElementsByTagName('tbody')[0];
//     fakeData.forEach(item => {
//         const row = table.insertRow();
//         const nameCell = row.insertCell(0);
//         nameCell.innerText = item.fullname;
//         nameCell.className = 'name-cell';
//         nameCell.onclick = () => openEditModal(row);

//         row.insertCell(1).innerText = item.dateIn;
//         row.insertCell(2).innerText = item.timeIn;
//         row.insertCell(3).innerText = item.dateOut;
//         row.insertCell(4).innerText = item.timeOut;

//         const weekCell = row.insertCell(5);
//         const btn = document.createElement('button');
//         btn.textContent = '1 Haftalik';
//         btn.className = 'generate-btn';
//         btn.onclick = () => openWeeklyModal(item.fullname);
//         weekCell.appendChild(btn);
//     });
// }

// function openWeeklyModal(fullname) {
//     document.getElementById('weeklyTitle').innerText = fullname + " - 1 Haftalik Ma'lumot";
//     const tbody = document.getElementById('weeklyTableBody');
//     tbody.innerHTML = '';
//     for (let i = 0; i < 7; i++) {
//         const row = tbody.insertRow();
//         row.insertCell(0).innerText = fullname;
//         row.insertCell(1).innerText = `0${i+1}/05/2025`;
//         row.insertCell(2).innerText = '09:00';
//         row.insertCell(3).innerText = `0${i+1}/05/2025`;
//         row.insertCell(4).innerText = '18:00';
//     }
//     document.getElementById('weeklyModal').style.display = 'block';
// }

function closeWeeklyModal() {
    document.getElementById('weeklyModal').style.display = 'none';
}

function generateNumber() {
    let num = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById('generateNum').value = num;
}

function openAddModal() {
    editingRow = null;
    document.getElementById('modalTitle').innerText = "Yangi Hodim Qo'shish";
    document.getElementById('mainActionBtn').innerText = 'Yaratish';
    document.getElementById('deleteBtn').style.display = 'none';
    clearAddModalInputs();
    document.getElementById('addModal').style.display = 'block';
}

function openEditModal(row) {
    editingRow = row;
    const [fullname, dateIn, timeIn, dateOut, timeOut] = [
        row.cells[0].innerText, row.cells[1].innerText, row.cells[2].innerText,
        row.cells[3].innerText, row.cells[4].innerText
    ];
    const [firstname, lastname] = fullname.split(' ');
    document.getElementById('firstname').value = firstname || '';
    document.getElementById('lastname').value = lastname || '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('generateNum').value = '';

    document.getElementById('modalTitle').innerText = 'Ma\'lumotni Yangilash';
    document.getElementById('mainActionBtn').innerText = 'Yangilash';
    document.getElementById('mainActionBtn').onclick = updateWorker;
    document.getElementById('deleteBtn').style.display = 'inline-block';

    document.getElementById('addModal').style.display = 'block';
}

async function sendEmployee(data){
    const req = await fetch('/api/admin', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    console.log(res);
}

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData);
    sendEmployee(data);
    closeAddModal();
})

function updateWorker() {
    if (!editingRow) return;
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    if (!firstname || !lastname) {
        alert('Ism va familiya bo‘sh bo‘lishi mumkin emas!');
        return;
    }
    const fullname = firstname + ' ' + lastname;
    editingRow.cells[0].innerText = fullname;
    editingRow.cells[1].innerText = new Date().toLocaleDateString('uz-UZ');
    editingRow.cells[2].innerText = new Date().toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'});
    closeAddModal();
    clearAddModalInputs();
}

function openConfirmDelete() {
    document.getElementById('confirmModal').style.display = 'block';
}

function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function deleteWorker() {
    if (editingRow) {
        editingRow.remove();
    }
    closeConfirmModal();
    closeAddModal();
    clearAddModalInputs();
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

function clearAddModalInputs() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('generateNum').value = '';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('addModal')) {
        closeAddModal();
    }
    if (event.target == document.getElementById('confirmModal')) {
        closeConfirmModal();
    }
    if (event.target == document.getElementById('weeklyModal')) {
        closeWeeklyModal();
    }
};

window.onload = populateTable;

document.getElementById('generateNum').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0,4);
});
