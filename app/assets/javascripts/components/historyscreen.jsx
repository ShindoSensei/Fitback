/* globals React */

class History extends React.Component {
  render () {
    let trainingHistory = this.props.trainingHist.map(function (train, index) {
      let mytime = new Date(train.training_time)
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
                <p>Time: {("0" + (mytime.getHours()-8)).slice(-2)   + ":" +
                  ("0" + mytime.getMinutes()).slice(-2)}</p>
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
            {trainingHistory}
        </div>
      </div>
    )
  }
}
