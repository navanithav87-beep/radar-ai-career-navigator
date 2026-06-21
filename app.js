// Opportunity Radar AI - Application State & Logic

const DEFAULT_PROFILE = {
  user_name: "Navanitha",
  current_role: "Python & Django Developer / Emerging ML Engineer",
  skills: [
    "Python", "SQL", "Django", "scikit-learn", 
    "scikit-image (HOG)", "PIL (Pillow)", "Support Vector Machines (SVM)", 
    "SQLite", "Git", "Pip", "Dotenv"
  ],
  projects: [
    {
      name: "Image Classification Fruit",
      type: "Django & Machine Learning",
      description: "An image classifier Django application utilizing HOG feature extraction and an SVM model to classify fruit images. Includes train.py for training models, preprocessing, and pickling.",
      technologies: "Django, Python, scikit-learn, scikit-image, PIL, Pickle"
    },
    {
      name: "Personal Money Transaction Tracker",
      type: "Django Web Application",
      description: "A database-driven money transaction tracking application with full CRUD capabilities.",
      technologies: "Django, Python, SQL, SQLite"
    },
    {
      name: "User & Organization CRUD Projects",
      type: "Django Web Applications",
      description: "Django-based applications handling user and organization CRUD flows, using .env for configuration.",
      technologies: "Django, Python, SQLite, django-environ"
    }
  ]
};

const DEFAULT_OPPORTUNITIES = [
  {
    id: "OPP-001",
    title: "Django + ML Model API Integration & Frontend UI",
    type: "Portfolio Project",
    description: "Expose the SVM Fruit Classifier via a Django REST Framework (DRF) or FastAPI endpoint, and build a beautiful, responsive, modern web interface for users to upload fruit images and see instant classifications with confidence metrics.",
    skill_development: 9.5,
    career_impact: 9.0,
    networking_value: 6.0,
    financial_benefit: 8.0,
    difficulty: 6.0,
    time_required_hours: 20,
    score: 8.8,
    status: "Recommended"
  },
  {
    id: "OPP-002",
    title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    type: "Certification",
    description: "Gain the industry-standard certification for building and deploying AI solutions (Azure OpenAI, cognitive services, and AI agents) on Microsoft Azure.",
    skill_development: 8.5,
    career_impact: 8.5,
    networking_value: 7.0,
    financial_benefit: 8.5,
    difficulty: 7.5,
    time_required_hours: 60,
    score: 8.1,
    status: "Recommended"
  },
  {
    id: "OPP-003",
    title: "AI & Web App Integration Hackathon (HackerEarth / Devpost)",
    type: "Hackathon",
    description: "Participate in a team-based hackathon focused on building intelligent web applications. Promotes networking, rapid prototyping, and high-visibility portfolio items.",
    skill_development: 9.0,
    career_impact: 8.5,
    networking_value: 9.0,
    financial_benefit: 7.0,
    difficulty: 8.0,
    time_required_hours: 36,
    score: 8.0,
    status: "Recommended"
  },
  {
    id: "OPP-004",
    title: "Google Cloud Professional Machine Learning Engineer",
    type: "Certification",
    description: "Validate professional capabilities to build, train, deploy, and monitor machine learning models at scale using Vertex AI on GCP.",
    skill_development: 9.0,
    career_impact: 9.0,
    networking_value: 7.5,
    financial_benefit: 9.0,
    difficulty: 8.5,
    time_required_hours: 80,
    score: 7.9,
    status: "Target"
  },
  {
    id: "OPP-005",
    title: "PCAP: Certified Associate in Python Programming",
    type: "Certification",
    description: "Obtain foundational credentials from the Python Institute validating intermediate Python concepts, OOP, and standard libraries.",
    skill_development: 6.5,
    career_impact: 6.0,
    networking_value: 5.0,
    financial_benefit: 6.0,
    difficulty: 5.0,
    time_required_hours: 30,
    score: 6.1,
    status: "Optional"
  }
];

const SKILL_PROFILES = {
  "Full-Stack AI Engineer": {
    skills: ["Python/Django", "ML Modeling", "API Design", "Frontend (JS/CSS)", "Cloud/DevOps", "MLOps"],
    user: [8.5, 7.0, 4.0, 3.5, 2.0, 2.0],
    target: [9.0, 8.0, 8.5, 7.5, 8.0, 7.5]
  },
  "MLOps Specialist": {
    skills: ["Python/Django", "ML Modeling", "API Design", "Frontend (JS/CSS)", "Cloud/DevOps", "MLOps"],
    user: [8.5, 7.0, 4.0, 2.0, 2.0, 2.0],
    target: [8.0, 8.5, 8.0, 4.0, 9.0, 9.0]
  }
};

