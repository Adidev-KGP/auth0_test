//const axios = require('axios')

import axios, { Axios } from 'axios';

const instance = new Axios({ ...axios.defaults });

let qrscan_url = "https://userd6fdb4112540b5f7.app.vtxhub.com/qrscan/"
var join_url = "https://userd6fdb4112540b5f7.app.vtxhub.com/api/join/"
var username = "Adidev_SL"
var password = "doesntmatter";
var bodyFormData = new FormData();
var csrf_token = ""
async function auth0_action(){
  await axios.get("https://userd6fdb4112540b5f7.app.vtxhub.com/register")
    .then((response) => {
      //console.log(response)
      //console.log(response.headers['set-cookie'][0])
      csrf_token = response.headers['set-cookie'][0]
      
      console.log(csrf_token)
      
      csrf_token = csrf_token.slice(10,74)
      
      console.log(csrf_token)
      
      /*
      bodyFormData.append('csrfmiddlewaretoken', csrf_token);
      bodyFormData.append('username', username);
      bodyFormData.append('password', password);
      */

      //console.log(bodyFormData)
      
      var main_data = {"csrfmiddlewaretoken" : csrf_token,
                      "username" : username,
                      "password" : password}
      
      axios({
          method: 'post',
          url: join_url,
          data: main_data
          })
          .then(response => {
          console.log(response.data)
          if(response.data.status === 'success'){
            console.log(0)
          }

          })
          .catch(error => {
            let error_message = error.response.data.message;
            console.log(error_message);
            if(error_message === "User already registered"){
              console.log(1)
            }
        });
    });
}

//auth0_action()

async function auth0_post(){

  var main_data = {
  "username" : username,
  "password" : password}

  await axios.post(join_url, main_data)
    .then(response => {
    console.log(response.data)
    if(response.data.status === 'success'){
      console.log(0)
    }

    })
    .catch(error => {
      let error_message = error.response.data.message;
      console.log(error_message);
      if(error_message === "User already registered"){
        console.log(1)
      }
  });
};

auth0_post()