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
      side1Err: '',
      side2Err: '',
      side3Err: '',
      triangleErr: ''
    }
  }

  render() {
    const onChange = (ev, side) =>
      this.setState({
        [side]: ev.target.value
      });

    const isTriangle = (side1, side2, side3) => {
      if ((side1 + side2 > side3) && (side1 + side3 > side2) && (side2 + side3 > side1)) {
        this.setState({
          triangleErr: ''
        });
        return true;
      } else {
        this.setState({
          triangleErr: 'Sum of two side lengths should always be greater than third side'
        });
        return false;
      }
    };

    const validateLengths = sides => {
      const isValid = (side, nr) => {
        const key = `side${nr}Err`;
        let message = '';
        if (isNaN(side)) {
          message = 'Input field is empty';
        } else if (side <= 0) {
          message = 'A positive number is required';
        }
        this.setState({
          [key]: message
        });
        return message === '';
      };
      return sides.filter((side, i) => isValid(side, i + 1)).length === 3;
    };

    const getTriangleType = () => {
      let triangleType = '';
      let { side1, side2, side3 } = this.state;
      side1 = parseFloat(side1);
      side2 = parseFloat(side2);
      side3 = parseFloat(side3);
      if (validateLengths([side1, side2, side3]) && isTriangle(side1, side2, side3)) {
        if (side1 === side2 && side2 === side3 && side1 === side3) {
          triangleType = 'equilateral';
        } else if (side1 === side2 || side2 === side3 || side1 === side3) {
          triangleType = 'isosceles';
        } else {
          triangleType = 'scalene';
        }
      }
      this.setState({
        triangleType
      });
    };

    return (
      <div>
        <div data-ts="Board" className="board">
          <div data-ts="Panel">
          <form data-ts="Form">
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side1Err || this.state.triangleErr})}>
                <span>Side 1</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side1')}
                />
              </label>
              {
                !!this.state.side1Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side1Err}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side2Err || this.state.triangleErr})}>
                <span>Side 2</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side2')}
                />
              </label>
              {
                !!this.state.side2Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side2Err}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className="ts-fieldset">
              <label className={classNames({'ts-error': this.state.side3Err || this.state.triangleErr})}>
                <span>Side 3</span>
                <input
                  type="number"
                  onChange={ev => onChange(ev, 'side3')}
                />
              </label>
              {
                !!this.state.side3Err &&
                <dl className="ts-errors">
                  <dt>Invalid value</dt>
                  <dd>{this.state.side3Err}</dd>
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
            !!this.state.triangleType &&
            <div className='triangle-type'>
              Triangle is <b>{this.state.triangleType}</b>
            </div>
          }
            {
              !!this.state.triangleErr &&
              <dl className='ts-errors triangle-type triangle-error'>
                <dt><b>Invalid triangle</b></dt>
                <dd>{this.state.triangleErr}</dd>
              </dl>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