const DEFAULT_TASKS = [
  { id: "T-01", title: "Implement Django view for model inference", hours: 4, deadline: "2026-06-25", status: "todo" },
  { id: "T-02", title: "Write Dockerfile to package django app", hours: 3, deadline: "2026-06-27", status: "progress" },
  { id: "T-03", title: "Prepare local dataset configuration", hours: 2, deadline: "2026-06-22", status: "done" },
  { id: "T-04", title: "Draft custom CSS layout styles for user interface", hours: 6, deadline: "2026-07-02", status: "todo" }
];

class OpportunityRadarApp {
  constructor() {
    this.profile = JSON.parse(localStorage.getItem('radar_profile')) || DEFAULT_PROFILE;
    this.opportunities = JSON.parse(localStorage.getItem('radar_opportunities')) || DEFAULT_OPPORTUNITIES;
    this.tasks = JSON.parse(localStorage.getItem('radar_tasks')) || DEFAULT_TASKS;
    
    this.currentFilter = 'all';
    this.activeTargetRole = "Full-Stack AI Engineer";
    
    this.initDOM();
    this.bindEvents();
    this.renderAll();
  }

  // --- Initialize DOM ---
  initDOM() {
    // Buttons & Views
    this.menuButtons = document.querySelectorAll('.menu-btn');
    this.panels = document.querySelectorAll('.panel');
    
    // Modals
    this.addOppModal = document.getElementById('add-opp-modal');
    this.openAddOppBtn = document.getElementById('open-add-opp-modal');
    this.closeAddOppBtn = document.getElementById('close-add-opp-modal');
    this.addOppForm = document.getElementById('add-opp-form');
    
    this.addTaskModal = document.getElementById('add-task-modal');
    this.openAddTaskBtn = document.getElementById('add-task-btn');
    this.closeAddTaskBtn = document.getElementById('close-add-task-modal');
    this.addTaskForm = document.getElementById('add-task-form');
    
    // Forms/Inputs
    this.compareBtn = document.getElementById('compare-btn');
    this.skillsSelector = document.getElementById('skills-role-selector');
    this.saveProfileBtn = document.getElementById('save-profile-btn');
    
    // Dynamic Containers
    this.oppsTableBody = document.getElementById('opportunities-tbody');
    this.skillsGapContainer = document.getElementById('skills-gap-container');
    this.dashboardOppsContainer = document.getElementById('dashboard-top-opportunities');
    this.dashboardDeadlinesContainer = document.getElementById('dashboard-deadlines');
    this.dashboardWeeklyPreview = document.getElementById('dashboard-weekly-preview');
    this.compareA = document.getElementById('compare-opp-a');
    this.compareB = document.getElementById('compare-opp-b');
  }

