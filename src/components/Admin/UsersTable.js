import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, gridPageCountSelector, gridPageSelector,useGridApiContext,useGridSelector, } from '@mui/x-data-grid';
import DialogMsg from './DialogMsg'
import DialogChart from './DialogChart';

import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, orderBy, query  } from "firebase/firestore";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import InsightsIcon from '@mui/icons-material/Insights';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';


const formatDate = (timestamp) => {
   // Check if timestamp is of type Timestamp
   if (!(timestamp && typeof timestamp === 'object' && timestamp.hasOwnProperty('seconds'))) {
    return "לא צוין";
}
// Convert timestamp to milliseconds
const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
// Create a Date object
const dateObject = new Date(milliseconds);
// Format the date as "dd/mm/yy"
const formattedDate = `${(dateObject.getDate() < 10 ? '0' : '') + dateObject.getDate()}/${(dateObject.getMonth() + 1 < 10 ? '0' : '') + (dateObject.getMonth() + 1)}/${dateObject.getFullYear().toString().slice(-2)}`;
return formattedDate;
}

const columns = [
  {
    field: 'first_name',
    headerName: 'Full Name',
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
    field: 'first',
    headerName: 'First Score',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
      params.row.scores.first.score,
  },
  {
    field: 'first_date',
    headerName: 'Date #1',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    headerAlign:"left",
    valueGetter: (params) => formatDate(params.row.scores.first.date),
  },
  { 
    field: 'second',
    headerName: 'Second Score',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
    params.row.scores.second.score !== -1 ? params.row.scores.second.score : "טרם בוצע" ,
  },
  {
    field: 'second_date',
    headerName: 'Date #2',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    headerAlign:"left",
    valueGetter: (params) => formatDate(params.row.scores.second.date),
  },
  { 
    field: 'third',
    headerName: 'Third Score',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
    params.row.scores.third.score !== -1 ? params.row.scores.third.score : "טרם בוצע" ,
  },
  {
    field: 'third_date',
    headerName: 'Date #3',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    headerAlign:"left",
    valueGetter: (params) => formatDate(params.row.scores.third.date),
  },
  {
    field: 'open',
    headerName: 'Open',
    type: '',
    width: 150,
    editable: true,
    headerAlign:"left",
    valueGetter: (params) =>
      params.row.open ? "כן" : "לא" ,
  },
];


export default function UsersTable() {

  const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Box sx={{display:'flex', justifyContent:'center', 
      alignContent:'center', justifyItems:'center', width:'100%'}}>
      <Pagination
      sx={{
        direction:'ltr'
      }}
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
    </Box>
    
  );
}

  const CustomToolbar = () => {
    return (
      <React.Fragment>
        <Box display='flex' justifyContent='space-between' alignItems='center' >
          <GridToolbar/>
          <Box>
                <IconButton aria-label="delete" size="large" color="primary"
                  sx={{justifySelf:'end'}}
                  onClick={() => handleDialogOpen("chart")}
                  >
                  <InsightsIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="delete" size="large" color="primary"
                  sx={{justifySelf:'end'}}
                  onClick={() => handleDialogOpen("repeat")}>
                  <NoteAddOutlinedIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="delete" size="large" color="primary"
                  sx={{justifySelf:'end'}}
                  onClick={() => handleDialogOpen("remove")}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
           
          </Box>
        </Box>
      </React.Fragment>
      
    );
  };

  const [rows, setRows] = useState([]);
  const [selectedRowsIds, setSelectedRowsIds] = React.useState([]);
  const [dialogMsgOpen, setDialogMsgOpen] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");
  const [dialogChartOpen, setDialogChartOpen] = React.useState(false);
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const getAllUsers = async () => {
    try{
        // const querySnapshot = await getDocs(collection(db, "users"));
        const querySnapshot = await getDocs(
          query(collection(db, "users"), orderBy('id'))
      );
        const usersData = [];
        querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
    })
    setRows(usersData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    getAllUsers();
      }, [selectedRowsIds]);

      const handleDialogOpen = async (action) =>{
        if(selectedRowsIds.length === 0){
          setDialogMessage("לא נבחרו משתמשים");
        } else if (action === "remove"){
          setDialogMessage("אתה עומד למחוק את המשתמשים הנבחרים. האם אתה בטוח?");
        } else if (action === "repeat") {
          setDialogMessage("אתה עומד לפתוח את השאלון למשתמשים הנבחרים. האם אתה בטוח?");
        } else if (action === "chart") {
          // console.log(selectedRowsIds);
          if(selectedRowsIds.length > 1){
            setDialogMessage("יש לבחור משתמש אחד בלבד");
          } else {
            getUserData(selectedRowsIds[0]);
            setDialogChartOpen(true);
            return;
          }
        }
        setDialogMsgOpen(true);
      }

      const handleRemoveBtn = async (approval) =>{
        setDialogMsgOpen(false)
        if (approval === 'agree') {
        try {
          await Promise.all(
            selectedRowsIds.map(async (id) => {
              const docRef = doc(db, "users",String(id));
              await deleteDoc(docRef);
            })
          );

          setSelectedRowsIds([]);
        } catch (error) {
          console.error('Error deleting documents:', error);
        }
        }
      }

      const handleAddTryBtn = async (approval) =>{
        setDialogMsgOpen(false);
        if (approval === 'agree') {
        try {
          await Promise.all(
            selectedRowsIds.map(async (id) => {
              const docRef = doc(db, "users",String(id));
              await updateDoc(docRef, {
                open: true
              });
            })
          );

          setSelectedRowsIds([]);
        } catch (error) {
          console.error('Error updating documents:', error);
        }
        }
      }

      const getUserData = async (userId) => {
        try {
          const docRef = doc(db, "users", String(userId));
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log(docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log("No such document exists!");
            // return null;
          }
        } catch (error) {
          console.error("Error getting user document:", error);
          throw error;
        }
      };

      const handleSelectionModelChange = (selectionModel) => {
        if (selectionModel.length > 0) {
          const selectedRowIds = selectionModel;
          setSelectedRowsIds(selectedRowIds);
        } else {
          setSelectedRowsIds([]);
        }
      };

  return (
    <Box sx={{ height: '100vh', width: '100%', background:'white', borderRadius:5, }}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionModelChange}
        slots={{ toolbar: CustomToolbar, pagination: CustomPagination,  }}
      />
      {dialogMsgOpen && 
        <DialogMsg msg={dialogMessage} open={true} handleRemoveBtn={handleRemoveBtn} handleAddTryBtn={handleAddTryBtn}/>
      }
      {dialogChartOpen &&
         <DialogChart open={true} setDialogChartOpen={setDialogChartOpen} userData={userData}/>
      }
    </Box>
  );
}