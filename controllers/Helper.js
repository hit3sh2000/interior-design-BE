

module.exports = {
    mandatoryField: function (object, fields) {
        var fields_na = []; // fields_not_available
        fields.forEach(function (field) {
            if (field && !object.hasOwnProperty(field) && object[field] == null) {
                fields_na.push(field);
            }
        });
        return fields_na;
    },
}