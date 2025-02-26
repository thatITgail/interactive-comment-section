export default function Button({text}){
  return (
    <div className="flex justify-end mt-3">
      <button className=" text-sm bg-Moderate-blue text-White hover:opacity-60 cursor-pointer rounded-lg py-2 px-4 uppercase">
       {text}
    </button>
    </div>
  )
}