"use strict";
window.onload = () => {
  let postForm = document.getElementById("postForm");
  postForm.addEventListener("submit", creatingPost);
  userName()

};
// creatingPost function allows user to make a post 
let creatingPost = async (event) => {
 event.preventDefault()
  let formData = new FormData(event.target);
  let formDataAsObject = Object.fromEntries(formData);
   console.log(formDataAsObject)
  const loginData = getLoginData();

  try {
    let response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json; charset=UTF-8'",
        },
        body: JSON.stringify(formDataAsObject),
      }
    );
    let data = await response.json();
    if(data.statusCode === 400){
      alert('Did not create a post')
    }else{
      console.log(data, 'created post');
    event.target.reset()
    alert('created post')
    }
    
        
  } catch (error) {
    console.log(error);
  }
};
// userName function shows current username of user logged in
function userName(){
  let loginData = getLoginData()
  document.getElementById('usersName').innerHTML = `<br>${loginData.username}</br>`
}
