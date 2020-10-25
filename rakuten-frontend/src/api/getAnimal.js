// author Shunsuke Hosomi
const toJson = async (res) => {
    const js = await res.json()
    if (res.ok) {
        return js
    } else {
        throw new Error(js.message)
    }
}


var token = localStorage.getItem("token");

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + (token),
}

const getAnimal = async () => {
    
    const resp = await fetch(`http://localhost:8000/api/user/`, {
        method: "GET",
        credentials: "same-origin",
        headers: (headers),
    })
    //console.log(resp.json())
    return await toJson(resp)
}

const getOtherAnimal = async (body) => {

    const urls = 'http://localhost:8000/api/user/get/' + body + '/'
    console.log(urls)
    const resp = await fetch(urls, {
        method: "GET",
        credentials: "same-origin",
        headers: (headers),
    })
    //console.log(resp.json())
    return await toJson(resp)
}

export default getAnimal
export {getOtherAnimal}
