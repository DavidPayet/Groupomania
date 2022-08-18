import '../styles/DeleteModal.css'

export default function DeleteModal() {
  return (
    <div className="DeleteModal">
      <p>Confirmer la suppression du post ?</p>
      <button className='ctaBtn'>Non</button>
      <button className='ctaBtn'>Oui</button>
    </div>
  )
};
