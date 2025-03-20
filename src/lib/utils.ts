// Format currency for display
export const formatPrice = (centAmount: number, currencyCode: string = 'AUD'): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: currencyCode,
    }).format(centAmount / 100);
  };
  
  // Extract product information from products search result
  export const extractProductFromSearch = (product: any) => {
    // For product search endpoint, the product info is in the productProjection property
    const productData = product.productProjection || product;
    
    // Extract the master variant
    const masterVariant = productData.masterVariant;
    
    // Get product name
    const name = productData.name?.['en-AU'] || 
                 productData.name?.['en'] || 
                 'Unknown Title';
    
    // Get product description
    const description = productData.description?.['en-AU'] || 
                        productData.description?.['en'] || 
                        '';
    
    // Get price from master variant
    const price = masterVariant.prices?.[0];
    const formattedPrice = price 
      ? formatPrice(price.value.centAmount, price.value.currencyCode) 
      : 'Price not available';
    
    // Get product image
    const imageUrl = masterVariant.images?.[0]?.url || '/book-placeholder.jpg';
    
    // Get author from attributes if available
    const attributes = masterVariant.attributes || [];
    const authorAttribute = attributes.find((attr: any) => attr.name === 'authors');
    const author = authorAttribute ? authorAttribute.value : 'Unknown Author';
    
    return {
      id: product.id,
      key: productData.key,
      name,
      description,
      author,
      formattedPrice,
      price: price?.value,
      imageUrl,
      slug: productData.slug?.['en-AU'] || 
            productData.slug?.['en'] || 
            product.id,
    };
  };
  
  // Extract HTML from description - safely parse HTML content
  export const extractHtmlFromDescription = (description: string): string => {
    // If description is empty or not a string, return empty string
    if (!description || typeof description !== 'string') {
      return '';
    }
    
    // Return the description as is - it will be rendered as HTML in a component
    return description;
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text || '';
    return text.slice(0, maxLength) + '...';
  };