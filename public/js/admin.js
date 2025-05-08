let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(!token) window.location = '/login';

const elForm = document.querySelector('.js-form');
const elWeeklyTable = document.querySelector('#workerTable');
const elWeeklyTableBody = document.querySelector('#weeklyTableBody');
const elDeleteBtn = document.querySelector('.js-delete-btn');
const elLogOut = document.querySelector('.js-log-out');

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
    document.getElementById('mainActionBtn').innerText = 'Yaratish';
    document.getElementById('deleteBtn').style.display = 'none';
    clearAddModalInputs();
    document.getElementById('addModal').style.display = 'block';
}
function openEditModal(data) {
    document.getElementById('firstname').value = data.fname;
    document.getElementById('lastname').value = data.lname;
    document.getElementById('email').value = data.email;
    document.getElementById('password').value = data.phone_number;
    document.getElementById('generateNum').value = data.user_id;

    document.getElementById('mainActionBtn').innerText = 'Yangilash';
    document.getElementById('mainActionBtn').dataset.id = data.id
    document.getElementById('deleteBtn').style.display = 'inline-block';
    document.querySelector('.js-delete-btn').dataset.id = data.id
    document.getElementById('addModal').style.display = 'block';
}
async function sendEmployee(data){
    const req = await fetch('/api/admin/employee', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    window.location.reload();
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
    openEditModal(res.data);
}
async function putEmployee(data, id){
    const req = await fetch(`/api/admin/employee/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    window.location.reload();
}
async function deleteEmployee(id){
    const req = await fetch(`/api/admin/employee/${id}`,{
        method: "DELETE",
    })
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    window.location.reload();
}
elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData);
    const mainActionBtn = document.getElementById('mainActionBtn');
    if(mainActionBtn.innerText == "Yaratish") {for(let key in data)  data[key] = data[key].trim();  sendEmployee(data);}
    else {
        const id = Number(mainActionBtn.dataset.id);
        for(let key in data)  data[key] = data[key].trim();
        putEmployee(data, id);
    }
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
     }
})
elDeleteBtn.addEventListener('click', (evt)=>{
    const id = evt.target.dataset.id;
    deleteEmployee(id);
    closeConfirmModal();
    closeAddModal();
    clearAddModalInputs();
})
elLogOut.addEventListener('click', () => {
    window.localStorage.clear(); 
    window.location.reload();
})
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
