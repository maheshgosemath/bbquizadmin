/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';


    angular.module('UApps.constants', [])
        .constant("clientDetails", {
            id: 1,
            name: "The Unique Media Solution",
            site: "www.theuniquemedia.in"
        })
        .constant("questionAnswerTypes", [
            {id: '1', text: 'Single Select'},
            {id: '2', text: 'Single Rating'},
            {id: '3', text: 'Multiple Rating'},
            {id: '4', text: 'Open Text'},
            {id: '5', text: 'Multiple Select'},
            {id: '6', text: 'Binary'}
        ])
        .constant("symbolTypes", [
            {id: 1, text: 'Smiley'},
            {id: 2, text: 'Star'},
            {id: 3, text: 'Circle'},
            {id: 4, text: 'Text'},
            {id: 5, text: 'Tick/Cross'}
        ])
        .constant("symbolTypes2", [
            {id: 1, text: 'Smiley'},
            {id: 2, text: 'Star'}
        ])
        .constant("singleSelectSymbolTypes", [
            {id: 3, text: 'Circle'}
        ])
        .constant("binarySelectSymbolTypes", [
            {id: 5, text: 'Tick/Cross'}
        ])
        .constant("menusList", [
            {
                "id": 1,
                "parentId": 0,
                "sequenceId": "1",
                "name": "Question Bank",
                "hyperlink": "/questions",
                "isActive": null
            },
            {
                "id": 11,
                "parentId": 1,
                "sequenceId": "1.1",
                "name": "Create Questions",
                "hyperlink": "/createQuestion",
                "isActive": null
            } ,
            {
                "id": 12,
                "parentId": 1,
                "sequenceId": "1.2",
                "name": "Edit Questions",
                "hyperlink": "/editQuestion/:questionId",
                "isActive": null
            } ,
            {
                "id": 2,
                "parentId": 0,
                "sequenceId": "2",
                "name": "Template",
                "hyperlink": "/templates",
                "isActive": null
            },
            {
                "id": 19,
                "parentId": 2,
                "sequenceId": "2.1",
                "name": "View Questions",
                "hyperlink": "",
                "isActive": null
            },
            {
                "id": 13,
                "parentId": 2,
                "sequenceId": "2.2",
                "name": "Modify Questions",
                "hyperlink": "/assignQuestions/:templateId",
                "isActive": null
            },
            {
                "id": 16,
                "parentId": 2,
                "sequenceId": "2.2",
                "name": "Create Template",
                "hyperlink": "",
                "isActive": null
            },
            {
                "id": 3,
                "parentId": 0,
                "sequenceId": "3",
                "name": "Outlet",
                "hyperlink": "/outlets",
                "isActive": null
            },
            {
                "id": 17,
                "parentId": 3,
                "sequenceId": "3.1",
                "name": "Assign Template",
                "hyperlink": "",
                "isActive": null
            },
            {
                "id": 18,
                "parentId": 3,
                "sequenceId": "3.2",
                "name": "Edit Outlet Settings",
                "hyperlink": "",
                "isActive": null
            },
            {
                "id": 4,
                "parentId": 0,
                "sequenceId": "4",
                "name": "Feedback",
                "hyperlink": "/feedback",
                "isActive": null
            },
            {
                "id": 23,
                "parentId": 4,
                "sequenceId": "4.1",
                "name": "Full Permission",
                "hyperlink": "/feedback",
                "isActive": null
            },
            {
                "id": 5,
                "parentId": 0,
                "sequenceId": "5",
                "name": "Device",
                "hyperlink": "/devices",
                "isActive": null
            },
            {
                "id": 25,
                "parentId": 5,
                "sequenceId": "5.1",
                "name": "Edit Device Setting",
                "hyperlink": "",
                "isActive": null
            },
            {
                "id": 6,
                "parentId": 0,
                "sequenceId": "6",
                "name": "Settings",
                "hyperlink": "/settings",
                "isAbstract": true,
                "isActive": null
            },
            {
                "id": 7,
                "parentId": 6,
                "sequenceId": "6.1",
                "name": "General",
                "hyperlink": "/settings/generalSettings",
                "isActive": null
            },
            {
                "id": 20,
                "parentId": 7,
                "sequenceId": "6.1.1",
                "name": "Edit",
                "hyperlink": "/settings/generalSettings",
                "isActive": null
            },
            {
                "id": 8,
                "parentId": 6,
                "sequenceId": "6.2",
                "name": "Sms Gateway",
                "hyperlink": "/settings/smsGatewaySettings",
                "isActive": null
            },
            {
                "id": 21,
                "parentId": 8,
                "sequenceId": "6.2.1",
                "name": "Edit",
                "hyperlink": "/settings/smsGatewaySettings",
                "isActive": null
            },
            {
                "id": 9,
                "parentId": 6,
                "sequenceId": "6.3",
                "name": "Roles",
                "hyperlink": "/settings/createRole",
                "isActive": null
            },
            {
                "id": 22,
                "parentId": 9,
                "sequenceId": "6.3.1",
                "name": "Add / Edit",
                "hyperlink": "/settings/createRole",
                "isActive": null
            },
            {
                "id": 10,
                "parentId": 0,
                "sequenceId": "7",
                "name": "Users",
                "hyperlink": "/users",
                "isActive": null
            },
            {
                "id": 14,
                "parentId": 10,
                "sequenceId": "10.1",
                "name": "Create User",
                "hyperlink": "/createUser",
                "isActive": null
            },
            {
                "id": 15,
                "parentId": 10,
                "sequenceId": "10.2",
                "name": "Edit User",
                "hyperlink": "/editUser/:userId",
                "isActive": null
            },
            {
                "id": 24,
                "parentId": 0,
                "sequenceId": "24",
                "name": "Reports",
                "hyperlink": "/reports",
                "isActive": null
            },
            {
                "id": 26,
                "parentId": 24,
                "sequenceId": "24.1",
                "name": "Full Permission",
                "hyperlink": "/reports",
                "isActive": null
            },
        ]);


})();
