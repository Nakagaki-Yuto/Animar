// author Takumi Katayama

import toJson from '../toJson/toJson'

var token = localStorage.getItem('token')

export const CreateLike = async (pid, uid) => {
    const body = { post_id: pid, user_id: uid }
    const resp = await fetch(`http://localhost:8000/api/like/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }, 
        body: JSON.stringify(body)
    })
    return await resp
}

export const DeleteLike = async (pid, uid) => {
    const body = { post_id: pid, user_id: uid }
    const resp = await fetch(`http://localhost:8000/api/like/`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }, 
        body: JSON.stringify(body)
    })
    return await resp
}

