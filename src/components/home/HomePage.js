import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction,addToFavoriteAction } from '../../redux/characterDuck'

function Home({chars,removeCharacterAction,addToFavoriteAction,character,user}) {

    function renderCharacter() {
        let char = chars[0];
        return (
            <Card leftClick={nextCharacter} rightClick={addToFavorite} {...char} />
        )
    }

    function nextCharacter() {
        let characters = chars;
        removeCharacterAction(characters)
    }

    function addToFavorite() {
        addToFavoriteAction(character,user)
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        chars: state.character.array,
        character: state.character,
        user: state.user
    }
}

export default connect(mapStateToProps, {removeCharacterAction,addToFavoriteAction})(Home)