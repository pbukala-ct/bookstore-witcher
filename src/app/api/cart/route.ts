
import { NextRequest, NextResponse } from 'next/server';
import { 
  createCart, 
  getCart, 
  addToCart, 
  removeFromCart, 
  updateLineItemQuantity,
  createOrderFromCart,
  setShippingAddress
} from '@/lib/commercetools';

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();
    
    switch (action) {
      case 'createCart':
        const newCart = await createCart();
        return NextResponse.json(newCart);
        
      case 'getCart':
        const cart = await getCart(data.cartId);
        return NextResponse.json(cart);
        
      case 'addToCart':
        const updatedCartWithItem = await addToCart(data.cartId, data.version, data.productId, data.quantity);
        return NextResponse.json(updatedCartWithItem);
        
      case 'removeFromCart':
        const updatedCartAfterRemove = await removeFromCart(data.cartId, data.version, data.lineItemId);
        return NextResponse.json(updatedCartAfterRemove);
        
      case 'updateQuantity':
        const updatedCartWithQuantity = await updateLineItemQuantity(data.cartId, data.version, data.lineItemId, data.quantity);
        return NextResponse.json(updatedCartWithQuantity);
        
      case 'checkout':
        const order = await createOrderFromCart(data.cartId, data.version);
        return NextResponse.json(order);
        
      case 'setShippingAddress':
        const updatedCartWithAddress = await setShippingAddress(data.cartId, data.version, data.address);
        return NextResponse.json(updatedCartWithAddress);
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
     
  } catch (error: any) {
    console.error('Cart API error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred',
        details: error.body || {}
      }, 
      { status: 500 }
    );
  }
}