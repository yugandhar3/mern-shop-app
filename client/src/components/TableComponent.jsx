import React from 'react'
import { Button, Table, Image } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa';

function TableComponent({ updateProductQuantity, removeItem }) {
  const { cartData } = useSelector((state) => state.cart);
  return (
    <Table responsive="sm" bordered className='mb-5'>
      <tbody>
        {cartData.map((product, index) =>
          <tr key={index}>
            <td className='text-center'>
              <Image src={product.imageUrl} alt={product.name} className='table-image' rounded />
            </td>
            <td>
              <h6 className='table-title '>{product.name}</h6>
            </td>
            <td>$. {product.price}</td>
            <td>
              <Button onClick={() => updateProductQuantity(product._id, product.quantity - 1)} className='ms-2'>-</Button>
              <span className='ms-2'>{product.quantity}</span>
              <Button onClick={() => updateProductQuantity(product._id, product.quantity + 1)} className='ms-2'>+</Button>
              <Button variant='danger' onClick={() => removeItem(product._id,)} className='ms-2'><FaTrash /></Button>
            </td>
          </tr>
        )}

      </tbody>
    </Table>
  )
}

export default TableComponent
