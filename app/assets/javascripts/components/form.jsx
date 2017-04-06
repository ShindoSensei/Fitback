/* globals React $ */
class Form extends React.Component {

  constructor () {
    super()
    this.state = {
      validateHide: false,
      validateMsg: ''
    }
  }

  onInputChange (event) {
    this.props.handleFormInput(event)
  }

  submitFunc (event) {
    event.preventDefault()
    // 2017-04-30
    // if(this.props.trainingDate < Date.now().getDate)
    // console.log('this.props.trainingForm.place is ' + this.props.trainingForm)
    console.log('this.props.trainingDate is ' + this.props.trainingDate)
    console.log('this.props.trainingTime is ' + this.props.trainingTime)

    var httpMethod, httpUrl
    if (this.props.isEditForm) {
      httpMethod = 'PUT'
      httpUrl = '/trainings/' + this.props.trainingId
    } else {
      httpMethod = 'POST'
      httpUrl = '/trainings/'
    }
    $.ajax({
      url: httpUrl,
      method: httpMethod,
      data: {
        training: {
          activity_id: this.props.activityId,
          training_date: this.props.trainingDate,
          training_time: this.props.trainingTime,
          location: this.props.trainingPlace,
          platoon_num: parseInt(this.props.trainingPlatoon),
          duration: this.props.trainingDurn,
          trainingId: this.props.trainingId
        }
      },
      success: function (data) {
        console.log('new training created!')
        this.props.update()
        this.props.closeModal()
      }.bind(this)
    })
  }

  handleClose (event) {
        // event.preventDefault()
    console.log('handleClose function called in form.jsx')
    this.props.closeModal()
  }

  render () {
    if (!this.props.isOpen) {
      return null
    }
    // uniquePlatTrainees array of trainees with platoon_num field
    let allPlatoonNum = this.props.uniquePlatTrainees.map(function (trainee, index) {
      return (
        <option key={index} value={trainee.platoon_num}>
          {trainee.platoon_num}
        </option>
      )
    })

    let allActivities = this.props.activities.map(function (activity, index) {
      return (
        <option key={index} value={activity.id}>
          {activity.activity_type}
        </option>
      )
    })

    return (
      <div className='modalForm'>
        <div className='container' hidden={this.state.validateHide}>
          <p>{this.state.validateMsg}</p>
        </div>
        <div className='col-md-12 min-height'>
          <a onClick={this.handleClose.bind(this)}>
            <i className='fa fa-times fa-2x fa-pull-right' aria-hidden='true' />
          </a>
        </div>
          <form onSubmit={this.submitFunc.bind(this)} className='formBox'>
            <div className='col-md-12'>
            <label>
              Activity:
            </label>
            <select name='activity_id' value={this.props.activityId} onChange={this.onInputChange.bind(this)} required>
              {allActivities}
            </select>
            <label>
              Location:
            </label>
            <input name='place' type='text' value={this.props.trainingPlace} onChange={this.onInputChange.bind(this)} placeholder='Enter Training Location' required />
            <label>
              Platoon:
            </label>
            <select name='platoon' value={this.props.trainingPlatoon} onChange={this.onInputChange.bind(this)} required>
              {allPlatoonNum}
            </select>
            <label>
              Date:
            </label>
            <input name='date' type='date' value={this.props.trainingDate} onChange={this.onInputChange.bind(this)} required />
            <label>
              Time:
            </label>
            <input name='time' type='time' value={this.props.trainingTime} onChange={this.onInputChange.bind(this)} required />
            <label>
              Duration:
            </label>
            <input name='duration' type='number' min='1' value={this.props.trainingDurn} onChange={this.onInputChange.bind(this)} placeholder='Enter in mins' required />
          </div>
          <div className='col-md-12 text-center'>
            <button className='btn btn-lg button-black2 text-white'> Submit </button>
            </div>
          </form>
      </div>
    )
  }
}
