// ==UserScript==
// @name        Steam License Counter
// @namespace   https://github.com/Nuklon
// @author      Nuklon
// @license     MIT
// @version     1.0.2
// @description Create a summary of your Steam licenses.
// @include     *://store.steampowered.com/account/licenses/
// @require     https://code.jquery.com/jquery-3.6.3.min.js
// @homepageURL https://github.com/Joseahfer/Steam-License-Counter
// @downloadURL https://raw.githubusercontent.com/Joseahfer/Steam-License-Counter/master/code.user.js
// @updateURL   https://raw.githubusercontent.com/Joseahfer/Steam-License-Counter/master/code.user.js
// ==/UserScript==

(function ($) {
  $.noConflict(true);

  let lastMonth = '';
  let lastYear = '';

  let total = 0;
  let totalYear = 0;
  let totalMonth = 0;

  let totalComplementary = 0;
  let totalComplementaryYear = 0;
  let totalComplementaryMonth = 0;

  let totalGifted = 0;
  let totalGiftedYear = 0;
  let totalGiftedMonth = 0;

  let totalStore = 0;
  let totalStoreYear = 0;
  let totalStoreMonth = 0;

  let totalRetail = 0;
  let totalRetailYear = 0;
  let totalRetailMonth = 0;

  let months = '';

  $('.page_content').eq(0).append("<div id='summary' style='margin-top:1rem;'></div>");

  $('.account_table tr').slice(1).each(function () {
    const acqDate = $('.license_date_col', this).text().trim();
    const acqType = $('.license_acquisition_col', this).text().trim();

    const isComplementary = acqType === 'Complimentary';
    const isRetail = acqType === 'Retail';
    const isStore = acqType === 'Steam Store';
    const isGiftedOrGuestPass = acqType === 'Gift/Guest Pass';

    total += 1;
    totalYear += 1;
    totalMonth += 1;

    if (isComplementary) {
      totalComplementary += 1;
      totalComplementaryYear += 1;
      totalComplementaryMonth += 1;
    }

    if (isRetail) {
      totalRetail += 1;
      totalRetailYear += 1;
      totalRetailMonth += 1;
    }

    if (isGiftedOrGuestPass) {
      totalGifted += 1;
      totalGiftedYear += 1;
      totalGiftedMonth += 1;
    }

    if (isStore) {
      totalStore += 1;
      totalStoreYear += 1;
      totalStoreMonth += 1;
    }

    const acqYear = acqDate.substr(acqDate.indexOf(',') + 1).trim();
    const acqMonth = acqDate.substr(acqDate.indexOf(' ')).substr(0, acqDate.indexOf(',') - 1).trim().split(',')[0];

    if (lastMonth.length > 0 && acqMonth !== lastMonth) {
      months += `<div><i>${lastMonth}</i><div>Store: ${totalStoreMonth}</div><div>Retail: ${totalRetailMonth}</div><div>Gifted: ${totalGiftedMonth}</div><div>Complementary: ${totalComplementaryMonth}</div><div>Total non-free: ${totalMonth - totalComplementaryMonth}</div><div>Total: ${totalMonth}</div></div></br>`;

      totalMonth = 0;
      totalStoreMonth = 0;
      totalGiftedMonth = 0;
      totalRetailMonth = 0;
      totalComplementaryMonth = 0;
    }

    if (lastYear.length > 0 && acqYear !== lastYear) {
      $('#summary').append(`<div><h2 style='margin: 0 0 5px;'>${lastYear}</h2></div>`);
      $('#summary').append(`<div><div>Store: ${totalStoreYear}</div><div>Retail: ${totalRetailYear}</div><div>Gifted: ${totalGiftedYear}</div><div>Complementary: ${totalComplementaryYear}</div><div>Total non-free: ${totalYear - totalComplementaryYear}</div><div>Total: ${totalYear}</div></div>`);
      $('#summary').append(`<div class='month'><a href='javascript:void(0)' class='months-toggle'>Months</a><div class='toggle' style='display:none;margin-top:1rem;margin-bottom:1rem;'>${months}</div></div>`);

      $('#summary').append(`<br/>`);

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

  $('.months-toggle').click(function () {
    $('.toggle', $(this).parent()).toggle('slow', () => {

    });
  });

  $('#summary').append(`<div><h1>Summary</h1></div>`);
  $('#summary').append(`<div><div>Store: ${totalStore}</div><div>Retail: ${totalRetail}</div><div>Gifted: ${totalGifted}</div><div>Complementary: ${totalComplementary}</div><div>Total non-free: ${total - totalComplementary}</div><div>Total: ${total}</div></div>`);
  $('#summary').append(`<br/>`);
}(jQuery));
