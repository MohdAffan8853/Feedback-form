document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value.trim();
  const feedback = document.getElementById('feedback').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !course || !feedback || !emailRegex.test(email)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const res = await fetch('backend/submit_feedback.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, email, course, feedback })
  });

  const data = await res.json();
  if (data.success) {
    loadFeedback();
    document.getElementById('feedbackForm').reset();
  } else {
    alert("Submission failed.");
  }
});

async function loadFeedback() {
  const res = await fetch('backend/get_feedback.php');
  const feedbacks = await res.json();
  const list = document.getElementById('feedbackList');
  list.innerHTML = '';
  feedbacks.forEach(item => {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.innerHTML = `
      <strong>${item.name}</strong> (${item.email}) - <em>${item.course}</em>
      <p>${item.feedback}</p>
      <span class="delete-btn" onclick="deleteFeedback(${item.id})">Delete</span>
    `;
    list.appendChild(div);
  });
}

async function deleteFeedback(id) {
  const res = await fetch('backend/delete_feedback.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id })
  });
  const data = await res.json();
  if (data.success) loadFeedback();
}

window.onload = loadFeedback;
