import { createReducer, on } from "@ngrx/store";
import { Department } from "./model";
import { loadDepartment, loadDepartmentSuccess } from "./action";


export interface DepartmentState {  
  departments: Department[];
  loading: boolean;
}

export const initialDepartmentState: DepartmentState = {
  departments: [],
  loading: false,
};


export const departmentReducer = createReducer(
  initialDepartmentState,
  on(loadDepartment, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadDepartmentSuccess, (state, { departments }) => ({
    ...state,
    departments,
    loading: false,
  }))
);
