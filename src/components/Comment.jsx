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