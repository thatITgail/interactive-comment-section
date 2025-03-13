
 function Comment() {
  const [replyId, setReplyId] = useState(0);


   const updatedComments = data.comments.map(comment => {
     const commentCreatedAt = calculateCreatedAt(comment.createdAt); 
     //Check if the replies exist.
     const updatedReplies = comment.replies && Array.isArray(comment.replies)?comment.replies.map(reply => {
       const replyCreatedAt = calculateCreatedAt(reply.createdAt);
       return { ...reply, createdAt: convertToRelativeTime(replyCreatedAt.toISOString()) };
     }):[dataComments];
     // sort replies
     updatedReplies.sort((a, b) => new Date(a.createdAt) -new Date(b.createdAt));
     
     return {
       ...comment,
       createdAt: convertToRelativeTime(commentCreatedAt.toISOString()),
       replies: updatedReplies,
     };
   });
     // sort comments
     updatedComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
     setDataComments(updatedComments);


  const [replyUsername, setReplyUsername] = useState("");
   // Replying to parent comment
    const replyParent = dataComments.find((comment) => {
      comment.replies.find((reply) => {
        return replyId === reply.id
      })
    })?.user?.username;
  
    const replyComment = (text) => {
      const newComment = {
        id: uuidv4(),
        content: text,
        createdAt: convertToRelativeTime(new Date().toISOString()),
        score: 0,
        user: currentUser,
        replyingTo: replyUsername
      };
      const newComments = dataComments.map((comment) => {
        if(comment.user.username === replyUsername || comment.user.username === replyParent){
          comment.replies = [...comment.replies, newComment]
        }
        return comment;
      });
      setReplyId(0)
     setDataComments(newComments)
    }
  return (
    <article className="bg-White py-4 ml-4 px-4 rounded-lg space-y-4 md:pl-16 md:ml-8 xl:ml-10">
     <div className="counter-header hidden bg-Light-gray  px-4 py-1 rounded-lg md:gap-3 absolute md:flex md:flex-col md:items-center md:left-12 md:py-4 md:px-2 xl:left">
       <button>
         <img src={plusIcon} alt="plus icon" />
       </button>
       <p className="text-Moderate-blue font-bold">12</p>
         <button>
         <img src={minusIcon} alt="minus icon" />
       </button>
     </div>
     <header className="flex items-center justify-between">
       <div className="flex gap-3 items-center md:gap-3 text-sm font-extrabold">
         <img src={avatar} alt="user profile" className="w-10 object-cover md:w-8" />
         <h1 className="font-bold text-Dark-blue">amyrobson</h1>
         <p className="bg-Moderate-blue w-10 text-White font-medium text-center hidden md:block">you</p>
         <p className="text-Grayish-Blue font-medium">1 month ago</p>

       </div>
       <div className="btn-header items-center hidden md:flex">
         <div className="sub-header border flex items-center gap-4">
           <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium">
             <img src={deleteIcon} alt="" />
             Delete
           </button>
           <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium">
             <img src={editIcon} alt="" />
             Edit
           </button>
         </div>
         <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer hidden">
           <img src={replyIcon} alt="" />
           Reply
         </button>
       </div>
     </header>
     <form className="rounded-lg">
       <textarea 
         name="content" 
         id="content"
         className="resize-none appearance-none w-full rounded-lg border-[1px] md:w-full min-h-34 overflow-hidden border-Light-gray outline-Dark-blue text-Dark-blue py-1 px-4">
       </textarea>
       <Button text="update"/>
     </form>
     <div className="content">
       <p className="text-Grayish-Blue text-sm md:text-[1rem] space-x-2">
         <span>@robson</span>
       </p>
     </div>
     <div className="footer-container  md:hidden flex justify-between">
       <div className="counter-footer w-fit  bg-Light-gray px-4 py-1 rounded-lg flex gap-3  md:hidden">
         <button>
           <img src={plusIcon} alt="plus icon" />
         </button>
         <p className="text-Moderate-blue font-bold">4</p>
         <button>
           <img src={minusIcon} alt="minus icon" />
         </button>
       </div>
       <div className="sub-header-btns flex items-center gap-4">
         <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium">
           <img src={deleteIcon} alt="" />
           Delete
         </button>
         <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium">
           <img src={editIcon} alt="" />
           Edit
         </button>         
         </div>
         <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer flex">
         <img src={replyIcon} alt="" />
           Reply
       </button>
     </div>
   </article>
  )
}

