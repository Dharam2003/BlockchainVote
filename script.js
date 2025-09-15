// User Management
function register() {
    const username = document.getElementById('regUsername').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    if (!username || !dob || !phone || !password) {
        alert('Please fill all fields!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.username === username)) {
        alert('Username already taken!');
        return;
    }

    users.push({ username, dob, phone, password, role, voted: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    window.location.href = 'index.html';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('role').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (!user) {
        alert('Invalid credentials!');
        return;
    }

    localStorage.setItem('currentUser', username);
    localStorage.setItem('currentRole', role);
    window.location.href = role === 'Admin' ? 'admin.html' : 'user.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    window.location.href = 'index.html';
}

// Candidate Management
function addCandidate() {
    const name = document.getElementById('candidateName').value.trim();
    
    if (!name) {
        alert('Please enter candidate name!');
        return;
    }

    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    
    if (candidates.some(c => c.name === name)) {
        alert('Candidate already exists!');
        return;
    }

    candidates.push({ name, votes: 0 });
    localStorage.setItem('candidates', JSON.stringify(candidates));
    document.getElementById('candidateName').value = '';
    loadCandidates();
}

function loadCandidates() {
    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const container = document.getElementById('candidateList');
    
    if (!container) return;

    container.innerHTML = candidates.length === 0 
        ? '<p>No candidates available</p>'
        : candidates.map(c => `
            <div class="candidate-item">
                <span>${c.name}</span>
                <span>Votes: ${c.votes}</span>
            </div>
        `).join('');
}

// Voting System
function castVote() {
    const selected = document.querySelector('input[name="candidate"]:checked');
    if (!selected) {
        alert('Please select a candidate!');
        return;
    }

    const username = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1 || users[userIndex].voted) {
        alert('You have already voted!');
        return;
    }

    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const candidateIndex = candidates.findIndex(c => c.name === selected.value);
    
    candidates[candidateIndex].votes++;
    users[userIndex].voted = true;
    
    localStorage.setItem('candidates', JSON.stringify(candidates));
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Vote submitted successfully!');
    window.location.href = 'results.html';
}

// Results Display
function loadResults() {
    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const container = document.getElementById('resultsList');
    
    if (!container) return;

    const sorted = candidates.sort((a, b) => b.votes - a.votes);
    const totalVotes = sorted.reduce((sum, c) => sum + c.votes, 0);

    container.innerHTML = sorted.length === 0
        ? '<p>No results available</p>'
        : sorted.map(c => `
            <div>
                <span>${c.name}</span>
                <span>${c.votes} votes (${totalVotes ? Math.round((c.votes/totalVotes)*100) : 0}%)</span>
            </div>
        `).join('');
}

// Initialize pages
document.addEventListener('DOMContentLoaded', function() {
    // Show current username if logged in
    const usernameEl = document.getElementById('usernameDisplay');
    if (usernameEl) {
        usernameEl.textContent = localStorage.getItem('currentUser');
    }

    // Load appropriate data for each page
    if (document.getElementById('candidateList')) loadCandidates();
    if (document.getElementById('voterList')) loadVoters();
    if (document.getElementById('resultsList')) loadResults();
});

// Helper function to load voters (admin page)
function loadVoters() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const container = document.getElementById('voterList');
    
    if (!container) return;

    const voters = users.filter(u => u.role === 'User');
    container.innerHTML = voters.length === 0
        ? '<p>No registered voters</p>'
        : voters.map(u => `
            <div class="voter-item">
                <span>${u.username}</span>
                <span>${u.voted ? 'Voted' : 'Not voted'}</span>
            </div>
        `).join('');
}