async function onsignup(event){
    try{
        event.preventDefault();
        let obj = {
            Name: event.target.username.value,
            Email: event.target.useremail.value,
            Password: event.target.password.value,
            userId: 1
        }

        let postResponse = axios.post('http://52.66.13.147:4000/users/signup',obj)
        let val = await postResponse;
        alert(val.data.message)
    }
    catch(err){
        console.log(err);
    }
}
