// Debugging helper for API calls
export function logApiResponse(name: string, response: any, error?: any) {
    console.log(`=== ${name} API Response ===`);
    
    if (error) {
      console.error('Error:', error);
      if (error.body) {
        console.error('Error body:', error.body);
      }
      return;
    }
    
    // Log the response structure
    console.log('Response structure:', {
      statusCode: response.statusCode,
      hasBody: !!response.body,
      bodyType: response.body ? typeof response.body : null,
      isArray: response.body ? Array.isArray(response.body) : null,
    });
    
    // If response has results, log counts
    if (response.body && response.body.results) {
      console.log('Results count:', response.body.results.length);
      console.log('Total:', response.body.total);
      
      // Log first result if available
      if (response.body.results.length > 0) {
        console.log('First result sample:', JSON.stringify(response.body.results[0], null, 2).substring(0, 500) + '...');
      } else {
        console.log('No results found in response');
      }
    } else {
      console.log('Response body (truncated):', JSON.stringify(response.body, null, 2).substring(0, 500) + '...');
    }
    
    console.log(`=== End ${name} API Response ===`);
  }