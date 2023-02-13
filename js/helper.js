const BASE_URL = 'https://resume.redberryinternship.ge/api/'



 function  getDataForDegree  (cb)  {
   return fetch(`${BASE_URL}degrees`)
    .then(res => res.json())
    .then(data => {
        cb?.(data)
    })
}


function sendDataRequest(data) { 
  return  fetch(`${BASE_URL}cvs`, {
      method:'POST',
      headers: {
          accept: 'application/json',
          "Content-Type":"multipart/form-data"
        },
        body: JSON.stringify(data),
    })
}
        //  'Content-Type: multipart/form-data' 
