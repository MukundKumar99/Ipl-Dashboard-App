import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {iplData} = props
  const {name, id, teamImageUrl} = iplData
  return (
    <Link className="ipl-list-link" to={`/team-matches/${id}`}>
      <li className="ipl-list">
        <img src={teamImageUrl} alt={name} className="ipl-card-image" />
        <p className="ipl-card-title">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