{replies.map(reply => (
  <Comment comment={reply} key={reply.id} replies={[]}/>
  ))}
  
  

  // import { useAppContext } from "../App";
import Button from "./ActionButtons"
import avatar from "../images/avatars/image-amyrobson.png"
import { useState } from "react"
import { useAppContext } from "../App"
// import data from "../data.json"


 function AddComment({texts, currentUser, addComment, replyComment}){
  // const {replyComment} = useAppContext;
  const [text, setText] = useState("");
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(text);
    setText("")
  }
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    replyComment(text)
    setText("")
  }

  const sendOrReply = texts === "send" ? handleSubmit : texts === "reply" && handleSubmitEdit;
  
  const isTextareaDisabled = text.length === 0;

  return (
    <section className="max-w-sm md:max-w-xl mx-auto xl:max-w-2xl mt-4 ">
      <article className="bg-White px-8 py-4 space-y-4 rounded-lg">
        <form  onSubmit={sendOrReply}
          className="rounded-lg relative">
          <textarea 
            value={text}
            onChange={(e) => 
              setText(e.target.value)
            }
            name="content" 
            id="content"
            className="resize-none appearance-none w-full rounded-lg border-[1px]   min-h-34 overflow-hidden border-Light-gray outline-Dark-blue text-Dark-blue p-4 md:w-[78%] md:ml-12 xl:w-[80%]"
            placeholder="Add a comment..."
            >
          </textarea>
          <div className="flex justify-between items-center mt-4 md:mt-0 w-full  md:top-6 md:left-0 md:absolute">
            <div className="w-12 rounded-full md:absolute md:-left-4">
              <img src={currentUser.image.png} alt="user profile" className="w-12" />
            </div>
            <Button texts={texts} />
          </div>
        </form>
      </article>
    </section>
  )
}
  

