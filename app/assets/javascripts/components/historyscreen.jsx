/* globals React */

class History extends React.Component {
  render () {
    let trainingHistory = this.props.trainingHist.map(function (train, index) {
      let mytime = new Date(train.training_time)

      return (
        <div key={index} className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title text-white">Activity: {train.activity_type}</h1>
            </div>
            <div className="panel-body">
              <div className="col-xs-12">
                <h3 className='text-white'>Location: {train.location}</h3>
                <h5 className='text-white'>Date: {train.training_date}</h5>
                <h5 className='text-white'>Time: {("0" + (mytime.getUTCHours())).slice(-2)   + ":" +
                  ("0" + mytime.getMinutes()).slice(-2)}</h5>
                <h5 className='text-white'>AAR: {train.AAR}</h5>
              </div>
            </div>
          </div>
        </div>
      )
    }.bind(this))

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <h2 className='text-white'>Training History</h2>
          </div>
        </div>
          <div className="row">
            {trainingHistory}
        </div>
      </div>
    )
  }
}
