import { useAppContext } from "../App"


export default function Modal({handleCloseModal}){
  const {deleteComment, deleteId, setIsModalOpen} = useAppContext();
  

  return(
    <section className="absolute top-[35%] w-[20rem] left-[22%] bg-White py-4 px-6 rounded-md text-Dark-blue space-y-4 md:left-[30%] lg:top-[40%] lg:left-[40%]"> 
       <h3 className="font-bold text-lg">Delete Comment</h3>
       <p className="text-small">Are you sure you want to delete this comment? This will remove the comment and can't be undone. </p>
       <div className="flex gap-3">
       <button className="uppercase px-4 py-3 text-White bg-Grayish-Blue font-medium text-sm rounded-md cursor-pointer"
       onClick={() => 
        setIsModalOpen(false)
       }>No, Cancel</button>
        <button className="uppercase px-4 py-3 text-White bg-Soft-Red font-medium text-sm rounded-md cursor-pointer"
        onClick={() => {
          handleCloseModal={handleCloseModal};
          deleteComment(deleteId);
        }}>Yes, Delete</button>
       </div>
    </section>
  )
}