import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class VideoCanvas extends Component {
    constructor() {
        super()
        this.looper = this.looper.bind(this)
    }

    componentDidMount() {
      this.player.play()
    }

    looper () {
        const video = this.player //this is the video
        var ctx = this.canvas.getContext('2d')
        if (!video.ended) {
            ctx.drawImage(video, 0, 0, 300, 300)
            setTimeout(this.looper, 1000 / 30) // drawing at 30fps
        } else {
            video.currentTime = 0
            video.play()
        }
    }

    render() {
        return (
            <div>
                <video onPlay={this.looper} src="https://giant.gfycat.com/TautWhoppingCougar.mp4" controls="false" style={{display:'none'}} ref={(player) => {this.player = player}}></video>
                <canvas width="300" height="300" ref={(canvas) => {this.canvas = canvas}}></canvas>
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
