﻿//HF Namespace
window.HF = window.HF || {};

//The engine object handles the main game loop, which updates the game state and causes new scenes to be rendered.
//The constructor takes in the current game state, and the list of players
//NOTE: This is a MUTABLE object! The current game state changes on each run of the loop! It should not be referenced from this object EVER
HF.engine = function(gameState, players) {
    return {
        currentState: gameState,
        players: players,
        //run is the main game loop
        run: function() {
            //Step 1:
            //Apply the queued inputs of all players to the current state.
            //This will create a list of update objects

            //list allUpdates
            //for each player in players
            //  update = gameState.applyPlayerActions(player.queuedActions)
            //  add update to allUpdates
            //next player

            //Step 2:
            //Iterate the current game state to produce a set of updates based on game rules

            //stateUpdates = gameState.iterate()
            //add stateUpdates to allUpdates

            //Step 3:
            //Create the next game state based on the current game state + all updates

            //nextGameState = gameState.apply(allUpdates)

            //Step 4:
            //render the new state

            //currentGameSate = nextGameState
            //currentGameState.updateScene()
        }

    };
};