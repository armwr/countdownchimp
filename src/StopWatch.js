import React, { Component } from 'react';
import './App.css';
import { Alert, Button, Form, FormControl} from 'react-bootstrap';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSeconds: '',
      seconds: 0,
      timerStarted: false,
      showMessage: false
    }
    this.timer = null;
  }


  updateTimer() {
    const { timerStarted } = this.state;

    if (!timerStarted) {
      this.setState({timerStarted: true});
      this.timer = setInterval(() => this.setState({seconds: this.state.seconds - 1, showMessage: true}), 1000);
    } else {
      this.setState({timerStarted: false});
      clearInterval(this.timer);
    }
  }
  addSeconds() {
    this.setState({seconds: this.state.initialSeconds, initialSeconds: '', showMessage: false, timerStarted: false});
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState({seconds: '', timerStarted: false, showMessage: false, initialSeconds: ''});
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        <h1>
          {
            this.state.seconds > 0 ? `${this.state.seconds} seconds` :
            this.state.showMessage ? <Alert>Your time is over!</Alert> : 'Start the stopwatch'
          }
        </h1>
        <Form inline>
          <FormControl
            onChange={event => this.setState({initialSeconds: event.target.value})}
            className="Deadline-input"
            placeholder='type value in a seconds'
            value={this.state.initialSeconds}
          />
          {
            this.state.seconds > 0
            ? ''
            : <Button
                 onClick={() => this.addSeconds()}
                >
                  Add seconds
              </Button>
          }
          {
            this.state.seconds >= 0 
            ? <Button onClick={() => this.updateTimer()}>
                {this.state.timerStarted ? 'Stop timer' : 'Start timer'}
              </Button>
            : ''
          }
          <Button onClick={() => this.resetTimer()}>
            Reset
          </Button>
        </Form>
      </div>
    )
  }
}


export default StopWatch;