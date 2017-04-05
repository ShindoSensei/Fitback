/* globals React $ */

class UpcomingTrainings extends React.Component {

  addTraining (event) {
    event.preventDefault()
    this.props.freshForm()
  }

  handleEdit (event) {
    let trainingId = event.target.getAttribute('data-id')
    $.ajax({
      url: '/trainings/' + trainingId + '/edit.json',
      method: 'GET',
      success: function (json) {
        this.props.editForm(json)
      }.bind(this)
    })
  }

  handleDelete (event) {
    let trainingId = event.target.getAttribute('data-id')
    $.ajax({
      url: '/trainings/' + trainingId,
      method: 'DELETE',
      success: function (data) {
        console.log('successfully deleted')
        this.props.deleteTraining()
      }.bind(this)
    })
  }

  handleSelect (event) {
    let trainingId = event.target.getAttribute('data-id')
    this.props.handleSelect(trainingId)
  }

  render () {
    let trainingLocations = this.props.training.map(function (train, index) {
      let displayTime = new Date(train.training_time)
      let myActivityId = train.activity_id
      let activityObj = this.props.activity.find(function (item) {
        return item.id === myActivityId
      })

      return (
        <div key={index} className='col-md-12 col-sm-12'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h1 className='panel-title'>Activity: {activityObj.activity_type}</h1>
            </div>
            <div className='panel-body'>
              <div className='col-md-6'>
                <h3>Location: <br />{train.location}</h3>
                <h5>Platoon: {train.platoon_num}</h5>
                <h5>Date: {train.training_date}</h5>
                <h5>Time: {('0' + (displayTime.getUTCHours())).slice(-2) + ':' +
                  ('0' + displayTime.getMinutes()).slice(-2)}</h5>
              </div>
              <div className='col-md-6'>
                <div className='btn-group pull-right' role='group' aria-label='...'>
                  <button
                    data-id={train.id}
                    onClick={this.handleSelect.bind(this)} type='button' className='btn btn-success' disabled={this.props.btnsDisabled}><i className='fa fa-play-circle-o' aria-hidden='true' /> Select</button>
                  <button data-id={train.id} onClick={this.handleEdit.bind(this)} type='button' className='btn btn-primary' disabled={this.props.btnsDisabled}><i className='fa fa-pencil' aria-hidden='true' /> Edit</button>
                  <button type='button' data-id={train.id} onClick={this.handleDelete.bind(this)} className='btn btn-danger' disabled={this.props.btnsDisabled}><i className='fa fa-minus-square-o' aria-hidden='true' /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }.bind(this))

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8'>
            <h2>Upcoming Training</h2>
          </div>
          <div className='col-sm-4'>
            <a className='' href='#' onClick={this.addTraining.bind(this)}><h1 className='pull-right'><i className='fa fa-plus-square-o' /></h1></a>
          </div>
        </div>
        <div className='row'>
          {trainingLocations}
        </div>
      </div>
    )
  }
}
