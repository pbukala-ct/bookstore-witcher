import { apiRoot } from './client';
import { 
  Cart, 
  MyCartUpdateAction,
  ProductProjectionPagedQueryResponse,
  Order,
  Address
} from '@commercetools/platform-sdk';
import { logApiResponse } from './commerce-debug';

// Product Selection and Channel constants
const WITCHER_PRODUCT_SELECTION_ID = 'c596663f-797e-44b5-993a-d0ae6f5108e4';
const SPECIAL_SERIES_CHANNEL_ID = '5e38376e-5e73-4311-b3b8-1196a41be12f';
const SHIPPING_METHOD_ID = '767b2262-41e8-4dfb-84f3-ccb720edfb34';

// Default shipping address
export const DEFAULT_SHIPPING_ADDRESS: Address = {
  firstName: 'Geralt',
  lastName: 'of Rivia',
  streetName: '123 Witcher Way',
  postalCode: '2000',
  city: 'Sydney',
  country: 'AU',
  phone: '+61412345678',
  email: 'geralt@kaermorhen.com'
};

// Fetch Witcher books using product search endpoint
export async function fetchWitcherBooks(): Promise<any> {
  try {
    console.log('Fetching Witcher books with product selection ID:', WITCHER_PRODUCT_SELECTION_ID);
    
    // Create the search query
    const searchQuery = {
      query: {
        exact: {
          field: "productSelections",
          value: WITCHER_PRODUCT_SELECTION_ID
        }
      },
      productProjectionParameters: {
        priceChannel: SPECIAL_SERIES_CHANNEL_ID,
        priceCurrency: "AUD", 
        priceCountry: "AU"
      },
      limit: 20,
      offset: 0,
      sort: [
        {
          field: "name",
          language: "en-AU",
          order: "asc"
        }
      ],
      projection: {
        includeVariants: true
      }
    };
    
   // console.log('Using search query:', JSON.stringify(searchQuery, null, 2));
    
    // Make the API call to the products search endpoint
    const response = await apiRoot
      .products()
      .search()
      .post({
        body: searchQuery
      })
      .execute();
    
   // logApiResponse('Witcher Books Search', response);
    
    // If no results, try a simpler query
    if (response.body.results.length === 0) {
      console.log('No books found. Trying a simpler query...');
      
      // Try a simpler query without filtering
      const testQuery = {
        limit: 5,
        offset: 0
      };
      
      const testResponse = await apiRoot
        .products()
        .search()
        .post({
          body: testQuery
        })
        .execute();
      
      logApiResponse('Test Query', testResponse);
    }
    
    return response.body;
  } catch (error: any) {
    console.error('Error fetching Witcher books:', error);
    if (error.body) {
      console.error('Error details:', error.body);
    }
    throw error;
  }
}

// Create a new anonymous cart
export async function createCart(): Promise<Cart> {
  try {
    const response = await apiRoot
      .carts()
      .post({
        body: {
          currency: 'AUD',
          country: 'AU',
          inventoryMode: 'ReserveOnOrder',
          taxMode: 'Platform',
          shippingAddress: DEFAULT_SHIPPING_ADDRESS,
          // Set the price selection for the special series channel
          custom: {
            type: {
              typeId: 'type',
              key: 'custom-type-cart'
            },
            fields: {
              channelOrigin: SPECIAL_SERIES_CHANNEL_ID,
              site: "Witcher series site"
            }
          }
        }
      })
      .execute();
    
    return response.body;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

// Get cart by ID
export async function getCart(cartId: string): Promise<Cart> {
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    
    return response.body;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
}

// Update cart with actions
export async function updateCart(cartId: string, version: number, actions: MyCartUpdateAction[]): Promise<Cart> {
  try {
    const response = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions
        }
      })
      .execute();
    
    return response.body;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

// Add item to cart
export async function addToCart(cartId: string, version: number, productId: string, quantity: number = 1): Promise<Cart> {
  return updateCart(cartId, version, [
    {
      action: 'addLineItem',
      productId,
      quantity,
      distributionChannel: {
        id: SPECIAL_SERIES_CHANNEL_ID,
        typeId: 'channel'
      }
    }
  ]);
}

// Remove item from cart
export async function removeFromCart(cartId: string, version: number, lineItemId: string): Promise<Cart> {
  return updateCart(cartId, version, [
    {
      action: 'removeLineItem',
      lineItemId
    }
  ]);
}

// Update line item quantity
export async function updateLineItemQuantity(cartId: string, version: number, lineItemId: string, quantity: number): Promise<Cart> {
  return updateCart(cartId, version, [
    {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity
    }
  ]);
}

// Add shipping method to cart
export async function addShippingMethod(cartId: string, version: number): Promise<Cart> {
  return updateCart(cartId, version, [
    {
      action: 'setShippingMethod',
      shippingMethod: {
        id: SHIPPING_METHOD_ID,
        typeId: 'shipping-method'
      }
    }
  ]);
}

// Set shipping address on cart
export async function setShippingAddress(cartId: string, version: number, address: Address = DEFAULT_SHIPPING_ADDRESS): Promise<Cart> {
  return updateCart(cartId, version, [
    {
      action: 'setShippingAddress',
      address
    }
  ]);
}

// Create order from cart
export async function createOrderFromCart(cartId: string, version: number): Promise<Order> {
  try {
    // Make sure shipping method is set
    await addShippingMethod(cartId, version);
    
    // Get updated cart after adding shipping
    const updatedCart = await getCart(cartId);
    
    // Create order from cart
    const response = await apiRoot
      .orders()
      .post({
        body: {
          cart: {
            id: cartId,
            typeId: 'cart'
          },
          version: updatedCart.version
        }
      })
      .execute();
    
    return response.body;
  } catch (error) {
    console.error('Error creating order from cart:', error);
    throw error;
  }
}