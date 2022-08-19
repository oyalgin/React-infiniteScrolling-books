import { combineReducers } from "redux";
import { musicAlbumReducer } from "./musicAlbumReducer";

const reducers = combineReducers({
  allAlbums: musicAlbumReducer
});

export default reducers;
