
import React from 'react';

class ReactSliderUtil extends React.Component {

    /**
     * prop types
     * @type {{min: *, max: *, value: *, showMinMax: *}}
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
            dragging: false
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
        console.log(this.getMousePosition(e));
    };

    sliderDragOff = (e) => {
        this.setState({
            dragging: false
        });
    };

    getMousePosition(e) {
        return e.pageX;
    }

    /**
     * render slider
     * @returns {XML}
     */
    render() {

        // styles (if no css classes are set)
        var sliderWrapper = {
            position: 'relative',
            width: '100%',
            height: '30px'
        };

        var sliderMin = {
            display: 'none',
            width: 'auto'
        };

        var sliderMax = {
            display: 'none',
            width: 'auto'
        };

        var sliderTrack = {
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            height: '6px',
            backgroundColor: '#999999',
            borderRadius: '3px'
        };

        var sliderControl = {
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
            console.log('its true');
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
                <div style={ sliderTrack }>
                    <div
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