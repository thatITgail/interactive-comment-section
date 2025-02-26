export default function Comment() {
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
  
  
  