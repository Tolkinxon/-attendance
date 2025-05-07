let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(!token) window.location = '/login';

const elForm = document.querySelector('.js-form');
const elWeeklyTable = document.querySelector('#workerTable');
const elWeeklyTableBody = document.querySelector('#weeklyTableBody');

function renderWeeklData(arr, node){
    node.innerHTML='';
    const fragment = document.createDocumentFragment();
    const temporaryFragment = document.createDocumentFragment();
 
    arr.forEach(({time, gate_location}, idx) => {
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        
        if(idx % 2 == 1){
            const tr = document.createElement('tr');
            td4.textContent = time.split('/')[0] + " " + time.split('/')[1];
            td5.textContent =  time.split('/')[2];
            td6.textContent = gate_location;
            tr.append(temporaryFragment);
            tr.append(td4, td5, td6);
            fragment.append(tr);
            temporaryFragment.innerHTML = '';
        }
        if(idx % 2 == 0){
            td1.textContent = time.split('/')[0] + " " + time.split('/')[1];
            td2.textContent =  time.split('/')[2];
            td3.textContent =  gate_location;
            temporaryFragment.append(td1, td2, td3)
        }
    });
    node.append(fragment);
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
function openEditModal() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
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
async function getEmployeeWeeklyData(id){
    const req = await fetch(`/api/admin/${id}`)
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    console.log(res);
    renderWeeklData(res.data.control, elWeeklyTableBody);
}
async function getEmployee(id){
    const req = await fetch(`/api/admin/employee/${id}`)
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
elWeeklyTable.addEventListener('click', (evt)=>{
     const openWeeklyModalBtn =   evt.target.matches('.open-weekly-modal-btn');
     const editTd=   evt.target.matches('.js-edit-td');
     
     if(openWeeklyModalBtn){
        getEmployeeWeeklyData(evt.target.dataset.id)
        openWeeklyModal();
     }
     if(editTd){
        getEmployee(evt.target.dataset.id)
        openEditModal();
     }
})
function updateWorker() {
    closeAddModal();
    clearAddModalInputs();
}
function openConfirmDelete() {
    document.getElementById('confirmModal').style.display = 'block';
}
function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
}
function openWeeklyModal(evt) {
    document.getElementById('weeklyModal').style.display = 'block';
}
function closeWeeklyModal() {
    document.getElementById('weeklyModal').style.display = 'none';
}
function deleteWorker() {
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
document.getElementById('generateNum').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0,4);
});
