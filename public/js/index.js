const elSidebar = document.querySelector('.sidebar');
const elForm = document.querySelector('.js-form');

function renderBtns(arr, node){
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();
    arr.forEach((item, idx) => {
        const button = document.createElement('button');
        button.innerHTML = item.gate_location;
        button.dataset.id = item.id;
        if(idx == 0) button.classList.add('active-btn');
        fragment.append(button);
    })
    node.append(fragment);
}

async function getGates(){
    const req = await fetch(`/api/gates`)
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }
    renderBtns(res.data, elSidebar)
    
}
getGates();

function toggleSettings() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

elSidebar.addEventListener('click', (evt)=>{
    if(evt.target.tagName == 'BUTTON')  setActive(evt.target) 
})

function setActive(button) {
    const buttons = document.querySelectorAll('.sidebar button');
    buttons.forEach(btn => btn.classList.remove('active-btn'));
    button.classList.add('active-btn');
}

async function sendId(data){
    const req = await fetch('/api/confirm', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const res = await req.json();
    if(res.status == 400) {
        return alert(res.message)
    }

    if(res.condition == "in") {
        document.getElementById('workerName').textContent = `${res.userName} binoga kirish uchun rasmga olishni tasdiqlang`;
        document.querySelector('.confirm-taking-photo').classList.remove('visually-hidden');
        document.querySelector('.confirm-taking-photo').dataset.id = res.imgId;
        openModal();
    }
    else {
        document.getElementById('workerName').textContent = `${res.userName} siz bilan ishlash maroqli bo'ldi sizga oq yo'l!`;
        document.querySelector('.confirm-taking-photo').classList.add('visually-hidden');
        openModal();
    }
}

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData);
    const elActiveBtn = document.querySelector('.active-btn');
    data.kpp_id = elActiveBtn.dataset.id;
    sendId(data);
})

function openModal() {
    document.getElementById('modal').classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
    workerId.value = '';
}

function confirmModal(btn) {
    const id = btn.dataset.id;
    closeModal();
    window.location = `/taking-photo/${id}`;
}
