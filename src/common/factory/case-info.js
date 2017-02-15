angular.module("factory.case-info", [

	])
	.factory('caseInfo', function() {
		return {
			// Get Case Info
			getCaseInfo: function() {
				var stringCaseInfo = window.localStorage.getItem("caseInfo");
				var caseInfo = {};
				if (typeof stringCaseInfo === "string") {
					caseInfo = JSON.parse(stringCaseInfo);
				}

				return caseInfo;
			},
			// Set Case Info
			setCaseInfo: function(caseData) {
				// Set case info
				var caseInfo = {};
				caseInfo.id = caseData.id || false;
				caseInfo.caseName = caseData.displayName;
				if (caseData.patient) {
					caseInfo.patient = caseData.patient.id || false;
				}
				if (caseData.histories) {
					caseInfo.history = caseData.histories.id || false;
				}
				if (caseData.exams) {
					caseInfo.exam = caseData.exams.id || false;
				}
				if (caseData.diagnoses) {
					caseInfo.diagnose = caseData.diagnoses.id || false;
				}
				if (caseData.actions) {
					caseInfo.actions = caseData.actions.id || false;
				}
				if (caseData.modifiedActions && caseData.modifiedActions.length > 0) {
					caseInfo.results = true || false;
				}
				if (caseData.stateChanges && caseData.stateChanges.length > 0) {
					caseInfo.stateChanges = true || false;
				}
				if (caseData.dispositions) {
					caseInfo.disposition = caseData.dispositions.id || false;
				}
				if (caseData.discussion && caseData.discussion !== "None") {
					caseInfo.discussion = true;
				}
				if (caseData.questions) {
					caseInfo.question = true;
					caseInfo.questionsCount = caseData.questions.length;
				}

				// Set case Info
				window.localStorage.setItem("caseInfo", JSON.stringify(caseInfo));
			},
			clearCaseInfo: function() {
				window.localStorage.removeItem("caseInfo");
			}
		};
	});