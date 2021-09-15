import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Product } from './components/Product';
import { getAllProducts } from './actions/getProducts';

class App extends Component{

  constructor(){
    super();

    this.state = {
      products: [],
      totalCost: 0
    }

  }

  componentWillMount(){
    getAllProducts().then(res => {
      this.setState({products: res.products})
    })
  }

  handleItem = (price, addItem) =>{
    if(addItem){
      this.setState(prevState => ({totalCost: prevState.totalCost+price}))
    }else{
      this.setState(prevState => ({totalCost: prevState.totalCost-price}))
    }
  }

  render(){
    const { totalCost } = this.state;

    return(
      <div className="App">
            <h3>
              <strong>Hooray! We have your supplements ready.</strong>
            </h3>
            
          <div className = "d-flex justify-content-center">
            <div className = "row ">
              {this.state.products.map(p => (
                <div className="col-md-6 d-flex justify-content-center" key={p.id}>
                  <Product product = {p} handleItem = {this.handleItem}/>
                </div>
              ))}
            </div>
          </div>
          
          <h4>
            <strong>Total: {totalCost} USD</strong>
          </h4>
    </div>
    )
  }

}



export default App;
