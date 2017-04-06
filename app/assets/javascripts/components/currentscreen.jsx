/* globals React PopupAAR $ */

class CurrentSession extends React.Component {

  constructor () {
    super()
    this.state = {
      timerId: '',
      HrNotify: '',
      isAARModalOpen: false,
      remark: '',
      startbutton: false,
      stopbutton: true
    }
  }

  startTraining () {
    $.ajax({
      // GET to this url initiates the app to begin subscribing to MQTT broadcast
      url: '/start_training/' + this.props.currentTraining.id + '.json',
      method: 'GET',
      success: function (data) {
        this.props.currentSessionStatus('running')
        var intervalId = setInterval(function () {
          console.log('entering setInterval function')
          $.ajax({
            url: '/participants.json',
            method: 'GET',
            data: {
              trainingId: this.props.currentTraining.id
            },
            success: function (updatedParticipants) {
              // Returned data is array of selected participants of this session updated with new heart rate
              console.log('received updated Participants from server' + updatedParticipants)
              this.props.updateCurrentParticipants(updatedParticipants)
            }.bind(this)
          })
        }.bind(this), 1000)

        this.setState({
          timerId: intervalId,
          startbutton: true,
          stopbutton: false
        })
        console.log('IntervalId is ' + intervalId) // run
        console.log('this.state.timerId is ' + this.state.timerId) // run
      }.bind(this)

    })
    // Whenever heartRate crosses threshold, send alert to display
    // Disable all select buttons on upcoming screen & highlight currently running session
  }

  stopTraining () {
    // Stop interval of ajax call
    console.log('Entering stopTraining')
    clearInterval(this.state.timerId)
    this.setState({
      startbutton: true,
      stopbutton: true
    })
    $.ajax({
      url: '/stop_training/' + this.props.currentTraining.id + '.json',
      method: 'GET',
      success: function (data) {
        // put the function to open popupAAR
        this.openAARModal()
        // code above this function to
         // enables footer buttons, move this over to AAR onSubmit function. currentSessionStatus('ended') should only be run after AAR is submitted
        console.log('successfully stopped training')
      }.bind(this)
    })
    // Activate AAR box that pops up
    // Upon clicking stop session, add this training to history and remove from upcoming
  }
  handleFormInput (event) {
    let inputName = event.target.name
    console.log(event.target.value)
    this.setState({
      [inputName]: event.target.value
    })
  }
  updateAAR () {
    this.props.currentSessionStatus('ended')
    this.props.update()
    this.props.setRenderScreen('history')
  }
  openAARModal () {
    console.log('openAARModal called in app.jsx')
    this.setState({
      isAARModalOpen: true
    })
  }

  closeAARModal () {
    console.log('closeAARModal called in app.jsx')
    this.setState({
      isAARModalOpen: false
    })
  }

  componentWillReceiveProps () {
    let currentParticipants = this.props.currentParticipants
    let currentTrainees = this.props.currentTrainees
    let currentThreshold = this.props.threshold
    // alertParticipants is array of participants in danger
    let alertParticipants = currentParticipants.filter(function (part) {
      // For each participant which goes through filter function, check lastHeartRate and check who corresponding trainee is
      let lastHeartRate = part.heart_rate.slice(-1)[0]
      let corresTrainee = currentTrainees.find(function (trainee) {
        return trainee.id === part.trainee_id
      })
      // Return filtered array of only those trainees who cross threshold or have heart beat less than 27, lowest guiness book of record resting heart rate!

      return (
        Math.round((lastHeartRate / (220 - corresTrainee.age)) * 100) >= currentThreshold || lastHeartRate < 27
      )
    })

    if (alertParticipants.length > 0) {
      // If there are participants at risk, i.e. filled array, render below HrNotify
      let arrayOfRiskyTraineeIds = alertParticipants.map(function (part) {
        return part.trainee_id
      })

      let atRiskTrainees = currentTrainees.filter(function (trainee) {
        return arrayOfRiskyTraineeIds.includes(trainee.id)
      })

      var stringToPrint = 'Following in danger: '

      atRiskTrainees.forEach(function (trainee, index) {
        if (index === 0) {
          stringToPrint += trainee.first_name
        } else {
          stringToPrint += (', ' + trainee.first_name)
        }
      })
      this.setState({
        HrNotify: stringToPrint
      })
    } else {
      this.setState({
        HrNotify: ''
      })
    }
  }

  render () {
    if (!this.props.isTrainingSelected) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 col-sm-offset-2'>
              <div className='panel panel-default'>
                <div className='panel-heading'>
                  <h1 className='panel-title text-white'>Current Session</h1>
                </div>
                <div className='panel-body'>
                  <h3 className='text-white'>
                    Select a training in homepage to begin
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    let currentParticipants = this.props.currentParticipants
    let currentTrainees = this.props.currentTrainees
    let currentTraining = this.props.currentTraining
    // console.log('current trainees is ' + currentTrainees)// error
    // console.log('current training is ' + currentTraining)// ok
    // console.log('current participants is ' + currentParticipants)// error

    let renderTrainees = currentTrainees.map(function (trainee, index) {
      let corresParticipant = currentParticipants.find(function (part) {
        // return (part.trainee_id === trainee.id && part.training_id === currentTraining.id)
        return (
          part.trainee_id === trainee.id
        )
      })
      let lastHeartRate = corresParticipant.heart_rate.slice(-1)[0]
      return (
        <div key={index} className='col-sm-12'>
          <h4 className='text-white'>
            {trainee.first_name + ' ' + trainee.last_name + ': ' + lastHeartRate + '/' + (220 - trainee.age) + ' (' + Math.round((lastHeartRate / (220 - trainee.age)) * 100) + '%)' }
          </h4>
        </div>
      )
    })

    // console.log('renderTrainees is ' + renderTrainees)

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-sm-offset-2'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h1 className='panel-title text-white'>Current Session</h1>
              </div>
              <div className='panel-body'>
                <h3 className='text-white'>
                  Activity: {this.props.activityName + ' (Max ' + this.props.threshold + '%)'}
                </h3>
                <h3 className='text-white'>Location: {currentTraining.location}</h3>
                {renderTrainees}
                <div className='col-sm-12 text-center'>
                  <div hidden={this.state.startbutton}>
                  <button className='button-clear' onClick={this.startTraining.bind(this)} >
                    <i className='fa fa-play-circle-o fa-5x text-white small-padding-right' aria-hidden='true' />
                  </button>
                  </div>
                  <div hidden={this.state.stopbutton}>
                  <button className='button-clear' onClick={this.stopTraining.bind(this)}>
                    <i className='fa fa-stop-circle-o fa-5x text-white' aria-hidden='true' />
                  </button>
                  </div>
                </div>

                <div className='col-sm-12'>
                  <h3 className='text-white'>Notifications</h3>
                  <h4 className='text-white'>{this.state.HrNotify}</h4>
                </div>
              </div>

            </div>
          </div>
          <PopupAAR
            isAARModalOpen={this.state.isAARModalOpen}
            openAARModal={this.openAARModal.bind(this)}
            closeAARModal={this.closeAARModal.bind(this)}
            updateAAR={this.updateAAR.bind(this)}
            handleFormInput={this.handleFormInput.bind(this)}
            trainingId={this.props.currentTraining.id}
            remark={this.state.remark}
        />
        </div>
      </div>
    )
  }
}
