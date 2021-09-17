import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Component } from 'react';
import { Product } from './components/stateful/Product';
import { getProducts } from './actions/getProducts';

class App extends Component{

  constructor(){
    super();

    this.state = {
      products: [],
      totalCost: 0,
      loading:true,
    }
  }

  //fetches the JSON object (product details) after the component is mounted
  componentDidMount(){
    getProducts().then(res => {
      this.setState({products: res.products, loading: false})
    }).catch(err => {
      console.log(err.response.data);
      console.log(err.response.status);
    })
  }

  //a callback that updates the total price based on the user decision
  handleItem = (price, addItem) =>{
    if(addItem){
      this.setState(prevState => ({totalCost: prevState.totalCost+price}))
    }else{
      this.setState(prevState => ({totalCost: prevState.totalCost-price}))
    }
  }

  render(){
    const { totalCost, loading } = this.state;

    return(
      <div className="App">
        <h3>
          <strong>Hooray! We have your supplements ready.</strong>
        </h3>
        {
          !loading ?     
          <Container>
            <Row>
              {this.state.products.map(p => (
                <Col className="col-md-6 d-flex justify-content-center" key={p.id}>
                  <Product product = {p} handleItem = {this.handleItem}/>
                </Col>
              ))}
            </Row>
          </Container> : 
          <span className="m-5">Loading...</span>
        }
        <h4>
          <strong>Total: {totalCost} USD</strong>
        </h4>
    </div>
    )
  }

}



export default App;
