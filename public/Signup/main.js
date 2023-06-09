async function onsignup(event){
    try{
        event.preventDefault();
        let obj = {
            Name: event.target.username.value,
            Email: event.target.useremail.value,
            Password: event.target.password.value,
            userId: 1
        }
        
        let postResponse = axios.post('http://3.6.101.169:4000/users/signup',obj)
        
        //let postResponse = axios.post('http://localhost:4000/users/signup',obj)
        let val = await postResponse;
        alert(val.data.message)
    }
    catch(err){
        console.log(err);
    }
}
