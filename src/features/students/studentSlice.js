import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'
import axios from 'axios';

export const API_URL = "https://school-management-backend-7ztg.onrender.com";

export const fetchStudents= createAsyncThunk('students/fetchStudents', async()=>{
  const response = await axios.get ( `${API_URL}/api/v1/students`);
  return response?.data?.student
})

export const addStudentData = createAsyncThunk('students/addStudentData', async(studentData)=>{
  console.log({studentData})
  const response = await axios.post(`${API_URL}/api/v1/students`,
  studentData
  )
  toast.success(response?.data?.message ?? "Success")
  return response.data.student
})

export const deleteStudentData = createAsyncThunk('students/deleteStudentData', async(studentId)=>{
   const response= await axios.delete(`${API_URL}/api/v1/students/${studentId}`);
   toast.success(response?.data?.message ?? "Success")
   return response.data.student;
})
export const updateStudent = createAsyncThunk('students/updateStudent',async( payload)=>{
  const { id, formData } = payload;
  const response = await axios.post(`${API_URL}/api/v1/students/${id}`,
  formData
  )
  toast.success(response?.data?.message ?? "Success")
  return response.data.student
})
export const studentSlice = createSlice({
  name:'students',
  initialState:{
    students:[],
    error:null,
    status:'idle'
  },
  reducers:{
     
  },

  extraReducers:{
    [fetchStudents.fulfilled]:(state, action)=>{
      state.students = action.payload;
      state.status = "success"
    },
    [fetchStudents.rejected]:(state, action)=>{
      state.error = action.payload;
    },
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [addStudentData.fulfilled]:(state, action)=>{
      state.students = [action.payload, ...state.students];
      state.status = "success"
    },
    [addStudentData.rejected]:(state, action)=>{
      state.error = action.payload;
    },
    [addStudentData.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudentData.fulfilled]:(state, action)=>{
      state.students = action.payload;
      state.status = "success"
    },
    [deleteStudentData.rejected]:(state, action)=>{
      state.error = action.payload;
    },
    [deleteStudentData.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudent.fulfilled]:(state, action)=>{
      state.students = action.payload;
      state.status = "success"
    },
    [updateStudent.rejected]:(state, action)=>{
      state.error = action.payload;
    },
    [updateStudent.pending]: (state) => {
      state.status = "loading";
    }
  }
})
// export const { dd } = postSlice.actions;
export default studentSlice.reducer;