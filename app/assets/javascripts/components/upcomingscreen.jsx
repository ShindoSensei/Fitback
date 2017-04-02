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
    let allTrainings = this.props.training.map(function (train, index) {
      return (
        <p key={index}>{train.location}</p>
      )
    })

    return (
      <div>
        {allTrainings}
      </div>
    )
  }
}
