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

  render () {
    let training_locations = this.props.training.map(function (train, index) {
      let my_time = new Date(train.training_time)
      let myActivityId = train.activity_id
      let activityObj = this.props.activity.find(function (item) {
        return item.id === myActivityId
      })

      return (
        <div key={index} className="col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title text-white">Activity: {activityObj.activity_type}</h1>
            </div>
            <div className="panel-body">
              <div className="col-md-6">
                <h3>Location: {train.location}</h3>
                <h5>Date: {train.training_date}</h5>
                <h5>Time: {("0" + (my_time.getUTCHours())).slice(-2)   + ":" +
                  ("0" + my_time.getMinutes()).slice(-2)}</h5>
              </div>
              <div className='col-md-6'>
                <div className='pull-right' role='group' aria-label='...'>
                  <a href='#' onClick={this.handleEdit.bind(this)}><i data-id={train.id} className='fa fa-pencil-square-o fa-3x small-padding-right' aria-hidden='true' /></a>
                  <a href='#'><i className='fa fa-trash-o fa-3x' aria-hidden='true' /></a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )
    }.bind(this))

    return (
      <div className='container bckg1'>
        <div className='row'>
          <div className='col-sm-8'>
            <h2>Upcoming Training</h2>
          </div>
          <div className='col-sm-4'>
            <a href='#' onClick={this.addTraining.bind(this)}><h1 className='pull-right'><i className='fa fa-plus-square-o' /></h1></a>
          </div>
        </div>
        <div className='row'>
          {training_locations}
        </div>
      </div>
    )
  }
}
