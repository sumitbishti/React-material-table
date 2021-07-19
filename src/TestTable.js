import React from "react";
import { useGlobalContext } from "./Context";
import { useFetch } from "./useFetch";
import MaterialTable from "material-table";
import Alert from "@material-ui/lab/Alert";

const TestTable = () => {
  const {
    isLoading,
    isError,
    users,
    errorMessages,
    handleRowAdd,
    handleRowDelete,
    handleRowUpdate,
  } = useGlobalContext();

  //fetching data from the API
  useFetch();

  const columns = [
    { title: "NAME", field: "name" },
    { title: "USERNAME", field: "username" },
    { title: "EMAIL", field: "email" },
    { title: "PHONE", field: "phone" },
    { title: "WEBSITE", field: "website" },
  ];

  if (isLoading) {
    return <h1 align="center">Loading...</h1>;
  }
  return (
    <div >
      <h1 align="center">React Material Table</h1>
      <div>
        {isError &&
          <Alert severity='error'>
            {errorMessages.map((msg, index) => {
              return <div key={index}>
                {msg}
              </div>
            })}
          </Alert>
        }
      </div>
      <MaterialTable
        title="Users Info"
        columns={columns}
        data={users}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              console.log(newData);
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              console.log(oldData);
              handleRowDelete(oldData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
    </div>
  );
};

export default TestTable;
