import './index.css'

const MatchCard = props => {
  const {matchData} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = matchData
  const statusColor = matchStatus === 'Won' ? 'green-color' : 'red-color'
  return (
    <li className="past-match-list">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-image"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`${statusColor} match-status`}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
