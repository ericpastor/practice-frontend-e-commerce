import { Box, Button, Divider, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/reducers/cartReducer'
import { CartItem } from '../types/CartItem'
import { transformPrice } from '../utils/transFormPrice'

function CartModal() {
    const cart = useAppSelector(state => state.cart)

    const dispatch = useAppDispatch()

    const getSumPrices = (cart: CartItem[]) => {
        return cart?.reduce((acc, item) => item.price * item.quantity + acc, 0)
    }

    const onIncreaseQuantity = (product: CartItem) => {
        if (product.id) {
            dispatch(increaseQuantity(product.id))
        }
    }
    const onDecreaseQuantity = (product: CartItem) => {
        if (product.id) {
            dispatch(decreaseQuantity(product.id))
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '350px' }}>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: 'GrayText' }}>
                    Items in cart:
                </Typography>
                <Typography sx={{ fontWeight: 'bold', marginLeft: '10px' }}>{cart?.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginRight: '30px', color: 'red' }}>
                <strong style={{ color: 'black' }}>Total:</strong>
                <Typography sx={{ marginLeft: '10px', fontFamily: 'Lobster, cursive' }}>{transformPrice(getSumPrices(cart))}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', padding: '10px', width: '300px' }}>
                {cart && cart.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
                        <p style={{ fontSize: '12px' }}>{item.title} x {item.quantity}</p>
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-center', }}>
                            <img src={`${item.images[0]}`} alt='product' style={{ maxWidth: '80px', maxHeight: '80px' }} />
                            <Button onClick={() => dispatch(removeFromCart(item))} style={{ fontSize: '10px' }}>
                                <RemoveShoppingCartIcon sx={{ color: 'red' }} />
                            </Button>
                        </Box>
                        <Typography sx={{ fontSize: '10px', backgroundColor: '#1c2235', color: '#fff', padding: '5px', borderRadius: '4px', marginTop: '10px' }}>
                            UPDATE QUANTITY:
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <Button onClick={() => onDecreaseQuantity(item)}>
                                <RemoveIcon />
                            </Button>
                            {item.quantity}
                            <Button onClick={() => onIncreaseQuantity(item)}>
                                <AddIcon />
                            </Button>
                        </Box>
                        <Divider sx={{ width: '100%', bgcolor: 'coral' }}></Divider>

                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default CartModal
