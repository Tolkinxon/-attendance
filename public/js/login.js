let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(token) window.location = '/admin'


const elBtn = document.querySelector('.js-btn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const errorDiv = document.getElementById('error');

async function sendData (data){
    const req = await fetch('/api/login', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })

    const res = await req.json();
    if(res.status == 400) return alert(res.message)
    window.localStorage.setItem('token', JSON.stringify(res.accessToken));
}

function login() {
    const data = {
        name_or_email: username.value.trim(),
        password: password.value.trim()
    }
    if(!username.value.trim() || !password.value.trim()) return alert('Email or password empty!')
    sendData(data);
    window.location.reload();
}

elBtn.addEventListener('click', login);