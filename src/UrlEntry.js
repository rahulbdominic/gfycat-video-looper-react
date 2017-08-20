import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class UrlEntry extends Component {

    constructor() {
        super()
        this.state={
            url:"",
            redirect: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.tryButtonHandler = this.tryButtonHandler.bind(this)
    }

    onChangeHandler(event) {
        this.setState({url: "https://api.gfycat.com/v1test/gfycats/" + event.target.value})
    }

    submitHandler(event) {
        this.setState({redirect:true})
    }

    tryButtonHandler(event) {
        this.setState({
            redirect: true,
            url: "https://api.gfycat.com/v1test/gfycats/TautWhoppingCougar"
        })
    }

    render() {
        if(this.state.redirect) {
            return (
              <Redirect push to={{
                pathname: 'view',
                state: { url: this.state.url }
              }} />
            )
        } else {
            return (
                <div style={{"padding":"20px"}}>
                    <label>Name of Gfycat gif
                        <input style={{display:"inline-block"}} onChange={this.onChangeHandler} />
                    </label>
                    <span style={{display:"block"}}>Eg: TautWhoppingCougar, BravePlainAmmonite</span>
                    <button onClick={this.submitHandler}>Submit</button>
                    <button onClick={this.tryButtonHandler} style={{marginLeft: "5px"}}>Try a sample</button>
                </div>
            )
        }
    }
}

export default UrlEntry
