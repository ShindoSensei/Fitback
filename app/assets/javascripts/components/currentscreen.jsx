/* globals React $ */

class CurrentSession extends React.Component {

  constructor () {
    super()
    this.state = {
      timerId: ''
    }
  }

  startTraining (event) {
    $.ajax({
      // GET to this url initiates the app to begin subscribing to MQTT broadcast
      url: '/start_training/' + this.props.currentTraining.id + '.json',
      method: 'GET',
      success: function (data) {
        var intervalId = setInterval(function () {
          console.log('entering setInterval function')
          $.ajax({
            url: '/participants.json',
            method: 'GET',
            success: function (updatedParticipants) {
              // Returned data is array of participant objects updated with new heart rate
              console.log('received updated Participants from server' + updatedParticipants)
              this.props.updateCurrentParticipants(updatedParticipants)
            }.bind(this)
          })
        }.bind(this), 1000)

        this.setState({
          timerId: intervalId
        })
        console.log('IntervalId is ' + intervalId) // run
        console.log('this.state.timerId is ' + this.state.timerId) // run
      }.bind(this)

    })
    // Whenever heartRate crosses threshold, send alert to display
    // Disable all select buttons on upcoming screen & highlight currently running session
  }

  stopTraining (event) {
    clearInterval(this.state.timerId)
    // Stop interval of ajax call
    // Activate AAR box that pops up
  }

  render () {
    let currentParticipants = this.props.currentParticipants
    let currentTraining = this.props.currentTraining
    let selectedTrainees = this.props.currentTrainees.map(function (trainee, index) {
      let corresParticipant = currentParticipants.find(function (part) {
        return (part.trainee_id === trainee.id && part.training_id === currentTraining.id)
      })
      let lastHeartRate = corresParticipant.heart_rate.slice(-1)[0]
      return (
        <div key={index} className='col-sm-12'>
          <h3>
            {trainee.first_name + ' ' + trainee.last_name + ': ' + lastHeartRate + '/' + (220 - trainee.age) + ' (' + Math.round((lastHeartRate / (220 - trainee.age)) * 100) + '%)' }
          </h3>
        </div>
      )
    })

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-sm-offset-2'>
            <h1>Current Session</h1>
            <h3>
              Activity: {this.props.activityName + ' (Max ' + this.props.threshold + '%)'}
            </h3>
            <h3>Location: {currentTraining.location}</h3>
            {selectedTrainees}
            <div className='col-sm-6 text-center'>
              <button onClick={this.startTraining.bind(this)}>
                <i className='fa fa-play-circle-o fa-5x' aria-hidden='true' />
              </button>
              <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            </div>
            <div className='col-sm-6 text-center'>
              <button onClick={this.stopTraining.bind(this)}>
                <i className='fa fa-stop-circle-o fa-5x' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
