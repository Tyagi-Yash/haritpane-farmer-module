// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "../../../config/config";

// export const getAllServiceCowDunk = createAsyncThunk(
//   "cowDunkService/getAllServiceCowDunk",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/getAllServiceCowDunk", { params: filters });

//       if (response.status === 200) {
//         return {
//           status: response.status,
//           data: response.data,
//         };
//       } else {
//         return rejectWithValue({
//           status: response.status,
//           data: response.data,
//         });
//       }
//     } catch (err) {
//       return rejectWithValue({
//         status: err.response?.status || 500,
//         data: err.response?.data || { message: "Network or server error" },
//       });
//     }
//   }
// );

// const initialState = {
//   loader: false,
// };

// const CowDunkServiceMgmtSlice = createSlice({
//   name: "cowDunkService",
//   initialState,
//   extraReducers: (builder) => {
//     builder

//       // getAllServiceCowDunk
//       .addCase(getAllServiceCowDunk.pending, (state) => {
//         state.loader = true;
//       })
//       .addCase(getAllServiceCowDunk.fulfilled, (state) => {
//         state.loader = false;
//       })
//       .addCase(getAllServiceCowDunk.rejected, (state) => {
//         state.loader = false;
//       });
//   },
// });

// export default CowDunkServiceMgmtSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServiceCowDunk = createAsyncThunk(
  "cowDunkService/getAllServiceCowDunk",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServiceCowDunk", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const CowDunkServiceMgmtSlice = createSlice({
  name: "cowDunkService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCowDunkServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceCowDunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServiceCowDunk.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServiceCowDunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCowDunkServices } = CowDunkServiceMgmtSlice.actions;
export default CowDunkServiceMgmtSlice.reducer;
