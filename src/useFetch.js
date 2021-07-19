import { useGlobalContext } from './Context';
import { useEffect } from 'react';

export const useFetch = () => {
  const { setIsError,
    setUsers,
    setIsLoading,
    setErrorMessages,
    api } = useGlobalContext();

  useEffect(() => {
    api
      .get('/users')
      .then(res => res.data)
      .then(data => {
        setIsLoading(false);
        setUsers(data);
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessages(['Cannot load user data'])
        console.log(error);
      })
  }, [api])
}