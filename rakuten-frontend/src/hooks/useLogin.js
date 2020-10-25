// author Takumi Katayama
import React, {useEffect, useState } from 'react'
import loginA from '../api/login'
import { useHistory } from 'react-router-dom'

const initialState = {
    user_id: '', 
    password: ''
}



const useLogin = () => {
    const [login, setLogin] = useState(null)
    const [error, setError] = useState(null)
    const [token, setToken] = useState({})

    const [state, setState] = useState(initialState)
    let history = useHistory()

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value })
    }
    // TODO hooksで実現したい
    const handleSubmit = (body) => {
        loginA(body)
    }

    const loginA = async (body) => {
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
            setToken(resp)
            if (resp.token != undefined) {
                localStorage.setItem('token', resp.token)
                history.push('/main')
            } else {
                alert('認証できませんでした')
            }
        })
        .catch((e) => {
            history.push('/forhidden')
        })
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
        token
    }
}

export default useLogin
