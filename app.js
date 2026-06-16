// app.js - Logic, State Management, and Simulation Engine for agy Dashboard

// Mock Database of Runs
const initialRuns = [
  {
    id: "run-4",
    title: "Get latest news & summary",
    prompt: "get the latest news and write it in a file called news.txt. Then create another file that contains the summary of that file.",
    model: "Gemini 3.5 Flash (Medium)",
    status: "success",
    timestamp: "May 24, 2026, 22:57:35",
    duration: "6.8s",
    settings: {
      skipPermissions: true,
      continue: false,
      sandbox: true,
      printMode: false
    },
    steps: [
      {
        type: "tool-call",
        title: "ListDir(/Users/romin/agy-cli-projects)",
        duration: "0.2s",
        content: `[]\nDirectory is empty.`
      },
      {
        type: "tool-call",
        title: "WebSearch(latest world news May 24 2026 news headlines)",
        duration: "1.5s",
        content: `Citations & Search Results:
- [1] "Geneva Peace Talks Progress" (https://worldnews.com/geneva-talks)
  U.S. and Iranian envoys reported significant breakthroughs in Geneva regarding trade agreements and partial sanctions relief.
- [2] "Ukraine Conflict Eastern Border" (https://regionalnews.org/ukraine-borders)
  Drone strikes target critical energy infrastructures in Eastern Ukraine; diplomatic progress remains slow.
- [3] "Central Africa Ebola Outbreak Contained" (https://who-africa.int/ebola-update)
  WHO announces successful ring vaccination strategy, bringing the Ebola virus disease outbreak to a halt.
- [4] "Kyle Busch Obituary" (https://nascarstats.net/kyle-busch-passes-away)
  Legendary stock car driver and NASCAR champion Kyle Busch passes away at 74 due to natural causes.`
      },
      {
        type: "thought-block",
        title: "Thought for 2s, 95 tokens",
        duration: "2.0s",
        content: `Processing News Information...
I need to parse the retrieved news stories and organize them into two distinct documents:
1. "news.txt" containing the descriptive details of the news headlines.
2. "summary.txt" containing a high-level summary of categories (Geopolitics, Security, Health, Obituary).
I will write files sequentially using the Create tool.`
      },
      {
        type: "tool-call",
        title: "Create(/Users/romin/agy-cli-projects/news.txt)",
        duration: "0.8s",
        content: `File C:\\Users\\romin\\agy-cli-projects\\news.txt created successfully.`
      },
      {
        type: "tool-call",
        title: "Create(/Users/romin/agy-cli-projects/summary.txt)",
        duration: "0.7s",
        content: `File C:\\Users\\romin\\agy-cli-projects\\summary.txt created successfully.`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "1.6s",
        content: `I have fetched the latest world news headlines and created the requested files in your workspace:

1. **news.txt**: Contains the detailed news headlines for today (May 24, 2026), including topics on geopolitics (U.S.-Iran negotiations, Ukraine conflict), U.S. security incidents, the Ebola outbreak in Central Africa, and the passing of NASCAR champion Kyle Busch.
2. **summary.txt**: Contains a concise, structured summary of the major categories covered in the news file.`
      }
    ],
    files: [
      {
        name: "news.txt",
        size: "348 B",
        content: `Latest World News - May 24, 2026
===============================
1. GEOPOLITICS: U.S. and Iran negotiations in Geneva show promising progress on trade and sanctions relief.
2. REGIONAL CONFLICT: Ukraine drone strikes continue in the eastern border regions; peace talks stall.
3. HEALTH: WHO reports successful containment of the latest Ebola outbreak in Central Africa.
4. SPORTS: Legendary NASCAR champion Kyle Busch has passed away at the age of 74.`
      },
      {
        name: "summary.txt",
        size: "185 B",
        content: `SUMMARY OF NEWS - MAY 24, 2026
==============================
- Geopolitics: Progress in Geneva talks.
- Security: Ongoing Ukraine conflicts.
- Health: Ebola outbreak contained.
- Obituary: NASCAR champion Kyle Busch passes away.`
      }
    ]
  },
  {
    id: "run-3",
    title: "agy --dangerously-skip-permissions",
    prompt: "agy --dangerously-skip-permissions",
    model: "Gemini 3.5 Flash (Low)",
    status: "interrupted",
    timestamp: "May 24, 2026, 22:57:08",
    duration: "1.2s",
    settings: {
      skipPermissions: true,
      continue: false,
      sandbox: true,
      printMode: false
    },
    steps: [
      {
        type: "tool-call",
        title: "RunCommand(agy --dangerously-skip-permissions)",
        duration: "1.0s",
        content: `Tool is running as a background task with task id: a0a89d7d-f553-4eb6-9c2e-eaf86c06b5ab/task-31\nTask Description: agy --dangerously-skip-permissions`
      },
      {
        type: "error-block",
        title: "Interrupted",
        duration: "0.2s",
        content: `Task interrupted: User submitted a new prompt command.`
      }
    ],
    files: []
  },
  {
    id: "run-2",
    title: "Change active model",
    prompt: 'agy --model "Gemini 3.5 Flash (Low)"',
    model: "Gemini 3.5 Flash (Low)",
    status: "success",
    timestamp: "May 24, 2026, 22:56:10",
    duration: "4.5s",
    settings: {
      skipPermissions: false,
      continue: false,
      sandbox: true,
      printMode: false
    },
    steps: [
      {
        type: "tool-call",
        title: "RunCommand(agy --model \"Gemini 3.5 Flash (Low)\")",
        duration: "2.1s",
        content: `Configuration loaded.\nActive Model switched to: Gemini 3.5 Flash (Low)\nSession initialized.`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "2.4s",
        content: `Session updated. You are now communicating with Gemini 3.5 Flash (Low). Interactive shell is ready.`
      }
    ],
    files: []
  },
  {
    id: "run-1",
    title: "List available models",
    prompt: "agy models",
    model: "Gemini 3.5 Flash (Medium)",
    status: "success",
    timestamp: "May 24, 2026, 22:55:52",
    duration: "2.1s",
    settings: {
      skipPermissions: false,
      continue: false,
      sandbox: true,
      printMode: false
    },
    steps: [
      {
        type: "tool-call",
        title: "RunCommand(agy models)",
        duration: "0.8s",
        content: `Querying available backend model integrations...`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "1.3s",
        content: `Gemini 3.5 Flash (Medium)
Gemini 3.5 Flash (High)
Gemini 3.5 Flash (Low)
Gemini 3.1 Pro (Low)
Gemini 3.1 Pro (High)
Claude Sonnet 4.6 (Thinking)
Claude Opus 4.6 (Thinking)
GPT-OSS 120B (Medium)`
      }
    ],
    files: []
  }
];

