import { useParams } from "react-router-dom"

const Delete = () => {
  const { ID } = useParams()
  // const navigate = useNavigate()

  return (
    <div className="page delete">
      <h2>Delete - {ID}</h2>
    </div>
  )
}

export default Delete