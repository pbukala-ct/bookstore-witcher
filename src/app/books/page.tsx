import React from 'react';
import { Banner } from '@/components/Banner';
import { BookList } from '@/components/BookList';
import { fetchWitcherBooks } from '@/lib/commercetools';
import { extractProductFromSearch } from '@/lib/utils';

export const revalidate = 3600; // Revalidate at most once per hour

export default async function BooksPage() {
  // Fetch books from Commercetools
  try {
    const booksResponse = await fetchWitcherBooks();
    
    // Extract and format product data
       
    const books = booksResponse.results.map((product: any) => extractProductFromSearch(product));
    
    console.log(`Found ${books.length} books to display`);
    
    return (
      <main>
        <Banner 
          title="The Witcher Book Collection"
          subtitle="Explore the complete series by Andrzej Sapkowski"
        />
        
        <section className="py-12 container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#daa520] mb-4">Available Books</h2>
            <p className="text-[#a0a0a0]">
              {books.length > 0
                ? `Showing ${books.length} ${books.length === 1 ? 'book' : 'books'} in the collection.`
                : 'No books found. Please check back later.'}
            </p>
          </div>
          
          {books.length > 0 ? (
            <BookList books={books} />
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-[#e2e2e2]">No books are currently available.</p>
              <p className="text-[#a0a0a0] mt-4">
                This could be due to an API configuration issue or because the product selection is empty.
                Check browser console logs for more details.
              </p>
            </div>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error in BooksPage:', error);
    
    return (
      <main>
        <Banner 
          title="The Witcher Book Collection"
          subtitle="Explore the complete series by Andrzej Sapkowski"
        />
        
        <section className="py-12 container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[#8b0000] mb-4">Error Loading Books</h2>
            <p className="text-[#e2e2e2]">
              There was an error loading the book collection. Please try again later.
            </p>
            <p className="text-[#a0a0a0] mt-4">
              Check browser console logs for more details.
            </p>
          </div>
        </section>
      </main>
    );
  }
}