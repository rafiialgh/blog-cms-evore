
import { getPostDetail } from '@/services/posts';
import PostDetail from './PostDetail';


type Props = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Props) {
  const response = await getPostDetail(params.slug);
  const post = response.data;

  return (
    <PostDetail post={post}/>
  );
}


