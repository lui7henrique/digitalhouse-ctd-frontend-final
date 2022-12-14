import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { STATUS_FETCH } from "./constants";
import { getQuote } from "./quoteApi";
import { IQuote } from "./types";

export interface StateQuote {
  data: IQuote | null;
  status: STATUS_FETCH;
}

const initialState: StateQuote = {
  data: null,
  status: STATUS_FETCH.INACTIVE,
};

export const getQuoteAsync = createAsyncThunk(
  "quote/getQuote",
  async (personagem: string) => {
    try {
      const quote = await getQuote(personagem);
      return quote;
    } catch (err) {
      throw err;
    }
  }
);

export const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    limpar: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuoteAsync.pending, (state) => {
        state.status = STATUS_FETCH.LOADING;
      })
      .addCase(getQuoteAsync.fulfilled, (state, action) => {
        state.status = STATUS_FETCH.INACTIVE;
        state.data = action.payload;
      })
      .addCase(getQuoteAsync.rejected, (state) => {
        state.status = STATUS_FETCH.ERROR;
      });
  },
});

export const { limpar } = quoteSlice.actions;

export const getQuoteFromAPI =
  (personagem: string) => (dispatch: AppDispatch) => {
    dispatch(limpar());
    dispatch(getQuoteAsync(personagem));
  };

export const getQuoteFromState = (state: RootState) => state.quote.data;
export const getQuoteStatus = (state: RootState) => state.quote.status;

export default quoteSlice.reducer;
