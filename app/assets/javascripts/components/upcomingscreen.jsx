/* globals React */

class UpcomingTrainings extends React.Component {

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
