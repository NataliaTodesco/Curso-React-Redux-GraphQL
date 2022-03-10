import { put, takeEvery } from "redux-saga/effects";
import { loginWithGoogle, getFavorites, signOutGoogle, addFavorites } from "../firebaseconfig";
import {saveStorage} from "./userDuck"
import axios from "axios";
// import {retrieveFavs} from "./characterDuck"

function* fetchUser() {
  try {
    const user = yield loginWithGoogle()
    const res = yield put({
      type: "LOGIN_SUCCESS",
      payload: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        user: user
      },
    });
    saveStorage(res.payload);

    yield put({
      type: "GET_FAVS",
      payload: res.payload.uid
    })
    //retrieveFavs();
  } catch (e) {
    yield put({ type: "LOGIN_ERROR", payload: e.message });
  }
}

function* fetchFavs(action) {
  try {
    const uid = action.payload;
    const array = yield getFavorites(uid)
    yield put({type: "GET_FAVS_SUCCESS", payload: [...array]})
  } catch (e) {
    yield put({ type: "GET_FAVS_ERROR", payload: e.message });
  }
}

function* logOut() {
  try {
    yield signOutGoogle()
    localStorage.removeItem('storage');
  } catch (e) {
    console.log(e.message)
  }
}

function* remove(action) {
  try {
    yield put({type: "REMOVE_CHARACTER", payload: [...action.payload]})
  } catch (e) {
    console.log(e.message)
  }
}

function* addFavs(action) {
  let { array, favorites } = action.payload.array;
  let { uid } = action.payload.user

  let char = array.shift();
  favorites.push(char);
  yield addFavorites(favorites, uid);
  yield put({
    type: "ADD_TO_FAVORITES",
    payload: { array: [...array], favorites: [...favorites] },
  });
}

export function* fetchData(action) {
  try {
    const {data} = yield axios.get("https://rickandmortyapi.com/api/character");
    yield put({
        type: "GET_CHARACTERS_SUCCESS",
        payload: data.results,
      });
  } catch (e) {
    yield put({
      type: "GET_CHARACTERS_ERROR",
      payload: e.response.message,
    })
  }
}

function* mySaga() {
  yield takeEvery("GET_CHARACTERS", fetchData) 
  yield takeEvery("LOGIN", fetchUser)
  yield takeEvery("LOG_OUT", logOut)
  yield takeEvery("GET_FAVS", fetchFavs)
  yield takeEvery("FAVORITES", addFavs) 
  yield takeEvery("REMOVE", remove)
}

export default mySaga;

//import { call, put } from 'redux-saga/effects'
//import Api from './path/to/api'

// function* fetchUser(action) {
//   try {
//      const user = yield call(Api.fetchUser, action.payload.userId);
//      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//   } catch (e) {
//      yield put({type: "USER_FETCH_FAILED", message: e.message});
//   }
// }
