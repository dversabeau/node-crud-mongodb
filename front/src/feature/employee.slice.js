import { createSlice } from "@reduxjs/toolkit";

export const employeeDataSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [{
      "name": "Mamad",
      "age": 30,
    }, {

      "name": "Theo",
      "age": 22,
    }, {

      "name": "Dan",
      "age": 31,
    }, {

      "name": "Christian",
      "age": 55,
    }, {

      "name": "Morghan",
      "age": 99,
    }],
  },
  reducers: {
    getEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
})

export const { getEmployees } = employeeDataSlice.actions;
export default employeeDataSlice.reducer;