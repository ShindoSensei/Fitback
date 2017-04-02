/* globals React */

class UpcomingTrainings extends React.Component {
  // constructor () {
  //   super()
  //   this.state = {
  //     allActivities: []
  //   }
  // }
  // addTraining () {
  //   $.ajax({
  //     url: '/activities.json',
  //     method: 'GET',
  //     success: function (activitiesArr) {
  //       this.setState({
  //         allActivities: this.state.allActivities.concat(activitiesArr)
  //       })
  //     }
  //   })
  // }
  //
  // <button onClick={this.addTraining.bind(this)}>
  //   Add Training
  // </button>

  render () {
    let training_locations = this.props.training.map(function (train, index) {
      let my_time = new Date(train.training_time)
      let myActivityId = train.activity_id
      let activityObj = this.props.activity.find(function (item){
          return item.id === myActivityId
      })

      return (
        <div key={index} className="col-md-6 col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title">Activity: {activityObj.activity_type}</h1>
            </div>
            <div className="panel-body">
              <div className="col-md-6">
                <h3>Location: {train.location}</h3>
                <p>Date: {train.training_date}</p>
                <p>Time: {("0" + (my_time.getHours()-8)).slice(-2)   + ":" +
                  ("0" + my_time.getMinutes()).slice(-2)}</p>
              </div>
              <div className="col-md-6">
                <div className="btn-group pull-right" role="group" aria-label="...">
                  <button type="button" className="btn btn-primary"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                  <button type="button" className="btn btn-danger"><i className="fa fa-minus-square-o" aria-hidden="true"></i> Delete</button>
                </div>

              </div>
              </div>
          </div>
        </div>
      )
    }.bind(this))

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>Upcoming Training</h2>
          </div>
          <div className="col-sm-4">
            <a className="" href="#"><h1 className="pull-right"><i className="fa fa-plus-square-o"></i></h1></a>
          </div>
        </div>
          <div className="row">
            {training_locations}
        </div>
      </div>
    )
  }
}
