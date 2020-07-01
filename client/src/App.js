import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import './App.css'

class App extends Component {
	constructor(){
		super()
		this.state = {
			list: []
		}
	}

	componentDidMount(){
		this.list()
	}

	refresh = (arg1) => {
		console.log("arg1", arg1)
		axios.get('/api/refresh').then(res => {
			console.log('res', res)
		}).catch(err => {
			console.log('err', err)
		})

	}
	
	list = () => {
		console.log("list")
		axios.get('/api/list').then(res => {
			console.log('res', res)
			this.setState({
				list: res.data
			})
		}).catch(err => {
			console.log('err', err)
		})
	}

	render(){
		console.log("thisstate", this.state)
			return (	
				<AppDiv>
				<h1>Refresh Firecharts</h1>
				<button onClick={() => this.list()}>list</button>
				<button onClick={() => this.refresh("refresh")}>refresh</button>
				{this.state.list ? this.state.list.map(file => {
					return (
						<a href={file} key={file}>{file}</a>
						)
					}) : null}
			</AppDiv>
		);
	}
}
export default App

const AppDiv = styled.div`
	/* border: 1px solid red; */
	box-sizing: border-box;
	max-width: 100vw;
	color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
`
	