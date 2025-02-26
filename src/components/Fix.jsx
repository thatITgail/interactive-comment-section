export default function Fix(){
  return (
    <article className="bg-White rounded-lg px-4  py-4 md:pl-14 lg:pl-16 space-y-4 relative"> 
    <div className="counter-header hidden bg-Light-gray  px-4 py-1 rounded-lg md:gap-3 absolute md:flex md:flex-col md:items-center md:left-3 md:py-4 md:px-2 lg:left-4" key={comment.id}>
      <button>
        <img src={plusIcon} alt="plus icon" />
      </button>
      <p className="text-Moderate-blue font-bold">{comment.score}</p>
      <button>
        <img src={minusIcon} alt="minus icon" />
      </button>
    </div> 
    <header className="flex items-center justify-between">
      <div className="flex gap-3 items-center md:gap-3 text-sm font-extrabold">
        <img src={comment.user.image.png} alt="user profile" className="w-10 object-cover md:w-8" />
        <h1 className="font-bold text-Dark-blue">{comment.username}</h1>
        <p className="bg-Moderate-blue w-10 text-White font-medium text-center hidden md:block">you</p>
        <p className="text-Grayish-Blue font-medium">{comment.createdAt}</p>
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
    <div className="content">
      <p className="text-Grayish-Blue text-sm space-x-2">
       {comment.content}
     </p>
    </div>
    {/* lower section */}
    <div className="footer-container  md:hidden flex justify-between">
      <div className="counter-footer w-fit  bg-Light-gray px-4 py-1 rounded-lg flex gap-3  md:hidden">
        <button>
          <img src={plusIcon} alt="plus icon" />
        </button>
        <p className="text-Moderate-blue font-bold">{comment.score}</p>
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