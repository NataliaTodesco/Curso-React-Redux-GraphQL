// import {loginWithGoogle,signOutGoogle} from "../firebaseconfig";
// import {retrieveFavs} from "./characterDuck"
// Constantes
let initialData = {
  loggedIn: false,
  fetching: false,
};
let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

let LOG_OUT = "LOG_OUT"

// Reducer
export const reduceUser = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOG_OUT:
      return {...initialData}
    case LOGIN_ERROR:
      return { ...state, error:action.payload, fetching: false };
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, fetching: false, loggedIn:true };
    default:
      return state;
  }
};

// aux
export function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage)
}

//Actions
export const restoreSessionAction = () => (dispatch) => {
    let storage = localStorage.getItem('storage')
    storage = JSON.stringify(storage)
    if (storage && storage.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user,
        });
    }
}

export function doGoogleLogoutAction(){ //= () => (dispatch,getState) => {
  return {
    type: LOG_OUT
  }
    //signOutGoogle()
    // dispatch({
    //     type:LOG_OUT
    // })
    //localStorage.removeItem('storage')
}

export function doGoogleLoginAction() {
  return{
    type: LOGIN
  };
  // dispatch({
  //   type: LOGIN
  // });
  // return loginWithGoogle()
  //   .then((user) => {
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: { 
  //           uid:user.uid,
  //           displayName:user.displayName,
  //           email:user.email,
  //           photoURL:user.photoURL
  //        },
  //     });
  //     saveStorage(getState())
  //     retrieveFavs()(dispatch,getState)
  //   })
  //   .catch((e) => {
  //     dispatch({
  //       type: LOGIN_ERROR,
  //       payload: e.message,
  //     });
  //   });
};