// App State
let runs = [...initialRuns];
let activeRunId = "run-4";

// DOM Elements
const historyList = document.getElementById("history-list");
const promptText = document.getElementById("prompt-text");
const modelPill = document.getElementById("model-pill");
const durationPill = document.getElementById("duration-pill");
const statusPill = document.getElementById("status-pill");
const timestampPill = document.getElementById("timestamp-pill");
const traceTimeline = document.getElementById("trace-timeline");
const fileList = document.getElementById("file-list");
const modelSelect = document.getElementById("model-select");

// Settings Toggles
const toggleSkip = document.getElementById("toggle-skip");
const toggleContinue = document.getElementById("toggle-continue");
const toggleSandbox = document.getElementById("toggle-sandbox");
const togglePrint = document.getElementById("toggle-print");

// CLI Input Form
const cliForm = document.getElementById("cli-form");
const cliInput = document.getElementById("cli-input");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");

// File Viewer
const fileViewerOverlay = document.getElementById("file-viewer-overlay");
const fileViewerTitle = document.getElementById("file-viewer-title");
const fileViewerContent = document.getElementById("file-viewer-content");
const fileViewerClose = document.getElementById("file-viewer-close");

// Initialize Application
function init() {
  renderHistory();
  loadRunDetails(activeRunId);
  setupEventListeners();
}

