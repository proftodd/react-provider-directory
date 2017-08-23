import $ from 'jquery';

export function findById(id) {
    var deferred = $.Deferred();
    var provider = null;
    var l = providers.length;
    for (var i = 0; i < l; i++) {
        // For some reason this comparison fails if === is used
        // eslint-disable-next-line
        if (providers[i].id == id) {
            provider = providers[i];
            break;
        }
    }
    deferred.resolve(provider);
    return deferred.promise();
}

export function findByName(searchKey) {
    var deferred = $.Deferred();
    var results = providers.filter(function (element) {
        var full_name = element.first_name + " " + element.last_name;
        return full_name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    });
    deferred.resolve(results);
    return deferred.promise();
}

export function findBySpecialty(searchKey) {
    var deferred = $.Deferred();
    var results = providers.filter(function (element) {
        return element.specialty.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    });
    deferred.resolve(results);
    return deferred.promise();
}

var providers = require('./providers.json');

