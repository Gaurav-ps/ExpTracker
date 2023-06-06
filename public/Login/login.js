async function login(event){
    try{
        event.preventDefault();
        let obj = {
            Email: event.target.useremail.value,
            Password: event.target.password.value
        }

        let postResponse = axios.post('http://52.66.13.147:4000/users/login',obj)
        let val = await postResponse;
        if(val.status === 200)
        {
            console.log(val)
            localStorage.setItem('token', val.data.token)
            alert('Login Successful')
            window.location.href = '../Features/IndexExp.html'
        }
    }
    catch(err){
        alert('Incorrect Password')
        console.log(err);
    }
}
const element = document.getElementById('forpass')
element.onclick = () => {
    window.location.href = './Password.html'
}