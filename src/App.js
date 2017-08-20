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
	getInitialState: function() {
		return {searchKey: ""};
	},
	searchHandler: function(event) {
		var searchKey = event.target.value;
		this.setState({searchKey: searchKey});
		this.props.searchHandler(searchKey);
	},
    render: function () {
        return (
            <input type="search" value={this.state.symbol} onChange={this.searchHandler} />
        );
    }
});

var ProviderListItem = React.createClass({
    render: function () {
      return (
          <li>
			<a href={"#providers/" + this.props.provider.id}>
				{this.props.provider.first_name} {this.props.provider.last_name}
			</a>
          </li>
      );
    }
});

var ProviderList = React.createClass({
    render: function () {
    	var items = this.props.providers.map(function (provider) {
    		return (
    			<ProviderListItem key={provider.id} provider={provider} />
    		);
    	});
        return (
            <ul>
                {items}
            </ul>
        );
    }
});

var App = React.createClass({
	searchHandler: function(key) {
		alert('Search key: ' + key);
	},
    render: function () {
    	var providers = [
    		{id:1, last_name:"Harris", first_name:"Mike"},
    		{id:2, last_name:"Wijoyo", first_name:"Bimo"},
    		{id:3, last_name:"Rose", first_name:"Nate"}
    	];
        return (
            <div>
                <Header text="Provider Directory"/>
                <SearchBar searchHandler={this.searchHandler} />
                <ProviderList providers={providers} />
            </div>
        );
    }
});

export default App;
