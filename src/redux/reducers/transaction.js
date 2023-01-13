import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
  cinemaId: null,
  bookingDate: null,
  bookingTime: null,
  seatNum: null,
  fullName: null,
  email: null,
  phoneNumber: null,
  paymentMethodId: null,
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
    choosePayment: (state, action) => {
      const { paymentMethodId, fullName, email, phoneNumber } = action.payload;
      state = {
        ...state,
        ...{ paymentMethodId, fullName, email, phoneNumber },
      };
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const { chooseMovie, choosePayment, chooseSeat } =
  transactionSlice.actions;

export default transactionSlice.reducer;
