'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    const userCookie = user;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className='relative pb-10 pt-14 font-haskoy lg:pt-20 overflow-hidden border'>
      <div className='mx-auto max-w-[800px] px-6 xl:px-0'>
        <div className='bg-[#f0f2ed] absolute left-0 top-0 z-10 h-full w-full bg-repeat'></div>
        <div className='relative z-20'>
          <a href='/' className='inline-flex items-center space-x-1 text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1'
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <span>Back to blog page</span>
          </a>

          {/* Dropdown section */}
          <div className='relative mt-8 lg:mt-14' ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='text-lg font-semibold flex items-center gap-2 hover:underline'
            >
              {user ? (
                <>
                  {`Halo! ${user}`}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </>
              ) : (
                <div className='h-6 w-24 bg-gray-300 rounded animate-pulse'></div>
              )}
            </button>

            {dropdownOpen && (
              <div className='absolute left-0 mt-2 w-40 bg-white border rounded shadow-md z-30'>
                <button
                  onClick={onLogout}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm'
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <h1 className='mt-2 text-balance text-4xl font-bold tracking-tighter '>
            Dashboard Postingan
          </h1>
          <p className='mt-2 max-w-[450px] text-base font-medium tracking-tight lg:text-lg'>
            Semua postinganmu ada di sini. Cek, edit, atau hapus kapan pun kamu
            mau.
          </p>
          <a
            href='/admin/posts/create'
            className='inline-flex mt-5 items-center rounded px-3 py-[2px] bg-lime-600 text-white text-base font-medium'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth='2'
              className='feather feather-plus mr-1'
            >
              <line x1='12' y1='5' x2='12' y2='19'></line>
              <line x1='5' y1='12' x2='19' y2='12'></line>
            </svg>
            <span>Create new post</span>
          </a>
        </div>
      </div>
    </header>
  );
}
