import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import {
  useRemoveItem,
  useIncrementItem,
  useDecrementItem,
} from '../../context/CartState'
import './index.css'

const CartItem = props => {
  const removeCartItem = useRemoveItem()
  const incrementCartItemQuantity = useIncrementItem()
  const decrementCartItemQuantity = useDecrementItem()
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
  const onClickDecrement = () => {
    decrementCartItemQuantity(id)
  }
  const onClickIncrement = () => {
    incrementCartItemQuantity(id)
  }
  const onRemoveCartItem = () => {
    removeCartItem(id)
  }
  const totalPrice = price * quantity

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickDecrement}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickIncrement}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
