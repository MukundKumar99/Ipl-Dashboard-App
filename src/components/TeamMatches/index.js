import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

let bgColor

class TeamMatches extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    iplMatchData: [],
    iplPastMatchData: [],
  }

  componentDidMount() {
    this.getTeamMatchesDetail()
  }

  getFormattedData = data => ({
    teamBannerUrl: data.team_banner_url,
    umpires: data.latest_match_details.umpires,
    result: data.latest_match_details.result,
    manOfTheMatch: data.latest_match_details.man_of_the_match,
    id: data.latest_match_details.id,
    date: data.latest_match_details.date,
    venue: data.latest_match_details.venue,
    competingTeam: data.latest_match_details.competing_team,
    competingTeamLogo: data.latest_match_details.competing_team_logo,
    firstInnings: data.latest_match_details.first_innings,
    secondInnings: data.latest_match_details.second_innings,
    matchStatus: data.latest_match_details.match_status,
  })

  getPastFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesDetail = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    bgColor = id
    const Url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(Url)
    const fetchedData = await response.json()
    const updatedData = this.getFormattedData(fetchedData)
    const updatedPastData = fetchedData.recent_matches.map(eachData =>
      this.getPastFormattedData(eachData),
    )
    this.setState({
      apiStatus: apiStatusConstants.success,
      iplMatchData: updatedData,
      iplPastMatchData: updatedPastData,
    })
  }

  renderSuccessView = () => {
    const {iplMatchData, iplPastMatchData} = this.state
    const {teamBannerUrl} = iplMatchData
    return (
      <>
        <img src={teamBannerUrl} alt="team banner" className="banner-image" />
        <h1 className="latest-match-heading">Latest Matches</h1>
        <ul className="team-match-list-container">
          <li>
            <div className="latest-match-list-container">
              <LatestMatch iplData={iplMatchData} key={iplMatchData.id} />
            </div>
          </li>
          <li>
            <ul className="past-match-list-container">
              {iplPastMatchData.map(data => (
                <MatchCard matchData={data} key={data.id} />
              ))}
            </ul>
          </li>
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className={`ipl-details-bg-container ${bgColor}`}>
        {this.renderOutputView()}
      </div>
    )
  }
}

export default TeamMatches
