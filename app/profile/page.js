'use client';

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileCard from '@components/ProfileCard';



const Profile = () => {
  const {data : session} = useSession();
  const router= useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        

        setPosts(data)
      } catch (error) {
        console.log(error);
      }
    }

    if (session?.user.id) 
      {fetchPosts();}
    },[session?.user.id]);


    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
  
          const filteredPosts = posts.filter((item) => item._id !== post._id);
  
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };


  return (
    <ProfileCard
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default Profile