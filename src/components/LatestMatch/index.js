import './index.css'

const LatestMatch = props => {
  const {iplData} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = iplData
  return (
    <>
      <div className="sm-view">
        <div className="latest-match-top-container">
          <div>
            <p className="team-name">{competingTeam}</p>
            <p className="match-date">{date}</p>
            <p className="venue">{venue}</p>
            <p className="match-result">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="competing-team-logo"
          />
        </div>
        <hr className="horizontal-ruler" />
        <div className="latest-match-bottom-container">
          <p className="innings-heading">First Innings</p>
          <p className="innings-team">{firstInnings}</p>
          <p className="innings-heading">Second Innings</p>
          <p className="innings-team">{secondInnings}</p>
          <p className="innings-heading">Man Of The Match</p>
          <p className="innings-team">{manOfTheMatch}</p>
          <p className="innings-heading">Umpires</p>
          <p className="innings-team">{umpires}</p>
        </div>
      </div>
      <div className="lg-view">
        <div className="latest-match-left-container">
          <p className="team-name">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="match-result">{result}</p>
        </div>
        <div className="competing-team-logo-container">
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="competing-team-logo"
          />
        </div>
        <div className="latest-match-right-container">
          <p className="innings-heading">First Innings</p>
          <p className="innings-team">{firstInnings}</p>
          <p className="innings-heading">Second Innings</p>
          <p className="innings-team">{secondInnings}</p>
          <p className="innings-heading">Man Of The Match</p>
          <p className="innings-team">{manOfTheMatch}</p>
          <p className="innings-heading">Umpires</p>
          <p className="innings-team">{umpires}</p>
        </div>
      </div>
    </>
  )
}
export default LatestMatch
