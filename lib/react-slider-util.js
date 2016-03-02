
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
            sliderPos: 0,
            dragging: false,
            value: this.props.value ? this.props.value : (this.min + this.max) / 2
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
            this.calculateValue(0);
        }
        else if (mousePosition >= sliderMax) {
            const position = sliderTrack.clientWidth - parseInt(sliderControl.clientWidth);
            sliderControl.style.left = position + 'px';
            this.calculateValue(position);
        }
        else {
            const max = ( mousePosition - sliderTrack.getBoundingClientRect().left );
            this.calculateValue(max);
            sliderControl.style.left = max + 'px';
        }
    };

    calculateValue(position) {
        var sliderTrack = document.querySelector('.slider-track');
        var sliderControl = document.querySelector('.slider-control');
        const { min, max } = this.props;
        //var ratio = max - min;
        var pos = position * max / (sliderTrack.clientWidth - sliderControl.clientWidth);
        console.log(pos);
        return pos;
    }

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
