/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
import {useState, createContext, useContext} from 'react'

const CartList = createContext()
const AddItemContext = createContext()
const RemoveItemContext = createContext()
const RemoveAllItemsContext = createContext()
const IncrementItemContext = createContext()
const DecrementItemContext = createContext()

export function useCartList() {
  return useContext(CartList)
}

export function useAddItem() {
  return useContext(AddItemContext)
}

export function useRemoveItem() {
  return useContext(RemoveItemContext)
}

export function useRemoveAllItems() {
  return useContext(RemoveAllItemsContext)
}

export function useIncrementItem() {
  return useContext(IncrementItemContext)
}

export function useDecrementItem() {
  return useContext(DecrementItemContext)
}

const CartState = ({children}) => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevState =>
      prevState.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    )
  }

  const removeCartItem = id => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    setCartList(updatedCartList)
  }

  const decrementCartItemQuantity = id => {
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      setCartList(prevState =>
        prevState.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      )
    } else {
      removeCartItem(id)
    }
  }

  const addCartItem = product => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )

    if (productObject) {
      setCartList(prevState =>
        prevState.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      )
    } else {
      const updatedCartList = [...cartList, product]

      setCartList(updatedCartList)
    }
  }

  return (
    <CartList.Provider value={cartList}>
      <AddItemContext.Provider value={addCartItem}>
        <RemoveItemContext.Provider value={removeCartItem}>
          <RemoveAllItemsContext.Provider value={removeAllCartItems}>
            <IncrementItemContext.Provider value={incrementCartItemQuantity}>
              <DecrementItemContext.Provider value={decrementCartItemQuantity}>
                {children}
              </DecrementItemContext.Provider>
            </IncrementItemContext.Provider>
          </RemoveAllItemsContext.Provider>
        </RemoveItemContext.Provider>
      </AddItemContext.Provider>
    </CartList.Provider>
  )
}
//
export default CartState
