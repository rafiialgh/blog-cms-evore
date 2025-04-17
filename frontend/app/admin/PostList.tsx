'use client';
import { deletePost } from '@/services/posts';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  posts: {
    id?: string;
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
  }[];
};

export default function PostList({ posts }: Props) {
  // 👇 simpan posts ke state supaya bisa diubah
  const [postList, setPostList] = useState(posts);

  async function handleDelete(slug: string) {
    const confirm = window.confirm(
      'Apakah Anda yakin ingin menghapus post ini?'
    );
    if (!confirm) return;

    try {
      const response = await deletePost(slug);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);

        // 👇 update list post dengan menghapus yang slug-nya cocok
        setPostList((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus post');
    }
  }

  return (
    <main className='overflow-hidden pb-20 lg:pb-40'>
      <div className='mx-auto max-w-[800px] px-6 xl:px-0'>
        {postList.length === 0 && (
          <p className='mt-5 text-center font-haskoy font-semibold'>
            No posts found.
          </p>
        )}

        <ul>
          {postList.map((post: any) => (
            <li key={post.slug} className='border-t border-[#f0f2ed] py-5'>
              <article>
                <ul>
                  <li className='inline-block rounded bg-[#f0f2ed] px-1 py-[2px] text-xs font-semibold capitalize text-lime-700'>
                    Post
                  </li>
                  <a
                    href={`/admin/posts/${post.slug}`}
                    className='flex justify-between space-x-3 lg:space-x-0'
                  >
                    <div>
                      <h2 className='mt-2 text-xl font-semibold leading-120 tracking-tight'>
                        {post.title}
                      </h2>
                      <p className='mt-2 line-clamp-2 max-w-[420px] text-sm tracking-tight'>
                        {post.content}
                      </p>
                    </div>
                    <p className='mt-2 text-right text-sm tracking-tight'>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </a>

                  <div className='flex gap-2 mt-2'>
                    <a
                      href={`/admin/posts/${post.slug}/edit`}
                      className='flex justify-center items-center rounded w-full h-6 bg-yellow-100 px-1 py-[2px] text-xs font-semibold capitalize text-yellow-700 border border-gray-300'
                    >
                      Edit
                    </a>

                    <button
                      onClick={() => handleDelete(post.slug)}
                      className='flex justify-center items-center rounded w-full h-6 bg-red-100 px-1 py-[2px] text-xs font-semibold capitalize text-red-700 border border-gray-300'
                    >
                      Delete
                    </button>
                  </div>
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
