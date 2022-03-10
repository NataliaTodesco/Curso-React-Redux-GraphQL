// import axios from "axios";
//import { addFavorites, getFavorites } from "../firebaseconfig";
//import ApolloClient, {gql} from "apollo-boost"

// constantes
let initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
};
//let URL = "https://rickandmortyapi.com/api/character";

// let client = new ApolloClient({
//     uri: "https://rickandmortyapi.com/graphql"
// })

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

let GET_FAVS = "GET_FAVS";
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
let GET_FAVS_ERROR = "GET_FAVS_ERROR";

// reduce
export const reduceCharacter = (state = initialData, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };

    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_CHARACTERS_ERROR:
      return { ...state, error: action.payload, fetching: false };

    case GET_FAVS:
      return { ...state, fetching: true };
    case GET_FAVS_SUCCESS:
      return { ...state, favorites: action.payload, fetching: false };
    case GET_FAVS_ERROR:
      return { ...state, error: action.payload, fetching: false };
    default:
      return state;
  }
};

// actions (thunks)
//export function retrieveFavs(uid) {
  //async(dispatch, getState) => {
  // return {
  //   type: GET_FAVS,
  //   payload: uid
  // };
  // let {uid} = getState().user;

  // await getFavorites(uid)
  //   .then((array) => {
  //     dispatch({
  //       type: GET_FAVS_SUCCESS,
  //       payload: [...array],
  //     });
  //   })
  //   .catch((e) => {
  //     dispatch({
  //       type: GET_FAVS_ERROR,
  //       payload: e.message,
  //     });
  //   });
//}

export function removeCharacterAction(chars){// = () => (dispatch, getState) => {
  let array = chars;
  array.shift();
  return{
    type: "REMOVE",
    payload: array
  };
}

export function addToFavoriteAction(array,user){ //= () => (dispatch, getState) => {
  return {
    type: "FAVORITES",
    payload: {array: array, user: user},
  };
};

export const getCharacterAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  // return axios
  //   .get(URL)
  //   .then((res) => {
  //     dispatch({
  //       type: GET_CHARACTERS_SUCCESS,
  //       payload: res.data.results,
  //     });
  //   })
  //   .catch((e) => {
  //     dispatch({
  //       type: GET_CHARACTERS_ERROR,
  //       payload: e.response.message,
  //     });
  //   });
};
