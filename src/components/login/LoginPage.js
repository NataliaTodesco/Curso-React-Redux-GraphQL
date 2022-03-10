import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction,doGoogleLogoutAction } from '../../redux/userDuck'

function LoginPage({doGoogleLoginAction, doGoogleLogoutAction, fetching, loggedIn}) {
    function doLoginGoogle(){
        doGoogleLoginAction()
    }
    function doLogOutGoogle() {
        doGoogleLogoutAction()
    }
    if (fetching) return <h4>Cargando...</h4>
    return (
        <div className={styles.container}>
            { loggedIn ?
                <h1>
                Cierra tu sesión
                </h1> : 
                <h1>
                Inicia Sesión con Google
                </h1>
            }
            { loggedIn ?
                <button onClick={doLogOutGoogle}>
                Cerrar Sesión
                </button> :  
                <button onClick={doLoginGoogle}>
                    Iniciar
                </button>
            }
        </div>
    )
}

function mapStateToProps({user:{fetching,loggedIn}}){
    return {
        fetching,
        loggedIn
    }
}

export default connect(mapStateToProps,{doGoogleLoginAction, doGoogleLogoutAction})(LoginPage)