import replyIcon from "../images/icon-reply.svg"
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import deleteIcon from "../images/icon-delete.svg"
import editIcon from "../images/icon-edit.svg"
import { useAppContext } from "../App"
import AddComment from "./AddComment"




 function Comment({ comment, replies, activeComment, setActiveComment, parentId, addComment, replyComment}){
  const {
    setIsModalOpen,
    setDeleteId, 
    currentUser,
    updateScore,
    setReplyId,
    setReplyUsername
  }  =    useAppContext();
  

  const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  

  return (
    <section className="space-y-4">
      <article className="bg-White rounded-lg px-4  py-4 md:pl-14 lg:pl-16 space-y-4 relative" key={comment.id} > 
      <div className="counter-header hidden bg-Light-gray  px-4 py-1 rounded-lg md:gap-3 absolute md:flex md:flex-col md:items-center md:left-3 md:py-4 md:px-3 lg:left-4">
      <button className="cursor-pointer"
       onClick={() => updateScore(comment.id, "+")}
      >
        <img src={plusIcon} alt="plus icon" />
      </button>
      <p className="text-Moderate-blue font-bold">{comment.score}</p>
      <button className="cursor-pointer"
        disabled={comment.score === 0}
        onClick={() => updateScore(comment.id, "-")}
      >
        <img src={minusIcon} alt="minus icon" />
      </button>
    </div> 
    <header className="flex items-center justify-between">
      <div className="flex gap-3 items-center md:gap-3 text-sm font-extrabold">
        <img src={comment.user.image.png} alt="user profile" className="w-10 object-cover md:w-8" />
        <h1 className="font-bold text-Dark-blue">{comment.user.username}</h1>
        {comment.user.username === currentUser.username && (
          <p className="bg-Moderate-blue w-10 text-White font-medium text-center hidden md:block">you</p>
        )}
        <p className="text-Grayish-Blue font-medium">{comment.createdAt}</p>
      </div>
      <div className="btn-header items-center hidden md:flex md:gap-4 border">
        <div className="sub-header flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium"
          onClick={() => {
           setIsModalOpen(true)
           setDeleteId(comment.id)}}
          >
            <img src={deleteIcon} alt="" />
            Delete
          </button>
          <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium"
             onClick={() =>{
              handleReply(comment.id)
              setActiveComment({id: comment.id, type:"editing"})
            }}
           >
            <img src={editIcon} alt="" />
            Edit
          </button>
        </div>
          <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer flex">
          <img src={replyIcon} alt=""
            onClick={() => {
              setReplyId(comment.id)
              setReplyUsername(comment.user.username)
              setActiveComment({id: comment.id, type:"replying"})
            }
            }
          />
          Reply
        </button>
      </div>
    </header>
    <div className="content">
      <p className="text-Grayish-Blue text-sm space-x-2">
       {comment.content}
     </p>
     {/* {isReplying && (
      <AddComment texts="reply" currentUser={currentUser} addComment={(text) => addComment(text, replyId)}/>
    )} */}
    </div>
    {/* lower section */}
    <div className="footer-container md:hidden flex justify-between">
      <div className="counter-footer w-fit  bg-Light-gray px-4 py-1 rounded-lg flex gap-3  md:hidden">
        <button className="cursor-pointer"
          onClick={() => updateScore(comment.id, "+")}
        >
          <img src={plusIcon} alt="plus icon" />
        </button>
        <p className="text-Moderate-blue font-bold">{comment.score}</p>
        <button className="cursor-pointer"
        disabled={comment.score === 0}
          onClick={() => updateScore(comment.id, "-")}
        >
          <img src={minusIcon} alt="minus icon" />
        </button>
      </div>
      <div className="sub-header-btns flex items-center gap-4">
        <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium"
        onClick={() => {
          setIsModalOpen(true)
          setDeleteId(comment.id)
          }
         }
        >
           <img src={deleteIcon} alt="" />
           Delete
         </button>
         <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium"
            onClick={() => {
              setActiveComment({id: comment.id, type:"editing"})
            }
          }
         >
           <img src={editIcon} alt="" />
           Edit
         </button>        
        </div>
        <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer flex"
        onClick={() => {
          setReplyId(comment.id)
          setReplyUsername(comment.user.username)
          setActiveComment({id: comment.id, type:"replying"})
        }
      }
       >
         <img src={replyIcon} alt="" />
         Reply
       </button>
    </div>
    </article>
    {isReplying && (
      <AddComment texts="reply" currentUser={currentUser} addComment={(text) => addComment(text)} replyComment={(text) => replyComment(text)}/>
    )}
    {comment.replies && comment.replies.length > 0 && (
      <div className="border-l border-Light-gray">
        {comment.replies.map(reply => {
          // console.log(reply.id === comment.id) 
          return (
            
              <article className="bg-White py-4 ml-4 mb-4 px-4 rounded-lg  md:pl-4 md:ml-8 xl:ml-10" key={reply.id}>
                <Comment 
                  comment={reply}
                  key={reply.id}
                  replies={[]}
                  currentUserId= {(currentUser.id)}
                  onClick={() => {
                  setIsModalOpen(true)
                  setDeleteId(reply.id)}}
                  addComment= {addComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                />
              </article>
            
          )
        })}
      </div>
    ) }
  </section>
  )
}



import { useState, useEffect } from "react"
import { sub, formatDistanceToNow, parseISO } from "date-fns"
import data from "../data.json"
import { v4 as uuidv4} from "uuid"

import Comment from "./Comment"
import AddComment from "./AddComment"
import { useAppContext } from "../App"

import { set } from "date-fns/fp"



 function Comments(){
  const [activeComment, setActiveComment] = useState(null)
  
  const {
    dataComments,
    getReplies,
    currentUser,
    setDataComments,
    convertToRelativeTime,
    idCount, 
    setReplyId
  } = useAppContext()
    
  // Add Comment
  const addComment = (text) => {
    
      const newComment = {
      id: idCount + 1,
      content: text,
      createdAt: convertToRelativeTime(new Date().toISOString()),
      score: 0,
      user: currentUser,
      replies: []
    }
    setDataComments([newComment, ...dataComments])
    }
    
  //  Reply a comment
  const replyComment = (text) => {
    const newComment = {
     id: idCount + 1,
     content: text,
     createdAt: convertToRelativeTime(new Date().toISOString()),
     score: 0,
     user: currentUser,
     replyingTo: replyUsername,
   };

   const newComments= newComment.map((comment) => {
      if(
          comment.user.username === replyUsername ||
          comment.user.username === replyParent
        ){
        comment.replies = [...comment.replies, newComment]
      }
      return comment;
   })
   setReplyId(0)
   setDataComments(newComments)
   console.log(newComments)
 }
    
  return(
    <section className="max-w-sm mx-auto md:max-w-xl xl:max-w-2xl mt-6 space-y-4 relative">
     {dataComments.map((comments) => (
       <Comment 
         key={comments.id} 
         comment={comments} 
         replies={getReplies(comments.id)}
         currentUserId={(currentUser.id)}
         activeComment={activeComment}
         setActiveComment={setActiveComment}
         parentId={comments.id}
         addComment= {addComment}
        />
      ))}
      <AddComment currentUser={currentUser} texts="send" addComment={addComment} replyComment={(text) => replyComment(text)}/>
    </section>
  )
}



import { sub, formatDistanceToNow, parseISO } from "date-fns"
import data from "./data.json"
import { v4 as uuidv4} from "uuid"
import Comments from "./components/Comments"
import { createContext, useState, useContext, useEffect } from "react"
import Modal from "./components/Modal"



const AppContext = createContext();

function App() {
  const [dataComments, setDataComments] = useState([]);

  const {currentUser} = data;

  const [isModalOpen, setIsModalOpen]  = useState(false)

  const [editContent, setEditContent] = useState("")
  const [editing, setEditing] = useState(null);
  


  // Set id count
  let idCount = dataComments.length;
  dataComments.forEach((comment) => {
    idCount += comment.replies.length;
  })
  
  // Set delete Id
  const [deleteId, setDeleteId] = useState(0);
  
  // Set reply Id
  const [replyId, setReplyId] = useState(0);

  // Set reply username
  const [replyUsername, setReplyUsername] = useState("");

  const replyParent = dataComments.find((comment) => {
    comment.replies.find((reply) => {
      return replyId === reply. id
    })
  })?.user?.username;

 
  // Convert to ISO string
  const calculateCreatedAt = (relativeDate) => {
    const now = new Date();
    if(relativeDate) {
      const calculatedDate = sub(now, {
        months:
        relativeDate.includes('month') ? 
      parseInt(relativeDate.split('')[0], 10): 0,
      weeks:
      relativeDate.includes('week') ?
      parseInt(relativeDate.split('')[0], 10):0,
      days: relativeDate.includes('day') ?
      parseInt(relativeDate.split('')[0], 10): 0,
    }); 
    return calculatedDate;
  }
  return now
 }
 // Change to relative time
  const convertToRelativeTime = (isoDate) => {
    const date = parseISO(isoDate);
     return formatDistanceToNow(date, {addSuffix:true})
  } 
  // Display Replies according to time created 
  const getReplies = (commentId) => {
    return dataComments.filter((comment) => comment.id === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
 };

  // Add new comment
  // const addComment = (text) => {
  
  //   const newComment = {
  //   id: idCount + 1,
  //   content: text,
  //   createdAt: convertToRelativeTime(new Date().toISOString()),
  //   score: 0,
  //   user: currentUser,
  //   replies: []
  // }
  // setDataComments([newComment, ...dataComments])
  // console.log(newComment)
  // }
  //  const handleReply = (commentId) => {
  //     const reply = {
  //       id: idCount + 1,
  //       content: editContent,
  //       createdAt: convertToRelativeTime(new Date().toISOString()),
  //       score: 0,
  //       replyingTo: dataComments.find((comment) => comment.id === commentId).user.username,
  //       user: currentUser,
  //     }
  
  //     const newComments = dataComments.map((comment) => {
  //       if(comment.id === commentId){
  //         [...comment, reply]
  //       }
  //       return comment
  //     });
  //     setDataComments(newComments)
  //     setEditContent("")
  //   }

  // Delete Comment
  const deleteComment = () => {
    let newComments = dataComments.filter((comment) => comment.id !== deleteId);

    if(newComments.length === dataComments.length) {
    
     newComments = dataComments.map((comment) => {
      if(comment.replies.length > 0){
        comment.replies = comment.replies.filter((reply) => reply.id !== deleteId)
      }
      return comment;
     });
    }
    setDataComments(newComments)
  }


  // Update score count
  const updateScore = (id, task) => {
    const newComments = dataComments.map((comment) => {
      if(comment.id === id){
        task === "+" ? (comment.score += 1) : (comment.score -= 1);
      } else{
        comment.replies = comment.replies.map((reply) => {
          if(reply.id === id) {
            task === "+" ? (reply.score += 1) : (reply.score -= 1)
          }
          return reply
        });
      }
      return comment
    });
    setDataComments(newComments)
  }

  // Handle Effect
  useEffect(() => {
    const updatedComments = data.comments.map(comment => {
    const commentCreatedAt = calculateCreatedAt(comment.createdAt); 
    //Check if the replies exist.
    const updatedReplies = comment.replies && Array.isArray(comment.replies)?comment.replies.map(reply => {
      const replyCreatedAt = calculateCreatedAt(reply.createdAt);
      return { ...reply, createdAt: convertToRelativeTime(replyCreatedAt.toISOString()) };
    }):[dataComments];
    // sort replies
    updatedReplies.sort((a, b) => new Date(a.createdAt) -new Date(b.createdAt));
    
    return {
      ...comment,
      createdAt: convertToRelativeTime(commentCreatedAt.toISOString()),
      replies: updatedReplies,
    };
  });
  // sort comments
  updatedComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  setDataComments(updatedComments);
  }, []);   
  

  return (
    <AppContext.Provider 
      value={
        {isModalOpen, 
         setIsModalOpen,
         deleteComment,
         dataComments,
         getReplies,
         idCount,
         setDataComments,
         convertToRelativeTime,
         currentUser,
         deleteId,
         setDeleteId,
         setReplyUsername,
         updateScore,
         setReplyId,
         replyId,
         replyUsername,
        }
      }>
      <main className="bg-Very-light-gray max-w-auto md:max-w-2xl lg:max-w-5xl mx-auto h-auto py-4">
      <Comments  />
      {isModalOpen && <Modal />}
    </main>
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)



import { useAppContext } from "../App"


 function Modal(){
  const {deleteComment, setIsModalOpen} = useAppContext();
  

  return(
    <section className="absolute top-[35%] w-[20rem] left-[22%] bg-White py-4 px-6 rounded-md text-Dark-blue space-y-4 md:left-[30%] lg:top-[40%] lg:left-[40%]"> 
       <h3 className="font-bold text-lg">Delete Comment</h3>
       <p className="text-small">Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
       <div className="flex gap-3">
       <button className="uppercase px-4 py-3 text-White bg-Grayish-Blue font-medium text-sm rounded-md cursor-pointer"
       onClick={() => 
        setIsModalOpen(false)
       }>No, Cancel</button>
        <button className="uppercase px-4 py-3 text-White bg-Soft-Red font-medium text-sm rounded-md cursor-pointer"
        onClick={() => {
          setIsModalOpen(false)
          deleteComment();
        }}>Yes, Delete</button>
       </div>
    </section>
  )
}


// New Approach

// import { useAppContext } from "../App";
import Button from "./ActionButtons"
import avatar from "../images/avatars/image-amyrobson.png"
import { useState } from "react"
// import data from "../data.json"
export default function AddComment({ handleSubmit, submitLabel, currentUser }){
  const [text, setText] = useState("")
  const isTextareaDisabled = text.length === 0;

  
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text)
    setText("")
  }
  return (
    <section className="max-w-sm md:max-w-xl mx-auto xl:max-w-2xl mt-4 ">
      <article className="bg-White px-8 py-4 space-y-4 rounded-lg">
        <form  onSubmit={onSubmit}
          className="rounded-lg relative">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="content" 
            id="content"
            className="resize-none appearance-none w-full rounded-lg border-[1px]   min-h-34 overflow-hidden border-Light-gray outline-Dark-blue text-Dark-blue p-4 md:w-[78%] md:ml-12 xl:w-[80%]"
            placeholder="Add a comment..."
            >
          </textarea>
          <div className="flex justify-between items-center mt-4 md:mt-0 w-full  md:top-6 md:left-0 md:absolute">
            <div className="w-12 rounded-full md:absolute md:-left-4">
              <img src={currentUser.image.png} alt="user profile" className="w-12" />
            </div>
            <button className=" text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase  md:absolute md:-right-4" disabled={isTextareaDisabled}>
              {submitLabel}
            </button>
          </div>
        </form>
      </article>
    </section>
  )
};




import replyIcon from "../images/icon-reply.svg"
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import deleteIcon from "../images/icon-delete.svg"
import editIcon from "../images/icon-edit.svg"
import { useAppContext } from "../App"
import AddComment from "./AddComment"
export default function Comment({ comment, replies}){
  const {setIsModalOpen,setDeleteId, addComment, currentUser, updateScore} =    useAppContext();


  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true)
    console.log(id)
  }
  
  
  return (
    <section className="space-y-4">
      {
        comment.isDeleted ? 
        <div className="bg-White rounded-lg px-4  py-4 md:pl-14 lg:pl-16 space-y-4 relative" key={comment.id}>This post has been deleted</div> 
        :
        <article className="bg-White rounded-lg px-4  py-4 md:pl-14 lg:pl-16 space-y-4 relative" key={comment.id} > 
            <div className="counter-header hidden bg-Light-gray  px-4 py-1 rounded-lg md:gap-3 absolute md:flex md:flex-col md:items-center md:left-3 md:py-4 md:px-3 lg:left-4">
            <button className="cursor-pointer"
            onClick={() => updateScore(comment.id, "+")}
            >
              <img src={plusIcon} alt="plus icon" />
            </button>
            <p className="text-Moderate-blue font-bold">{comment.score}</p>
            <button className="cursor-pointer"
              disabled={comment.score === 0}
              onClick={() => updateScore(comment.id, "-")}
            >
              <img src={minusIcon} alt="minus icon" />
            </button>
          </div> 
          <header className="flex items-center justify-between">
            <div className="flex gap-3 items-center md:gap-3 text-sm font-extrabold">
              <img src={comment.user.image.png} alt="user profile" className="w-10 object-cover md:w-8" />
              <h1 className="font-bold text-Dark-blue">{comment.user.username}</h1>
              {comment.user.username === currentUser.username && (
                <p className="bg-Moderate-blue w-10 text-White font-medium text-center hidden md:block">you</p>
              )}
              <p className="text-Grayish-Blue font-medium">{comment.createdAt}</p>
            </div>
            <div className="btn-header items-center hidden md:flex">
              <div className="sub-header flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium"
                onClick={() => handleDeleteClick(comment.id)}
                >
                  <img src={deleteIcon} alt="" />
                  Delete
                </button>
                <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium"
                  
                  >
                  <img src={editIcon} alt="" />
                  Edit
                </button>
              </div>
              <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer hidden">
                <img src={replyIcon} alt="" />
                Reply
              </button>
              </div>
            </header>
          <div className="content">
            <p className="text-Grayish-Blue text-sm space-x-2">
            {comment.content}
          </p>
          </div>
          {/* lower section */}
          <div className="footer-container md:hidden flex justify-between">
            <div className="counter-footer w-fit  bg-Light-gray px-4 py-1 rounded-lg flex gap-3  md:hidden">
              <button className="cursor-pointer"
                onClick={() => updateScore(comment.id, "+")}
              >
                <img src={plusIcon} alt="plus icon" />
              </button>
              <p className="text-Moderate-blue font-bold">{comment.score}</p>
              <button className="cursor-pointer"
              disabled={comment.score === 0}
                onClick={() => updateScore(comment.id, "-")}
              >
                <img src={minusIcon} alt="minus icon" />
              </button>
            </div>
            <div className="sub-header-btns flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Soft-Red font-medium"
            onClick={() => {
              setIsModalOpen(true)
              setDeleteId(comment.id)
              }
              }
            >
                <img src={deleteIcon} alt="" />
                Delete
              </button>
              <button className="flex items-center gap-1 text-sm hover:opacity-60 cursor-pointer text-Moderate-blue font-medium"
            
              >
                <img src={editIcon} alt="" />
                Edit
              </button>        
            </div>
            <button className="items-center text-Moderate-blue gap-2 text-sm hover:opacity-60 cursor-pointer flex"
            
            >
              <img src={replyIcon} alt="" />
              Reply
            </button>
          </div>
        </article>
      }
      
    {comment.replies && comment.replies.length > 0 && (
      <div className="border-l border-Light-gray">
        {comment.replies.map(reply => (
          <article className="bg-White py-4 ml-4 mb-4 px-4 rounded-lg  md:pl-4 md:ml-8 xl:ml-10" key={reply.id}>
            <Comment 
              comment={reply}
              replies={[]} 
              handleDeleteClick={() => handleDeleteClick(reply.id)}
              addComment={addComment}
            />
          </article>
        ))}
      </div>
    ) }
  </section>
  )
}
 

