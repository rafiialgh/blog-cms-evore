import { getPosts } from '@/services/posts';
import PostList from './PostList';
import Header from './Header';
import Cookies from 'js-cookie';

export default async function Home() {
  const userToken = Cookies.get('token');
  const user = userToken ? JSON.parse(userToken) : undefined;
  const response = await getPosts();
  const posts = response?.data || [];

  return (
    <>
      <Header />
      <PostList posts={posts} />
    </>
  );
}

