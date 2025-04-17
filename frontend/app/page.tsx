import { getPosts } from '@/services/posts';

export default async function Home() {
  const response = await getPosts();
  const posts = response?.data || [];

  return (
    <>
      <header className='relative py-16 font-haskoy lg:py-24 overflow-hidden border'>
        <div className='mx-auto max-w-[800px] px-6 xl:px-0'>
          <div className="bg-[#f0f2ed] bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23325fc7\' fill-opacity=\'0.19\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute left-0 top-0 z-10 h-full w-full bg-repeat"></div>
          <div className='relative z-20'>
            <div className='inline-block rounded px-2 py-[2px] bg-lime-600 text-white text-lg font-semibold'>
              Blog
            </div>
            <h1 className='mt-2 text-3xl font-bold tracking-tighter lg:text-[31px]'>
              Muhammad Rafii Alghafary Writing: Projects, Ideas, and Growth
            </h1>
            <p className='mt-3 max-w-[548px] text-base font-medium tracking-tight lg:text-lg'>
              Hi, I’m Muhammad Rafii Alghafary — a web developer in the making,
              with a passion for building clean, responsive, and user-friendly
              websites. I’m currently exploring modern tools like React,
              Next.js, and Node.js while continuously leveling up my skills one
              project at a time.
            </p>
          </div>
        </div>
      </header>
      <main className='overflow-hidden pb-20 lg:pb-40'>
        <div className='mx-auto max-w-[800px] px-6 xl:px-0'>
          
          {posts.length === 0 && (
            <p className='mt-5 text-center font-haskoy font-semibold'>
              No posts found.
            </p>
          )}

          <ul>
            {posts.map((post: any) => (
              <li key={post.id} className='border-t border-[#f0f2ed] py-5'>
                <article>
                  <ul>
                    <li className='inline-block rounded bg-[#f0f2ed] px-1 py-[2px] text-xs font-semibold capitalize text-lime-700'>
                      Post
                    </li>
                    <a
                      href={`/posts/${post.slug}`}
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
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </a>
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
