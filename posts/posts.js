/* Posts Page JavaScript */

"use strict";

window.onload = () => {
   
    getPosts() 
}


const getPosts = async () => {

    const loginData = getLoginData();

    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            Authorization: `Bearer ${loginData.token}`
        }
    })

    const data = await response.json();
    
    //do something with the posts
    console.log(data, "using async/await")

    usersPosts(data)

}

// userPosts function generates divs for all content, author, and timestamp of user
let usersPosts = async (usersData)=>{
    let userPosts = document.getElementById('usersPosts')  
  
    for(let i = 0; i < usersData.length;i++){
        
    let usernameDiv = document.createElement('div')
    usernameDiv.classList.add('usernames','allDataDivs')

    let contentDiv = document.createElement('div')
    contentDiv.classList.add('content','allDataDivs')

    let datePostedDiv = document.createElement('div')
    datePostedDiv.classList.add('datePosted','allDataDivs')
    let mainContainerDiv = document.getElementById('mainContainerDiv')

    let divContainer = document.createElement('div')
    divContainer.className = 'container'
    let likeForm = document.createElement('form')
    likeForm.className = 'likeButtonContainer'
    let dislikeForm = document.createElement('form')
    dislikeForm.className = 'dislikeButtonContainer'
    let likeCounter = document.createElement('span')
    likeCounter.className = 'likeCounter'
    likeCounter.textContent = ` 0 `

    likeCounter.setAttribute('id','likeCounter')

likeForm.addEventListener('submit',giveLike)
// giveLike function generates an imput that gives a value of the userData id when clicked and it removes the previous value if it is detected again

    function giveLike(e){
        e.preventDefault()
        let existingInput = document.getElementById('input1')
        if(existingInput){
            existingInput.remove()
        }
        let generatedInput = document.createElement('input')
        generatedInput.setAttribute('id','input1')
        generatedInput.setAttribute('value', `${usersData[i]._id}`)
        document.body.appendChild(generatedInput)
        if(document.getElementById('input1')){
            let thisData = document.getElementById('input1')
            addingLike(thisData.value)
           
        }
        
    }
    dislikeForm.addEventListener('submit',dislike)
    // dislike function creates a likes variable and stores the users current likes
    function dislike(e){
        e.preventDefault()
        let likes = usersData[i].likes
        deleteLike(likes)
        
    }
    
    
    // displays the current number of likes on the posts
    if(usersData[i].likes.length > 0){
       let like = usersData[i].likes.length
        likeCounter.textContent = ` ${like}`
     }

    let dislikeButton = document.createElement('button')
    dislikeButton.classList.add('btn','dislikeBtn')
    dislikeButton.innerHTML= `&#9829; dislike`

    let likeButton = document.createElement('button')
    likeButton.classList.add('btn','likeBtn')
    likeButton.innerHTML = `&#9825; like`
    creatingDiv(userPosts,usernameDiv,usersData[i],'username',mainContainerDiv,divContainer)
    creatingDiv(userPosts,contentDiv,usersData[i],'text',mainContainerDiv,divContainer)
    creatingDiv(userPosts,datePostedDiv,usersData[i],'createdAt',mainContainerDiv,divContainer,likeButton,likeCounter,dislikeButton,dislikeForm,likeForm)
    // console.log(userId)
    }
   
}
// creatingDiv function displays all content, author, and timestamp of user
let creatingDiv = (userPosts,div,userData,object,mainContainerDiv,divContainer,likeButton,likeCounter,dislikeButton,dislikeForm,likeForm)=>{
    if(object ==='createdAt'){
        let timeConverted = userData[object]
        div.innerHTML= `<div class='extra'>${new Date(timeConverted).toLocaleString()}`
        divContainer.appendChild(div)
        likeButton.appendChild(likeCounter)
        likeForm.appendChild(likeButton)
        dislikeForm.appendChild(dislikeButton)
        divContainer.appendChild(likeForm)
        divContainer.appendChild(dislikeForm)

        mainContainerDiv.appendChild(divContainer)
        userPosts.appendChild(mainContainerDiv)
    }else{
        div.innerHTML = `${userData[object]}`
        divContainer.appendChild(div)
        mainContainerDiv.appendChild(divContainer)
        userPosts.appendChild(mainContainerDiv)
    }
   
}
// addingLike function creates a like
let addingLike = async (value)=>{
    let loginData = getLoginData();
    let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            postId: value
        })
        
    })
    let data = await response.json()
    // make a counter for the like button here using this data
    // if something is true then add count 
    console.log(data,'LIKE ADDED')
    location.reload()

    }

// deleteLike function removes a like
    let deleteLike = async (likedata)=>{
        let loginData = getLoginData();
        
        for(let i =0; i<likedata.length;i++){
        
        let id = likedata[i]._id
      if(loginData.username){

        let response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/'+ id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${loginData.token}`,
                "Content-Type": "application/json",
            }
          
            
            
        })
        let data = await response.json()
        // make a counter for the like button here using this data
        console.log(data,'LIKE REMOVEDDDD')
        location.reload()
      
        }
      }

    }
    