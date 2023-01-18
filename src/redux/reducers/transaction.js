import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
  cinemaId: null,
  bookingDate: null,
  bookingTime: null,
  seatNum: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    chooseMovie: (state, action) => {
      const { movieId, cinemaId, bookingDate, bookingTime } = action.payload;
      state = {
        ...state,
        ...{ movieId, cinemaId, bookingDate, bookingTime },
      };
      return state;
    },
    chooseSeat: (state, action) => {
      const { seatNum } = action.payload;
      state = {
        ...state,
        ...{ seatNum },
      };
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const { chooseMovie, choosePayment, chooseSeat } =
  transactionSlice.actions;

export default transactionSlice.reducer;
