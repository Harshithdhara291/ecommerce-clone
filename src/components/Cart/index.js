/* eslint-disable func-names */
/* eslint-disable no-restricted-properties */
/* eslint-disable jsx-a11y/img-redundant-alt */
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import {useCartList, useRemoveAllItems} from '../../context/CartState'
import './index.css'

const Cart = () => {
  const history = useHistory()
  const [doesOrderPlaced, setOrderPlaced] = useState(false)
  const cartList = useCartList()
  const removeAllCartItems = useRemoveAllItems()
  let total = 0
  cartList.forEach(eachCartItem => {
    total += eachCartItem.price * eachCartItem.quantity
  })
  const showEmptyView = cartList.length === 0

  const handleView = () => {
    setOrderPlaced(current => !current)
  }

  const onClickRemoveAllBtn = () => {
    removeAllCartItems()
  }

  const orderPlacedView = () => {
    const orderId = Math.floor(
      Math.pow(10, 5) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1),
    )
    const days = Math.floor(
      Math.pow(10, 0) + Math.random() * (Math.pow(10, 1) - Math.pow(10, 0) - 1),
    )
    return (
      <div className="order-placed-card">
        <img
          src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1682683862/Green-Check-Mark-Transparent-Background_bvsdpj.png"
          alt="tick-image"
          className="tick-image"
        />
        <h1 className="heading-one">
          {' '}
          Congratulations!! Your order has been placed
        </h1>
        <h1 className="order-id-text">YOUR ORDER ID : {orderId}</h1>
        <p className="est-para">
          Estimated delivery in <span className="days">{days} days</span>
        </p>
        <button
          type="button"
          className="shop-button"
          onClick={() => history.push('/products')}
          // onClick={() => removeAllCartItems()}
        >
          back to shopping
        </button>
      </div>
    )
  }

  const cartView = () => (
    <>
      <div className="cart-content-container">
        <h1 className="cart-heading">My Cart</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={onClickRemoveAllBtn}
        >
          Remove All
        </button>
        <CartListView />
        <div className="cart-summary-container">
          <h1 className="order-total-value">
            <span className="order-total-label">Order Total:</span> Rs {total}
            /-
          </h1>
          <p className="total-items">{cartList.length} Items in cart</p>
          <button
            onClick={() => setTimeout(handleView, 2000)}
            type="button"
            className="checkout-button d-sm-none"
          >
            Place Order
          </button>
        </div>
        <button
          onClick={() => setTimeout(handleView, 2000)}
          type="button"
          className="checkout-button d-lg-none"
        >
          Place Order
        </button>
      </div>
    </>
  )

  return (
    <>
      <Header />
      {doesOrderPlaced ? (
        <div className="cart-container">{orderPlacedView()}</div>
      ) : (
        <div className="cart-container">
          {showEmptyView ? <EmptyCartView /> : cartView()}
        </div>
      )}
    </>
  )
}

export default Cart
