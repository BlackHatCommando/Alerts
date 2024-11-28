document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Prevent right-click context menu  
    alert("Inspecting the page is not allowed.");   
  }); 
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'i') {
      event.preventDefault(); // Prevent Ctrl+Shift+I keyboard shortcut
      alert("Inspecting the page is not allowed."); 
    }
  });

// Function to toggle visibility of hidden content
function toggleVisibility(contentId) {
  var content = document.getElementById(contentId);

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";  // Show the content
  } else {
    content.style.display = "none";   // Hide the content
  }
}

// Function to show the comment box when the dismiss button is clicked
function showCommentBox(alertId) {
  var commentBox = document.getElementById('comment-box-' + alertId);
  var dismissButton = document.querySelector('[data-id="'+ alertId +'"] .dismiss-button');

  // Show the comment box and hide the dismiss button
  commentBox.style.display = "block";
  dismissButton.style.display = "none";
}

// Function to submit the comment and store it in sessionStorage
function submitComment(alertId) {
  var comment = document.getElementById('comment-' + alertId).value;
  var commentDisplay = document.getElementById('comment-display-' + alertId);
  var userComment = document.getElementById('user-comment-' + alertId);
  
  if (comment) {
    // Save the comment to sessionStorage with a unique key for each alert
    sessionStorage.setItem('dismissedAlertComment-' + alertId, comment);

    // Display the comment and hide the comment box
    userComment.textContent = comment;
    commentDisplay.style.display = "block"; // Show the comment
    document.getElementById('comment-box-' + alertId).style.display = "none"; // Hide the comment box
  } else {
    alert("Please enter a comment before submitting.");
  }
}

// Function to check if a comment exists in sessionStorage and display it
function checkStoredComment(alertId) {
  var storedComment = sessionStorage.getItem('dismissedAlertComment-' + alertId);
  
  if (storedComment) {
    // Display the stored comment if it exists
    document.getElementById('user-comment-' + alertId).textContent = storedComment;
    document.getElementById('comment-display-' + alertId).style.display = "block"; // Show the comment
    document.querySelector('[data-id="'+ alertId +'"] .dismiss-button').style.display = "none"; // Hide the dismiss button
  }
}

// Call checkStoredComment for each alert when the page loads to display any stored comment
window.onload = function() {
  checkStoredComment('alert1');
  checkStoredComment('alert2');
};
