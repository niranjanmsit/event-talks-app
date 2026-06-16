// static/app.js - State Management & UI Interactivity for BigQuery Release Radar

// Global State
let releaseNotes = [];
let activeTypeFilter = "all";
let searchQuery = "";
let selectedUpdateId = null;

// DOM Elements
const btnRefresh = document.getElementById("btn-refresh");
const searchInput = document.getElementById("search-input");
const filterPillsContainer = document.getElementById("filter-pills-container");
const timelineSpinner = document.getElementById("timeline-spinner");
const timelineEmpty = document.getElementById("timeline-empty");
const timelineContainer = document.getElementById("timeline-container");

// Composer Elements
const composerEmptyState = document.getElementById("composer-empty-state");
const composerForm = document.getElementById("composer-form");
const composerDate = document.getElementById("composer-date");
const composerType = document.getElementById("composer-type");
const tweetTextarea = document.getElementById("tweet-textarea");
const charCount = document.getElementById("char-count");
const btnShareTweet = document.getElementById("btn-share-tweet");

// Statistics Elements
const statTotal = document.getElementById("stat-total");
const statFeatures = document.getElementById("stat-features");
const statIssues = document.getElementById("stat-issues");
const statChanges = document.getElementById("stat-changes");

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  fetchReleaseNotes();
  setupEventListeners();
});

// Fetch data from Flask backend
async function fetchReleaseNotes() {
  setLoadingState(true);
  try {
    const response = await fetch("/api/release-notes");
    if (!response.ok) throw new Error("Failed to fetch release notes feed.");
    
    const result = await response.json();
    if (result.status === "success") {
      releaseNotes = result.data;
      calculateStatistics(releaseNotes);
      renderTimeline();
    } else {
      showError(result.message || "An error occurred fetching notes.");
    }
  } catch (error) {
    showError(error.message);
  } finally {
    setLoadingState(false);
  }
}

// Set Loading UI states
function setLoadingState(isLoading) {
  if (isLoading) {
    btnRefresh.classList.add("loading");
    timelineSpinner.style.display = "flex";
    timelineContainer.style.display = "none";
    timelineEmpty.style.display = "none";
  } else {
    btnRefresh.classList.remove("loading");
    timelineSpinner.style.display = "none";
    timelineContainer.style.display = "flex";
  }
}

// Calculate feed statistics
function calculateStatistics(notes) {
  let total = 0;
  let features = 0;
  let issues = 0;
  let changes = 0;

  notes.forEach(entry => {
    entry.updates.forEach(up => {
      total++;
      if (up.type.toLowerCase() === "feature") features++;
      else if (up.type.toLowerCase() === "issue") issues++;
      else if (up.type.toLowerCase() === "change") changes++;
    });
  });

  statTotal.textContent = total;
  statFeatures.textContent = features;
  statIssues.textContent = issues;
  statChanges.textContent = changes;
}

// Render the timeline feed
function renderTimeline() {
  timelineContainer.innerHTML = "";
  
  // Filter entries
  let filteredEntries = [];
  
  releaseNotes.forEach(entry => {
    // Filter updates inside the entry
    const matchingUpdates = entry.updates.filter(update => {
      const matchesType = activeTypeFilter === "all" || update.type.toLowerCase() === activeTypeFilter.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        update.text.toLowerCase().includes(searchQuery) || 
        entry.date.toLowerCase().includes(searchQuery) ||
        update.type.toLowerCase().includes(searchQuery);
      return matchesType && matchesSearch;
    });

    if (matchingUpdates.length > 0) {
      filteredEntries.push({
        ...entry,
        updates: matchingUpdates
      });
    }
  });

  if (filteredEntries.length === 0) {
    timelineContainer.style.display = "none";
    timelineEmpty.style.display = "flex";
    return;
  }

  timelineEmpty.style.display = "none";
  timelineContainer.style.display = "flex";

  filteredEntries.forEach(entry => {
    const dateGroup = document.createElement("div");
    dateGroup.className = "timeline-date-group";
    
    const dateTitle = document.createElement("h3");
    dateTitle.className = "timeline-date-title";
    dateTitle.textContent = entry.date;
    dateGroup.appendChild(dateTitle);
    
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "timeline-cards";

    entry.updates.forEach((update, idx) => {
      // Create a unique id for reference
      const updateId = `${entry.id}-${idx}`;
      
      const card = document.createElement("article");
      card.className = `update-card ${selectedUpdateId === updateId ? 'selected-card' : ''}`;
      card.dataset.id = updateId;
      
      const header = document.createElement("div");
      header.className = "card-header";
      
      const badge = document.createElement("span");
      badge.className = `badge-type ${update.type.toLowerCase()}`;
      badge.textContent = update.type;
      header.appendChild(badge);
      
      const actions = document.createElement("div");
      actions.className = "card-actions";
      
      const tweetBtn = document.createElement("button");
      tweetBtn.className = `btn-card-tweet ${selectedUpdateId === updateId ? 'active-draft' : ''}`;
      tweetBtn.innerHTML = `
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span>Tweet Update</span>
      `;
      
      tweetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectUpdateForDraft(updateId, entry.date, update.type, update.text, entry.link);
      });
      
      actions.appendChild(tweetBtn);
      header.appendChild(actions);
      card.appendChild(header);
      
      const body = document.createElement("div");
      body.className = "card-body";
      body.innerHTML = update.html;
      card.appendChild(body);
      
      // Select draft when clicking anywhere on the card
      card.addEventListener("click", () => {
        selectUpdateForDraft(updateId, entry.date, update.type, update.text, entry.link);
      });
      
      cardsContainer.appendChild(card);
    });
    
    dateGroup.appendChild(cardsContainer);
    timelineContainer.appendChild(dateGroup);
  });
}

