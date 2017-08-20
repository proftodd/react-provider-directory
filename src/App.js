import React from 'react';
import $ from 'jquery';
//var employeeService = require('./data.js');
var createReactClass = require('create-react-class');

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
//        this.props.service.findByName(key).done(function(result) {
        findByName(key).done(function(result) {
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


var App = createReactClass({
    render: function () {
        return (
//            <HomePage service={employeeService} />
            <HomePage />
        );
    }
  });

    var findById = function (id) {
            var deferred = $.Deferred();
            var provider = null;
            var l = providers.length;
            for (var i = 0; i < l; i++) {
                if (providers[i].id == id) {
                    provider = providers[i];
                    break;
                }
            }
            deferred.resolve(provider);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred();
            var results = providers.filter(function (element) {
                var full_name = element.first_name + " " + element.last_name;
                return full_name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        findBySpecialty = function (searchKey) {
            var deferred = $.Deferred();
            var results = providers.filter(function (element) {
                return element.specialty.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        providers = [
    		{"id": 1, "last_name": "Harris", "first_name": "Mike", "email_address": "mharris@acme.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
    		{"id": 2, "last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@acme.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
    		{"id": 3, "last_name": "Rose", "first_name": "Nate", "email_address": "nrose@acme.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
    		{"id": 4, "last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@acme.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
    		{"id": 5, "last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@acme.com", "specialty": "Pediatrics", "practice_name": "Witting’s Well Kids Pediatrics"},
    		{"id": 6, "last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@acme.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}
		];
		
export default App;
