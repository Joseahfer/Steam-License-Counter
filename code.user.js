// ==UserScript==
// @name        Steam License Counter
// @namespace   https://github.com/Nuklon
// @author      Nuklon
// @license     MIT
// @version     1.0.0
// @description Create a summary of your Steam licenses.
// @include *://store.steampowered.com/account/licenses
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @homepageURL https://github.com/Nuklon/Steam-License-Counter
// @downloadURL https://raw.githubusercontent.com/Nuklon/Steam-License-Counter/master/code.user.js
// @updateURL   https://raw.githubusercontent.com/Nuklon/Steam-License-Counter/master/code.user.js
(function($) {
    $.noConflict(true);

    var lastMonth = '';
    var lastYear = '';

    var total = 0;
    var totalYear = 0;
    var totalMonth = 0;

    var totalComplementary = 0;
    var totalComplementaryYear = 0;
    var totalComplementaryMonth = 0;

    var totalGifted = 0;
    var totalGiftedYear = 0;
    var totalGiftedMonth = 0;

    var totalStore = 0;
    var totalStoreYear = 0;
    var totalStoreMonth = 0;

    var totalRetail = 0;
    var totalRetailYear = 0;
    var totalRetailMonth = 0;


    var months = '';

    $(".page_content").eq(0).append("<div id='summary' style='margin-top:1rem;'></div>");

    $(".account_table tr").slice(1).each(function() {
        var acqDate = $('.license_date_col', this).text().trim();
        var acqType = $(".license_acquisition_col", this).text().trim();

        var isComplementary = acqType == "Complimentary";
        var isRetail = acqType == "Retail";
        var isStore = acqType == "Steam Store";
        var isGiftedOrGuestPass = acqType == "Gift/Guest Pass";

        total++;
        totalYear++;
        totalMonth++;

        if (isComplementary) {
            totalComplementary++;
            totalComplementaryYear++;
            totalComplementaryMonth++;
        }

        if (isRetail) {
            totalRetail++;
            totalRetailYear++;
            totalRetailMonth++;
        }

        if (isGiftedOrGuestPass) {
            totalGifted++;
            totalGiftedYear++;
            totalGiftedMonth++;
        }

        if (isStore) {
            totalStore++;
            totalStoreYear++;
            totalStoreMonth++;
        }

        var acqYear = acqDate.substr(acqDate.indexOf(",") + 1).trim();
        var acqMonth = acqDate.substr(acqDate.indexOf(" ")).substr(0, acqDate.indexOf(",") - 1).trim().split(',')[0];

        if (lastMonth.length > 0 && acqMonth !== lastMonth) {
            months += "<div><i>" + lastMonth + "</i><div>Store: " + totalStoreMonth + "</div><div>Retail: " + totalRetailMonth + "</div><div>Gifted: " + totalGiftedMonth + "</div><div>Complementary: " + totalComplementaryMonth + "</div><div>Total non-free: " + (totalMonth - totalComplementaryMonth) + "</div><div>Total: " + totalMonth + "</div></div></br>";

            totalMonth = 0;
            totalStoreMonth = 0;
            totalGiftedMonth = 0;
            totalRetailMonth = 0;
            totalComplementaryMonth = 0;
        }

        if (lastYear.length > 0 && acqYear !== lastYear) {
            $("#summary").append("<div><b>" + lastYear + "</b></div>");
            $("#summary").append("<div><div>Store: " + totalStoreYear + "</div><div>Retail: " + totalRetailYear + "</div><div>Gifted: " + totalGiftedYear + "</div><div>Complementary: " + totalComplementaryYear + "</div><div>Total non-free: " + (totalYear - totalComplementaryYear) + "</div><div>Total: " + totalYear + "</div></div>");
            $("#summary").append("<div class='month'><a href='javascript:void(0)' class='months-toggle'>Months</a><div class='toggle' style='display:none;margin-top:2rem;margin-bottom:1rem;'>" + months + "</div></div>");

            $("#summary").append("<br/>");

            totalYear = 0;
            totalStoreYear = 0;
            totalGiftedYear = 0;
            totalRetailYear = 0;
            totalComplementaryYear = 0;
            months = '';
        }

        lastYear = acqYear;
        lastMonth = acqMonth;
    });

    $(".months-toggle").click(function() {

        $(".toggle", $(this).parent()).toggle("slow", function() {

        });
    });

    $("#summary").append("<div><b>Summary</b></div>");
    $("#summary").append("<div><div>Store: " + totalStore + "</div><div>Retail: " + totalRetail + "</div><div>Gifted: " + totalGifted + "</div><div>Complementary: " + totalComplementary + "</div><div>Total non-free: " + (total - totalComplementary) + "</div><div>Total: " + total + "</div></div>");
    $("#summary").append("<br/>");
})(jQuery);