  // --- Bind Events ---
  bindEvents() {
    // Navigation
    this.menuButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.menuButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetPanel = btn.getAttribute('data-target');
        this.showPanel(targetPanel);
      });
    });

    // Modals - Add Opp
    this.openAddOppBtn.addEventListener('click', () => this.addOppModal.classList.remove('hidden'));
    this.closeAddOppBtn.addEventListener('click', () => this.addOppModal.classList.add('hidden'));
    this.addOppForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddOpportunity();
    });

    // Modals - Add Task
    this.openAddTaskBtn.addEventListener('click', () => this.addTaskModal.classList.remove('hidden'));
    this.closeAddTaskBtn.addEventListener('click', () => this.addTaskModal.classList.add('hidden'));
    this.addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // Skills profile selector
    this.skillsSelector.addEventListener('change', (e) => {
      this.activeTargetRole = e.target.value;
      this.renderSkillsPanel();
    });

    // Save profile changes
    this.saveProfileBtn.addEventListener('click', () => this.handleSaveProfile());

    // Comparison Assistant
    this.compareBtn.addEventListener('click', () => this.handleCompare());

    // Opportunity filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.renderOpportunitiesPanel();
      });
    });
  }

  // --- Storage Helper ---
  saveToStorage() {
    localStorage.setItem('radar_profile', JSON.stringify(this.profile));
    localStorage.setItem('radar_opportunities', JSON.stringify(this.opportunities));
    localStorage.setItem('radar_tasks', JSON.stringify(this.tasks));
  }

  // --- Show Panels ---
  showPanel(panelId) {
    this.panels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === panelId) {
        panel.classList.add('active');
      }
    });

    // Update Topbar Title
    const titleMap = {
      'dashboard-panel': 'Strategic Dashboard',
      'opportunities-panel': 'Career Opportunity Discovery',
      'skills-panel': 'Target Skill Gaps',
      'planner-panel': 'Action Planner',
      'decision-panel': 'Decision Trade-off Assistant',
      'profile-panel': 'Developer Profile Management'
    };
    document.getElementById('panel-title').innerText = titleMap[panelId] || 'Radar AI';
  }

  // --- Logic Handlers ---
  calculateROI(skill, impact, net, fin, diff, hours) {
    const rawScore = (skill * 0.25 + impact * 0.25 + net * 0.15 + fin * 0.15);
    const costFactor = 1 + (diff * 0.04 + (hours / 100) * 0.04);
    return parseFloat((rawScore / costFactor).toFixed(1));
  }

  handleAddOpportunity() {
    const title = document.getElementById('opp-title').value;
    const type = document.getElementById('opp-type').value;
    const skill = parseFloat(document.getElementById('opp-skill').value);
    const impact = parseFloat(document.getElementById('opp-impact').value);
    const net = parseFloat(document.getElementById('opp-net').value);
    const fin = parseFloat(document.getElementById('opp-fin').value);
    const diff = parseFloat(document.getElementById('opp-diff').value);
    const hours = parseInt(document.getElementById('opp-hours').value);
    const desc = document.getElementById('opp-desc').value;

    const score = this.calculateROI(skill, impact, net, fin, diff, hours);
    const status = score >= 8.0 ? 'Recommended' : (score >= 7.0 ? 'Target' : 'Optional');

    const newOpp = {
      id: `OPP-00${this.opportunities.length + 1}`,
      title, type, description: desc,
      skill_development: skill,
      career_impact: impact,
      networking_value: net,
      financial_benefit: fin,
      difficulty: diff,
      time_required_hours: hours,
      score, status
    };

    this.opportunities.push(newOpp);
    // Sort opportunities by score descending
    this.opportunities.sort((a, b) => b.score - a.score);
    
    this.saveToStorage();
    this.addOppModal.classList.add('hidden');
    this.addOppForm.reset();
    
    this.renderAll();
  }

  handleAddTask() {
    const title = document.getElementById('task-title').value;
    const hours = parseInt(document.getElementById('task-duration').value);
    const deadline = document.getElementById('task-deadline').value;

    const newTask = {
      id: `T-0${this.tasks.length + 1}`,
      title, hours, deadline, status: 'todo'
    };

    this.tasks.push(newTask);
    this.saveToStorage();
    this.addTaskModal.classList.add('hidden');
    this.addTaskForm.reset();
    
    this.renderAll();
  }

  handleSaveProfile() {
    const name = document.getElementById('prof-name').value;
    const role = document.getElementById('prof-role').value;
    const skillsText = document.getElementById('prof-skills').value;

    this.profile.user_name = name;
    this.profile.current_role = role;
    this.profile.skills = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);

    this.saveToStorage();
    alert('Profile successfully updated!');
    this.renderAll();
  }

  changeTaskStatus(id, newStatus) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = newStatus;
      this.saveToStorage();
      this.renderAll();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveToStorage();
    this.renderAll();
  }

  // --- Rendering ---
  renderAll() {
    this.updateStats();
    this.renderDashboard();
    this.renderOpportunitiesPanel();
    this.renderSkillsPanel();
    this.renderPlanner();
    this.renderDecisionDropdowns();
    this.renderProfile();
  }

  updateStats() {
    // Active Opps
    document.getElementById('stat-active-opps').innerText = this.opportunities.length;
    // Total skills tracked
    document.getElementById('stat-skills-tracked').innerText = this.profile.skills.length;
    // Task Deadlines remaining
    const openTasks = this.tasks.filter(t => t.status !== 'done').length;
    document.getElementById('stat-deadlines').innerText = openTasks;

    // Growth Index Calculation based on average top 3 opportunities scores
    const topThree = this.opportunities.slice(0, 3);
    const avgScore = topThree.reduce((sum, o) => sum + o.score, 0) / (topThree.length || 1);
    const percentage = Math.round(avgScore * 10);
    document.getElementById('header-growth-score').innerText = `${percentage}%`;
  }

  renderDashboard() {
    // Render Top 3 Opportunities
    this.dashboardOppsContainer.innerHTML = '';
    const topThree = this.opportunities.slice(0, 3);
    
    topThree.forEach(opp => {
      const item = document.createElement('div');
      item.className = 'opp-preview-item';
      item.innerHTML = `
        <div class="opp-preview-info">
          <span class="opp-preview-title">${opp.title}</span>
          <span class="opp-preview-meta">${opp.type} • Est. ${opp.time_required_hours}h</span>
        </div>
        <div class="opp-preview-roi">
          <span class="roi-label">ROI score</span>
          <span class="roi-val">${opp.score}</span>
        </div>
      `;
      this.dashboardOppsContainer.appendChild(item);
    });

    // Render deadlines list
    this.dashboardDeadlinesContainer.innerHTML = '';
    const openTasks = this.tasks.filter(t => t.status !== 'done').slice(0, 3);
    
    if (openTasks.length === 0) {
      this.dashboardDeadlinesContainer.innerHTML = `<div class="opp-preview-item" style="color:var(--text-secondary);font-size:0.85rem;">No upcoming actions. Clear path ahead!</div>`;
    } else {
      openTasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'deadline-item';
        // calculate days left
        const diffTime = new Date(task.deadline) - new Date();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const dayString = diffDays > 0 ? `${diffDays} days left` : 'Overdue';
        
        item.innerHTML = `
          <span class="deadline-title">${task.title}</span>
          <span class="deadline-days">${dayString}</span>
        `;
        this.dashboardDeadlinesContainer.appendChild(item);
      });
    }

    // Render Weekly Goals Checklist
    this.dashboardWeeklyPreview.innerHTML = '';
    const weeklyTasks = this.tasks.slice(0, 4);
    
    weeklyTasks.forEach(task => {
      const isChecked = task.status === 'done' ? 'checked' : '';
      const item = document.createElement('div');
      item.className = `planner-checklist-item ${task.status === 'done' ? 'done' : ''}`;
      item.innerHTML = `
        <input type="checkbox" ${isChecked} onchange="app.toggleTaskCheckbox('${task.id}', this.checked)">
        <span>${task.title}</span>
      `;
      this.dashboardWeeklyPreview.appendChild(item);
    });
  }

  toggleTaskCheckbox(id, isChecked) {
    this.changeTaskStatus(id, isChecked ? 'done' : 'todo');
  }

  renderOpportunitiesPanel() {
    this.oppsTableBody.innerHTML = '';
    
    const filtered = this.currentFilter === 'all' 
      ? this.opportunities 
      : this.opportunities.filter(o => o.type === this.currentFilter);

    filtered.forEach(opp => {
      const row = document.createElement('tr');
      
      let badgeClass = 'badge-accent';
      if (opp.status === 'Recommended') badgeClass = 'badge-green';
      else if (opp.status === 'Target') badgeClass = 'badge-purple';
      else if (opp.status === 'Optional') badgeClass = 'badge-orange';

      row.innerHTML = `
        <td>
          <div class="opp-title-cell">${opp.title}</div>
          <span class="opp-desc-cell">${opp.description}</span>
        </td>
        <td><span class="badge ${badgeClass}">${opp.type}</span></td>
        <td>${opp.difficulty}/10</td>
        <td>${opp.time_required_hours}h</td>
        <td style="font-weight: 700; color: var(--accent-purple);">${opp.score}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="app.recommendAction('${opp.id}')">Analyze</button>
        </td>
      `;
      this.oppsTableBody.appendChild(row);
    });
  }

  recommendAction(oppId) {
    const opp = this.opportunities.find(o => o.id === oppId);
    if (opp) {
      alert(`Strategy breakdown for "${opp.title}":\n\nROI Score: ${opp.score}/10\nSkill Growth: ${opp.skill_development}/10\nCareer Value: ${opp.career_impact}/10\nTime Commitment: ${opp.time_required_hours} hours.\n\nRecommended Action Plan: Devote ${Math.ceil(opp.time_required_hours / 4)} hours weekly over 4 weeks to complete this. Highlight this as a verified milestone on LinkedIn.`);
    }
  }

  renderSkillsPanel() {
    const data = SKILL_PROFILES[this.activeTargetRole];
    if (!data) return;

    // Draw SVG Radar Chart
    const svg = document.getElementById('radar-chart-svg');
    svg.innerHTML = ''; // Clear previous

    const center = 150;
    const radius = 100;
    const totalAxes = data.skills.length;

    // Outer grid circles
    for (let j = 1; j <= 5; j++) {
      const r = (radius / 5) * j;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", center);
      circle.setAttribute("cy", center);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "rgba(255, 255, 255, 0.05)");
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);
    }

    const angleSlice = (Math.PI * 2) / totalAxes;
    const userPoints = [];
    const targetPoints = [];

    data.skills.forEach((skillName, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      
      // Draw grid line axes
      const xEnd = center + Math.cos(angle) * radius;
      const yEnd = center + Math.sin(angle) * radius;

      const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
      axis.setAttribute("x1", center);
      axis.setAttribute("y1", center);
      axis.setAttribute("x2", xEnd);
      axis.setAttribute("y2", yEnd);
      axis.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
      svg.appendChild(axis);

      // Label text
      const xLabel = center + Math.cos(angle) * (radius + 22);
      const yLabel = center + Math.sin(angle) * (radius + 12);
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", xLabel);
      text.setAttribute("y", yLabel);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "var(--text-secondary)");
      text.setAttribute("font-size", "9");
      text.setAttribute("font-weight", "500");
      text.textContent = skillName;
      svg.appendChild(text);

      // Points for User profile (scaled to max 10)
      const userVal = data.user[i];
      const userR = (userVal / 10) * radius;
      userPoints.push(`${center + Math.cos(angle) * userR},${center + Math.sin(angle) * userR}`);

      // Points for Target profile
      const targetVal = data.target[i];
      const targetR = (targetVal / 10) * radius;
      targetPoints.push(`${center + Math.cos(angle) * targetR},${center + Math.sin(angle) * targetR}`);
    });

    // Draw Target Polygon (Blue accent)
    const targetPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    targetPoly.setAttribute("points", targetPoints.join(" "));
    targetPoly.setAttribute("fill", "rgba(56, 189, 248, 0.15)");
    targetPoly.setAttribute("stroke", "var(--accent-blue)");
    targetPoly.setAttribute("stroke-width", "1.5");
    svg.appendChild(targetPoly);

    // Draw User Polygon (Electric Violet)
    const userPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    userPoly.setAttribute("points", userPoints.join(" "));
    userPoly.setAttribute("fill", "rgba(139, 92, 246, 0.35)");
    userPoly.setAttribute("stroke", "var(--primary)");
    userPoly.setAttribute("stroke-width", "2");
    svg.appendChild(userPoly);

    // Draw detailed skill progress items on the right side
    this.skillsGapContainer.innerHTML = '';
    data.skills.forEach((skillName, i) => {
      const userVal = data.user[i];
      const targetVal = data.target[i];
      const gap = targetVal - userVal;
      
      const item = document.createElement('div');
      item.className = 'skill-progress-item';
      item.innerHTML = `
        <div class="skill-info">
          <span>${skillName}</span>
          <span class="skill-level-labels">Current: ${userVal}/10 | Target: ${targetVal}/10</span>
        </div>
        <div class="progress-track">
          <div class="progress-bar-current" style="width: ${userVal * 10}%"></div>
          <div class="progress-bar-target" style="width: ${targetVal * 10}%"></div>
        </div>
      `;
      this.skillsGapContainer.appendChild(item);
    });
  }

  renderPlanner() {
    const colTodo = document.getElementById('cards-todo');
    const colProgress = document.getElementById('cards-progress');
    const colDone = document.getElementById('cards-done');

    colTodo.innerHTML = '';
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    let todoCount = 0, progressCount = 0, doneCount = 0;

    this.tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'kanban-card';
      card.setAttribute('draggable', 'true');
      
      let actions = '';
      if (task.status === 'todo') {
        actions = `<button class="icon-btn" onclick="app.changeTaskStatus('${task.id}', 'progress')">➡️ Start</button>`;
      } else if (task.status === 'progress') {
        actions = `
          <button class="icon-btn" onclick="app.changeTaskStatus('${task.id}', 'todo')">⬅️ Revert</button>
          <button class="icon-btn" onclick="app.changeTaskStatus('${task.id}', 'done')">✅ Finish</button>
        `;
      } else {
        actions = `<button class="icon-btn" onclick="app.changeTaskStatus('${task.id}', 'progress')">⬅️ Undo</button>`;
      }

      card.innerHTML = `
        <div class="kanban-card-title">${task.title}</div>
        <div class="kanban-card-meta">
          <span>⌛ ${task.hours}h</span>
          <span>📅 ${task.deadline}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="kanban-actions">${actions}</div>
          <button class="icon-btn" style="color:var(--accent-red)" onclick="app.deleteTask('${task.id}')">🗑️</button>
        </div>
      `;

      if (task.status === 'todo') {
        colTodo.appendChild(card);
        todoCount++;
      } else if (task.status === 'progress') {
        colProgress.appendChild(card);
        progressCount++;
      } else {
        colDone.appendChild(card);
        doneCount++;
      }
    });

    document.getElementById('count-todo').innerText = todoCount;
    document.getElementById('count-progress').innerText = progressCount;
    document.getElementById('count-done').innerText = doneCount;
  }

  renderDecisionDropdowns() {
    this.compareA.innerHTML = '';
    this.compareB.innerHTML = '';

    this.opportunities.forEach((opp, i) => {
      const optionA = document.createElement('option');
      optionA.value = opp.id;
      optionA.textContent = opp.title;
      if (i === 0) optionA.selected = true;

      const optionB = document.createElement('option');
      optionB.value = opp.id;
      optionB.textContent = opp.title;
      if (i === 1) optionB.selected = true;

      this.compareA.appendChild(optionA);
      this.compareB.appendChild(optionB);
    });
  }

  handleCompare() {
    const idA = this.compareA.value;
    const idB = this.compareB.value;

    if (idA === idB) {
      alert("Please select two different opportunities to compare!");
      return;
    }

    const oppA = this.opportunities.find(o => o.id === idA);
    const oppB = this.opportunities.find(o => o.id === idB);

    if (!oppA || !oppB) return;

    const recommended = oppA.score >= oppB.score ? oppA : oppB;
    const alternative = oppA.score >= oppB.score ? oppB : oppA;
    const difference = (recommended.score - alternative.score).toFixed(1);

    const resultBox = document.getElementById('comparison-result');
    resultBox.classList.remove('hidden');

    resultBox.innerHTML = `
      <div class="decision-verdict">
        <span class="verdict-badge">🏆</span>
        <div class="verdict-info">
          <h4>Recommended Choice: ${recommended.title}</h4>
          <p>This opportunity offers a <strong>+${difference}</strong> higher expected ROI score. It aligns better with your long-term career growth criteria (Skill acquisition relative to hours invested).</p>
        </div>
      </div>
      <div class="tradeoff-columns">
        <div class="tradeoff-box recommended">
          <h5>${recommended.title} (Recommended)</h5>
          <ul>
            <li>ROI Score: ${recommended.score}/10</li>
            <li>Skill Development: ${recommended.skill_development}/10</li>
            <li>Hours Invested: ${recommended.time_required_hours}h</li>
            <li>Value/Hour Ratio: ${((recommended.skill_development * 10) / recommended.time_required_hours).toFixed(1)}x</li>
          </ul>
        </div>
        <div class="tradeoff-box alternative">
          <h5>${alternative.title} (Alternative)</h5>
          <ul>
            <li>ROI Score: ${alternative.score}/10</li>
            <li>Skill Development: ${alternative.skill_development}/10</li>
            <li>Hours Invested: ${alternative.time_required_hours}h</li>
            <li>Value/Hour Ratio: ${((alternative.skill_development * 10) / alternative.time_required_hours).toFixed(1)}x</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderProfile() {
    document.getElementById('prof-name').value = this.profile.user_name;
    document.getElementById('prof-role').value = this.profile.current_role;
    document.getElementById('prof-skills').value = this.profile.skills.join(', ');

    const projectContainer = document.getElementById('profile-projects-list');
    projectContainer.innerHTML = '';

    this.profile.projects.forEach(proj => {
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML = `
        <h4>${proj.name}</h4>
        <div class="project-tech">${proj.technologies}</div>
        <p class="project-desc">${proj.description}</p>
      `;
      projectContainer.appendChild(item);
    });
  }
}

// Instantiate App
window.addEventListener('DOMContentLoaded', () => {
  window.app = new OpportunityRadarApp();
});
