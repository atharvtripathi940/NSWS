// /*
//   NSWS Dashboard JavaScript
//   -------------------------
//   This file adds simple interactions to the dashboard.

//   Files:
//   - index.html
//   - style.css
//   - script.js
// */


// /* =========================================
//    1. Start JavaScript after page loads
//    ========================================= */

// document.addEventListener("DOMContentLoaded", function () {

//   setupNavigation();
//   setupSearch();
//   setupApprovalButton();
//   setupQuickActions();
//   setupQuestionButtons();
//   setupBusinessButton();
//   setupNotifications();

// });


// /* =========================================
//    2. Sidebar Navigation
//    ========================================= */

// function setupNavigation() {

//   // Get all sidebar menu links
//   const menuLinks = document.querySelectorAll(".menu a");

//   menuLinks.forEach(function (link) {

//     link.addEventListener("click", function (event) {

//       // Prevent the # link from changing the page
//       event.preventDefault();

//       // Remove active class from every menu item
//       menuLinks.forEach(function (item) {
//         item.classList.remove("active");
//       });

//       // Add active class to the clicked item
//       link.classList.add("active");

//       // Get the name of the selected menu
//       const pageName = link.innerText.trim();

//       showMessage(pageName + " selected");

//     });

//   });

// }


// /* =========================================
//    3. Search Box
//    ========================================= */

// function setupSearch() {

//   const searchInput =
//     document.querySelector(".search-box input");

//   // Stop if the search box does not exist
//   if (!searchInput) {
//     return;
//   }

//   // Run this code whenever the user types
//   searchInput.addEventListener("input", function () {

//     const searchText =
//       searchInput.value.toLowerCase().trim();

//     // Select dashboard elements that can be searched
//     const cards = document.querySelectorAll(
//       ".stat-card, .question, .activity-item"
//     );

//     cards.forEach(function (card) {

//       const cardText =
//         card.innerText.toLowerCase();

//       // Show matching items
//       if (
//         searchText === "" ||
//         cardText.includes(searchText)
//       ) {

//         card.style.display = "";

//       }

//       // Hide non-matching items
//       else {

//         card.style.display = "none";

//       }

//     });

//   });

// }


// /* =========================================
//    4. Get My Approvals Button
//    ========================================= */

// function setupApprovalButton() {

//   const button =
//     document.querySelector(".approval-button");

//   if (!button) {
//     return;
//   }

//   button.addEventListener("click", function () {

//     // Get selected values
//     const state =
//       document.getElementById("state").value;

//     const industry =
//       document.getElementById("industry").value;

//     const investment =
//       document.getElementById("investment").value;


//     // Create the result message
//     const message =
//       "Approvals searched for:\n\n" +
//       "State: " + state + "\n" +
//       "Industry: " + industry + "\n" +
//       "Investment: " + investment;


//     // Show the result
//     alert(message);

//   });

// }


// /* =========================================
//    5. Quick Action Buttons
//    ========================================= */

// function setupQuickActions() {

//   const buttons =
//     document.querySelectorAll(".action-button");

//   buttons.forEach(function (button) {

//     button.addEventListener("click", function () {

//       // Get button text
//       const action =
//         button.innerText
//           .replace("→", "")
//           .trim();

//       showMessage(action + " clicked");

//     });

//   });

// }


// /* =========================================
//    6. AI Suggested Questions
//    ========================================= */

// function setupQuestionButtons() {

//   const questions =
//     document.querySelectorAll(".question");

//   const input =
//     document.getElementById("assistantQuestion");


//   // If the input does not exist, stop
//   if (!input) {
//     return;
//   }


//   questions.forEach(function (question) {

//     question.addEventListener("click", function () {

//       // Put the selected question in the input box
//       input.value =
//         question.innerText;

//       // Automatically focus the input
//       input.focus();

//     });

//   });

// }


// /* =========================================
//    7. AI Assistant
//    ========================================= */

// function askAssistant() {

//   const input =
//     document.getElementById("assistantQuestion");


//   // Get the question
//   const question =
//     input.value.trim();


//   // Check for empty input
//   if (question === "") {

//     showMessage(
//       "Please type a question first."
//     );

//     input.focus();

//     return;

//   }


//   // Find the assistant message
//   const message =
//     document.querySelector(".assistant-message");


//   // Display a temporary demo answer
//   message.innerHTML =
//     "<strong>Your question:</strong><br>" +
//     escapeHTML(question) +
//     "<br><br>" +
//     "This is a demo AI assistant. " +
//     "You can connect this section to a real AI API later.";


//   // Clear the input box
//   input.value = "";

// }


// /*
//   Make the function available to the
//   onclick attribute in HTML.
// */

// window.askAssistant = askAssistant;


// /* =========================================
//    8. Business Button
//    ========================================= */

// function setupBusinessButton() {

//   const button =
//     document.querySelector(".small-button");


//   if (!button) {
//     return;
//   }


//   button.addEventListener("click", function () {

//     showMessage(
//       "Business profile opened"
//     );

//   });

// }


// /* =========================================
//    9. Notification Bell
//    ========================================= */

// function setupNotifications() {

//   const bell =
//     document.querySelector(".bell");


//   if (!bell) {
//     return;
//   }


//   bell.addEventListener("click", function () {

//     showMessage(
//       "You have 3 notifications"
//     );

//   });

// }


// /* =========================================
//    10. Display Small Notification
//    ========================================= */

// function showMessage(message) {

//   // Create a new notification
//   const notification =
//     document.createElement("div");


//   // Add class name
//   notification.className =
//     "js-notification";


//   // Add message text
//   notification.innerText =
//     message;


//   /*
//     Style the notification.
//     This is kept here so you don't
//     need another CSS class.
//   */

//   notification.style.position = "fixed";

//   notification.style.right = "25px";

//   notification.style.bottom = "25px";

//   notification.style.padding =
//     "13px 18px";

//   notification.style.background =
//     "#173b78";

//   notification.style.color =
//     "white";

//   notification.style.borderRadius =
//     "8px";

//   notification.style.boxShadow =
//     "0 5px 20px rgba(0,0,0,0.2)";

//   notification.style.zIndex =
//     "9999";

//   notification.style.fontSize =
//     "13px";


//   // Add notification to the page
//   document.body.appendChild(
//     notification
//   );


//   // Remove notification after 2 seconds
//   setTimeout(function () {

//     notification.remove();

//   }, 2000);

// }


// /* =========================================
//    11. Protect User Input
//    ========================================= */

// function escapeHTML(text) {

//   return text
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");

// }