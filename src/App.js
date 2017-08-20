import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var Header = React.createClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <input type="search" />
        );
    }
});

var ProviderList = React.createClass({
    render: function () {
        return (
            <ul>
                <li>Mike Harris</li>
                <li>Bimo Wijoyo</li>
            </ul>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="Employee Directory"/>
                <SearchBar />
                <ProviderList />
            </div>
        );
    }
});

export default App;
