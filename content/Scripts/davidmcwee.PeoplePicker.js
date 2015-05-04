var davidmcwee = davidmcwee || {};

davidmcwee.PeoplePicker = function () {
    var self = this;
    self.controlId = null;

    self.getUserInfo = function () {
        var peoplePicker = eval("SPClientPeoplePicker.SPClientPeoplePickerDict." + self.controlId + "_TopSpan");
        return peoplePicker.GetControlValueAsJSObject(); //GetAllUserInfo();
    };

    self.setUserInfo = function (value) {
        var peoplePicker = eval("SPClientPeoplePicker.SPClientPeoplePickerDict." + self.controlId + "_TopSpan");
        $("#" + peoplePicker.EditorElementId).val(value);
        peoplePicker.AddUnresolvedUserFromEditor(true);
    }

    self.clearUserInfo = function () {
        var peoplePicker = eval("SPClientPeoplePicker.SPClientPeoplePickerDict." + self.controlId + "_TopSpan");
        $("#" + peoplePicker.ResolvedListElementId).html("");
        peoplePicker.ProcessedUserList = [];
    }

    self.initialize = function (controlId, callback) {
        self.controlId = controlId;

        var schema = {};
        //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['PrincipalAccountType'] = 'User';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';

        // Render and initialize the picker. 
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        SP.SOD.registerSod("clienttemplates.js", "/_layouts/15/clienttemplates.js");
        SP.SOD.registerSod("clientforms.js", "/_layouts/15/clientforms.js");
        SP.SOD.registerSod("clientpeoplepicker.js", "/_layouts/15/clientpeoplepicker.js");

        SP.SOD.registerSodDep("clientforms.js", "clienttemplates.js");
        SP.SOD.registerSodDep("clientpeoplepicker.js", "clientforms.js");

        //SP.SOD.execute("clientpeoplepicker.js", "SPClientPeoplePicker_InitStandaloneControlWrapper", [self.controlId, null, schema]);
        SP.SOD.executeFunc("clientpeoplepicker.js", null, function () {
            SPClientPeoplePicker.InitializeStandalonePeoplePicker(self.controlId, null, schema);
            if(callback != null) {
                callback();
            }
        });
        
    }
}