// Render History Sidebar
function renderHistory() {
  historyList.innerHTML = "";
  runs.forEach(run => {
    const li = document.createElement("li");
    li.className = `history-item ${run.id === activeRunId ? 'active' : ''}`;
    li.dataset.id = run.id;
    
    let badgeClass = "badge-success";
    let statusLabel = "Success";
    if (run.status === "running") {
      badgeClass = "badge-running";
      statusLabel = "Running";
    } else if (run.status === "interrupted") {
      badgeClass = "badge-interrupted";
      statusLabel = "Stopped";
    }

    li.innerHTML = `
      <div class="history-item-header">
        <span class="history-item-title">${escapeHTML(run.title)}</span>
        <span class="badge ${badgeClass}">${statusLabel}</span>
      </div>
      <div class="history-item-meta">
        <span>${run.duration}</span>
        <span>${run.timestamp.split(',')[1]?.trim() || run.timestamp}</span>
      </div>
    `;
    
    li.addEventListener("click", () => {
      selectRun(run.id);
    });
    
    historyList.appendChild(li);
  });
}

// Select a specific Run
function selectRun(runId) {
  activeRunId = runId;
  renderHistory();
  loadRunDetails(runId);
}

// Load Run Details into Workspace
function loadRunDetails(runId) {
  const run = runs.find(r => r.id === runId);
  if (!run) return;

  // Prompts and Pills
  promptText.textContent = run.prompt;
  modelPill.textContent = run.model;
  durationPill.textContent = run.duration;
  timestampPill.textContent = run.timestamp;
  
  // Update Header Model Selector to match selected run
  if (modelSelect.value !== run.model) {
    modelSelect.value = run.model;
  }

  // Update Status
  if (run.status === "running") {
    statusPill.textContent = "Running";
    statusPill.className = "badge badge-running";
    statusDot.className = "status-dot running";
    statusText.textContent = "Agent executing command...";
  } else if (run.status === "interrupted") {
    statusPill.textContent = "Interrupted";
    statusPill.className = "badge badge-interrupted";
    statusDot.className = "status-dot idle";
    statusText.textContent = "Session completed";
  } else {
    statusPill.textContent = "Success";
    statusPill.className = "badge badge-success";
    statusDot.className = "status-dot";
    statusText.textContent = "Session completed";
  }

  // Load Settings
  toggleSkip.checked = run.settings.skipPermissions;
  toggleContinue.checked = run.settings.continue;
  toggleSandbox.checked = run.settings.sandbox;
  togglePrint.checked = run.settings.printMode;

  // Render Trace Steps
  renderTrace(run.steps);

  // Render Files
  renderFiles(run.files);
}

// Render Trace Steps
function renderTrace(steps) {
  traceTimeline.innerHTML = "";
  if (!steps || steps.length === 0) {
    traceTimeline.innerHTML = `<div style="color: var(--color-muted); font-size: 0.85rem; text-align: center; padding: 20px;">No execution traces available for this session.</div>`;
    return;
  }

  steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    let stepClass = "trace-step";
    if (step.type === "tool-call") stepClass += " tool-call";
    else if (step.type === "thought-block") stepClass += " thought-block";
    else if (step.type === "response-block") stepClass += " response-block";
    else if (step.type === "error-block") stepClass += " error-block";
    
    // Default collapsed behavior except for the final output response block
    const isCollapsed = step.type !== "response-block" && index !== steps.length - 1;
    if (isCollapsed) {
      stepEl.className = `${stepClass} collapsed`;
    } else {
      stepEl.className = stepClass;
    }

    // Body content formatter
    let formattedBody = escapeHTML(step.content);
    if (step.type === "response-block") {
      formattedBody = `<div class="agent-response-text">${formatResponseMarkdown(step.content)}</div>`;
    } else if (step.type === "thought-block") {
      formattedBody = `
        <div class="thought-header">
          <span>▸ Thought Process</span>
          <span class="thought-tokens">${step.title.includes(',') ? step.title.split(',')[1].trim() : 'Active'}</span>
        </div>
        <div>${escapeHTML(step.content)}</div>
      `;
    }

    stepEl.innerHTML = `
      <div class="trace-step-header">
        <div class="trace-step-title">
          <span class="trace-dot"></span>
          <span>${escapeHTML(step.type === "thought-block" ? "Thought" : step.title)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="trace-step-duration">${step.duration}</span>
          <span class="expand-hint">${isCollapsed ? '展开 ▾' : '收起 ▴'}</span>
        </div>
      </div>
      <div class="trace-step-body">${formattedBody}</div>
    `;

    // Collapsible Logic
    stepEl.querySelector(".trace-step-header").addEventListener("click", () => {
      const body = stepEl.querySelector(".trace-step-body");
      const hint = stepEl.querySelector(".expand-hint");
      
      if (stepEl.classList.contains("collapsed")) {
        stepEl.classList.remove("collapsed");
        hint.textContent = "收起 ▴";
      } else {
        stepEl.classList.add("collapsed");
        hint.textContent = "展开 ▾";
      }
    });

    traceTimeline.appendChild(stepEl);
  });
}

