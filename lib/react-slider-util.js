
import React from 'react';

class ReactSliderUtil extends React.Component {

    /**
     * prop types
     * @type {{min: number, max: number, value: number, showMinMax: boolean, debug: boolean}}
     */
    static propTypes = {
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        value: React.PropTypes.number,
        showMinMax: React.PropTypes.bool,
        debug: React.PropTypes.bool
    };

    /**
     * constructor
     * @param props
     */
    constructor( props ) {
        super( props );

        this.min = parseInt(this.props.min);
        this.max = parseInt(this.props.max);

        this.state = {
            sliderPos: this.props.value ? this.props.value : (this.min + this.max) / 2,
            dragging: false,
            value: 0
        };

        if (this.props.debug == true) {
            console.log('React Slider Util - Debug: on');
            console.log(this.props);
        }
    }

    sliderDragOn = (e) => {
        this.setState({
            dragging: true
        });
        this.handleMouseEvents();
        console.log(this.getMousePosition(e));
    };

    sliderDragOff = (e) => {
        this.setState({
            dragging: false
        });
        this.handleMouseEventsOff();
    };

    dragging = (e) => {
        var sliderTrack = document.querySelector('.slider-track');
        var sliderControl = document.querySelector('.slider-control');
        var mousePosition = this.getMousePosition(e);

        var sliderMin = sliderTrack.getBoundingClientRect().left;
        var sliderMax = sliderTrack.getBoundingClientRect().right - parseInt(sliderControl.style.width);

        if (mousePosition <= sliderMin) {
            sliderControl.style.left = '0px';
        }
        else if (mousePosition >= sliderMax) {
            sliderControl.style.left = sliderTrack.clientWidth - parseInt(sliderControl.style.width) + 'px';
        }
        else {
            sliderControl.style.left = ( mousePosition - sliderTrack.getBoundingClientRect().left ) + 'px';
        }
    };

    getMousePosition(e) {
        return e.pageX;
    }

    handleMouseEvents() {
        document.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.sliderDragOff);
    }

    handleMouseEventsOff() {
        document.removeEventListener('mousemove', this.dragging);
    }

    /**
     * render slider
     * @returns {XML}
     */
    render() {

        // styles (if no css classes are set)
        const sliderWrapper = {
            position: 'relative',
            width: '100%',
            height: '30px'
        };

        const sliderMin = {
            display: 'none',
            width: 'auto'
        };

        const sliderMax = {
            display: 'none',
            width: 'auto'
        };

        const sliderTrack = {
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            height: '6px',
            backgroundColor: '#999999',
            borderRadius: '3px'
        };

        const sliderControl = {
            position: 'absolute',
            top: '-7px',
            left: '0px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#000000',
            cursor: 'pointer'
        };

        if (this.props.showMinMax == true) {
            sliderMin.display = 'inline-block';
            sliderMax.display = 'inline-block';
            sliderTrack.width = '88%';
        }

        console.log(this.state);

        return (
            <div style={ sliderWrapper }>
                <div style={ sliderMin }>
                    { this.props.min }
                </div>
                <div className="slider-track" style={ sliderTrack }>
                    <div
                        className="slider-control"
                        onMouseDown={ this.sliderDragOn }
                        onMouseUp={ this.sliderDragOff }
                        style={ sliderControl }>
                    </div>
                </div>
                <div style={ sliderMax }>
                    { this.props.max }
                </div>
            </div>
        );
    }
}

export default ReactSliderUtil;
