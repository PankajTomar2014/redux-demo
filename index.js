
const redux = require('redux')              // import redux
const ReduxStore= redux.createStore         // create  store

const initialState = {                      // State  
    numberOfBooks:10,
    numberOfPens:15,   
};

// const action = {                            // created action
//     type:'Buy_book',
//     info:'my first redux programe'
// };
function buyBook(){                         // call action via buyBook function
    return {                            // created action
        type:'Buy_book',
        info:'my Second redux programe'
    }
}
function buyPen(){                         // call action via buyBook function
    return {                            // created action
        type:'Buy_Pen',
        info:'my Second redux programe'
    }
}

// reducer take two argument such as =-=>>>> reducer(previous_State,action)
const reducer=( state=initialState,action ) => {
    switch(action.type){
        case'Buy_book' : return{
            ...state,                                     // clone the state
            numberOfBooks:state.numberOfBooks-1,
        }
        case'Buy_Pen' : return{
            ...state,                                     // clone the state
            numberOfPens:state.numberOfPens-1,
        }
        default :return state;
    }
}
// NOW CALL REDUX_STORE BY CALL THE REDUCER

const store = ReduxStore(reducer)
console.log("INITIAL STATE -=>",store.getState());   // allow access the state via getState()
const unsubscribe= store.subscribe(()=>{ console.log('UPDATED STATE-=-=>>>',store.getState())  })    // register listner via subscribe(listener)
store.dispatch(buyBook()); //allow state to be update via dispatch(action)
store.dispatch(buyBook()); 
store.dispatch(buyBook());
store.dispatch(buyPen()); 
store.dispatch(buyPen()); 
store.dispatch(buyPen()); 
unsubscribe();