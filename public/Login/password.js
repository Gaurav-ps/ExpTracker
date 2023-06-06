async function password(event){
    try{
        event.preventDefault()
        let obj = {
            email: event.target.useremail.value
        }
        let response = await axios.post('http://52.66.13.147:4000/password/forgotpassword',obj)
        
        document.body.innerHTML += `<div style="color:red;">${response.data.message}<div>`
        
    }
    catch(err){
        console.log(err)
    }
}