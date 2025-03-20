import React from 'react';
import { BookCard } from './BookCard';

interface Book {
  id: string;
  key?: string;
  name: string;
  description: string;
  formattedPrice: string;
  imageUrl: string;
  author?: string;
}

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.name}
          description={book.description}
          price={book.formattedPrice}
          imageUrl={book.imageUrl}
          author={book.author}
        />
      ))}
    </div>
  );
}