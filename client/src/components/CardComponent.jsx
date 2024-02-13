import React from 'react'
import { Card, Button } from 'react-bootstrap';
import {useSelector} from "react-redux";

function CardComponent({ product, addToCart }) {
    const { cartData } = useSelector((state) => state.cart);
    const isAddedToCart = cartData.some((item) => item.productId === product._id);

    return (
        <Card  className='card text-center  p-0 overflow-hidden shadow mx-auto mb-4'>
            <div className='card-image'>
                <div className='img'>
                    <Card.Img variant="top" src={product.imageUrl} className='image-fluid' />
                </div>
            </div>

            <Card.Body>
                <Card.Title className='card-title'>{product.name}</Card.Title>
                <Card.Text>$.{product.price}</Card.Text>
                <Button onClick={()=>addToCart(product)} disabled={isAddedToCart}>
        {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
      </Button>
            </Card.Body>
        </Card>
    )
}

export default CardComponent
