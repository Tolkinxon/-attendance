let token = window.localStorage.getItem('token');
    token = token ? JSON.parse(token):'';
if(!token) window.location = '/login'