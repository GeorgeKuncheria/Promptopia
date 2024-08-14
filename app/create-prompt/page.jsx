'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from '@components/Form';



const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState( {
    prompt:" ",
    tag:" ",
  });
  const { data: session } = useSession();
  const router = useRouter();
  

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);


    try {
      const response = await fetch('/api/prompt/new',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          prompt:post.prompt,
          userId: session?.user.id,
          tag:post.tag
        })
      })

      if (response.ok){
        router.push("/");
      }
      
    } catch (error) {
      console.log(error);
    }

    finally {
      setSubmitting(false);
    }


  };


  return (
    <>
      <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt}/>

    </>
  )
}

export default CreatePrompt