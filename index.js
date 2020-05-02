
const redux = require('redux')                 // import redux from redux
const ReduxStore= redux.createStore            // import store from redux
const combineReducer = redux.combineReducers   // import combineReducers from redux
const applyMiddleWare = redux.applyMiddleware  // import applyMiddleware from redux

const initialStateBooks = {                    // State  
    numberOfBooks:10,
  
};
const initialStatePens = {                   // State     
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
    return {                               // created action
        type:'Buy_Pen',
        info:'my Second redux programe'
    }
}
// reducer take two argument such as =-=>>>> reducer(previous_State,action)
const bookReducer=(state=initialStateBooks,action) => {  //first reducer
    switch(action.type){
        case'Buy_book' : return{
            ...state,                                     // clone the state
            numberOfBooks:state.numberOfBooks-1,
        }      
        default :return state;
    }
}
const pensReducer=(state=initialStatePens,action) => {   //Second reducer
    switch(action.type){
        case'Buy_Pen' : return{
            ...state,                                     // clone the state
            numberOfPens:state.numberOfPens-2,
        }    
        default :return state;
    }
}
// NOW CALL REDUX_STORE BY CALL THE REDUCER
const reducer= combineReducer({ // combine first and Second reducers in one reducer function
    Books:bookReducer,          
    Pen:pensReducer,
})  
const logger = store=>{    // apply middleWare here
    return next =>{
        return action =>{
            const result=next(action);
            console.log("MidleWare Logger=-=->>",result)
            return result;
        }
    }
} 
const store = ReduxStore(reducer,applyMiddleWare(logger))  // pass the main reducer as argument and applyMiddleWare

console.log("INITIAL STATE -=-=>>",store.getState());   // allow access the state via getState()
const unsubscribe=store.subscribe(()=>{console.log('UPDATED STATE-=-=>>>',store.getState())})    // register listner via subscribe(listener)
store.dispatch(buyBook()); //allow state to be update via dispatch(action)
store.dispatch(buyBook()); 
store.dispatch(buyBook());
store.dispatch(buyPen()); 
store.dispatch(buyPen()); 
store.dispatch(buyPen()); 
unsubscribe();