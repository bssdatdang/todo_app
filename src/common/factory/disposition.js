angular.module("factory.disposition", [

])
.factory('commonDisposition', function(){
	return {
		getCorrectDispositions: function (listDisposition) {
            var correctTree = {
                dispositions: [],
            };
            for (var i = 0; i < listDisposition.length; i++) {
                if ( listDisposition[i].correct ) {
                    correctTree.dispositions.push(listDisposition[i]);
                    // listDisposition.splice(i, 1);
                }
            }

            return correctTree;
        },
        // Load list of incorrect diagnose fit to list of diagnoses correted and bonused
        getIncorrectDispositions: function (templateDisposition, correctedDisposition) {
            var incorrectDiagnose = angular.copy( templateDisposition );
            var position = [];
            for (var i = 0; i < templateDisposition.length; i++) {
                for (var j = 0; j < correctedDisposition.length; j++) {
                    if ( templateDisposition[i].id === correctedDisposition[j].id ) {
                        delete incorrectDiagnose[i];
                        break;
                    }
                }
            }
            var returnArray = [];
            for (var k = 0; k < incorrectDiagnose.length; k++) {
                if ( incorrectDiagnose[k] ) {
                    returnArray.push( incorrectDiagnose[k] );
                }
            }
            return returnArray;
        }
	};
});