// Render Files Sidebar Panel
function renderFiles(files) {
  fileList.innerHTML = "";
  if (!files || files.length === 0) {
    fileList.innerHTML = `<div style="color: var(--color-muted); font-size: 0.8rem; text-align: center; padding: 10px 0;">No files modified in this session.</div>`;
    return;
  }

  files.forEach(file => {
    const div = document.createElement("div");
    div.className = "file-item";
    div.innerHTML = `
      <div class="file-info">
        <svg class="file-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 1.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm0-3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5zm0-3a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
        </svg>
        <span class="file-name">${escapeHTML(file.name)}</span>
      </div>
      <span class="file-size">${escapeHTML(file.size)}</span>
    `;

    div.addEventListener("click", () => {
      openFileViewer(file.name, file.content);
    });

    fileList.appendChild(div);
  });
}

// File Viewer Controls
function openFileViewer(name, content) {
  fileViewerTitle.innerHTML = `
    <svg class="file-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 8px;">
      <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 1.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm0-3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5zm0-3a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
    </svg>
    <span>${escapeHTML(name)}</span>
  `;
  fileViewerContent.textContent = content;
  fileViewerOverlay.classList.add("active");
}

function closeFileViewer() {
  fileViewerOverlay.classList.remove("active");
}

// Setup Event Handlers
function setupEventListeners() {
  fileViewerClose.addEventListener("click", closeFileViewer);
  fileViewerOverlay.addEventListener("click", (e) => {
    if (e.target === fileViewerOverlay) closeFileViewer();
  });

  // Esc closes file modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFileViewer();
  });

  // Model Selector in Header
  modelSelect.addEventListener("change", (e) => {
    const currentModel = e.target.value;
    // Update active run's model if appropriate, or simulate a model change command
    if (runs.find(r => r.id === activeRunId)) {
      const activeRun = runs.find(r => r.id === activeRunId);
      activeRun.model = currentModel;
      modelPill.textContent = currentModel;
    }
  });

  // Settings Toggles (updates local state dynamically)
  const syncSettings = () => {
    const activeRun = runs.find(r => r.id === activeRunId);
    if (activeRun) {
      activeRun.settings.skipPermissions = toggleSkip.checked;
      activeRun.settings.continue = toggleContinue.checked;
      activeRun.settings.sandbox = toggleSandbox.checked;
      activeRun.settings.printMode = togglePrint.checked;
    }
  };
  toggleSkip.addEventListener("change", syncSettings);
  toggleContinue.addEventListener("change", syncSettings);
  toggleSandbox.addEventListener("change", syncSettings);
  togglePrint.addEventListener("change", syncSettings);

  // Form Submit (Simulation Engine)
  cliForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const prompt = cliInput.value.trim();
    if (!prompt) return;
    
    runSimulation(prompt);
    cliInput.value = "";
  });
}

