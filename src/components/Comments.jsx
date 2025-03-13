import Comment from "./Comment"
import AddComment from "./AddComment"
import { useAppContext } from "../App";

export default function Comments({comments}){
  const {currentUser, addComment} = useAppContext();
  
  return (
    <section className="max-w-sm mx-auto md:max-w-xl xl:max-w-2xl mt-6 space-y-4 relative">
      {comments.map((comment) => {
        return (
          <Comment key={comment.id} comment={comment} />
        )}
      )} 
      <AddComment  
        currentUser={currentUser} 
        type="send" 
        className="text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase  md:absolute md:-right-4"
        handleClick={addComment}
      />
    </section>
  )
} 