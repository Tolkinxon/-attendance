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
    console.log(res);    
}

function login() {
    const data = {
        name_or_email: username.value.trim(),
        password: password.value.trim()
    }
    sendData(data);
}

elBtn.addEventListener('click', login);