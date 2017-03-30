/* globals React */

class Form extends React.Component {

  render () {
    return (
      <div>
        Create/Update form for trainings here. This will be a pop-up window and will not be one of the 3 screen states. A way to do this is to toggle display:none at the beginning state and when required, do a CSS transition to appear in the middle of screen, covering most of the app and bluring out the edges, creating the impression that it is 'popping out'
      </div>
    )
  }
}
