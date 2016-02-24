
import React from 'react';

class ReactSliderUtil extends React.Component {
    constructor( props ) {
        super( props );

        this.sliderDrag = (e) => {
            console.log(e);
        }
    }

    //sliderDrag(event) {
    //    console.log(event);
    //};

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

        return (
            <div style={ sliderWrapper }>
                <div style={ sliderMin }>
                    { this.props.min }
                </div>
                <div style={ sliderTrack }>
                    <div onMouseDown={ this.sliderDrag } onMouseUp={ this.sliderDrag } style={ sliderControl }></div>
                </div>
                <div style={ sliderMax }>
                    { this.props.max }
                </div>
            </div>
        );
    }
}

ReactSliderUtil.propTypes = {
    min: React.PropTypes.string.isRequired,
    max: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    showMinMax: React.PropTypes.bool
};

export default ReactSliderUtil;