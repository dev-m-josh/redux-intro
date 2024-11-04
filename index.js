const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

//action creator
function orderCake() {
    //action is an object with a type property
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

//action 2
function restockCake(qty = 1) {
    return {    
    type: CAKE_RESTOCKED,
    payload: qty
  }
}

//REDUCERS
// (previousState, action) => newState
//specify how app's state changes in response to actions sent to the store

//state
const intialState = {
    numOfCakes: 10,
}

const reducer = (state = intialState, action) => {

    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

//holds application state
const store = createStore(reducer) //creat our redux store
console.log(store)

//alow access to state via getState()
console.log('initial state', store.getState());

//register listeners via subscribe(listener)
const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))

//allow state to be updated via dispatch(action)
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(11))

const actions = bindActionCreators({ orderCake, restockCake}, store.dispatch)

//handles unregistering of listeners via the function returned by subscribe(listener)
unsubscribe()