/*
 * This is a library with common functions.
 */

var CommonLib = {
	serializeForm: function (_$form) {
		var values = {};
		$.each(_$form.serializeArray(), function (_i, _field) {
			values[_field.name] = _field.value;
		});

		return values;
	}
};
