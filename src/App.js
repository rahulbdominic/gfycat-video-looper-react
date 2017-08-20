import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class VideoCanvas extends Component {
    constructor() {
        super()

        this.state={
            startTime: 0,
            endTime: 0,
            duration: 0,
            errorMessage: ""
        }

        this.looper = this.looper.bind(this)
        this.loadedMetaDataHandler = this.loadedMetaDataHandler.bind(this)
        this.startTimeChangeHandler = this.startTimeChangeHandler.bind(this)
        this.endTimeChangeHandler = this.endTimeChangeHandler.bind(this)
        this.resetPlayer = this.resetPlayer.bind(this)
    }

    looper () {
        const video = this.player
        var ctx = this.canvas.getContext('2d')
        if(video.currentTime < this.state.startTime) {
            video.currentTime = this.state.startTime
            video.play()
        }
        if (video.currentTime < this.state.endTime) {
            ctx.drawImage(video, 0, 0, 300, 300)
            setTimeout(this.looper, 1000 / 30) // 30fps
        } else {
            video.currentTime = this.state.startTime
            setTimeout(this.looper, 1000 / 30)
        }
    }

    loadedMetaDataHandler (event) {
        var duration = this.player.duration
        this.setState({endTime: duration, duration: duration})

        this.startTimeInput.value = this.state.startTime
        this.endTimeInput.value = duration

        this.player.currentTime = this.state.startTime
        this.player.play()
    }

    startTimeChangeHandler(event) {
        var _startTime = Number(event.target.value)
        if (_startTime !== "NaN" && _startTime < this.state.duration && _startTime > 0 && _startTime < this.state.endTime) {
            this.setState({
                startTime:_startTime,
                errorMessage: ""
            })
            this.resetPlayer()
        } else {
            this.setState({
                errorMessage:"Invalid input for one or more fields. \n" +
                    "1)Start time and end time must be numbers" +
                    "2)Start time must be >= 0 and end time must be <=" + this.state.duration +
                    "3)Start time must be <= end time"
            })
        }
    }

    endTimeChangeHandler(event) {
        var _endTime = Number(event.target.value)
        if (_endTime !== "NaN" && _endTime < this.state.duration && _endTime > 0 && _endTime > this.state.startTime) {
            this.setState({
                endTime:_endTime,
                errorMessage: ""
            })
            this.resetPlayer()
        } else {
            this.setState({
                errorMessage:"Invalid input for one or more fields. \n" +
                    "1)Start time and end time must be numbers" +
                    "2)Start time must be >= 0 and end time must be <=" + this.state.duration +
                    "3)Start time must be <= end time"
            })
        }
    }

    resetPlayer() {
        var _startTime = Number(this.startTimeInput.value)
        var _endTime = Number(this.endTimeInput.value)
        this.setState({
            startTime: _startTime,
            endTime: _endTime
        })
        this.player.pause()
        this.player.currentTime = _startTime
        this.player.play()
    }

    render() {
        return (
            <div>
                <video onPlay={this.looper} onLoadedMetadata={this.loadedMetaDataHandler}
                    src="https://giant.gfycat.com/TautWhoppingCougar.mp4"
                    controls="false" style={{display:'none'}} ref={(player) => {this.player = player}} autoPlay loop />
                <canvas width="300" height="300" ref={(canvas) => {this.canvas = canvas}} />
                <div>
                    <label>
                        Start time:
                        <input type="text" onChange={this.startTimeChangeHandler} ref={(input)=>{this.startTimeInput = input}}/>
                    </label>
                    <label>
                        End time:
                        <input type="text" onChange={this.endTimeChangeHandler} ref={(input)=>{this.endTimeInput = input}}/>
                    </label>
                </div>
                <span style={{color:'red'}}>{this.state.errorMessage}</span>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <VideoCanvas />
        );
    }
}

export default App;
