'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function Post() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = searchParams.get('postID');

  return <h1>Post ID: {postId}</h1>;
}

export default Post;
