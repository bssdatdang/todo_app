angular.module("factory.module-info", [

	])
	.factory('moduleInfo', function() {
		return {
			// Get Case Info
			getModuleInfo: function() {
				var stringModuleInfo = window.localStorage.getItem("moduleInfo");
				var moduleInfo = {};
				if (typeof stringModuleInfo === "string") {
					moduleInfo = JSON.parse(stringModuleInfo);
				}

				return moduleInfo;
			},
			// Set Case Info
			setModuleInfo: function(moduleData) {
				// Set case info
				var moduleInfo = {};
				moduleInfo.id = moduleData.id;
				moduleInfo.moduleName = moduleData.displayName;
				

				// Set case Info
				window.localStorage.setItem("moduleInfo", JSON.stringify(moduleInfo));
			},
		};
	});