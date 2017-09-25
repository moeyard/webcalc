import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from  'react-redux';
//import thunk from  'redux-thunk';
import {createStore,bindActionCreators, applyMiddleware} from 'redux';

import "./style/index.scss";


class MyKey extends React.Component {
  render(){
    return (
      <div className ='key' > 
      <button onClick={this.props.clickKey.bind(this,this.props.value)}> {this.props.value}</button>
      </div>
    );

  }

}

class MyMon extends React.Component{
  render (){
    return (
      <div className='mon' >
      {this.props.value}
      </div>
    )
  };
}

class MyApp extends React.Component {
  render(){
    let state = this.props.state;
    let actions = this.props.actions;
    return  (
      <div>
      <MyMon value = {state.value} />
      <MyKey value = {7} clickKey={actions.clickKey}/>
      <MyKey value = {8} clickKey={actions.clickKey}/>
      <MyKey value = {9} clickKey={actions.clickKey}/>
      <br/>
      <MyKey value = {4} clickKey={actions.clickKey}/>
      <MyKey value = {5} clickKey={actions.clickKey}/>
      <MyKey value = {6} clickKey={actions.clickKey}/>
      <br/>
      <MyKey value = {1} clickKey={actions.clickKey}/>
      <MyKey value = {2} clickKey={actions.clickKey}/>
      <MyKey value = {3} clickKey={actions.clickKey}/>
      <br/>
      <MyKey value = {0} clickKey={actions.clickKey}/>
      <MyKey value = {'+'} clickKey={actions.clickKey}/>
      <MyKey value = {'='} clickKey={actions.clickKey}/>
      <br/>
      </div>
    );
  } 
}

const InitState = {
  pre  : 0 , 
  value: 0 ,
  op : '=',
  isRes : true
}


const isNum = (key) => (
  (!!key && key != '+' && key != '=' )
);

const Reducer = (state=InitState, action) => {
  //let NewState = state;
  let NewState = {
    value : state.value,
    pre   : state.pre,
    op    : state.op,
    isRes : state.isRes
  }

  switch(action.type){
    case 'clickKey':
      if(!!parseInt(action.payload)){
        let key = parseInt(action.payload);
        //alert(action.payload);
        NewState.value = state.isRes? key : (state.value * 10 + key);
        NewState.isRes = false;
      }else if(action.payload === '+'){
        NewState.pre = state.op === '+' ? (state.value + state.pre) : state.value;
        NewState.value = 0;
        NewState.op  = '+';
        NewState.isRes = true;
      }else if(action.payload === '='){
        NewState.pre = state.op === '+' ? (state.value + state.pre) : state.value;
        NewState.value = NewState.pre;
        NewState.op  = '=';
        NewState.isRes = true;
      }
      return NewState;
    default:
      return NewState;
  }
};

//const store = createStore(Reducer, applyMiddleware(thunk));
const store = createStore(Reducer);

const MapState = state =>({
  state: state
});

let actions = {
  toggle: ()=>({
      type: 'toggle'
  }),
  clickKey:(key)=> ({
    type: 'clickKey',
    payload: key
  })
}

const MapDispatch = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


let MyAppConnected = connect(MapState,MapDispatch)(MyApp);

ReactDOM.render(
  <div>
  <Provider store={store}>
  <MyAppConnected />
  </Provider>
  </div>,
  document.getElementById('app')
);


//document.addEventListener('keypress', (e)=>{
//    //alert(e.key);
//    store.dispatch(actions.clickKey(e.key));
//    return;
//},false);



