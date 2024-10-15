async function getUser() {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');
  
  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a username.</p>";
    profileDiv.style.display = 'block';
    return;
  }

  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      profileDiv.innerHTML = "<p>User not found.</p>";
      profileDiv.style.display = 'block';
      return;
    }

    const userData = await response.json();
    
    profileDiv.innerHTML = `
      <img src="${userData.avatar_url}" alt="Avatar" width="150">
      <h2>${userData.name || userData.login}</h2>
      <p><strong>Followers:</strong> ${userData.followers}</p>
      <p><strong>Public Repos:</strong> ${userData.public_repos}</p>
      <a href="${userData.html_url}" target="_blank">View GitHub Profile</a>
    `;
    profileDiv.style.display = 'block';
  } catch (error) {
    profileDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
    profileDiv.style.display = 'block';
  }
}
