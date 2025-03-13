export default function ActionButtons({className, type, handleClick}){
  return (
    <button className={className} onClick={handleClick}>{type}</button>
  )
}