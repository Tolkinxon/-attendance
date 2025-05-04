let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(token) window.location = '/admin'



const errorDiv = document.querySelector('.error');
const elForm = document.querySelector('.js-form');

async function sendData (data){
    const req = await fetch('/api/login', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })

    const res = await req.json();
    if(res.status == 400) {
        errorDiv.innerHTML = '';
        const p = document.createElement('p');
        p.textContent = res.message;
        return errorDiv.append(p);
    }
    window.localStorage.setItem('token', JSON.stringify(res.accessToken));
    window.location.reload();
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(elForm);
    const data = Object.fromEntries(formData);

    sendData(data);
});