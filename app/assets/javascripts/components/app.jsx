/* globals React FixedHeader FixedFooter UpcomingTrainings Form History CurrentSession User $ */

class App extends React.Component {
  constructor (props) {
    // Must pass in props here because React only assigns props on constructed instance right after construction. Hence, we make use of the fact that React passes props to constructor by default
    super(props)
    this.state = {
      // first 3 states are full data set from server
      training: this.props.training,
      trainingHist: this.props.trainingHist,
      trainingParticipants: this.props.participants,
      screen: 'upcoming',
      isModalOpen: false,
      isEditForm: false,
      // upcoming states below
      btnsDisabled: 'enabled',
      // Form states below
      activity_id: 1,
      trainingId: '',
      date: '',
      time: '00:00:00',
      place: '',
      platoon: 1,
      duration: '',
      // User states below
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      userid: '',
      footerBtnsDisabled: 'enabled',
      // Current Session states below
      currentActivity: '',
      currentTraining: {},
      currentThres: '',
      currentTrainees: [],
      currentParticipants: [],
      isTrainingSelected: false
    }
  }
  setRenderScreen (newScreen, json) {
    if (newScreen === 'user') {
      this.setState({
        firstName: json.user.first_name,
        lastName: json.user.last_name,
        email: json.user.email,
        userid: json.user.id,
        screen: newScreen
      })
    } else {
      this.setState({
        screen: newScreen
      })
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
    this.setState({
      isModalOpen: true,
      footerBtnsDisabled: 'disabled'

    })
  }

  closeModal () {
    console.log('closeModal called in app.jsx')
    this.setState({
      isModalOpen: false,
      footerBtnsDisabled: 'enabled'
    })
  }

  updateUpcomingHist () {
    $.ajax({
      url: '/trainings.json',
      method: 'GET',
      success: function (data) {
        this.setState({
          training: data.training_all,
          trainingHist: data.training_hist,
          trainingParticipants: data.participants_all
        })
        console.log('trainings updated on upcoming page after create/edit')
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
      platoon: 1,
      duration: '',
      isEditForm: false
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
      duration: json.training.duration,
      isEditForm: true,
      trainingId: json.training.id
    })
    this.openModal()
  }

  handleDeleteTraining () {
    console.log('entering parent handleDeleteTraining')
    $.ajax({
      url: '/trainings.json',
      method: 'GET',
      success: function (data) {
        this.setState({
          training: data.training_all
        })
        console.log('trainings updated on upcoming page after delete')
      }.bind(this)
    })
  }

  handleSelect (trainingId) {
    // upon selecting a training on upcoming page, change states associated with current session
    // this.state.training is an array of training objects
    let selectedTraining = this.state.training.find(function (train) {
      return train.id === parseInt(trainingId)
    })

    let selectedActivity = this.props.activity.find(function (act) {
      return act.id === selectedTraining.activity_id
    })

    // this.props.participants is array of all participants in database
    let selectedParticipants = this.state.trainingParticipants.filter(function (part) {
      // console.log('trainingId is ' + trainingId) //ok
      return part.training_id === parseInt(trainingId)
    })

    let selectedTrainees = this.props.trainees.filter(function (trainee) {
      return trainee.platoon_num === selectedTraining.platoon_num
    })
    // console.log('selectedTraining is ' + selectedTraining) // ok
    // console.log('selectedTrainees is ' + selectedTrainees)// ok
    console.log('selectedParticipants is ' + selectedParticipants)// not ok
    // console.log('this.props.participants is ' + this.props.participants) //ok
    // console.log('this.props.trainees is ' + this.props.trainees) //ok
    // console.log('this.props.training is ' + this.props.training) //ok

    this.setState({
      currentActivity: selectedActivity.activity_type,
      currentThres: selectedActivity.threshold,
      currentTrainees: selectedTrainees,
      currentTraining: selectedTraining,
      currentParticipants: selectedParticipants,
      isTrainingSelected: true,
      screen: 'current'
    })
  }

  updateCurrentParticipants (updatedParticipants) {
    // update state of currentParticipants to update HR
    this.setState({
      currentParticipants: updatedParticipants
    })
    console.log('successfully updated state with updated participants from server')
  }

  currentSessionStatus (status) {
    if (status === 'running') {
      this.setState({
        // disable all buttons on upcoming page
        btnsDisabled: 'disabled',
        footerBtnsDisabled: 'disabled'
      })
    } else if (status === 'ended') {
      this.setState({
        btnsDisabled: 'enabled',
        footerBtnsDisabled: 'enabled',
        isTrainingSelected: false
      })
    }
  }

  render () {
    var screenRender
    if (this.state.screen === 'upcoming') {
      screenRender = <UpcomingTrainings
        training={this.state.training}
        openModal={this.openModal.bind(this)} activity={this.props.activity}
        editForm={this.handleEditForm.bind(this)}
        freshForm={this.freshForm.bind(this)}
        deleteTraining={this.handleDeleteTraining.bind(this)}
        handleSelect={this.handleSelect.bind(this)}
        btnsDisabled={this.state.btnsDisabled}
      />
    } else if (this.state.screen === 'history') {
      screenRender = <History trainingHist={this.state.trainingHist} activity={this.props.activity} />
    } else if (this.state.screen === 'current') {
      screenRender = <CurrentSession
        activityName={this.state.currentActivity} threshold={this.state.currentThres} currentParticipants={this.state.currentParticipants}
        currentTrainees={this.state.currentTrainees}
        currentTraining={this.state.currentTraining}
        updateCurrentParticipants={this.updateCurrentParticipants.bind(this)}
        currentSessionStatus={this.currentSessionStatus.bind(this)}
        footerBtnsDisabled={this.state.footerBtnsDisabled}
        update={this.updateUpcomingHist.bind(this)}
        setRenderScreen={this.setRenderScreen.bind(this)}
        isTrainingSelected={this.state.isTrainingSelected}
      />
    } else if (this.state.screen === 'user') {
      screenRender = <User
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        password={this.state.password}
        email={this.state.email}
        handleFormInput={this.handleFormInput.bind(this)}
        />
    }

    return (
      <div>
        <FixedHeader />
        <div className='mainScreen' id='wrap'>
          {screenRender}
          <Form
            isOpen={this.state.isModalOpen}
            isEditForm={this.state.isEditForm}
            closeModal={this.closeModal.bind(this)}
            update={this.updateUpcomingHist.bind(this)}
            activities={this.props.activity}
            handleFormInput={this.handleFormInput.bind(this)}
            trainingId={this.state.trainingId}
            activityId={this.state.activity_id}
            trainingDate={this.state.date}
            trainingTime={this.state.time}
            trainingPlatoon={this.state.platoon}
            trainingDurn={this.state.duration}
            trainingPlace={this.state.place}
            uniquePlatTrainees={this.props.trainees_unique_plat}
          />
        </div>
        <FixedFooter setRenderScreen={this.setRenderScreen.bind(this)} footerBtnsDisabled={this.state.footerBtnsDisabled} />
      </div>
    )
  }
}
