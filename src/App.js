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

  handler = (price, addCart) =>{
    if(addCart){
      this.setState(prevState => ({totalCost: prevState.totalCost+price}))
    }else{
      this.setState(prevState => ({totalCost: prevState.totalCost-price}))
    }
  }

  render(){
    const { totalCost } = this.state;

    return(
      <div className="App">
      <header className="App-header">
        <Container>
          {this.state.products.map(p => (
            <div key={p.id}>
              <Product product = {p} handler = {this.handler}/>
            </div>
          ))}
          
          <h4>
            <strong>Total: {totalCost} USD</strong>
          </h4>
           
        </Container>
  
      </header>
    </div>
    )
  }

}



export default App;
