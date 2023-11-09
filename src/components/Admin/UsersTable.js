import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';

import { db } from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore";

const columns = [
  {
    field: 'first_name',
    headerName: 'Full Name',
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    width: 150,
    headerAlign:"left",
    valueGetter: (params) =>
      `${params.row.first_name + " " + params.row.last_name }`,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 200,
    editable: true,
    headerAlign:"left",
  },
  {
    field: 'score',
    headerName: 'Score',
    type: '',
    width: 110,
    editable: true,
    headerAlign:"left",
  },
  {
    field: 'new_score',
    headerName: 'New Score',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
      `${params.row.new_score !== -1 ? params.row.new_score : "טרם בוצע" }`,
  },
  {
    field: 'submission_date',
    headerName: 'When',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    headerAlign:"left",
    valueGetter: (params) =>
      `${params.row.submission_date ? params.row.submission_date + " " + params.row.submission_time : "לא צוין" }`,
  },
  {
    field: 'more_info',
    headerName: 'More Info',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
      `${params.row.more_info ? "כן" : "לא" }`,
  },
];


export default function UsersTable() {

  const [rows, setRows] = useState([]);


  useEffect(() => {
    const getAllUsers = async () => {
    try{
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        usersData.push(doc.data());
    })
    setRows(usersData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    getAllUsers();
      }, []);

  return (
    <Box sx={{ height: 700, width: '100%', background:'white', borderRadius:5, }}>
      <DataGrid
        sx={{
          ".css-wop1k0-MuiDataGrid-footerContainer":{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            direction:'ltr'
          }, ".css-128fb87-MuiDataGrid-toolbarContainer":{
            alignSelf:'center',
            gap:'20px'
          }
        }}
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}