/*!
 * --------------------------------------- START OF LICENSE NOTICE ------------------------------------------------------
 * Copyright (c) 2018 Software Robotics Corporation Limited ("Soroco"). All rights reserved.
 *
 * NO WARRANTY. THE PRODUCT IS PROVIDED BY SOROCO "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL SOROCO BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE PRODUCT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 * ---------------------------------------- END OF LICENSE NOTICE -------------------------------------------------------
 *
 *   Candidate: FULL NAME - <EMAIL ID>
 *   Purpose: Soroco Front-end hands on assignment
 */


/*
   Function to render existing tab, can be called anywhere in the application with a user object of type { "name": "", "login": }
*/


function changeActive(name) {
  $('.src-tab').removeClass('active');
  $('.dynamic-tabs').find('.src-tab').first().addClass('active');
  $('.tab-details .add-trans-area').hide();
  $('.tab-details .user-detail').show();
  $('.tab-details .user-detail').text(name)
}

function handleTab() {
  $('.tab-details .add-trans-area').show();
  $('.tab-details .user-detail').hide();
  $('.tab-details .user-detail').text("");
  $('.src-tab').removeClass('active');
  $('.dynamic-tabs').find('.src-tab').last().addClass('active');
}

function clickOnTabes(id) {
  $('.newadded' + id).remove();

  let clickedUser = states.tabsList.filter(function (val) {
    return val.uuid === id
  })
  let RemainingUsers = states.tabsList.filter(function (val) {
    return val.uuid !== id
  })
  states.tabsList = [...clickedUser, ...RemainingUsers];
  renderTab(states.tabsList[0]);
}

function clickOnTabesClose(id) {
  $('.newadded' + id).remove();
  let indexVal = states.tabsList.findIndex(function (val) {
    return val.uuid === id;
  })
  states.tabsList = [...states.tabsList.slice(0, indexVal), ...states.tabsList.slice(indexVal + 1)]
  if (states.tabsList.length < 3) {
    if (states.tabsList.length === 0) {
      handleTab()
    }
    $('#more-count').remove();
    //renderTab(states.tabsList[0]);
  } else if (states.tabsList.length === 3) {
    $('#more-count').remove();
    $('.newadded' + states.tabsList[2].uuid).remove();
    renderTab(states.tabsList[2]);
    //renderTab(states.tabsList[1]);
  } else {
    renderTab(states.tabsList[2]);
    renderTab(states.tabsList[1]);
  }
}


function renderTab(user) {

  if (states.tabsList.length > 3) { // add conditions to support dynamic width of tabs
    // combined width of tabs are more than allowed
    $('.dynamic-tabs>div').eq(2).remove();
    renderSeeMore();
  }
  let temp =
    `<div class="src-tab newadded` + user.uuid + `" data-uuid="` + user.uuid + `" >
      <div onclick="clickOnTabes(` + user.uuid + `)">
        <div class="tab-line1">` + user.name + `</div>
        <div class="tab-line2">` + user.login + `</div>
      </div>
      <i onclick="clickOnTabesClose(` + user.uuid + `)" class="material-icons" >close</i>
    </div>`;

  $("#dynamic-tabs").prepend(temp);
  changeActive(user.name);
}

/*
   Function to create a new tab and takes values from the input fields on UI
*/
function createTab() {
  let user = {
    'name': $('#user-name').val(),
    'login': $('#user-login').val(),
    'uuid': new Date().getTime()
  }
  states.tabsList.unshift(user); // append newly created tab to "tabsList"
  renderTab(user);

  // reset "Add transaction" fields
  $('#user-name').val('');
  $('#user-login').val('');
}

/*
   Function to close a tab
*/
function closeTab() {

}

/*
   Function to set a particular tab-heading as active when clicked on it
*/
function setActiveTab() {

}

/*
   Function to fetch/render tab details of particular tab while switching between tabs
*/
function getTabDetails() {

}


/*
   Function to render See more tabs when the length of tabs is more than 3. Please try to make this based on the screen width available
   and compute the number of tabs to be visible on the screen accordingly.
*/
function renderSeeMore() {
  if ($('#more-list').length) {
    $('#more-count').text((states.tabsList.length - 3) + ' More');
  } else {
    var temp =
      `<div class="src-tab">
      <div class="tab-line1">
        <div id="more-count">`  + (states.tabsList.length - 3) + ` More </div>
        <i onclick="toggleDropdown()" class="material-icons" >arrow_drop_down</i>
      </div>
      <div class="tab-line2"></div>
      <div id="more-list" class="hideMore"></div>
    </div>`;
    $(temp).insertBefore('.fixed-tab');
  }
  populateDropdown();
}
//
/*
   Function to populate the see more menu dropdown list
*/
function populateDropdown() {
  $('#more-list').html('');
  for (var i = 3; i < states.tabsList.length; i++) {
    let temp =
      `<div class="more-list-item newadded` + states.tabsList[i].uuid + `"  onclick="clickOnTabes(` + states.tabsList[i].uuid + `)">
      <div class="list-item1">` + states.tabsList[i].name + `</div>
      <div class="list-item2">` + states.tabsList[i].login + `</div>
    </div>`;
    $("#more-list").prepend(temp);
  }
}

/*
   Function to show/hide the dropdown list when Seem more tab is clicked
*/
function toggleDropdown() {
  $('#more-list').toggleClass("hideMore");
}

/*
   Function to switch to a tab selected from the see more list and set it as the active tab visible on the screen,
  while one of the tabs earlier visible on the screen gets added to the dropdown list
*/
function switchDropdown() {

}
