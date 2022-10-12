import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {iplTeamList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getIplTeamList()
  }

  getFormattedData = data => ({
    name: data.name,
    id: data.id,
    teamImageUrl: data.team_image_url,
  })

  getIplTeamList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const Url = 'https://apis.ccbp.in/ipl'
    const response = await fetch(Url)
    const fetchedData = await response.json()
    const updatedData = fetchedData.teams.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      teamImageUrl: eachData.team_image_url,
    }))

    this.setState({
      iplTeamList: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderSuccessView = () => {
    const {iplTeamList} = this.state
    return (
      <div className="bg-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="ipl-logo"
            alt="ipl logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        <ul className="ipl-list-container">
          {iplTeamList.map(each => (
            <TeamCard iplData={each} key={each.id} />
          ))}
        </ul>
      </div>
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
    return <>{this.renderOutputView()}</>
  }
}
export default Home
