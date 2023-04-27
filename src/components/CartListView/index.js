import CartItem from '../CartItem'
import {useCartList} from '../../context/CartState'

import './index.css'

const CartListView = () => {
  const cartList = useCartList()

  return (
    <ul className="cart-list-1">
      {cartList.map(eachCartItem => (
        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
      ))}
    </ul>
  )
}

export default CartListView
