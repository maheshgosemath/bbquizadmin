/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.filters', [])
        .filter('statusFullForm', statusFullForm)
        .filter('answerTypeFullForm', answerTypeFullForm)
        .filter('emptyInputFilter', emptyInputFilter)
        .filter('noValueFilter', noValueFilter)
        .filter('dateFilter', dateFilter)
        .filter('ratingFilter', ratingFilter)
        .filter('dateMonthFilter', dateMonthFilter)
        .filter('answerSymbolTypeFilter', answerSymbolTypeFilter)
        .filter('setThresholdFilter', setThresholdFilter)
        .filter('nullValueFilter', nullValueFilter)
        .filter('isAddressedFilter', isAddressedFilter)
        .filter('getCount', getCount)
        .filter('linkFromUpload', linkFromUpload);


    function getCount() {
        return function (value) {
            var tempArr = value.split(",");
            return tempArr.length;

        };
    }

    function linkFromUpload() {
        return function (value) {
            if (angular.isDefined(value) && value != null && value != "") {
                var fileParts = value.split("/");
                var fileName = fileParts[fileParts.length - 1];
                return "<a target='_blank' href='../uploads/" + value + "'>" + fileName + "</a>";
            }
            return "<em class='text-color-muted'><small>No Attachment</small></em>";
        };
    }

    function statusFullForm() {
        return function (value) {
            return value == "I" ? "InActive" : "Active";
        };
    }

    function isAddressedFilter() {
        return function (value) {
            return value == 1 ? "Yes" : "No";
        };
    }

    function ratingFilter($filter) {
        return function (value) {
            if (value == 0 || value == null) {
                return "Skipped"
            } else {
                if (value == 100) {
                    return "Excellent";
                } else if (value == 80) {
                    return "Very Good";
                } else if (value == 60) {
                    return "Good";
                } else if (value == 40) {
                    return "Average";
                } else if (value == 20) {
                    return "Poor";
                }
            }

        };
    }

    function dateFilter($filter) {
        return function (value) {
            if (value == "" || value == null) {
                return " - "
            } else {
                var dt = new Date(value);
                return $filter('date')(dt, 'yyyy-MM-dd')

            }
        };
    }

    function dateMonthFilter($filter) {
        return function (value) {
            if (value == "" || value == null) {
                return " - "
            } else {
                var dt = new Date(value);
                return $filter('date')(dt, 'dd-MMM')

            }
        };
    }

    function answerTypeFullForm(questionAnswerTypes) {
        return function (value) {
            if (value == 1) {
                return questionAnswerTypes[0].text
            } else if (value == 2) {
                return questionAnswerTypes[1].text
            } else if (value == 3) {
                return questionAnswerTypes[2].text
            } else if (value == 4) {
                return questionAnswerTypes[3].text
            } else if (value == 5) {
                return questionAnswerTypes[4].text
            } else if (value == 6) {
                return questionAnswerTypes[5].text
            }
        };
    }

    function answerSymbolTypeFilter() {
        return function (value) {
            if (value == 1) {
                return "<span><i class='fa fa-frown-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-smile-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-meh-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-smile-o' aria-hidden='true'></i> </span>"
            }
            else if (value == 2) {
                return "<span><i class='fa fa-star' aria-hidden='true'></i> " +
                    "<i class='fa fa-star' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-half-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o' aria-hidden='true'></i> </span>"
            }
            else if (value == 3) {
                return "<span><i class='fa fa-circle-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-check-circle-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-circle-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-circle-o' aria-hidden='true'></i> </span>"
            }
            else if (value == 4) {
                return "  <span><i class='fa fa-keyboard-o fa-lg text-center' aria-hidden='true'></i>  </span>"
            }
            else if (value == 5) {
                return "<span><i class='fa fa-check-circle text-center' aria-hidden='true'></i> " +
                    "<span><i class='fa fa-circle-o' aria-hidden='true'></i> "
            }

        };
    }


    function setThresholdFilter() {
        return function (item) {
            if (item.rating != 0) {
                var temp = 100 / item.weightage;
                var tempRate = item.rating / temp;
                var threshold = parseInt(item.threshold);
                if (tempRate <= threshold) {
                    return item.questionDesc
                } else {

                }
            } else {

            }
        };
    }

    function emptyInputFilter() {
        return function (value) {
            return value == "" || value == "NULL" || value == null || value == "0" ? "<em class='text-color-muted '><small>No Value</small></em>" : value;
        };
    }

    function nullValueFilter() {
        return function (value) {
            return value == "" || value == "NULL" ? "-" : value;
        };
    }


    function noValueFilter() {
        return function (value) {
            return value == "" || value == null || value == "0" ? "<em class='text-color-muted '><small>Not assigned</small></em>" : value;
        };
    }

})();
