const url = 'https://midwifery.herokuapp.com/'

export const getBabies = () =>{
  return fetch(url).then(r => r.json())
}

export const caughtBaby = () =>{
  return fetch(url, {
    method: 'POST'
  }).then(r => r.json())
}

export const lostBaby = () =>{
  return fetch(url, {
    method: 'DELETE'
  }).then(r => r.json())
}

export const getEmojis = () =>{
  return fetch(url+'emoji', {
    method: 'GET'
  }).then(r => r.json())
}
