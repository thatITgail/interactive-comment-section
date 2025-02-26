// import { useAppContext } from "../App";
import Button from "./Button"
import avatar from "../images/avatars/image-amyrobson.png"
import { useState } from "react"
// import data from "../data.json"


export default function AddComment({ handleSubmit, submitLabel, currentUser }){
  const [text, setText] = useState("")
  const isTextareaDisabled = text.length === 0;

  
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text)
    setText("")
  }
  return (
    <section className="max-w-sm md:max-w-xl mx-auto xl:max-w-2xl mt-4 ">
      <article className="bg-White px-8 py-4 space-y-4 rounded-lg">
        <form  onSubmit={onSubmit}
          className="rounded-lg relative">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="content" 
            id="content"
            className="resize-none appearance-none w-full rounded-lg border-[1px]   min-h-34 overflow-hidden border-Light-gray outline-Dark-blue text-Dark-blue p-4 md:w-[78%] md:ml-12 xl:w-[80%]"
            placeholder="Add a comment..."
            >
          </textarea>
          <div className="flex justify-between items-center mt-4 md:mt-0 w-full  md:top-6 md:left-0 md:absolute">
            <div className="w-12 rounded-full md:absolute md:-left-4">
              <img src={currentUser.image.png} alt="user profile" className="w-12" />
            </div>
            <button className=" text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase  md:absolute md:-right-4" disabled={isTextareaDisabled}>
              {submitLabel}
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}