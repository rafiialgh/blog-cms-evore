'use client';

import { getPostDetail, editPost } from '@/services/posts';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

export default function EditPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await getPostDetail(Array.isArray(slug) ? slug[0] : slug);
        setTitle(post.data.title);
        setContent(post.data.content);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        toast.error('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await editPost({ title, content }, slug as string);
      toast.success(response.message);
      router.push('/admin');
    } catch (error) {
      toast.error('Failed to update post' + error);
    }
  };

  if (loading) {
    return (
      <main className="text-center mt-20 font-semibold font-haskoy text-lg">
        Loading post...
      </main>
    );
  }

  return (
    <>
      <header className='relative pb-10 pt-14 font-haskoy lg:pt-20 overflow-hidden border'>
        <div className='mx-40 max-w-[1500px] px-6 xl:px-0'>
          <div className="bg-[#f0f2ed] bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23325fc7\' fill-opacity=\'0.19\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute left-0 top-0 z-10 h-full w-full bg-repeat"></div>
          <div className='relative z-20'>
            <a
              href='/admin'
              className='inline-flex items-center space-x-1 text-sm'
            >
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
              Ganti-ganti Dikit
            </h1>
            <p className='mt-2 max-w-[548px] text-base font-medium tracking-tight lg:text-lg'>
              Revisi sekarang, biar makin rapi nanti.
            </p>
          </div>
        </div>
      </header>

      <main className='flex flex-col lg:flex-row max-w-[1500px] px-6 mx-auto mb-5 gap-2'>
        <div className='w-full  mx-auto mt-10'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              placeholder='Title'
              className='w-full border px-3 py-2 rounded'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder='Write your post in markdown...'
              className='w-full border px-3 py-2 rounded h-96'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <div className='text-right'>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className='text-sm text-lime-700 underline '
              >
                {showPreview ? '🙈 Hide Preview' : '👀 Show Preview'}
              </button>
            </div>
            <p className='text-sm text-gray-500 mt-1'>
              Format your post with{' '}
              <a
                href='https://www.markdownguide.org/basic-syntax/'
                target='_blank'
                className='underline'
              >
                Markdown
              </a>
              . Examples:
              <br />
              <code>**bold**</code>, <code>*italic*</code>,{' '}
              <code># Heading</code>, <code>- List item</code>
            </p>
            <button
              type='submit'
              className='bg-lime-600 text-white px-4 py-2 rounded font-haskoy font-semibold'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Edit Post'}
            </button>
          </form>
        </div>
        {/* Preview Section */}
        {showPreview && (
          <div className='mt-10 border px-2 pt-6 w-full mx-auto rounded'>
            <h2 className='text-lg font-semibold mb-2 ml-4'>🔍 Live Preview</h2>
            <div className='prose max-w-xl overflow-scroll'>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