// Select an update to compose a Tweet
function selectUpdateForDraft(id, date, type, text, link) {
  selectedUpdateId = id;
  
  // Highlight active card
  document.querySelectorAll(".update-card").forEach(card => {
    if (card.dataset.id === id) {
      card.classList.add("selected-card");
      card.querySelector(".btn-card-tweet").classList.add("active-draft");
    } else {
      card.classList.remove("selected-card");
      card.querySelector(".btn-card-tweet").classList.remove("active-draft");
    }
  });

  // Load draft data
  composerEmptyState.style.display = "none";
  composerForm.style.display = "flex";
  
  composerDate.textContent = date;
  composerType.textContent = type;
  composerType.className = `badge-type ${type.toLowerCase()}`;

  // Generate Tweet template text
  const cleanLink = link.split('#')[0]; // Use base release note URL for generic tweets
  const tweetTemplate = `📊 BigQuery [${type}] - ${date}:\n\n${text.substring(0, 160)}...\n\nRead more: ${link}\n#GoogleCloud #BigQuery`;
  
  tweetTextarea.value = tweetTemplate;
  updateCharCounter();
  
  // Focus text area
  tweetTextarea.focus();
}

// Update character counter and button validation states
function updateCharCounter() {
  const len = tweetTextarea.value.length;
  charCount.textContent = len;
  
  const counterEl = document.querySelector(".char-counter");
  counterEl.className = "char-counter";
  
  if (len > 280) {
    counterEl.classList.add("limit-exceeded");
    btnShareTweet.disabled = true;
    btnShareTweet.style.opacity = 0.5;
    btnShareTweet.style.cursor = "not-allowed";
  } else {
    btnShareTweet.disabled = false;
    btnShareTweet.style.opacity = 1;
    btnShareTweet.style.cursor = "pointer";
    if (len >= 260) {
      counterEl.classList.add("limit-near");
    }
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Refresh Button Click
  btnRefresh.addEventListener("click", fetchReleaseNotes);
  
  // Search Keyup
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTimeline();
  });

  // Filter Pills Selection
  filterPillsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill")) {
      // Toggle active classes
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      e.target.classList.add("active");
      
      activeTypeFilter = e.target.dataset.type;
      renderTimeline();
    }
  });

  // Tweet Textarea input character tracking
  tweetTextarea.addEventListener("input", updateCharCounter);

  // Send Tweet Action
  btnShareTweet.addEventListener("click", () => {
    const tweetText = tweetTextarea.value.trim();
    if (!tweetText) return;
    
    // Open Twitter intent link
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterIntentUrl, "_blank");
  });
}

// Show error state inside container
function showError(msg) {
  timelineContainer.style.display = "none";
  timelineSpinner.style.display = "none";
  timelineEmpty.style.display = "flex";
  
  const emptyTitle = timelineEmpty.querySelector("h3");
  const emptyDesc = timelineEmpty.querySelector("p");
  
  emptyTitle.textContent = "Error Loading Feed";
  emptyDesc.textContent = msg || "Make sure the Flask server is running and you have an internet connection.";
}
