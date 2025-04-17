'use client'
import { deletePost } from '@/services/posts';
import { useRouter } from 'next/navigation';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

type PostDetailProps = {
  post: {
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
  };
};

export default function PostDetail({post}: PostDetailProps) {
  const router = useRouter()

  async function handleDelete(slug: string) {
      const confirm = window.confirm('Apakah Anda yakin ingin menghapus post ini?');
          if (!confirm) return;
        
          try {
            const response = await deletePost(slug);
        
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.message);
              router.push('/admin')
            }
          } catch (error) {
            toast.error('Terjadi kesalahan saat menghapus post');
          }
    }

  return (
    <>
    <header className='relative pb-10 pt-14 font-haskoy lg:pt-20 overflow-hidden border'>
      <div className='mx-auto max-w-[800px] px-6 xl:px-0'>
        <div className="bg-[#f0f2ed] bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23325fc7\' fill-opacity=\'0.19\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute left-0 top-0 z-10 h-full w-full bg-repeat"></div>
        <div className='relative z-20'>
          <a href='/admin' className='inline-flex items-center space-x-1 text-sm'>
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
            <span>Back to dashboard</span>
          </a>
          <h1 className='mt-8 text-balance text-4xl font-bold tracking-tighter lg:mt-14'>
            {post.title}
          </h1>
          <p className='mt-2 max-w-[548px] text-base font-medium tracking-tight lg:text-lg'>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </header>
    <main className='prose mx-auto max-w-[800px] overflow-hidden px-6 pb-32 pt-4 lg:pb-60 lg:pt-8 xl:px-0'>
    <div className='flex mt-1 max-w-[200px] space-x-2'>
        {/* edit post */}
        <a
          href={`/admin/posts/${post.slug}/edit`}
          className='flex justify-center items-center rounded w-full h-6 bg-yellow-100 px-1 py-[2px] text-xs font-semibold text-yellow-700 border border-gray-300 no-underline'
        >
          Edit
        </a>

        {/* delete post */}
        <button
        onClick={() => handleDelete(post.slug)}
          className='flex justify-center items-center rounded w-full h-6 bg-red-100 px-1 py-[2px] text-xs font-semibold text-red-700 border border-gray-300'
        >
          Delete
        </button>
      </div>
      <article className='overflow-scroll'>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
    </>
  )
}
