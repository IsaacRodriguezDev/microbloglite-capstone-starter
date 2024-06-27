"use strict";
window.onload = () => {
  let postForm = document.getElementById("postForm");
  postForm.addEventListener("submit", creatingPost);
};

let creatingPost = async (event) => {
 event.preventDefault()
  let formData = new FormData(event.target);
  let formDataAsObject = Object.fromEntries(formData);
   console.log(formDataAsObject,'ant gay')
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
    console.log(data, 'created post');
    event.target.reset()
        
  } catch (error) {
    console.log(error);
  }
};
