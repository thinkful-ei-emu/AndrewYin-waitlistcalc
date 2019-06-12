'use strict';
/* global $ */

const EARNINGS = {
  mealPrice: 0,
  taxRate: 0,
  tipPercent: 0,
  totalTip: 0,
  mealCount: 0
};

function mealDetailSubmit() {
  $('#meal-detail-form').submit((event) => {
    event.preventDefault();

    EARNINGS.mealPrice = parseFloat($('#meal-price').val());
    EARNINGS.taxRate = parseFloat($('#tax-rate').val());
    EARNINGS.tipPercent = parseFloat($('#tip-percent').val());

    EARNINGS.totalTip += (EARNINGS.mealPrice * EARNINGS.tipPercent) / 100;
    EARNINGS.mealCount++;

    renderChargesAndEarnings();
  });
}

function cancelButton() {
  $('#cancel-button').click(event => {
    // event.preventDefault();
    $('#meal-price').val('0.00');
    $('#tax-rate').val('');
    $('#tip-percent').val('')
    // console.log('cancel button clicked');
  });
}

function resetButton() {
  $('#reset-button').click(() => {
    Object.keys(EARNINGS).forEach(key => {
      EARNINGS[key] = 0;
    });

    renderChargesAndEarnings();
  });
}

function renderChargesAndEarnings() {
  let taxAmt = EARNINGS.mealPrice * EARNINGS.taxRate / 100;
  let tipAmt = EARNINGS.mealPrice * EARNINGS.tipPercent / 100;
  let totalAmt = EARNINGS.mealPrice + taxAmt + tipAmt;

  $('#meal-price').val(EARNINGS.mealPrice.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  $('#subtotal-amt').text(EARNINGS.mealPrice.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  $('#tax-amt').text(taxAmt.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  $('#tip-amt').text(tipAmt.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  $('#total-amt').text(totalAmt.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  $('#total-tip').text(EARNINGS.totalTip.toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  $('#meal-count').text(EARNINGS.mealCount);
  $('#avg-tip').text(EARNINGS.mealCount ? (EARNINGS.totalTip / EARNINGS.mealCount).toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00');
}

function bindHandlers() {
  mealDetailSubmit();
  cancelButton();
  resetButton();

  console.log('Handlers bound.');

  renderChargesAndEarnings();
}

$(bindHandlers);