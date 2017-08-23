import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

import * as da from './data';
import * as rt from './router';

var Header = createReactClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = createReactClass({
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

var ProviderListItem = createReactClass({
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

var ProviderList = createReactClass({
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

var HomePage = createReactClass({
    getInitialState: function() {
        return {providers: []}
    },
    searchHandler: function(key) {
        da.findByName(key).done(function(result) {
	    this.setState({searchKey: key, providers: result});
	}.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Provider Directory"/>
                <SearchBar searchHandler={this.searchHandler} />
                <ProviderList providers={this.state.providers} />
            </div>
        );
    }
});

var ProviderPage = createReactClass({
    getInitialState: function() {
        return {provider: {}};
    },
    componentDidMount: function() {
        da.findById(this.props.providerId).done(function(result) {
            this.setState({provider: result});
	}.bind(this));
    },
    render: function() {
        return (
            <div>
                <Header text="Provider Details" />
                <h3>{this.state.provider.first_name} {this.state.provider.last_name}</h3>
                    {this.state.provider.specialty}
            </div>
        );
    }
});

rt.addRoute('', function() {
    ReactDOM.render(
        <HomePage />,
        document.getElementById('root')
    );
});

rt.addRoute('providers/:id', function(id) {
    ReactDOM.render(
        <ProviderPage providerId={id} />,
        document.getElementById('root')
    );
});

rt.start();

var App = createReactClass({
    render: function () {
        return (
            <HomePage />
        );
    }
  });

export default App;
