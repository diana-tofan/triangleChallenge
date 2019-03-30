import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side1: '',
      side2: '',
      side3: '',
      triangleType: '',
      side1Err: false,
      side2Err: false,
      side3Err: false
    }
  }

  render() {
    const onChange = (ev, side) =>
      this.setState({
        [side]: ev.target.value
      });

    const validateLengths = (side1, side2, side3) => {
      const isValid = (side, nr) => {
        const key = `side${nr}Err`;
        if (side === '') {
          this.setState({
            [key]: {
              message: 'Input field is empty'
            }
          });
        } else if (side <= 0) {
          this.setState({
            [key]: {
              message: 'A positive number is required'
            }
          });
        }
      };
      isValid(side1, '1');
      isValid(side2, '2');
      isValid(side3, '3');
      return !this.state.side1Err && !this.state.side2Err && !this.state.side3Err;
    };

    const getTriangleType = () => {
      this.setState({
        side1Err: false,
        side2Err: false,
        side3Err: false
      });
      const { side1, side2, side3 } = this.state;
      if (validateLengths(side1, side2, side3)) {
        if (side1 === side2 && side2 === side3 && side1 === side3) {
          this.setState({
            triangleType: 'equilateral'
          });
        } else if (side1 === side2 || side2 === side3 || side1 === side3) {
          this.setState({
            triangleType: 'isosceles'
          });
        } else {
          this.setState({
            triangleType: 'scalene'
          });
        }
      }
    };

    return (
      <div>
        <div data-ts="Board" className="board">
          <div data-ts="Panel">
          <form data-ts="Form">
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side1Err})}>
                <span>Side 1</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side1')}
                />
              </label>
              {
                this.state.side1Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side1Err.message}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side2Err})}>
                <span>Side 2</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side2')}
                />
              </label>
              {
                this.state.side2Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side2Err.message}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side3Err})}>
                <span>Side 3</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side3')}
                />
              </label>
              {
                this.state.side3Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side3Err.message}</dd>
                </dl>
              }
            </fieldset>
            <div className='button-wrapper'>
              <button
                data-ts="Button"
                className="ts-primary"
                onClick={getTriangleType}
              >
                <span>Get triangle type</span>
              </button>
            </div>
          </form>
          {
            !!this.state.triangleType && !this.state.side1Err && !this.state.side2Err && !this.state.side3Err &&
            <div className='triangle-type'>
              Triangle is <b>{this.state.triangleType}</b>
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
