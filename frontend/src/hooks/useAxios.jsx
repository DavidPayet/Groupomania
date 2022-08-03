import { useState, useEffect } from 'react'
import axios from 'axios'

export const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [isLoading, setLoading] = useState(true)

  const axiosFetch = async (params) => {
    try {
      const result = await axios.request(params)

      setResponse(result.data)
      // setLoading(true)
      // console.log('useAxios result', result);

    } catch (error) {
      // console.log('useAxios error', error.response.status);
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    axiosFetch(axiosParams)

  }, [axiosParams])

  return { response, error, isLoading, axiosFetch }
}