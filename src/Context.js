import React, { useContext, useState } from 'react';
import axios from "axios";

const AppContext = React.createContext();

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleRowAdd = (newData, resolve) => {
        let errorList = [];
        if (newData.name === undefined) {
            errorList.push("Please enter name");
        }
        if (newData.username === undefined) {
            errorList.push("Please enter username");
        }
        if (newData.email === undefined) {
            errorList.push("Please enter a valid email");
        }
        if (newData.phone === undefined) {
            errorList.push("Please enter the phone no.");
        }
        if (newData.website === "") {
            errorList.push("Please enter the website");
        }
        if (errorList.length < 1) {
            api
                .post('users/', newData)
                .then((response) => {
                    let newData = [...users, newData];
                    setUsers(newData);
                    resolve();
                    setErrorMessages([]);
                    setIsError(false);
                })
                .catch((error) => {
                    setErrorMessages(["Cannot add data!"]);
                    setIsError(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIsError(true);
            resolve();
        }
    };
    const handleRowUpdate = (newData, oldData, resolve) => {
        let errorList = [];
        if (newData.name === "") {
            errorList.push("Please enter name");
        }
        if (newData.username === "") {
            errorList.push("Please enter username");
        }
        if (newData.email === "") {
            errorList.push("Please enter a valid email");
        }
        if (newData.phone === "") {
            errorList.push("Please enter the phone no.");
        }
        if (newData.website === "") {
            errorList.push("Please enter the website");
        }
        if (errorList.length < 1) {
            api
                .patch('/users/' + newData.id, newData)
                .then(response => {
                    const dataUpdate = [...users];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setUsers([...dataUpdate]);
                    resolve()
                    setIsError(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed!"])
                    setIsError(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIsError(true)
            resolve()
        }
    }
    const handleRowDelete = (oldData, resolve) => {
        api
            .delete('/users/' + oldData.id)
            .then(response => {
                const dataDelete = [...users];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setUsers([...dataDelete]);
                resolve();
            })
            .catch(error => {
                setErrorMessages(["Delete failed!"])
                setIsError(true)
                resolve()
            })
    }

    return <AppContext.Provider value={{
        api,
        users,
        handleRowAdd,
        handleRowDelete,
        handleRowUpdate,
        errorMessages,
        setErrorMessages,
        setUsers,
        isError,
        setIsError,
        isLoading,
        setIsLoading,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}
