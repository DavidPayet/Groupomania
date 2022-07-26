import profilIcon from '../assets/profile-icon.svg'
import thumbUp from '../assets/thumbup-icon.svg'

export default function Posts({post}) {
  return (
    <div className="one-post">
      <div className="profil">
        <span className="avatar">
          <img src={profilIcon} alt="icone profil" />
        </span>
        <span className="profil-name">{post.name}</span>
      </div>

      <div className="post-content">
        {post.description}
      </div>

      {
        post?.imageUrl && (
          <div className="post-img">
            <img src={post.imageUrl} alt="illustration post" />
          </div>
        )
      }

      <div className="like-action">
        <span className="thumbup-icon">
          <img src={thumbUp} alt="pouce en l'air" />
        </span>
        <span className="like-nb">{post.likes}</span>
      </div>
    </div>
  )
};
