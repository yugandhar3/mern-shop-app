import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {updateCartDetails} from "../../Redux/reduxThunk/cart";
import {getCartDetails} from "../../Redux/reduxThunk/cart";
import { Row, Container } from 'react-bootstrap';
import CardComponent from "../../components/CardComponent";
import * as api from "../../Redux/api";


const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const dispatch =useDispatch()
  const userId=localStorage.getItem('userId')?.replace(/"/g, '')
  
  useEffect(() => {
    const fetchProducts = async () => {
      await api.getProduct().then((response) => {
        setProducts(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
    const fetchUser = async () => {
      await api.getUser().then((response) => {
        localStorage.setItem('userId',JSON.stringify(response.data[0]._id));
      }).catch((error) => {
        console.error(error);
      });
    }
   
    if(!userId){
      fetchUser()
    }
    dispatch(getCartDetails(userId));
    fetchProducts()
  }, []);
 
  const addToCart = (product) => {
    dispatch(updateCartDetails({...product, isAddedToCart: true,quantity: 1,userId:userId}))
  }
  return (
   <>
    <Container>
      <h2 className='text-center p-4'>Product Catalog</h2>
      <Row>
        {products.map((product,index) => (
          <CardComponent key={index} product={product} addToCart={addToCart} />
        ))}
      </Row>
    </Container>
   </>
  );
};

export default ProductCatalog;
