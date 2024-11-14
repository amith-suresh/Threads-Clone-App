'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '@/API/axiosinstance';
import IconStore from '@/components/Icons/icons';

interface LikeButtonProps{
 postId:string,
 initialLike:number,
 likedUsers: string[]
}

const LikeButton = (props:LikeButtonProps) => {
    const {postId,initialLike, likedUsers}=props;
    const[isLiked,setIsLiked]=useState(false);
    const[likecount,setLikeCOunt]=useState<number>(initialLike);
    const{Icon}=IconStore()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
      if (likedUsers.includes(userId as string)) {
          setIsLiked(true)
      }
  }, [likedUsers, userId])


    const handleClick = async () => {
        try{
         if(isLiked){
            await axiosInstance.post(`/posts/unlike/${postId}`,{userId })
           setLikeCOunt(prev=>prev-1)
           setIsLiked(!isLiked);
         }else{
            await axiosInstance.post(`/posts/like/${postId}`,{userId})
            setLikeCOunt(prev=>prev+1)
            setIsLiked(!isLiked);
         }
         
        } catch(error){
            console.log('Error updating like:',error)
        }
         
      } 
    

  return (
    <div className='flex gap-1' onClick={handleClick}>
      {isLiked?Icon.LikedHeart:Icon.Like}
      {likecount}
    </div>
  )
}

export default LikeButton;
