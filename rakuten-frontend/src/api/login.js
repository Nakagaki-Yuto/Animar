// author Shunsuke Hosomi

import toJson from '../toJson/toJson'

const loginForSignup = async (body) => {
    fetch(`http://localhost:8000/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    .then((resp) => {
        return resp.json()
    })
    .then((resp) => {
        if (resp.token != undefined) {
            localStorage.setItem('token', resp.token)
            console.log(resp.token)
        } else {
            alert('認証できませんでした')
        }
    })
    .catch((e) => {
        return e
    })
}

export default loginForSignup
