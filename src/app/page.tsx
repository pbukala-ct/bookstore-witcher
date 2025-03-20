import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Banner } from '@/components/Banner';

export default function Home() {
  return (
    <main>
      <Banner 
        title="The Witcher Saga"
        subtitle="Explore the complete collection of Andrzej Sapkowski's epic fantasy series"
        ctaText="Browse Collection"
        ctaLink="/books"
      />
      
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/witcher-books.jpg" 
              alt="Witcher Book Collection" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-[#daa520] mb-4">Begin Your Journey</h2>
            <p className="text-[#e2e2e2] mb-6">
              Enter the world of The Witcher - where monsters, magic, and morally complex characters create an unforgettable dark fantasy experience. Follow Geralt of Rivia, a solitary monster hunter, as he struggles to find his place in a world where people often prove more wicked than beasts.
            </p>
            <p className="text-[#e2e2e2] mb-8">
              From the short story collections to the epic saga, explore the complete series that inspired the hit games and Netflix show.
            </p>
            <Link 
              href="/books" 
              className="btn-primary px-8 py-3 rounded-md text-lg font-medium inline-block"
            >
              View The Collection
            </Link>
          </div>
        </div>
      </section>
      
      <section className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#daa520] mb-8">Reading Order</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#daa520] mb-2">The Last Wish</h3>
              <p className="text-[#a0a0a0]">The perfect introduction to the world of The Witcher.</p>
            </div>
            
            <div className="card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#daa520] mb-2">Sword of Destiny</h3>
              <p className="text-[#a0a0a0]">Essential short stories that set up the main saga.</p>
            </div>
            
            <div className="card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#daa520] mb-2">Blood of Elves</h3>
              <p className="text-[#a0a0a0]">The first novel in the main Witcher saga.</p>
            </div>
            
            <div className="card p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#daa520] mb-2">Time of Contempt</h3>
              <p className="text-[#a0a0a0]">Continue the saga with the second novel.</p>
            </div>
          </div>
          
          <Link 
            href="/books" 
            className="btn-primary px-8 py-3 rounded-md text-lg font-medium inline-block mt-8"
          >
            Explore All Books
          </Link>
        </div>
      </section>
      
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#daa520] mb-4">From Page to Screen</h2>
        <p className="text-[#e2e2e2] max-w-3xl mx-auto mb-12">
          Discover the original stories that inspired the hit Netflix series and acclaimed video games. Experience the world of the Witcher as it was first imagined.
        </p>
        
        <div className="relative h-64 rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto">
          <Image 
            src="/witcher-banner.png" 
            alt="The Witcher World" 
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}