export default function Button({text, isTextDisabled}){
  return (
    <div className="flex justify-end mt-3">
      <button className=" text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase" disabled={isTextDisabled}>
       {text}
    </button>
    </div>
  )
}



import { useAppContext } from "../App"

export default function Modal({handleCloseModal}){
  const {deleteComment, deleteId, setIsModalOpen} = useAppContext();
  

  return(
    <section className="absolute top-[35%] w-[20rem] left-[22%] bg-White py-4 px-6 rounded-md text-Dark-blue space-y-4 md:left-[30%] lg:top-[40%] lg:left-[40%]"> 
       <h3 className="font-bold text-lg">Delete Comment</h3>
       <p className="text-small">Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
       <div className="flex gap-3">
       <button className="uppercase px-4 py-3 text-White bg-Grayish-Blue font-medium text-sm rounded-md cursor-pointer"
       onClick={() => 
        setIsModalOpen(false)
       }>No, Cancel</button>
        <button className="uppercase px-4 py-3 text-White bg-Soft-Red font-medium text-sm rounded-md cursor-pointer"
        onClick={() => {
          handleCloseModal={handleCloseModal};
          deleteComment(deleteId);
        }}>Yes, Delete</button>
       </div>
    </section>
  )
};




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
};


import { sub, formatDistanceToNow, parseISO } from "date-fns"
import data from "./data.json"
import Comments from "./components/Comments"
import { createContext, useState, useContext, useEffect } from "react"
import Modal from "./components/Modal"



