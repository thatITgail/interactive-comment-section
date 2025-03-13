import ActionButtons from "./ActionButtons"

export default function Modal({setIsModalOpen, deleteComment}){
  return (
    <section className="fixed top-[30%] w-[20rem] left-[20%] bg-White py-4 px-6 rounded-md text-Dark-blue space-y-4 md:top-[30%] md:left-[40%]"> 
       <h3 className="font-bold text-lg">Delete Comment</h3>
       <p className="text-xsm">Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
       <div className="flex gap-3">
          <ActionButtons 
           type="No Cancel"
           className="uppercase px-4 py-3 text-White bg-Grayish-Blue font-medium text-sm rounded-md cursor-pointer" 
           handleClick={() => setIsModalOpen(false)} 
          />
          <ActionButtons 
            type="yes delete" 
            className="uppercase px-4 py-3 text-White bg-Soft-Red font-medium text-sm rounded-md cursor-pointer" 
            handleClick={() =>  deleteComment()} />
       </div>
    </section>
  )
}