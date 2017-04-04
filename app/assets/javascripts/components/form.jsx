/* globals React $ */
class Form extends React.Component {

  onInputChange (event) {
    this.props.handleFormInput(event)
  }

  submitFunc (event) {
    event.preventDefault()
    // console.log('this.props.trainingForm.place is ' + this.props.trainingForm)
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
          platoon_num: this.props.trainingPlatoon,
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
      // hide form at start
      return null
    }

    let allActivities = this.props.activities.map(function (activity, index) {
      return (
        <option key={index} value={activity.id}>
          {activity.activity_type}
        </option>
      )
    })

    return (
      <div className='modalForm'>

        <a onClick={this.handleClose.bind(this)}>
          <i className='fa fa-times fa-2x fa-pull-right' aria-hidden='true' />
        </a>
        <form onSubmit={this.submitFunc.bind(this)} className='formBox'>
          <label>
              Activity:
              <select
                name='activity_id'
                value={this.props.activityId}
                onChange={this.onInputChange.bind(this)}
                required>
                {allActivities}
              </select>
          </label>
          <br />
          <label>
              Location:
              <input
                name='place'
                type='text'
                value={this.props.trainingPlace} onChange={this.onInputChange.bind(this)}
                placeholder='Enter Training Location'
                required
              />
          </label>
          <br />
          <label>
              Platoon:
              <input
                name='platoon'
                type='number'
                value={this.props.trainingPlatoon} onChange={this.onInputChange.bind(this)}
                placeholder='Enter Platoon no.'
                required
              />
          </label>
          <br />
          <label>
              Date:
              <input
                name='date'
                type='date'
                value={this.props.trainingDate}
                onChange={this.onInputChange.bind(this)}
                required
              />
          </label>
          <br />
          <label>
              Time:
              <input
                name='time'
                type='time'
                value={this.props.trainingTime}
                onChange={this.onInputChange.bind(this)}
                required
              />
          </label>
          <br />
          <label>
              Duration:
              <input
                name='duration'
                type='number'
                value={this.props.trainingDurn}
                onChange={this.onInputChange.bind(this)}
                placeholder='Enter in mins'
                required
              />
          </label>
          <br />
          <button className='btn btn-success btn-xs'>
              Submit
            </button>
        </form>
      </div>
    )
  }
}
