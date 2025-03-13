import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import replyIcon from "../images/icon-reply.svg"
import editIcon from "../images/icon-edit.svg"
import deleteIcon from "../images/icon-delete.svg"
import ActionButtons from "./ActionButtons"
import { useState } from "react"
import { useAppContext } from "../App"
import AddComment from "./AddComment"

export default function Comment({comment}) {
  const {
    updateScore,
    currentUser,
    setIsModalOpen,
    replyComment,
    setDeleteId,
    replyId,
    setReplyId,
    replyMode,
    setReplyMode, 
    setReplyUsername, 
    setInput,
    editId,
    setEditId,
    editComment, 
  } = useAppContext();

  const [editMode, setEditMode] = useState(false);
  const [expand, setExpand]  = useState(false);
  
  

  return (
    <section className="max-w-sm mx-auto rounded-lg space-y-4 md:max-w-xl lg:max-w-2xl">
      <article className="bg-white rounded-lg px-4 py-4 md:pl-14 lg:pl-16 space-y-4 relative min-h-[15rem] md:min-h-[8rem]" key={comment.id}>
        <div className={`counter-header bg-Light-gray px-4 py-2 flex rounded-lg gap-3 absolute top-[12rem] md:flex-col md:items-center md:left-4 md:py-4 md:px-2 lg:left-5 md:top-2 ${expand ? "top-[17.5rem]" : "top-0"}`}>
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
        <div className={`flex absolute top-[12.4rem] right-10 md:top-4 md:right-8 ${expand ? "top-[18rem]" : "top-0"}`}>
          {comment.user.username === currentUser.username ? (
          <div className="flex gap-4">
            <ActionButtons 
              type={
                <>
                  <img src={deleteIcon} alt="delete icon" />
                  delete
                </>
               } 
              className="flex items-center gap-1 cursor-pointer outline-none hover:opacity-60 text-Soft-Red font-bold capitalize" 
              handleClick={() => {
                setIsModalOpen(true)
                setDeleteId(comment.id)
                document.body.style.backgroundColor = "hsl(223, 19%, 93%)"
              }}
            />  
            <ActionButtons 
              type={
                <>
                  <img src={editIcon} alt="edit icon" />
                 edit
                </>
              }
              className="flex items-center gap-1 cursor-pointer outline-none hover:opacity-60 active:opacity-65 text-Moderate-blue font-bold capitalize" 
              handleClick={() => {
                setExpand(true)
                setEditMode(true);
                setEditId(comment.id);
              }}
            /> 
          </div> 
          ): (
          <ActionButtons 
            type={
              <>
               <img src={replyIcon} alt="reply icon" />
               reply
              </>
            } 
            className="flex items-center gap-1 cursor-pointer outline-none hover:opacity-60 text-Moderate-blue font-bold capitalize" 
            handleClick={() =>{
              setReplyId(comment.id)
              setReplyUsername(comment.user.username)
              setReplyMode(true)}}
          />
          )}
        </div>
        
      
        <header className="flex items-center justify-between md:ml-3">
          <div className="flex gap-3 items-center md:gap-3 text-sm font-extrabold">
            <img src={comment.user.image.png} alt="user profile" className="w-10 object-cover md:w-8" />
            <h1 className="font-bold text-Dark-blue">{comment.user.username}</h1>
            {comment.user.username === currentUser.username && (
              <p className="bg-Moderate-blue w-10 text-White font-medium text-center md:block">you</p>
            )}
            <p className="text-Grayish-Blue font-medium">{comment.createdAt}</p>
          </div>
        </header>
        {editId === comment.id ? (
          <form className={ `${expand ? "h-[15rem]" : "h-0"}`} onSubmit={editComment}>
            <textarea 
              type="text" 
              id="comment"
              name="comment"
              defaultValue={comment.content}
              className="w-full rounded-lg p-2 border-[1px] h-[9rem] border-Light-gray outline-Dark-blue text-Dark-blue md:h-[12rem]"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <ActionButtons
              type="update" 
              className="text-sm bg-Moderate-blue text-White font-medium hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase  absolute bottom-16 right-9 md:bottom-4 md:right-12" 
              handleClick={() => {
                editComment
                setExpand(false)
                setEditMode(false)}
              }
            />
          </form>
        ): (
          <div className="md:ml-3">
          <p className="text-Grayish-Blue text-sm space-x-2">
            {comment.replyingTo && <span className="mr-2 font-bold">@{comment.replyingTo}</span>}
            {comment.content}
          </p>
        </div>
        )}
      </article>

      {replyMode && replyId === comment.id && (
        <div>
          <AddComment  
          currentUser={currentUser} 
          type="reply" 
          className="text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase md:absolute md:-right-7"
          handleClick={replyComment}
        />
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
      <div className="border-l relative border-Light-gray md:ml-4">
        {comment.replies.map(reply => (
          <article 
            className={`ml-4 mb-4 rounded-lg md:ml-4 xl:ml-10`} key={reply.id}>
            {
              <Comment key={reply.id} comment={reply}/>
            }
          </article>
        ))}
      </div>
    )} 
    </section>
  )
}