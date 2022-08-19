import '../styles/Loader.css'

export default function Loader({isLoading}) {
  return (
    <div className={`Loader ${!isLoading && 'hidden'}`}>
      <div className="loader"></div>
    </div>
  )
}