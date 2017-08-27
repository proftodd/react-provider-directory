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
    handleRemoveProvider: function() {
        this.props.onProviderDelete(this.props.provider);
        return false;
    },
    render: function () {
        return (
            <li>
                <a href={"#providers/" + this.props.provider.id}>
                    {this.props.provider.first_name} {this.props.provider.last_name}
                </a>
                <input type="button" value="Remove" onClick={this.handleRemoveProvider} />
            </li>
        );
    }
});

var ProviderList = createReactClass({
    handleProviderRemove: function(provider) {
        this.props.onProviderRemove(provider);
    },
    render: function () {
        var that = this;
        var items = this.props.providers.map(function (provider) {
            return (
                <ProviderListItem key={provider.id} provider={provider} onProviderDelete={that.handleProviderRemove} />
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
    handleNewProvider(provider) {
        this.setState({providers: this.state.providers.concat([provider])});
    },
    handleProviderRemove(provider) {
        var index = -1;
        var pLength = this.state.providers.length;
        for (var i = 0; i < pLength; ++i) {
            if (this.state.providers[i].id === provider.id) {
                index = i;
            }
        }
        if (index >= 0) {
            this.state.providers.splice(index, 1);
            this.setState({providers: this.state.providers});
        }
    },
    render: function () {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Header text="Provider Directory"/>
                            <SearchBar searchHandler={this.searchHandler} />
                            <ProviderList providers={this.state.providers} onProviderRemove={this.handleProviderRemove} />
                        </td>
                        <td><NewProviderPage onProviderSubmit={this.handleNewProvider} /></td>
                    </tr>
                </tbody>
            </table>
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
                    Email: {this.state.provider.email_address} <br />
                    Specialty: {this.state.provider.specialty} <br />
                    Practice: {this.state.provider.practice_name}
            </div>
        );
    }
});

var NewProviderPage = createReactClass({
    handleSubmit: function() {
        var firstNameNode = ReactDOM.findDOMNode(this.refs.first_name);
        var lastNameNode = ReactDOM.findDOMNode(this.refs.last_name);
        var emailNode = ReactDOM.findDOMNode(this.refs.email_address);
        var specialtyNode = ReactDOM.findDOMNode(this.refs.specialty);
        var practiceNode = ReactDOM.findDOMNode(this.refs.practice);
        
        var newProvider = {first_name: firstNameNode.value, last_name: lastNameNode.value,
                           email_address: emailNode.value,
                           specialty: specialtyNode.value, practice_name: practiceNode.value};
        this.props.onProviderSubmit(newProvider);
        
        firstNameNode.value = '';
        lastNameNode.value = '';
        emailNode.value = '';
        specialtyNode.value = '';
        practiceNode.value = '';
        return false;
    },
    render: function() {
        return (
            <div>
                <h3>Add a Provider</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" placeholder="First Name" ref="first_name" />
                    </div>
                    <div>
                        <input type="text" placeholder="Last Name" ref="last_name" />
                    </div>
                    <div>
                        <input type="text" placeholder="Email Address" ref="email_address" />
                    </div>
                    <div>
                        <input type="text" placeholder="Specialty" ref="specialty" />
                    </div>
                    <div>
                        <input type="text" placeholder="Practice" ref="practice" />
                    </div>
                    <div>
                        <input type="submit" value="Add Provider" />
                    </div>
                </form>
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
