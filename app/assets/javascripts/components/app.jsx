/* globals React FixedHeader FixedFooter UpcomingTrainings Form History CurrentSession $ */

class App extends React.Component {
  constructor (props) {
    // Must pass in props here because React only assigns props on constructed instance right after construction. Hence, we make use of the fact that React passes props to constructor by default
    super(props)
    this.state = {
      training: this.props.training,
      screen: 'upcoming',
      trainingHist: this.props.trainingHist,
      isModalOpen: false,
      // Form states below
      activity_id: 1,
      date: '',
      time: '00:00:00',
      place: '',
      platoon: '',
      duration: ''
    }
  }

  handleFormInput (event) {
    let inputName = event.target.name
    console.log(event.target.value)
    this.setState({
      [inputName]: event.target.value
    })
  }

  openModal () {
    console.log('openModal called in app.jsx')
    this.setState({ isModalOpen: true })
  }

  closeModal () {
    console.log('closeModal called in app.jsx')
    this.setState({ isModalOpen: false })
  }

  updateUpcoming () {
    $.ajax({
      url: '/trainings.json',
      method: 'GET',
      success: function (data) {
        this.setState({
          training: data
        })
        console.log('trainings updated on upcoming page')
        this.setState({
          isModalOpen: false
        })
      }.bind(this)
    })
  }

  freshForm () {
    // reset form to fresh
    this.setState({
      activity_id: 1,
      date: '',
      time: '00:00:00',
      place: '',
      platoon: '',
      duration: ''
    })
    this.openModal()
  }

  handleEditForm (json) {
    // original json.training.training_time in postgreSQL database is  "2000-01-01T15:00:00.000Z"
    // need to shorten to HTML format of "HH:mm:ss.SSS"
    let timeShortened = json.training.training_time.substring(11, 23)
    this.setState({
      activity_id: json.training.activity_id,
      date: json.training.training_date,
      time: timeShortened,
      place: json.training.location,
      platoon: json.platoon_num,
      duration: json.training.duration
    })
    this.openModal()
  }

  render () {
    var screenRender
    if (this.state.screen === 'upcoming') {
      screenRender = <UpcomingTrainings
        training={this.state.training}
        openModal={this.openModal.bind(this)} activity={this.props.activity}
        editForm={this.handleEditForm.bind(this)}
        freshForm={this.freshForm.bind(this)}
      />
    } else if (this.state.screen === 'history') {
      screenRender = <History trainingHist={this.state.trainingHist} activity={this.props.activity} />
    } else if (this.state.screen === 'current') {
      screenRender = <CurrentSession />
    }

    return (
      <div>
        <FixedHeader />
        <div className='mainScreen'>
          {screenRender}
          <Form
            isOpen={this.state.isModalOpen}
            closeModal={this.closeModal.bind(this)}
            update={this.updateUpcoming.bind(this)}
            activities={this.props.activity}
            handleFormInput={this.handleFormInput.bind(this)}
            activityId={this.state.activity_id}
            trainingDate={this.state.date}
            trainingTime={this.state.time}
            trainingPlatoon={this.state.platoon}
            trainingDurn={this.state.duration}
            trainingPlace={this.state.place}
          />
        </div>
        <FixedFooter />
      </div>
    )
  }
}
