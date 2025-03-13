import { useState, createContext, useContext, useEffect } from "react"
import data from "./data.json"
import Comments from "./components/Comments"
import Modal from "./components/Modal"


const AppContext = createContext();

export default function App() {
    const [comments, setComments] = useState(
      JSON.parse(localStorage.getItem("comments")) || data.comments
    )
    const [input, setInput] = useState("");
    const [replyMode, setReplyMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0)
    const [replyId, setReplyId] = useState(0)
    const [replyUsername, setReplyUsername] = useState("")
    const [editId, setEditId] = useState(0);


    const {currentUser} = data;

  const [isModalOpen, setIsModalOpen]  = useState(false)


  // Set id count
  let idCount = dataComments.length;
  dataComments.forEach((comment) => {
    idCount += comment.replies.length;
  })
  
  // Set delete Id
  const [deleteId, setDeleteId] = useState(0);

 
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


  // Add new Comments
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
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDeleteId(0)
  }

  // Delete Comment
  const deleteComment = (id) => {
    let newComments = dataComments.filter((comment) => comment.id !== id);
    if(newComments.length === dataComments.length) {
      newComments = dataComments.map((comment) => {
        comment.replies = comment.replies.filter((reply) => reply.id !== deleteId);
        return comment
      })
    }
    setDataComments(newComments)
    setIsModalOpen(false)
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
    setComments(newComments)
  }
  // Add a Comment
  const addComment = (e) => {
    e.preventDefault();
    //  const formData = new FormData(e.currentTarget);
    const newComment = {
      id: idCount + 1,
      content: input,
      createdAt: "Now",
      score: 0,
      user: currentUser,
      replies: [],
    }
    setComments([...comments, newComment])
    setInput("")

    console.log(newComment)
  }
  // Reply Comment
  const replyParent = comments.find((comment) => 
    comment.replies.find((reply) => {
      return replyId === reply.id
    })
  )?.user?.username;

  const replyComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: idCount + 1,
      content: input,
      createdAt: "Now",
      score: 0,
      user: currentUser,
      replyingTo: replyUsername
    }
    const newComments = comments.map((comment) => {
      if(
        comment.user.username === replyUsername ||
        comment.user.username === replyParent
      ){
        comment.replies = [...comment.replies, newComment];
      }
      return comment;
    })
    setReplyId(0)
    setComments(newComments)
    setReplyMode(false)
    setInput("")
  }
  // Edit Comment
  const editComment = (e) => {
    e.preventDefault();
    const newComments = comments.map((comment) => {
      if (comment.id === editId) {
        comment.content = input;
      } else{
        comment.replies = comment.replies.map((reply) => {
          if(reply.id === editId){
            reply.content = input;
          }
          return reply;
        })
      }
      return comment;
    })
    setComments(newComments)
    setEditId(0)
    setInput("")
  }
 
  // Delete Comment
  const deleteComment = () => {
    let newComments = comments.filter((comment) => comment.id !== deleteId);
    if(newComments.length === comments.length){
      newComments = comments.map((comment) => {
        comment.replies = comment.replies.filter(
          (reply) => reply.id !== deleteId
        );
        return comment;
      });
    }
    setComments(newComments)
    setIsModalOpen(false)
    setBackgroundGray(false)
  }
  
  
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
        <AppContext.Provider value={{
          updateScore,
          currentUser,
          addComment,
          setIsModalOpen,
          input,
          setInput,
          setDeleteId,
          replyId,
          setReplyId,
          replyComment,
          replyMode, 
          setReplyMode,
          setReplyUsername,
          editId,
          setEditId, 
          editComment,
          
        }}>
          <main className={`relative bg-Very-light-gray h-full py-4 max-w-md mx-auto md:max-w-2xl lg:max-w-4xl`}>
            <Comments comments={comments}/>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} deleteComment={deleteComment}/> }
          </main>
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext)
