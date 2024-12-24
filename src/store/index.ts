import { configureStore } from "@reduxjs/toolkit";
import slices from "./slices";

const store = configureStore({
	reducer: {
		...slices,
	},
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
