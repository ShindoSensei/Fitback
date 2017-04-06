/* globals React $ */

class UpcomingTrainings extends React.Component {

  addTraining (event) {
    event.preventDefault()
    this.props.freshForm()
  }

  handleEdit (event) {
    event.preventDefault()
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
    event.preventDefault()
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
    event.preventDefault()
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
        <div key={index} className='col-xs-12'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h1 className='panel-title text-white'>Activity: {activityObj.activity_type}</h1>
            </div>
            <div className='panel-body'>
              <div className='col-xs-12'>
                <h3 className='text-white'>Location: {train.location}</h3>
                <h5 className='text-white'>Platoon: {train.platoon_num}</h5>
                <h5 className='text-white'>Date: {train.training_date}</h5>
                <h5 className='text-white'>Time: {('0' + (displayTime.getUTCHours())).slice(-2) + ':' +
                  ('0' + displayTime.getMinutes()).slice(-2)}</h5>
              </div>
              <div className='col-xs-12'>
                <div className='pull-right' role='group' aria-label='...'>
                  <a href='#'
                    onClick={this.handleSelect.bind(this)} className={this.props.btnsDisabled}>
                    <i data-id={train.id} className='fa fa-play-circle-o fa-3x small-padding-right text-white' aria-hidden='true' /></a>
                  <a href='#' onClick={this.handleEdit.bind(this)} className={this.props.btnsDisabled}><i data-id={train.id} className='fa fa-pencil-square-o fa-3x small-padding-right text-white' aria-hidden='true' /></a>

                  <a href='#' onClick={this.handleDelete.bind(this)} className={this.props.btnsDisabled}>
                    <i data-id={train.id} className='fa fa-trash-o fa-3x text-white' aria-hidden='true' />
                  </a>
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
          <div className='col-xs-8'>
            <h2 className='text-white'>Upcoming Training</h2>
          </div>
          <div className='col-xs-4'>
            <a href='#' onClick={this.addTraining.bind(this)}><h1 className='pull-right'><i className='fa fa-plus-square-o' /></h1></a>
          </div>
        </div>
        <div className='row'>
          {trainingLocations}
        </div>
      </div>
    )
  }
}
