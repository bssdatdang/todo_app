
angular.module('filter.custom', [])

.filter('firstLetter', function () {
    return function (input, letter) {
        input = input || [];
        var out = [];
        input.forEach(function (item) {
            //console.log("current item is", item, item.charAt(0));
            if (item.charAt(0).toLowerCase() == letter) {
                out.push(item);
            }
        });
        return out;
    };
})
.filter('categoryName', function () {
    return function (input) {
        var out = input || "";
        var arrayString = input.split("_");
        out = arrayString[0];
        return out;
    };
});