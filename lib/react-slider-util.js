
import React from 'react';

class ReactSliderUtil extends React.Component {
    constructor( props ) {
        super( props );

    }

    render() {

        // styles (if no css classes are set)
        var sliderWrapper = {
            position: 'relative',
            width: '100%',
            height: '30px'
        };

        var sliderTrack = {
            position: 'relative',
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
            backgroundColor: '#000000'
        };

        return (
            <div style={ sliderWrapper }>
                <div style={ sliderTrack }>
                    <div style={ sliderControl }></div>
                </div>
            </div>
        );
    }
}

export default ReactSliderUtil;