// const AppContext = createContext();

// function App() {
//   const [dataComments, setDataComments] = useState([]);

//   const {currentUser} = data;

//   const [isModalOpen, setIsModalOpen]  = useState(false)


//   // Set id count
//   let idCount = dataComments.length;
//   dataComments.forEach((comment) => {
//     idCount += comment.replies.length;
//   })
  
//   // Set delete Id
//   const [deleteId, setDeleteId] = useState(0);

 
//   // Convert to ISO string
//   const calculateCreatedAt = (relativeDate) => {
//     const now = new Date();
//     if(relativeDate) {
//       const calculatedDate = sub(now, {
//         months:
//         relativeDate.includes('month') ? 
//       parseInt(relativeDate.split('')[0], 10): 0,
//       weeks:
//       relativeDate.includes('week') ?
//       parseInt(relativeDate.split('')[0], 10):0,
//       days: relativeDate.includes('day') ?
//       parseInt(relativeDate.split('')[0], 10): 0,
//     }); 
//     return calculatedDate;
//   }
//   return now
//  }
//  // Change to relative time
//   const convertToRelativeTime = (isoDate) => {
//     const date = parseISO(isoDate);
//      return formatDistanceToNow(date, {addSuffix:true})
//   } 
//   // Display Replies according to time created 
//   const getReplies = (commentId) => {
//     return dataComments.filter((comment) => comment.id === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   );
//  };


