import ActionButtons from "./ActionButtons"
import { useAppContext } from "../App";

export default function AddComment({currentUser, type, className, handleClick}) {
  const {addComment, setInput, input, replyComment} = useAppContext();
  const sendOrReply = 
    type === "send" ? addComment : type === "reply" && replyComment;
   return (
    <section className="max-w-sm md:max-w-xl mx-auto lg:max-w-2xl">
    <article className="bg-White px-8 py-4 space-y-4 rounded-lg">
      <form onSubmit={sendOrReply}
        className="rounded-lg relative">
        <textarea 
          name="comment" 
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none appearance-none w-full rounded-lg border-[1px]   min-h-34 overflow-hidden border-Light-gray outline-Dark-blue text-Dark-blue p-4 md:w-[80%] md:ml-11 lg:w-[82%]"
          placeholder="Add a comment..."
          >
        </textarea>
        <div className="flex justify-between items-center mt-4 md:mt-0 w-full  md:top-6 md:left-0 md:absolute">
          <div className="w-12 rounded-full md:absolute md:-left-4">
            <img src={currentUser.image.png} alt="user profile" className="w-12" />
          </div>
          <ActionButtons   
            type={type} 
            className={className} 
            handleClick={handleClick}
          />
        </div>
      </form>
    </article>
  </section>
   )
}