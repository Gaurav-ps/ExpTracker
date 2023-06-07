function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function removePremium(){
    const element = document.getElementById('rzp-button')
    element.remove();
    document.getElementById('premiumUser').innerHTML += 'You are a premium User'
}

window.addEventListener('DOMContentLoaded', async() => {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://15.206.211.185:4000/expense/get-expenses', { headers: {'Authorization' : token}})
    const decodeToken = parseJwt(token)
    const isPremiumUser = decodeToken.ispremiumuser
    if(isPremiumUser)
    {
        removePremium();
        showLeaderboard()
    }
    try{
        for(let i=0; i<response.data.allExpenses.length; i++)
        {
            showOnScreen(response.data.allExpenses[i]);
        }
    }
    catch(err){
        console.log(err);
    }
    
})

async function onsignup(event)
    {
        try{
            event.preventDefault();
            const token = localStorage.getItem('token')
            let obj = {
            Expenses : event.target.Amount.value,
            Description : event.target.Reason.value,
            Category : document.getElementById('categories').value,
            }
            let postResponse = await axios.post('http://15.206.211.185:4000/expense/add-expenses',obj, {headers: {'Authorization': token}})
            
                showOnScreen(postResponse.data.expenseDetails)
        } 
        catch(err){
            console.log(err)
        }        
    }

async function showOnScreen(obj)
    {
        try{
            const parent = document.getElementById('items');
            const child = document.createElement('li');
            child.textContent = obj.amount+'-'+obj.description+'-'+obj.category;

            const delButton = document.createElement('input');
            delButton.type = 'button';
            delButton.value = 'Delete';
            delButton.onclick = async() => {
                const token = localStorage.getItem('token')
                let deleteResponse = await axios.delete(`http://15.206.211.185:4000/expense/delete-expenses/${obj.id}`,{headers: {'Authorization': token}})
                try{
                    parent.removeChild(child);
                }
                catch(err){
                    console.log(err)
                }
            }
            child.appendChild(delButton);
            parent.appendChild(child);
        }
        catch(err){
            console.log(err)
        }
    }

function showLeaderboard(){
        const inputElement = document.createElement('input')
        inputElement.type = 'button'
        inputElement.value = 'Show Leaderboard'
        inputElement.onclick = async() => {
            const token = localStorage.getItem('token')
            const userLeaderBoardArray = await axios.get('http://15.206.211.185:4000/premium/showLeaderBoard',{ headers: {'Authorization' : token}})
            console.log(userLeaderBoardArray)
    
            var leaderElement = document.getElementById('leaderboard')
            leaderElement.innerHTML += '<h1>Leader Board</h1>'
            userLeaderBoardArray.data.forEach((userDetails) => {
                leaderElement.innerHTML += `<li>Name - ${userDetails.name}---Total Expenses- ${userDetails.totalExpenses} </li>`
            })
        }
        document.getElementById('premiumUser').appendChild(inputElement)
}

async function download(){
    try{
        const token = localStorage.getItem('token')
        let response = await axios.get('http://15.206.211.185:4000/expense/download', { headers: {"Authorization" : token} })

        if(response.status === 201){
                //the backend is essentially sending a download link
                //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } 
    }
    catch(err){
        console.log(err)
    }
}


document.getElementById('rzp-button').onclick = async function(e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://15.206.211.185:4000/purchase/premiummembership',{headers: {'Authorization': token}})
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response){
            const res = await axios.post('http://15.206.211.185:4000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{headers: {'Authorization': token}})
        
            alert('You are a premium user now!!!')
            removePremium()
            localStorage.setItem('token',res.data.token)
            showLeaderboard()
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault()

    rzp1.on('payment.failed', function(response){
        console.log(response)
        alert('Something went wrong')
    })
}


    