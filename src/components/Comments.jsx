import { useState, useEffect } from "react"
import { sub, formatDistanceToNow, parseISO } from "date-fns"
import data from "../data.json"
import { v4 as uuidv4} from "uuid"

import Comment from "./Comment"
import AddComment from "./AddComment"
import { useAppContext } from "../App"

import { set } from "date-fns/fp"



export default function Comments({handleDeleteClick}){
  
  const {
    dataComments,
    getReplies,
    addComment,
    currentUser,
  } = useAppContext()
  

 
    

  return(
    <section className="max-w-sm mx-auto md:max-w-xl xl:max-w-2xl mt-6 space-y-4 relative">
     {dataComments.map((comments) => (
       <Comment 
         key={comments.id} 
         comment={comments} 
         replies={getReplies(comments.id)}
         currentUserId={(currentUser.id)}
         handleDeleteClick={handleDeleteClick}
         
        />
      ))}
      <AddComment submitLabel="send" handleSubmit={addComment} currentUser={currentUser}/>
    </section>
  )
}