// author Kaito Imai

const toJson = async (res) => {
    const js = await res.json()
    if (res.ok) {
        return js
    } else {
        throw new Error(js.message)
    }
}
// TODO typeとimgの送り方を考える
const postHuman = async (body) => { 
    const resp = await fetch(`http://localhost:8000/api/register/human/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    
    return toJson(resp)
}
const postAnimal = async (body) => { 
    const resp = await fetch(`http://localhost:8000/api/register/animal/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    
    return toJson(resp)
}
const postPost = async (body) => { 
    body.user_id = 1
    const resp = await fetch(`http://localhost:8000/api/post/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    
    return toJson(resp)
}

export default postHuman
export {postAnimal,postPost} 
