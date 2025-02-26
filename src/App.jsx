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
         addComment,
         currentUser,
         deleteId,
         setDeleteId,
         updateScore
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
export default App;