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

    // Track ID Count
    let idCount = comments.length;
    comments.forEach((comment) => {
      idCount += comment.replies.length;
    });
   console.log(comments)
    // Update score count
    const updateScore = (id, task) => {
      const newComments = comments.map((comment) => {
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
    // SET THE COMMENTS TO THE LOCAL STORAGE FOR THE FIRST TIME
    // (OR)
    // ADD THE NEW/UPDATED/DELETED COMMENTS TO THE LOCAL STORAGE
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);



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
