// author Takumi Katayama
// author Kaito Imai
import { useEffect, useState } from 'react'
import toJson from '../toJson/toJson'

var token = localStorage.getItem("token");

const AllPost = async () => {
  const resp = await fetch(`http://localhost:8000/api/getpost/`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          'Authorization': `JWT ${token}`
        }
    })
    return await toJson(resp)
}
// export default GetPosts
export default AllPost

