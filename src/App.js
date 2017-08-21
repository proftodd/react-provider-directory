import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//var employeeService = require('./data.js');
//var router = require('./router.js');
var createReactClass = require('create-react-class');

var providers = require('./providers.json');
	var routes = [];
	
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

var ProviderPage = createReactClass({
	getInitialState: function() {
		return {provider: {}};
	},
	componentDidMount: function() {
//		this.props.service.findById(this.props.providerId).done(function(result) {
		findById(this.props.providerId).done(function(result) {
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

//router.addRoute('', function() {
addRoute('', function() {
	ReactDOM.render(
//		<HomePage service={providerService} />,
		<HomePage />,
		document.getElementById('root')
	);
});

//router.addRoute('providers/:id', function(id) {
addRoute('providers/:id', function(id) {
	ReactDOM.render(
//		<ProviderPage providerId={id} service={providerService} />,
		<ProviderPage providerId={id} />,
		document.getElementById('root')
	);
});

router_start();

var App = createReactClass({
    render: function () {
        return (
//            <HomePage service={providerService} />
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
        };

	function addRoute(route, handler) {
		routes.push({parts: route.split('/'), handler: handler});
	}
	
	function load(route) {
		window.location.hash = route;
	}
	
	function router_start() {
		var path = window.location.hash.substr(1),
			parts = path.split('/'),
			partsLength = parts.length;
		
		for (var i = 0; i < routes.length; ++i) {
			var route = routes[i];
			if (route.parts.length === partsLength) {
				var params = [];
				for (var j = 0; j < partsLength; ++j) {
					if (route.parts[j].substr(0, 1) === ':') {
						params.push(parts[j]);
					} else if (route.parts[j] !== parts[j]) {
						break;
					}
				}
				if (j === partsLength) {
					route.handler.apply(undefined, params);
					return;
				}
			}
		}
	}
	
	window.onhashchange = router_start;
	
export default App;
