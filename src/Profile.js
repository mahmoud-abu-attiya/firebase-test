import { useAuth , upload } from "./firebase"
import { useEffect , useState } from "react";


export default function Profile() {
  const currentUser = useAuth();
  const [photo , setPhoto] = useState(null)
  const [loading , setLoading] = useState(false)
  const [photoURL , setPhotoURL] = useState("https://ps.w.org/one-user-avatar/assets/icon-256x256.png?rev=2536829")

  function handleChange(e) {
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }
  function handleClick() {
    upload(photo , currentUser , setLoading)

  }

  useEffect(() => {
    if (currentUser && currentUser.photoURL){
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser]);

  return (
    <div className="info">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="avatar"  className="avatar"/>
    </div>
  )
}
