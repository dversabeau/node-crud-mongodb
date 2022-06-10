import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../feature/employee.slice";

export default configureStore({
  reducer: {
    employees: employeesReducer,
  },
});