const redux = require('redux')                 // import redux from redux
const createStore= redux.createStore            // import store from redux
const applyMiddleWare = redux.applyMiddleware  // import applyMiddleware from redux
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios');
const initialState ={
    loading : false,
    users:[],
    error:'',
}

const USER_REQUEST='USER_REQUEST';
const USER_SUCCESS='USER_SUCCESS';
const USER_ERROR= 'USER_ERROR';

const userRequest=()=>{
    return {
        type:USER_REQUEST
    }
}

const userSuccess=(users)=>{
    return {
        type:USER_SUCCESS,
        payload:users
    }
}
const userError=(error)=>{
    return {
        type:USER_ERROR,
        payload:error
    }
}
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case 'USER_REQUEST':return{
            ...state,
            loading:true,
        }
        case 'USER_SUCCESS':return{         
            loading:false,
            users:action.payload,
            error:''
        }
        case 'USER_ERROR':return{         
            loading:false,
            users:[],
            error:action.payload
        }
    }
}
const store=createStore(reducer,applyMiddleWare(thunkMiddleWare)); 
store.subscribe(()=>{console.log(store.getState())});

const fetchUser=()=>{
    return function(dispatch){
        dispatch(userRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')        
        .then((response) =>{ 
            const users=response.data.map(user=>user.name)
            dispatch(userSuccess(users))

        })
        .catch((error)=>{
            dispatch(userError(error.message))

        })
    }
}
store.dispatch(fetchUser())