/* globals React $ */
// Create/Update form for trainings here. This will be a pop-up window and will not be one of the 3 screen states. A way to do this is to toggle display:none at the beginning state and when required, do a CSS transition to appear in the middle of screen, covering most of the app and bluring out the edges, creating the impression that it is 'popping out'

class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      activity_id: 1,
      date: '',
      time: '',
      place: '',
      platoon: '',
      duration: '',
      modalDisplay: 'hidden'
    }
  }

  onInputChange (event) {
    let inputName = event.target.name
    this.setState({
      [inputName]: event.target.value
    })
  }

  submitFunc (event) {
    event.preventDefault()
    $.ajax({
      url: '/trainings',
      method: 'POST',
      data: {
        training: {
          activity_id: this.state.activity_id,
          training_date: this.state.date,
          training_time: this.state.time,
          location: this.state.place,
          platoon_num: this.state.platoon,
          duration: this.state.duration
        }
      },
      success: function (data) {
        console.log('new training created!')
        this.props.update()
      }.bind(this)
    })
  }

  render () {
    let allActivities = this.props.activities.map(function (activity, index) {
      return (
        <option key={index} value={activity.id}>
          {activity.activity_type}
        </option>
      )
    })

    return (
      <form onSubmit={this.submitFunc.bind(this)}>
        <label>
            Activity:
            <select
              name='activity_id'
              value={this.state.activity_id} onChange={this.onInputChange.bind(this)}
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
              value={this.state.place} onChange={this.onInputChange.bind(this)}
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
              value={this.state.platoon} onChange={this.onInputChange.bind(this)}
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
              value={this.state.date} onChange={this.onInputChange.bind(this)}
              required
            />
        </label>
        <br />
        <label>
            Time:
            <input
              name='time'
              type='time'
              value={this.state.time} onChange={this.onInputChange.bind(this)}
              required
            />
        </label>
        <br />
        <label>
            Duration:
            <input
              name='duration'
              type='number'
              value={this.state.duration} onChange={this.onInputChange.bind(this)}
              placeholder='Duration in mins'
              required
            />
        </label>
        <br />
        <button className='btn btn-success btn-xs'>
            Add Training
          </button>
      </form>
    )
  }
}
