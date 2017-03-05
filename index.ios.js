/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//var Paper = require('paper/dist/paper-core');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Svg,{
    G,
    Path,
    Line,
    Polyline,
} from 'react-native-svg';

const {width, height} = Dimensions.get('window');
var toPoint = function(p) { return p[1] + ',' + p[2]};

const POINTS = [ [ 0, 338.5, 306.5 ], [ 80.4664820432663, 338.5, 307 ], [ 96.5822519659996, 336.5, 313 ], [ 112.8382269740105, 329, 324.5 ], [ 137.3125020265579, 319, 345.5 ], [ 153.3714560270309, 310.5, 363 ], [ 177.5201349854469, 300, 386.5 ], [ 193.805055975914, 295.5, 399 ], [ 218.3230299949646, 287.5, 412 ], [ 234.4702780246735, 281.5, 419 ], [ 258.3615009784698, 273.5, 424.5 ], [ 275.7930569648743, 267, 426 ], [ 299.6116369962692, 257.5, 426.5 ], [ 325.2610449790955, 248.5, 414.5 ], [ 347.9040139913559, 242.5, 396 ], [ 371.9633029699326, 242, 377 ], [ 388.2083240151405, 243.5, 365 ], [ 404.4027929902077, 246.5, 359 ], [ 420.5394089818001, 251, 354 ], [ 436.8712539672852, 256, 350.5 ], [ 460.79004997015, 266.5, 349 ], [ 484.8389779925346, 278.5, 352 ], [ 501.8055660128593, 287.5, 360.5 ], [ 525.3493229746819, 301, 378.5 ], [ 541.9612820148468, 311, 390 ], [ 558.4871999621391, 316, 397 ], [ 575.5106319785118, 321, 402 ], [ 598.0460699796677, 325, 404.5 ], [ 624.6418870091438, 326.5, 405 ], [ 646.7254250049591, 328, 405 ], [ 663.17544901371, 329.5, 405 ], [ 687.5911149978638, 332.5, 404.5 ], [ 704.0623350143433, 334, 403.5 ], [ 727.3693079948425, 336, 402 ], [ 744.2694189548492, 336.5, 402 ], [ 768.4562289714813, 337.5, 401 ] ]

export default class PaperJSExample extends Component {
  render() {
    let path = this.getLinePath(POINTS);
    return (
      <View style={styles.container}>
        <Svg style={{width, height, position: 'absolute', backgroundColor: 'transparent'}} >
          <Path d={path} fill='none' stroke='black' strokeWidth={1} />
        </Svg>
      </View>
    );
  }

  getOptimizePath(points) {
    let path = new Paper.Path({
      strokeColor: 'black'
    });
    points.forEach((p) => {
      path.add([p[1], p[2]]);
    });
    path.simplify();
    let segmentCount = path.segments.length;
    __DEV__ && console.log('PATH: %d => %d', points.length, segmentCount);
    __DEV__ && console.log('Segments:', path.segments);
    //__DEV__ && console.log('PP:', path.exportJSON({ asString: false}));
    return path.exportSVG({ asString: false}).getAttribute('d'); // exportSVG gives SVGDOMElement of type svg <path>
  }

  getLinePath(points) {
    var p = toPoint(points[0]);
    let path = `M${p}L`;

    if(points.length < 2) return path + p;

    for(let j=1; j < points.length; j++) {
      p = toPoint(points[j]);
      path += p + ' ';
    }
    return path;
  }

  init(w, h) {
    Paper.setup([w, h]);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PaperJSExample', () => PaperJSExample);