//   // Add new Comments
//   const addComment = (text) => {
//     const newComment = {
//       id: idCount + 1,
//       content: text,
//       createdAt: convertToRelativeTime(new Date().toISOString()),
//       score: 0,
//       user: currentUser,
//       replies: []
//     }
//     setDataComments([newComment, ...dataComments])
//   }

//   // Delete Comment
//   const deleteComment = (id) => {
//     let newComments = dataComments.map((comment) => {
//       if( comment.id !== id) {
//         comment["isDeleted"] = true
//       }
//     });
    
//     if(newComments.length === dataComments.length) {
//       newComments = dataComments.map((comment) => {
//         return comment
//       })
//     }
//     setDataComments(newComments)
//     setIsModalOpen(false)
//   }

//   // Update score count
//   const updateScore = (id, task) => {
//     const newComments = dataComments.map((comment) => {
//       if(comment.id === id){
//         task === "+" ? (comment.score += 1) : (comment.score -= 1);
//       } else{
//         comment.replies = comment.replies.map((reply) => {
//           if(reply.id === id) {
//             task === "+" ? (reply.score += 1) : (reply.score -= 1)
//           }
//           return reply
//         });
//       }
//       return comment
//     });
//     setDataComments(newComments)
//   }

//   // Handle Effect
//   useEffect(() => {
//     const updatedComments = data.comments.map(comment => {
//     const commentCreatedAt = calculateCreatedAt(comment.createdAt);
//     //Check if the replies exist.
//     const updatedReplies = comment.replies && Array.isArray(comment.replies) ? comment.replies.map(reply => {
//       const replyCreatedAt = calculateCreatedAt(reply.createdAt);
//       return { ...reply, createdAt: convertToRelativeTime(replyCreatedAt.toISOString()) };
//     }):[dataComments];
//     // sort replies
//     updatedReplies.sort((a, b) => new Date(a.createdAt) -new Date(b.createdAt));
    
//     return {
//         ...comment,
//         createdAt: convertToRelativeTime(commentCreatedAt.toISOString()),
//         replies: updatedReplies,
//       };
//     });
//     // sort comments
//     updatedComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

//     setDataComments(updatedComments);
//   }, []);   
  

//   return (
//     <AppContext.Provider 
//       value={
//         {isModalOpen, 
//          setIsModalOpen,
//          deleteComment,
//          dataComments,
//          getReplies,
//          addComment,
//          currentUser,
//          deleteId,
//          setDeleteId,
//          updateScore
//         }
//       }>
//       <main className="bg-Very-light-gray max-w-auto md:max-w-2xl lg:max-w-5xl mx-auto h-auto py-4">
//       <Comments  />
//       {isModalOpen && <Modal />}
//     </main>
//     </AppContext.Provider>
//   )
// }
// export const useAppContext = () => useContext(AppContext)
// export default App;