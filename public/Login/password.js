async function password(event){
    try{
        event.preventDefault()
        let obj = {
            email: event.target.useremail.value
        }
        let response = await axios.post('http://15.206.211.185:4000/password/forgotpassword',obj)
        
        document.body.innerHTML += `<div style="color:red;">${response.data.message}<div>`
        
    }
    catch(err){
        console.log(err)
    }
}