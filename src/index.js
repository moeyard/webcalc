import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from  'react-redux';
import thunk from  'redux-thunk';
import {createStore,bindActionCreators, applyMiddleware} from 'redux';
import "./style/index.scss";

import { HashRouter as Router, Route , withRouter} from 'react-router-dom'

import {Input,Button,Layout,Row,Col} from 'antd';
import 'antd/dist/antd.css';
const {Header,Footer,Sider,Content} = Layout;



class MyKey extends React.Component {
  render(){
    return (
      <Button size='large' onClick={this.props.clickKey.bind(this,this.props.value)}> {this.props.value}</Button>
    );

  }

}

class MyMon extends React.Component{
  render (){
    return (
      <Input value = {this.props.value}/>
    )
  };
}

class MyApp extends React.Component {
  render(){
    let state = this.props.state;
    let actions = this.props.actions;
    return  (
      <div>
      <Row>
      <Col span={9}></Col>
      <Col span={6}>
      <Row> <MyMon value = {state.value} /></Row>
      <Row>
      <Col span={8} ><MyKey value = {7} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {8} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {9} clickKey={actions.fetch}/></Col>
      </Row>
      <Row> 
      <Col span={8} ><MyKey value = {4} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {5} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {6} clickKey={actions.fetch}/></Col>
      </Row> 
      
      <Row> 
      <Col span={8} ><MyKey value = {1} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {2} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {3} clickKey={actions.fetch}/></Col>
      </Row> 
      
      <Row> 
      <Col span={8} ><MyKey value = {0} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {'+'} clickKey={actions.fetch}/></Col>
      <Col span={8} ><MyKey value = {'='} clickKey={actions.fetch}/></Col>
      </Row> 

      </Col>
      <Col span={9}></Col>
      </Row>
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

const store = createStore(Reducer, applyMiddleware(thunk));
//const store = createStore(Reducer);

const MapState = state =>({
  state: state
});

let actions = {
  fetch: (key) => ((dispatch,getState)=>{
    fetch("/key", {
        method : 'POST',
        body   : JSON.stringify({value:key}),
        headers : new Headers({
          'Content-Type' : 'application/json'
        })
      } ).then(
      res => { return res.json(); }
    ).then(
      res => { dispatch(actions.clickKey(res.value));}
    );
  }),
  clickKey:(key)=> ({
    type: 'clickKey',
    payload: key
  })
}

const MapDispatch = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


//let MyAppConnected = connect(MapState,MapDispatch)(MyApp);
let MyAppConnected = withRouter(connect(MapState,MapDispatch)(MyApp));

ReactDOM.render(
  <div>
  <Provider store={store}>
  <Router>
  <div>
  <Route exact path="/" component={MyAppConnected}/>
  </div>
  </Router>
  </Provider>
  </div>,
  document.getElementById('app')
);


document.addEventListener('keypress', (e)=>{
    //alert(e.key);
    store.dispatch(actions.fetch(e.key));
    return;
},false);



