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
        if(userData.statusCode === 400){
            alert('please fill in fields')
        } if(userData.statusCode === 409){
            alert('user already exists')
        }
        else{
        window.location.href ='../index.html'

        }
        console.log(userData, 'showing')

    }catch(error){
        console.log(error)
    }
}