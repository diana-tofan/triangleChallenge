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
    const onKeyDown = (ev, side) => {
      const value = ev.target.value;
      // Ensure the input string is a valid floating point number
      if ([69, 187, 188, 189].includes(ev.keyCode) || // prevent 'e', '=', ',' and '-' from being typed
        (ev.keyCode === 190 && value.indexOf('.') !== -1)) { // allow only one dot
        ev.preventDefault();
      } else {
        this.setState({
          [side]: value
        });
      }
    };

    const isTriangle = (side1, side2, side3) => {
      if ((side1 + side2 > side3) && (side1 + side3 > side2) && (side2 + side3 > side1)) { // triangle inequality theorem
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

    const validateLengths = sides => { // 'sides' is an array containing the 3 side lengths
      // Function that verifies if a given side length is valid
      const isValid = (side, nr) => { // side = side length, nr = side index (1, 2 or 3)
        const key = `side${nr}Err`;
        let message = ''; // error message is initially empty
        if (side === 0) { // if side length is 0
          message = 'Input field is null';
        } else if (side === '') { // if side length is empty
          message = 'Input field is empty';
        }
        this.setState({
          [key]: message // we update the error message
        });
        return message === ''; // if error message is still empty, then the side length is valid
      };
      // We filter out the invalid lengths from the 'sides' array
      // If the array stays untouched (i.e. still contains 3 items), then all triangle lengths are valid
      return sides.filter((side, i) => isValid(side, i + 1)).length === 3;
    };

    const getTriangleType = () => {
      let triangleType = '';
      let { side1, side2, side3 } = this.state; // triangle side lengths
      // Convert the user input strings to numbers (if they are not empty)
      side1 = !!side1 ? parseFloat(side1) : side1;
      side2 = !!side2 ? parseFloat(side2) : side2;
      side3 = !!side3 ? parseFloat(side3) : side3;
      /* Before determining the triangle type, we perform two kinds of validation:
          validateLengths - ensures the given side lengths are not 0 or empty
          isTriangle - checks whether the given side lengths can form a triangle (based on triangle inequality theorem)
      */
      if (validateLengths([side1, side2, side3]) && isTriangle(side1, side2, side3)) {
        if (side1 === side2 && side2 === side3 && side1 === side3) { // if all three sides are equal
          triangleType = 'equilateral';
        } else if (side1 === side2 || side2 === side3 || side1 === side3) { // if two sides are equal
          triangleType = 'isosceles';
        } else { // if no sides are equal
          triangleType = 'scalene';
        }
      }
      this.setState({
        triangleType
      });
    };

    return (
      <div>
        <div data-ts='Board' className='board'>
          <div data-ts='Panel'>
          <form data-ts='Form'>
            <fieldset className='ts-fieldset'>
              <label className={classNames({'ts-error': this.state.side1Err || this.state.triangleErr})}>
                <span>Side 1</span>
                <input
                  type='number'
                  onKeyDown={ev => onKeyDown(ev, 'side1')}
                />
              </label>
              {
                !!this.state.side1Err &&
                <dl className='ts-errors'>
                  <dt>Invalid value</dt>
                  <dd>{this.state.side1Err}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className='ts-fieldset'>
              <label className={classNames({'ts-error': this.state.side2Err || this.state.triangleErr})}>
                <span>Side 2</span>
                <input
                  type='number'
                  onKeyDown={ev => onKeyDown(ev, 'side2')}
                />
              </label>
              {
                !!this.state.side2Err &&
                <dl className='ts-errors'>
                  <dt>Invalid value</dt>
                  <dd>{this.state.side2Err}</dd>
                </dl>
              }
            </fieldset>
            <fieldset className='ts-fieldset'>
              <label className={classNames({'ts-error': this.state.side3Err || this.state.triangleErr})}>
                <span>Side 3</span>
                <input
                  type='number'
                  onKeyDown={ev => onKeyDown(ev, 'side3')}
                />
              </label>
              {
                !!this.state.side3Err &&
                <dl className='ts-errors'>
                  <dt>Invalid value</dt>
                  <dd>{this.state.side3Err}</dd>
                </dl>
              }
            </fieldset>
            <div className='button-wrapper'>
              <button
                data-ts='Button'
                className='ts-primary'
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
