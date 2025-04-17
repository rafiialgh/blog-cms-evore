import { PostTypes } from './data-types';
import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_ROOT_API;

export async function createPost(data: PostTypes) {
  const url = `${ROOT_API}/posts`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

export async function getPosts() {
  const url = `${ROOT_API}/posts`

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getPostDetail(slug: string) {
  const url = `${ROOT_API}/posts/${slug}`

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function editPost(data: PostTypes, slug: string) {
  const url = `${ROOT_API}/posts/${slug}`

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

export async function deletePost(slug: string) {
  const url = `${ROOT_API}/posts/${slug}`

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}