// Simulation Engine - Dynamically animate a mock agent run based on input
function runSimulation(prompt) {
  const newRunId = `run-${Date.now()}`;
  const now = new Date();
  const timestampStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ", " + now.toLocaleTimeString('en-US', { hour12: false });
  
  const selectedModel = modelSelect.value;
  const skipPerms = toggleSkip.checked;

  // Create initial empty/running state
  const newRun = {
    id: newRunId,
    title: prompt.length > 25 ? prompt.substring(0, 22) + "..." : prompt,
    prompt: prompt,
    model: selectedModel,
    status: "running",
    timestamp: timestampStr,
    duration: "Running...",
    settings: {
      skipPermissions: skipPerms,
      continue: toggleContinue.checked,
      sandbox: toggleSandbox.checked,
      printMode: togglePrint.checked
    },
    steps: [],
    files: []
  };

  // Add to runs and set as active
  runs.unshift(newRun);
  activeRunId = newRunId;
  
  renderHistory();
  loadRunDetails(newRunId);

  // Set running headers
  statusDot.className = "status-dot running";
  statusText.textContent = "Agent executing command...";
  
  let currentStep = 0;
  
  // Custom responses based on keywords in prompt
  let simulationSteps = [];
  let simulatedFiles = [];

  if (prompt.toLowerCase().includes("news") || prompt.toLowerCase().includes("summarize")) {
    simulationSteps = [
      {
        type: "tool-call",
        title: "ListDir(C:\\Users\\nbasak\\projects\\my-agentic-app)",
        duration: "0.2s",
        content: `[]\nWorkspace is currently empty.`
      },
      {
        type: "tool-call",
        title: "WebSearch(latest news summary)",
        duration: "1.4s",
        content: `Search Results:\n- Geneva summits report positive progress in trade\n- Local elections in European territories finalize\n- Breakthrough in quantum computing algorithms published.`
      },
      {
        type: "thought-block",
        title: "Thought for 1.8s, 82 tokens",
        duration: "1.8s",
        content: `Analyzing retrieved news indices.\nI should compile the findings into a report titled 'news.txt' and summarize it in 'summary.txt'.\nWill invoke file write operations.`
      },
      {
        type: "tool-call",
        title: "Create(C:\\Users\\nbasak\\projects\\my-agentic-app\\news.txt)",
        duration: "0.6s",
        content: `File news.txt created successfully.`
      },
      {
        type: "tool-call",
        title: "Create(C:\\Users\\nbasak\\projects\\my-agentic-app\\summary.txt)",
        duration: "0.5s",
        content: `File summary.txt created successfully.`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "1.2s",
        content: `I have compiled the latest news into **news.txt** and generated a structured breakdown in **summary.txt** inside your workspace folder.`
      }
    ];

    simulatedFiles = [
      {
        name: "news.txt",
        size: "210 B",
        content: `WORLD NEWS UPDATE - ${now.toDateString()}\n=========================\n- Geneva summits declare trade deal breakthroughs.\n- Regional election outcomes finalized in Europe.\n- Researchers publish major advances in quantum gate speed.`
      },
      {
        name: "summary.txt",
        size: "120 B",
        content: `SUMMARY REPORT\n==============\n1. Global Trade: Breakthroughs in Geneva.\n2. Tech: Quantum computing progress.`
      }
    ];
  } else if (prompt.toLowerCase().includes("python") || prompt.toLowerCase().includes("script") || prompt.toLowerCase().includes("code")) {
    simulationSteps = [
      {
        type: "tool-call",
        title: "ListDir(C:\\Users\\nbasak\\projects\\my-agentic-app)",
        duration: "0.3s",
        content: `[]\nWorkspace is empty.`
      },
      {
        type: "thought-block",
        title: "Thought for 2.2s, 110 tokens",
        duration: "2.2s",
        content: `The user wants a Python utility.\nI will construct a script 'math_utils.py' providing arithmetic helper utilities and a self-testing suite inside 'test_utils.py'.`
      },
      {
        type: "tool-call",
        title: "Create(C:\\Users\\nbasak\\projects\\my-agentic-app\\math_utils.py)",
        duration: "0.8s",
        content: `File math_utils.py created.`
      },
      {
        type: "tool-call",
        title: "Create(C:\\Users\\nbasak\\projects\\my-agentic-app\\test_utils.py)",
        duration: "0.6s",
        content: `File test_utils.py created.`
      },
      {
        type: "tool-call",
        title: "RunCommand(python test_utils.py)",
        duration: "1.5s",
        content: `Executing test suite...\n..OK\n2 tests run in 0.002s\nSUCCESS.`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "1.1s",
        content: `I have created the Python modules:\n- **math_utils.py**: Custom mathematical helper algorithms.\n- **test_utils.py**: Automatic unit test suites.\n\nAll tests passed successfully.`
      }
    ];

    simulatedFiles = [
      {
        name: "math_utils.py",
        size: "412 B",
        content: `def fibonacci(n):\n    """Return the n-th Fibonacci number."""\n    if n <= 0: return 0\n    elif n == 1: return 1\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\ndef is_prime(n):\n    """Check primality of n."""\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True`
      },
      {
        name: "test_utils.py",
        size: "310 B",
        content: `from math_utils import fibonacci, is_prime\n\ndef test_fibonacci():\n    assert fibonacci(5) == 5\n    assert fibonacci(10) == 55\n\ndef test_prime():\n    assert is_prime(11) is True\n    assert is_prime(15) is False\n\nif __name__ == "__main__":\n    test_fibonacci()\n    test_prime()\n    print("All tests passed!")`
      }
    ];
  } else {
    // Default fallback script/response
    simulationSteps = [
      {
        type: "tool-call",
        title: "ListDir(C:\\Users\\nbasak\\projects\\my-agentic-app)",
        duration: "0.2s",
        content: `[]\nWorkspace is empty.`
      },
      {
        type: "thought-block",
        title: "Thought for 1.5s, 64 tokens",
        duration: "1.5s",
        content: `Processing basic user instruction: ${prompt}\nLet's generate a general response and document index 'info.md' to fulfill the request.`
      },
      {
        type: "tool-call",
        title: "Create(C:\\Users\\nbasak\\projects\\my-agentic-app\\info.md)",
        duration: "0.7s",
        content: `File info.md created successfully.`
      },
      {
        type: "response-block",
        title: "Response",
        duration: "1.0s",
        content: `Completed prompt task: "${prompt}".\nI have created a documentation reference **info.md** in your workspace outlining the response.`
      }
    ];

    simulatedFiles = [
      {
        name: "info.md",
        size: "165 B",
        content: `# Info Summary\n\nTask prompt executed: "${prompt}"\nCompleted successfully on: ${now.toLocaleString()}`
      }
    ];
  }

  // Animation timeline using timeouts
  function executeNextStep() {
    if (currentStep < simulationSteps.length) {
      const stepData = simulationSteps[currentStep];
      newRun.steps.push(stepData);
      
      // If we create files, append them at the right time
      if (stepData.title.includes("Create(") || stepData.title.includes("write")) {
        // Find matching file in simulatedFiles
        const createdFileName = stepData.title.match(/Create\((?:.*[\\/])?([^)]+)\)/)?.[1];
        if (createdFileName) {
          const fileObj = simulatedFiles.find(f => f.name === createdFileName);
          if (fileObj && !newRun.files.some(f => f.name === fileObj.name)) {
            newRun.files.push(fileObj);
          }
        }
      }

      // Render update on the active screen
      if (activeRunId === newRunId) {
        renderTrace(newRun.steps);
        renderFiles(newRun.files);
        
        // Auto scroll to bottom
        const runContainer = document.querySelector(".run-container");
        if (runContainer) {
          runContainer.scrollTop = runContainer.scrollHeight;
        }
      }

      currentStep++;
      
      // Calculate next timeout duration based on step's duration representation
      const durationVal = parseFloat(stepData.duration) * 1000;
      setTimeout(executeNextStep, durationVal || 1000);
    } else {
      // Mark as complete
      newRun.status = "success";
      
      // Calculate total duration
      let totalSeconds = 0;
      simulationSteps.forEach(s => {
        totalSeconds += parseFloat(s.duration) || 0;
      });
      newRun.duration = `${totalSeconds.toFixed(1)}s`;

      if (activeRunId === newRunId) {
        loadRunDetails(newRunId);
      }
      
      renderHistory();
    }
  }

  // Start execution loops
  setTimeout(executeNextStep, 500);
}

// Helpers
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Format simplistic markdown code/bold for rendering inside final agent response
function formatResponseMarkdown(text) {
  let html = escapeHTML(text);
  
  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // List bullets
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Number list
  html = html.replace(/^\s*(\d+)\.\s+(.*)$/gm, '<li>$2</li>');
  
  // Inline Code `code`
  html = html.replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: rgba(255,255,255,0.06); padding: 2px 4px; border-radius: 4px; font-size: 0.85em;">$1</code>');
  
  // Convert lines into double breaks if not lists
  html = html.replace(/\n\n/g, '<br><br>');
  
  return html;
}

// Run on page load
window.addEventListener("DOMContentLoaded", init);
