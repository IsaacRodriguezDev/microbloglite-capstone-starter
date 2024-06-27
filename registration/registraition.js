'use strict'
window.onload = ()=>{
    const registerFrom = document.getElementById('register')
    registerFrom.addEventListener('submit', registerUser)
}

let registerUser =  async(event)=>{
    event.preventDefault()
   
    let formData = new FormData(event.target)
    
    let formDataAsObject = Object.fromEntries(formData)
   

    try{
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users",{
            method: 'POST',
            headers:{'Content-type': 'application/json; charset=UTF-8'},
            body:JSON.stringify(formDataAsObject)
        })
        let userData = await response.json()
        console.log(userData, 'should show up if created user')
        window.location.href ='../index.html'

    }catch(error){
        console.log(error)
    }
}