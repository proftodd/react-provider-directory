import $ from 'jquery';

var providerService = (function () {

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
    		{"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@acme.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
    		{"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@acme.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
    		{"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@acme.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
    		{"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@acme.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
    		{"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@acme.com", "specialty": "Pediatrics", "practice_name": "Witting’s Well Kids Pediatrics"},
    		{"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@acme.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}
		];

    // The public API
    return {
        findById: findById,
        findByName: findByName,
        findByManager: findByManager
    };

}());
