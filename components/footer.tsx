"use client";

import { ChefHat } from 'lucide-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';
import { Categories } from '@/categoryData';
import { getIconComponent } from '@/lib/iconMap';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ClientLoading from './client-loading';

const Footer = () => {
  const categories = Categories;
  const router = useRouter();

  // LOADING CALISMADI NEDENSE
  const [loading,setLoading] = useState(false);


  return (
    <>
    {loading && (
      <ClientLoading />
    )}
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white flex flex-row">
            <ChefHat className='mr-3' /> Tarif Dünyası
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/dokumantasyon" className="hover:underline me-4 md:me-6">
                Dökümantasyon
              </Link>
            </li>
            <li>
              <a href="https://github.com/bugraozdmr" className="hover:underline text-lg text-black">
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        {/* CATEGORIES */}
        <div className="flex justify-center align-middle gap-4 mb-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {categories.map((cat,index) => {
            const IconComponent = getIconComponent(cat.icon);
            return (
              <Button key={index} variant="link" className="text-sm text-gray-500"
              onClick={() => {
                setLoading(true);
                router.push(`/c/${cat.slug}`);
                setLoading(false);
              }}>
                {IconComponent && (
                        <IconComponent
                          fill="currentColor"
                          size={15}
                        />
                      )}
              <span className='ml-3'>{cat.name}</span>
            </Button>
            )
          })}
          </div>
        </div>

        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            <i>Tarif Dünyası</i>
          </Link>
          . Tüm hakları saklıdır.
        </span>
      </div>
    </footer>
    </>
  );
};

export default Footer;
