// auther Takumi Katayama

import { useEffect, useState } from 'react'
import getAnimal from '../api/getAnimal'
import { useHistory } from 'react-router-dom'

const useGetUser = () => {
    const [user, setUser] = useState([])
    let history = useHistory()
    useEffect(async () => {
        getAnimal()
        .then(u => {
            setUser(u)
        })
        .catch(e => {
            history.push('/forhidden')
        })
    }, [])

    return user
}

export default useGetUser
