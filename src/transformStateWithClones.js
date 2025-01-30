'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = Object.assign({}, state);

  for (const action of actions) {
    const newState = Object.assign({}, prevState);

    if (action.type === 'addProperties') {
      prevState = Object.assign({}, newState, action.extraData);
      stateHistory.push(prevState);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (Object.hasOwn(newState, key)) {
          delete newState[key];
        }
      }
      prevState = Object.assign({}, newState);
      stateHistory.push(prevState);
    }

    if (action.type === 'clear') {
      prevState = {};
      stateHistory.push(prevState);
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
