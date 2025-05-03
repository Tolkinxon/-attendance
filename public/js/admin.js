
let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
    console.log(!!token);
    
if(!token) window.location = '/login'