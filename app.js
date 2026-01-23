/**
 * Εφαρμογή Καθοδήγησης Ελληνικής Ιθαγένειας
 * Κύριο αρχείο JavaScript
 */

// State Management
const AppState = {
    currentStep: 0,
    caseData: {},
    cases: [],
    editingCaseId: null
};

// Wizard Steps Configuration
const WizardSteps = [
    {
        id: 'personal',
        title: 'Προσωπικά Στοιχεία',
        shortTitle: 'Στοιχεία',
        icon: '👤'
    },
    {
        id: 'parents',
        title: 'Στοιχεία Γονέων',
        shortTitle: 'Γονείς',
        icon: '👨‍👩‍👧'
    },
    {
        id: 'ancestry',
        title: 'Καταγωγή & Πρόγονοι',
        shortTitle: 'Πρόγονοι',
        icon: '🌳'
    },
    {
        id: 'residence',
        title: 'Διαμονή & Εκπαίδευση',
        shortTitle: 'Διαμονή',
        icon: '🏠'
    },
    {
        id: 'special',
        title: 'Ειδικές Κατηγορίες',
        shortTitle: 'Ειδικά',
        icon: '📋'
    },
    {
        id: 'result',
        title: 'Αποτέλεσμα',
        shortTitle: 'Αποτέλεσμα',
        icon: '✅'
    }
];

// DOM Elements
const elements = {
    wizardContent: document.getElementById('wizard-content'),
    progressFill: document.getElementById('progress-fill'),
    progressSteps: document.getElementById('progress-steps'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    casesList: document.getElementById('cases-list'),
    searchCases: document.getElementById('search-cases'),
    modal: document.getElementById('case-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close'),
    btnEditCase: document.getElementById('btn-edit-case'),
    btnDeleteCase: document.getElementById('btn-delete-case'),
    btnPrintDocs: document.getElementById('btn-print-docs'),
    toastContainer: document.getElementById('toast-container')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadCases();
    initNavigation();
    initWizard();
    initModal();
    initSearch();
    
    // Render cases list on startup (since it's the default view)
    renderCasesList();
});

// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
            
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    
    if (viewId === 'cases') {
        renderCasesList();
    }
}

// Wizard Functions
function initWizard() {
    renderProgressSteps();
    renderStep(0);
    
    elements.btnNext.addEventListener('click', handleNext);
    elements.btnPrev.addEventListener('click', handlePrev);
}

function renderProgressSteps() {
    elements.progressSteps.innerHTML = WizardSteps.map((step, index) => `
        <div class="progress-step ${index === 0 ? 'active' : ''}" data-step="${index}" style="cursor: pointer;" title="Κλικ για μετάβαση στο βήμα ${index + 1}">
            <span class="step-number">${index + 1}</span>
            <span class="step-title">${step.shortTitle}</span>
        </div>
    `).join('');
    
    // Add click handlers for direct step navigation
    document.querySelectorAll('.progress-step').forEach(stepEl => {
        stepEl.addEventListener('click', () => {
            const targetStep = parseInt(stepEl.dataset.step);
            goToStep(targetStep);
        });
    });
}

function goToStep(targetStep) {
    // Save current form values before navigating
    saveFormValues();
    
    // Auto-save draft when editing a case (so refresh doesn't lose changes)
    if (AppState.editingCaseId) {
        saveEditingDraft();
    }
    
    // Navigate to target step
    AppState.currentStep = targetStep;
    renderStep(AppState.currentStep);
}

// Save draft changes when editing a case (called on every step change)
function saveEditingDraft() {
    if (!AppState.editingCaseId) return;
    
    const index = AppState.cases.findIndex(c => c.id === AppState.editingCaseId);
    if (index === -1) return;
    
    // Update the case data in the array (keep everything else the same)
    const existingCase = AppState.cases[index];
    existingCase.data = { ...AppState.caseData };
    
    // Clean up derived objects
    delete existingCase.data.ancestry;
    delete existingCase.data.isRefugee;
    delete existingCase.data.isStateless;
    
    existingCase.updatedAt = new Date().toISOString();
    
    // Save to localStorage
    saveCases();
}

function updateProgress() {
    const progress = ((AppState.currentStep + 1) / WizardSteps.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index < AppState.currentStep) {
            step.classList.add('completed');
        } else if (index === AppState.currentStep) {
            step.classList.add('active');
        }
    });
    
    elements.btnPrev.disabled = AppState.currentStep === 0;
    
    if (AppState.currentStep === WizardSteps.length - 1) {
        elements.btnNext.textContent = 'Αποθήκευση';
    } else {
        elements.btnNext.textContent = 'Επόμενο →';
    }
}

function renderStep(stepIndex) {
    const step = WizardSteps[stepIndex];
    let html = '';
    
    switch (step.id) {
        case 'personal':
            html = renderPersonalStep();
            break;
        case 'parents':
            html = renderParentsStep();
            break;
        case 'ancestry':
            html = renderAncestryStep();
            break;
        case 'residence':
            html = renderResidenceStep();
            break;
        case 'special':
            html = renderSpecialStep();
            break;
        case 'result':
            html = renderResultStep();
            break;
    }
    
    elements.wizardContent.innerHTML = html;
    updateProgress();
    
    // Restore saved values
    restoreFormValues();
    
    // Add event listeners for option cards
    initOptionCards();
}

function renderPersonalStep() {
    return `
        <h2 class="step-title">👤 Προσωπικά Στοιχεία Αιτούντος</h2>
        <p class="step-description">Εισάγετε τα βασικά στοιχεία του ατόμου που αιτείται την ελληνική ιθαγένεια.</p>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Επώνυμο <span class="required">*</span></label>
                <input type="text" class="form-input" name="lastName" placeholder="π.χ. Παπαδόπουλος" required>
            </div>
            <div class="form-group">
                <label class="form-label">Όνομα <span class="required">*</span></label>
                <input type="text" class="form-input" name="firstName" placeholder="π.χ. Νικόλαος" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Ημερομηνία Γέννησης <span class="required">*</span></label>
                <input type="date" class="form-input" name="birthDate" required>
            </div>
            <div class="form-group">
                <label class="form-label">Τόπος Γέννησης <span class="required">*</span></label>
                <input type="text" class="form-input" name="birthPlace" placeholder="π.χ. Αθήνα, Ελλάδα">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Τρέχουσα Ιθαγένεια</label>
                <input type="text" class="form-input" name="currentCitizenship" placeholder="π.χ. Αμερικανική">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" name="email" placeholder="email@example.com">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Τηλέφωνο</label>
                <input type="tel" class="form-input" name="phone" placeholder="+30 xxxxxxxxxx">
            </div>
            <div class="form-group">
                <label class="form-label">Αρ. Διαβατηρίου</label>
                <input type="text" class="form-input" name="passportNumber" placeholder="">
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Γεννηθήκατε στην Ελλάδα;</label>
            <div class="option-cards" data-name="bornInGreece">
                <label class="option-card" data-value="true">
                    <input type="radio" name="bornInGreece" value="true">
                    <div class="option-card-content">
                        <span class="option-icon">🇬🇷</span>
                        <div class="option-text">
                            <h4>Ναι</h4>
                            <p>Γεννήθηκα σε ελληνικό έδαφος</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="bornInGreece" value="false">
                    <div class="option-card-content">
                        <span class="option-icon">🌍</span>
                        <div class="option-text">
                            <h4>Όχι</h4>
                            <p>Γεννήθηκα εκτός Ελλάδας</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
    `;
}

function renderParentsStep() {
    return `
        <h2 class="step-title">👨‍👩‍👧 Στοιχεία Γονέων</h2>
        <p class="step-description">Συμπληρώστε τα στοιχεία των γονέων. Αυτά θα καθορίσουν αν υπάρχει αυτοδίκαιο δικαίωμα.</p>
        
        <div class="ancestor-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Πατέρας</h3>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Όνομα Πατέρα</label>
                    <input type="text" class="form-input" name="fatherName" placeholder="Ονοματεπώνυμο">
                </div>
                <div class="form-group">
                    <label class="form-label">Τόπος Γέννησης</label>
                    <input type="text" class="form-input" name="fatherBirthPlace" placeholder="π.χ. Θεσσαλονίκη">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Ο πατέρας είναι/ήταν Έλληνας πολίτης;</label>
                <div class="option-cards" data-name="fatherIsGreek">
                    <label class="option-card" data-value="true">
                        <input type="radio" name="fatherIsGreek" value="true">
                        <div class="option-card-content">
                            <span class="option-icon">🇬🇷</span>
                            <div class="option-text">
                                <h4>Ναι</h4>
                                <p>Είναι/ήταν Έλληνας πολίτης</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="false">
                        <input type="radio" name="fatherIsGreek" value="false">
                        <div class="option-card-content">
                            <span class="option-icon">🌍</span>
                            <div class="option-text">
                                <h4>Όχι</h4>
                                <p>Δεν είναι/ήταν Έλληνας</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="unknown">
                        <input type="radio" name="fatherIsGreek" value="unknown">
                        <div class="option-card-content">
                            <span class="option-icon">❓</span>
                            <div class="option-text">
                                <h4>Άγνωστο</h4>
                                <p>Δεν γνωρίζω</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Κατάσταση Πατέρα</label>
                <div class="option-cards small" data-name="fatherStatus">
                    <label class="option-card" data-value="alive">
                        <input type="radio" name="fatherStatus" value="alive" onchange="toggleDeathFields('father', false)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Εν ζωή</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="deceased">
                        <input type="radio" name="fatherStatus" value="deceased" onchange="toggleDeathFields('father', true)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Αποβιώσας</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="unknown">
                        <input type="radio" name="fatherStatus" value="unknown" onchange="toggleDeathFields('father', false)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Άγνωστος</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <!-- Death Info Fields for Father -->
            <div id="fatherDeathFields" class="death-info-fields" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">📅 Ημερομηνία Θανάτου</label>
                        <input type="text" class="form-input greek-date-input" name="fatherDeathDate" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    </div>
                    <div class="form-group">
                        <label class="form-label">📍 Τόπος Θανάτου</label>
                        <input type="text" class="form-input" name="fatherDeathPlace" placeholder="π.χ. Θεσσαλονίκη, Ελλάδα">
                    </div>
                </div>
                <p class="field-hint" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-light);">
                    💡 Αυτά τα στοιχεία βοηθούν στην αναζήτηση εγγράφων σε ελληνικά συστήματα (ληξιαρχεία, κλπ.)
                </p>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <div class="ancestor-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Μητέρα</h3>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Όνομα Μητέρας</label>
                    <input type="text" class="form-input" name="motherName" placeholder="Ονοματεπώνυμο">
                </div>
                <div class="form-group">
                    <label class="form-label">Τόπος Γέννησης</label>
                    <input type="text" class="form-input" name="motherBirthPlace" placeholder="π.χ. Αθήνα">
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Η μητέρα είναι/ήταν Ελληνίδα πολίτης;</label>
                <div class="option-cards" data-name="motherIsGreek">
                    <label class="option-card" data-value="true">
                        <input type="radio" name="motherIsGreek" value="true">
                        <div class="option-card-content">
                            <span class="option-icon">🇬🇷</span>
                            <div class="option-text">
                                <h4>Ναι</h4>
                                <p>Είναι/ήταν Ελληνίδα πολίτης</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="false">
                        <input type="radio" name="motherIsGreek" value="false">
                        <div class="option-card-content">
                            <span class="option-icon">🌍</span>
                            <div class="option-text">
                                <h4>Όχι</h4>
                                <p>Δεν είναι/ήταν Ελληνίδα</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="unknown">
                        <input type="radio" name="motherIsGreek" value="unknown">
                        <div class="option-card-content">
                            <span class="option-icon">❓</span>
                            <div class="option-text">
                                <h4>Άγνωστο</h4>
                                <p>Δεν γνωρίζω</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">Κατάσταση Μητέρας</label>
                <div class="option-cards small" data-name="motherStatus">
                    <label class="option-card" data-value="alive">
                        <input type="radio" name="motherStatus" value="alive" onchange="toggleDeathFields('mother', false)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Εν ζωή</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="deceased">
                        <input type="radio" name="motherStatus" value="deceased" onchange="toggleDeathFields('mother', true)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Αποβιώσασα</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="unknown">
                        <input type="radio" name="motherStatus" value="unknown" onchange="toggleDeathFields('mother', false)">
                        <div class="option-card-content">
                            <div class="option-text">
                                <h4>Άγνωστη</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <!-- Death Info Fields for Mother -->
            <div id="motherDeathFields" class="death-info-fields" style="display: none;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">📅 Ημερομηνία Θανάτου</label>
                        <input type="text" class="form-input greek-date-input" name="motherDeathDate" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    </div>
                    <div class="form-group">
                        <label class="form-label">📍 Τόπος Θανάτου</label>
                        <input type="text" class="form-input" name="motherDeathPlace" placeholder="π.χ. Αθήνα, Ελλάδα">
                    </div>
                </div>
                <p class="field-hint" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-light);">
                    💡 Αυτά τα στοιχεία βοηθούν στην αναζήτηση εγγράφων σε ελληνικά συστήματα (ληξιαρχεία, κλπ.)
                </p>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <!-- Parents Marital Status Section -->
        <div class="ancestor-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">💒 Συζυγική Κατάσταση Γονέων</h3>
            <p class="step-description" style="margin-bottom: 1rem; font-size: 0.9rem;">
                Αν ο αιτών προέρχεται από διαλυμένο γάμο, απαιτούνται επιπλέον δικαιολογητικά.
            </p>
            
            <div class="form-group">
                <label class="form-label">Οι γονείς του αιτούντα ήταν/είναι:</label>
                <div class="option-cards" data-name="parentsMaritalStatus">
                    <label class="option-card" data-value="married">
                        <input type="radio" name="parentsMaritalStatus" value="married" onchange="toggleDivorceFields(false)">
                        <div class="option-card-content">
                            <span class="option-icon">💑</span>
                            <div class="option-text">
                                <h4>Παντρεμένοι</h4>
                                <p>Εν ενεργεία γάμος ή χηρεία</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="divorced">
                        <input type="radio" name="parentsMaritalStatus" value="divorced" onchange="toggleDivorceFields(true)">
                        <div class="option-card-content">
                            <span class="option-icon">💔</span>
                            <div class="option-text">
                                <h4>Διαζευγμένοι</h4>
                                <p>Ο γάμος έχει λυθεί</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="never_married">
                        <input type="radio" name="parentsMaritalStatus" value="never_married" onchange="toggleDivorceFields(false)">
                        <div class="option-card-content">
                            <span class="option-icon">👤</span>
                            <div class="option-text">
                                <h4>Δεν παντρεύτηκαν</h4>
                                <p>Εκτός γάμου γέννηση</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="unknown">
                        <input type="radio" name="parentsMaritalStatus" value="unknown" onchange="toggleDivorceFields(false)">
                        <div class="option-card-content">
                            <span class="option-icon">❓</span>
                            <div class="option-text">
                                <h4>Άγνωστο</h4>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <!-- Divorce Details (shown only when divorced is selected) -->
            <div id="divorceDetailsFields" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(237, 108, 2, 0.05); border-radius: var(--radius-md); border-left: 4px solid var(--warning-color);">
                <h4 style="color: var(--warning-color); margin-bottom: 1rem;">⚠️ Στοιχεία Διαζυγίου</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    Σε περίπτωση διαζυγίου, θα χρειαστούν επιπλέον έγγραφα (πιστοποιητικό γάμου, δικαστική απόφαση διαζυγίου).
                </p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">📅 Ημερομηνία Γάμου Γονέων</label>
                        <input type="text" class="form-input greek-date-input" name="parentsMarriageDate" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    </div>
                    <div class="form-group">
                        <label class="form-label">📅 Ημερομηνία Διαζυγίου</label>
                        <input type="text" class="form-input greek-date-input" name="parentsDivorceDate" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Ο αιτών γεννήθηκε:</label>
                    <div class="option-cards small" data-name="bornDuringMarriage">
                        <label class="option-card" data-value="during">
                            <input type="radio" name="bornDuringMarriage" value="during">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Κατά τη διάρκεια του γάμου</h4>
                                    <p style="font-size: 0.75rem;">Πριν το διαζύγιο</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="after">
                            <input type="radio" name="bornDuringMarriage" value="after">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Μετά το διαζύγιο</h4>
                                    <p style="font-size: 0.75rem;">Απαιτείται αναγνώριση</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Ο Έλληνας γονέας είχε προηγούμενους γάμους;</label>
                    <div class="option-cards small" data-name="greekParentPreviousMarriages">
                        <label class="option-card" data-value="no">
                            <input type="radio" name="greekParentPreviousMarriages" value="no" onchange="togglePreviousMarriagesInfo(false)">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Όχι</h4>
                                    <p style="font-size: 0.75rem;">Πρώτος γάμος</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="yes">
                            <input type="radio" name="greekParentPreviousMarriages" value="yes" onchange="togglePreviousMarriagesInfo(true)">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Ναι</h4>
                                    <p style="font-size: 0.75rem;">Υπήρξαν προηγούμενοι</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                    </div>
                </div>
                
                <div id="previousMarriagesInfo" style="display: none; margin-top: 1rem; padding: 0.75rem; background: rgba(25, 118, 210, 0.1); border-radius: var(--radius-sm);">
                    <p style="font-size: 0.85rem; color: var(--primary-color);">
                        <strong>📋 Σημαντικό:</strong> Θα χρειαστεί να αποδειχθεί από ποιον γάμο προέρχεται ο αιτών. 
                        Απαιτούνται τα πιστοποιητικά γάμου ΚΑΙ διαζυγίου κάθε προηγούμενου γάμου.
                    </p>
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label class="form-label">Υπάρχει έγγραφο αναγνώρισης πατρότητας/μητρότητας;</label>
                    <div class="option-cards small" data-name="hasPaternityRecognition">
                        <label class="option-card" data-value="not_needed">
                            <input type="radio" name="hasPaternityRecognition" value="not_needed">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Δεν χρειάζεται</h4>
                                    <p style="font-size: 0.75rem;">Γεννήθηκε εντός γάμου</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="yes">
                            <input type="radio" name="hasPaternityRecognition" value="yes">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Ναι, υπάρχει</h4>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="no">
                            <input type="radio" name="hasPaternityRecognition" value="no">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Όχι</h4>
                                    <p style="font-size: 0.75rem;">Απαιτείται</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <!-- Name Change Section -->
        <div class="ancestor-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">✏️ Αλλαγή Ονόματος Γονέα</h3>
            <p class="step-description" style="margin-bottom: 1rem; font-size: 0.9rem;">
                Αν ο Έλληνας γονέας άλλαξε όνομα (π.χ. κατά την πολιτογράφησή του σε άλλη χώρα), απαιτούνται επιπλέον δικαιολογητικά για τη σύνδεση των δύο ονομάτων.
            </p>
            
            <div class="form-group">
                <label class="form-label">Ο Έλληνας γονέας έχει αλλάξει όνομα;</label>
                <div class="option-cards" data-name="greekParentNameChange">
                    <label class="option-card" data-value="no">
                        <input type="radio" name="greekParentNameChange" value="no" onchange="toggleNameChangeFields(false)">
                        <div class="option-card-content">
                            <span class="option-icon">✓</span>
                            <div class="option-text">
                                <h4>Όχι</h4>
                                <p>Το ίδιο όνομα σε όλα τα έγγραφα</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="yes">
                        <input type="radio" name="greekParentNameChange" value="yes" onchange="toggleNameChangeFields(true)">
                        <div class="option-card-content">
                            <span class="option-icon">✏️</span>
                            <div class="option-text">
                                <h4>Ναι</h4>
                                <p>Άλλαξε όνομα (π.χ. πολιτογράφηση)</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <!-- Name Change Details -->
            <div id="nameChangeFields" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(25, 118, 210, 0.05); border-radius: var(--radius-md); border-left: 4px solid var(--primary-color);">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">📋 Στοιχεία Αλλαγής Ονόματος</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    Για να συνδεθεί το παλιό όνομα (στα ελληνικά έγγραφα) με το νέο όνομα (στα τρέχοντα έγγραφα), απαιτούνται αποδεικτικά.
                </p>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Παλιό Όνομα (ελληνικά έγγραφα)</label>
                        <input type="text" class="form-input" name="greekParentOldName" placeholder="π.χ. Παναγιώτης Κεφαλίδης">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Νέο Όνομα (τρέχοντα έγγραφα)</label>
                        <input type="text" class="form-input" name="greekParentNewName" placeholder="π.χ. Peter Kefalidis">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Λόγος αλλαγής ονόματος:</label>
                    <div class="option-cards small" data-name="nameChangeReason">
                        <label class="option-card" data-value="naturalization">
                            <input type="radio" name="nameChangeReason" value="naturalization">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Πολιτογράφηση</h4>
                                    <p style="font-size: 0.75rem;">Κατά την απόκτηση άλλης ιθαγένειας</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="marriage">
                            <input type="radio" name="nameChangeReason" value="marriage">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Γάμος</h4>
                                    <p style="font-size: 0.75rem;">Υιοθέτηση επωνύμου συζύγου</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="court_order">
                            <input type="radio" name="nameChangeReason" value="court_order">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Δικαστική Απόφαση</h4>
                                    <p style="font-size: 0.75rem;">Νόμιμη αλλαγή</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="other">
                            <input type="radio" name="nameChangeReason" value="other">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Άλλο</h4>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Χώρα στην οποία έγινε η αλλαγή:</label>
                    <input type="text" class="form-input" name="nameChangeCountry" placeholder="π.χ. ΗΠΑ, Καναδάς, Αυστραλία">
                </div>
                
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(46, 125, 50, 0.1); border-radius: var(--radius-sm);">
                    <p style="font-size: 0.85rem; color: var(--success-color); margin: 0;">
                        <strong>📌 Απαιτούμενα Αποδεικτικά:</strong>
                    </p>
                    <ul style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.5rem 0 0 1.25rem;">
                        <li>Δικαστική απόφαση αλλαγής ονόματος (Court Order)</li>
                        <li>Πιστοποιητικό Πολιτογράφησης (Certificate of Naturalization) - συνήθως αναγράφει και τα δύο ονόματα</li>
                        <li>Ένορκη βεβαίωση (Affidavit) αν δεν υπάρχουν τα παραπάνω</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderAncestryStep() {
    return `
        <h2 class="step-title">🌳 Καταγωγή & Πρόγονοι</h2>
        <p class="step-description">Εάν οι γονείς δεν είναι Έλληνες, μπορείτε να διερευνήσετε την καταγωγή μέσω παππούδων/γιαγιάδων ή προπαππούδων. Συμπληρώστε όσα στοιχεία γνωρίζετε.</p>
        
        <div class="ancestry-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">📍 Πατρική Πλευρά</h3>
            
            <!-- Paternal Grandfather -->
            <div class="ancestor-row">
                <span class="ancestor-label">Παππούς:</span>
                <div class="ancestor-fields">
                    <div class="form-group">
                        <input type="text" class="form-input" name="paternalGrandfatherName" placeholder="Ονοματεπώνυμο">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="paternalGrandfatherBirthPlace" placeholder="Τόπος γέννησης">
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="paternalGrandfatherIsGreek">
                            <option value="">-- Ελληνική ιθαγένεια; --</option>
                            <option value="true">Ναι, Έλληνας</option>
                            <option value="false">Όχι</option>
                            <option value="unknown">Άγνωστο</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="paternalGrandfatherStatus" onchange="toggleGrandparentDeathFields('paternalGrandfather', this.value === 'deceased')">
                            <option value="">-- Κατάσταση --</option>
                            <option value="alive">Εν ζωή</option>
                            <option value="deceased">Αποβιώσας</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="paternalGrandfatherDeathFields" class="death-info-fields-compact" style="display: none; margin-left: 100px; margin-bottom: 1rem;">
                <div class="form-row" style="gap: 0.5rem;">
                    <input type="text" class="form-input greek-date-input" name="paternalGrandfatherDeathDate" style="flex: 1;" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    <input type="text" class="form-input" name="paternalGrandfatherDeathPlace" style="flex: 1;" placeholder="Τόπος θανάτου">
                </div>
            </div>
            
            <!-- Paternal Grandmother -->
            <div class="ancestor-row">
                <span class="ancestor-label">Γιαγιά:</span>
                <div class="ancestor-fields">
                    <div class="form-group">
                        <input type="text" class="form-input" name="paternalGrandmotherName" placeholder="Ονοματεπώνυμο">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="paternalGrandmotherBirthPlace" placeholder="Τόπος γέννησης">
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="paternalGrandmotherIsGreek">
                            <option value="">-- Ελληνική ιθαγένεια; --</option>
                            <option value="true">Ναι, Ελληνίδα</option>
                            <option value="false">Όχι</option>
                            <option value="unknown">Άγνωστο</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="paternalGrandmotherStatus" onchange="toggleGrandparentDeathFields('paternalGrandmother', this.value === 'deceased')">
                            <option value="">-- Κατάσταση --</option>
                            <option value="alive">Εν ζωή</option>
                            <option value="deceased">Αποβιώσασα</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="paternalGrandmotherDeathFields" class="death-info-fields-compact" style="display: none; margin-left: 100px; margin-bottom: 1rem;">
                <div class="form-row" style="gap: 0.5rem;">
                    <input type="text" class="form-input greek-date-input" name="paternalGrandmotherDeathDate" style="flex: 1;" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    <input type="text" class="form-input" name="paternalGrandmotherDeathPlace" style="flex: 1;" placeholder="Τόπος θανάτου">
                </div>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <div class="ancestry-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">📍 Μητρική Πλευρά</h3>
            
            <!-- Maternal Grandfather -->
            <div class="ancestor-row">
                <span class="ancestor-label">Παππούς:</span>
                <div class="ancestor-fields">
                    <div class="form-group">
                        <input type="text" class="form-input" name="maternalGrandfatherName" placeholder="Ονοματεπώνυμο">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="maternalGrandfatherBirthPlace" placeholder="Τόπος γέννησης">
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="maternalGrandfatherIsGreek">
                            <option value="">-- Ελληνική ιθαγένεια; --</option>
                            <option value="true">Ναι, Έλληνας</option>
                            <option value="false">Όχι</option>
                            <option value="unknown">Άγνωστο</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="maternalGrandfatherStatus" onchange="toggleGrandparentDeathFields('maternalGrandfather', this.value === 'deceased')">
                            <option value="">-- Κατάσταση --</option>
                            <option value="alive">Εν ζωή</option>
                            <option value="deceased">Αποβιώσας</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="maternalGrandfatherDeathFields" class="death-info-fields-compact" style="display: none; margin-left: 100px; margin-bottom: 1rem;">
                <div class="form-row" style="gap: 0.5rem;">
                    <input type="text" class="form-input greek-date-input" name="maternalGrandfatherDeathDate" style="flex: 1;" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    <input type="text" class="form-input" name="maternalGrandfatherDeathPlace" style="flex: 1;" placeholder="Τόπος θανάτου">
                </div>
            </div>
            
            <!-- Maternal Grandmother -->
            <div class="ancestor-row">
                <span class="ancestor-label">Γιαγιά:</span>
                <div class="ancestor-fields">
                    <div class="form-group">
                        <input type="text" class="form-input" name="maternalGrandmotherName" placeholder="Ονοματεπώνυμο">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-input" name="maternalGrandmotherBirthPlace" placeholder="Τόπος γέννησης">
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="maternalGrandmotherIsGreek">
                            <option value="">-- Ελληνική ιθαγένεια; --</option>
                            <option value="true">Ναι, Ελληνίδα</option>
                            <option value="false">Όχι</option>
                            <option value="unknown">Άγνωστο</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-select" name="maternalGrandmotherStatus" onchange="toggleGrandparentDeathFields('maternalGrandmother', this.value === 'deceased')">
                            <option value="">-- Κατάσταση --</option>
                            <option value="alive">Εν ζωή</option>
                            <option value="deceased">Αποβιώσασα</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="maternalGrandmotherDeathFields" class="death-info-fields-compact" style="display: none; margin-left: 100px; margin-bottom: 1rem;">
                <div class="form-row" style="gap: 0.5rem;">
                    <input type="text" class="form-input greek-date-input" name="maternalGrandmotherDeathDate" style="flex: 1;" placeholder="ΗΗ/ΜΜ/ΕΕΕΕ" maxlength="10">
                    <input type="text" class="form-input" name="maternalGrandmotherDeathPlace" style="flex: 1;" placeholder="Τόπος θανάτου">
                </div>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <!-- Ancestor Name Changes Section -->
        <div class="ancestry-section">
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">✏️ Αλλαγή Ονόματος Προγόνων</h3>
            <p class="step-description" style="margin-bottom: 1rem; font-size: 0.9rem;">
                Αν κάποιος Έλληνας πρόγονος (παππούς/γιαγιά) άλλαξε όνομα (π.χ. κατά τη μετανάστευση), απαιτούνται επιπλέον δικαιολογητικά.
            </p>
            
            <div class="form-group">
                <label class="form-label">Κάποιος από τους Έλληνες προγόνους άλλαξε όνομα;</label>
                <div class="option-cards" data-name="ancestorNameChange">
                    <label class="option-card" data-value="no">
                        <input type="radio" name="ancestorNameChange" value="no" onchange="toggleAncestorNameChangeFields(false)">
                        <div class="option-card-content">
                            <span class="option-icon">✓</span>
                            <div class="option-text">
                                <h4>Όχι</h4>
                                <p>Τα ονόματα είναι ίδια σε όλα τα έγγραφα</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                    <label class="option-card" data-value="yes">
                        <input type="radio" name="ancestorNameChange" value="yes" onchange="toggleAncestorNameChangeFields(true)">
                        <div class="option-card-content">
                            <span class="option-icon">✏️</span>
                            <div class="option-text">
                                <h4>Ναι</h4>
                                <p>Υπήρξε αλλαγή ονόματος</p>
                            </div>
                        </div>
                        <span class="option-checkmark">✓</span>
                    </label>
                </div>
            </div>
            
            <!-- Ancestor Name Change Details -->
            <div id="ancestorNameChangeFields" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(25, 118, 210, 0.05); border-radius: var(--radius-md); border-left: 4px solid var(--primary-color);">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">📋 Στοιχεία Αλλαγής Ονόματος Προγόνου</h4>
                
                <div class="form-group">
                    <label class="form-label">Ποιος πρόγονος άλλαξε όνομα;</label>
                    <select class="form-select" name="ancestorWithNameChange">
                        <option value="">-- Επιλέξτε --</option>
                        <option value="paternalGrandfather">Παππούς (πατρικής πλευράς)</option>
                        <option value="paternalGrandmother">Γιαγιά (πατρικής πλευράς)</option>
                        <option value="maternalGrandfather">Παππούς (μητρικής πλευράς)</option>
                        <option value="maternalGrandmother">Γιαγιά (μητρικής πλευράς)</option>
                        <option value="multiple">Περισσότεροι από έναν</option>
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Παλιό Όνομα (ελληνικά έγγραφα)</label>
                        <input type="text" class="form-input" name="ancestorOldName" placeholder="π.χ. Παναγιώτης Κεφαλίδης">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Νέο Όνομα (μεταναστευτικά έγγραφα)</label>
                        <input type="text" class="form-input" name="ancestorNewName" placeholder="π.χ. Peter Kefalidis">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Λόγος αλλαγής:</label>
                    <div class="option-cards small" data-name="ancestorNameChangeReason">
                        <label class="option-card" data-value="immigration">
                            <input type="radio" name="ancestorNameChangeReason" value="immigration">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Μετανάστευση</h4>
                                    <p style="font-size: 0.75rem;">Ellis Island, αγγλοποίηση κλπ.</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="naturalization">
                            <input type="radio" name="ancestorNameChangeReason" value="naturalization">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Πολιτογράφηση</h4>
                                    <p style="font-size: 0.75rem;">Κατά την απόκτηση ιθαγένειας</p>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="marriage">
                            <input type="radio" name="ancestorNameChangeReason" value="marriage">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Γάμος</h4>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                        <label class="option-card" data-value="other">
                            <input type="radio" name="ancestorNameChangeReason" value="other">
                            <div class="option-card-content">
                                <div class="option-text">
                                    <h4>Άλλο</h4>
                                </div>
                            </div>
                            <span class="option-checkmark">✓</span>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Χώρα στην οποία έγινε η αλλαγή:</label>
                    <input type="text" class="form-input" name="ancestorNameChangeCountry" placeholder="π.χ. ΗΠΑ, Καναδάς, Αυστραλία, Αργεντινή">
                </div>
                
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(46, 125, 50, 0.1); border-radius: var(--radius-sm);">
                    <p style="font-size: 0.85rem; color: var(--success-color); margin: 0;">
                        <strong>📌 Απαιτούμενα Αποδεικτικά:</strong>
                    </p>
                    <ul style="font-size: 0.8rem; color: var(--text-secondary); margin: 0.5rem 0 0 1.25rem;">
                        <li>Πιστοποιητικό Πολιτογράφησης (συνήθως αναγράφει και τα δύο ονόματα)</li>
                        <li>Μεταναστευτικά αρχεία (Ellis Island records, ship manifests κλπ.)</li>
                        <li>Ένορκη βεβαίωση (Affidavit) σύνδεσης ονομάτων</li>
                        <li>Παλιά ταυτότητα/διαβατήριο με το αρχικό όνομα</li>
                    </ul>
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label class="form-label">Σημειώσεις για την αλλαγή ονόματος:</label>
                    <textarea class="form-input" name="ancestorNameChangeNotes" rows="2" placeholder="π.χ. 'Το όνομα αλλαχθηκε στο Ellis Island το 1923'"></textarea>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border-radius: var(--radius-sm); border-left: 4px solid var(--accent-color);">
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                <strong>💡 Σημείωση:</strong> Για ομογενείς, η απόδειξη ελληνικής καταγωγής μπορεί να γίνει μέσω παππούδων ή ακόμα και προπαππούδων. 
                Χρειάζονται αποδεικτικά έγγραφα (πιστοποιητικά γέννησης, βαπτιστικά, κ.λπ.)
            </p>
        </div>
    `;
}

function renderResidenceStep() {
    return `
        <h2 class="step-title">🏠 Διαμονή & Εκπαίδευση</h2>
        <p class="step-description">Πληροφορίες σχετικά με τη διαμονή και εκπαίδευση στην Ελλάδα.</p>
        
        <div class="form-group">
            <label class="form-label">Έχετε διαμείνει νόμιμα στην Ελλάδα;</label>
            <div class="option-cards" data-name="hasResidedInGreece">
                <label class="option-card" data-value="true">
                    <input type="radio" name="hasResidedInGreece" value="true">
                    <div class="option-card-content">
                        <span class="option-icon">✅</span>
                        <div class="option-text">
                            <h4>Ναι</h4>
                            <p>Έχω διαμείνει νόμιμα</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="hasResidedInGreece" value="false">
                    <div class="option-card-content">
                        <span class="option-icon">❌</span>
                        <div class="option-text">
                            <h4>Όχι</h4>
                            <p>Δεν έχω διαμείνει</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Έτη Νόμιμης Διαμονής στην Ελλάδα</label>
                <input type="number" class="form-input" name="residenceYearsInGreece" min="0" max="100" placeholder="π.χ. 7">
            </div>
            <div class="form-group">
                <label class="form-label">Διαθέτετε Άδεια Διαμονής;</label>
                <select class="form-select" name="hasResidencePermit">
                    <option value="">-- Επιλέξτε --</option>
                    <option value="true">Ναι</option>
                    <option value="false">Όχι</option>
                </select>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <h3 style="margin-bottom: 1rem; color: var(--primary-color);">🎓 Εκπαίδευση στην Ελλάδα</h3>
        
        <div class="form-group">
            <label class="form-label">Φοιτήσατε σε ελληνικό σχολείο;</label>
            <div class="option-cards" data-name="schooledInGreece">
                <label class="option-card" data-value="true">
                    <input type="radio" name="schooledInGreece" value="true">
                    <div class="option-card-content">
                        <span class="option-icon">🏫</span>
                        <div class="option-text">
                            <h4>Ναι</h4>
                            <p>Φοίτησα σε ελληνικό σχολείο</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="schooledInGreece" value="false">
                    <div class="option-card-content">
                        <span class="option-icon">🌍</span>
                        <div class="option-text">
                            <h4>Όχι</h4>
                            <p>Δεν φοίτησα στην Ελλάδα</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Πόσα χρόνια φοίτησης;</label>
                <input type="number" class="form-input" name="schoolYearsInGreece" min="0" max="20" placeholder="π.χ. 6">
            </div>
            <div class="form-group">
                <label class="form-label">Είστε απόφοιτος ελληνικού ΑΕΙ/ΤΕΙ;</label>
                <select class="form-select" name="graduatedGreekUniversity">
                    <option value="">-- Επιλέξτε --</option>
                    <option value="true">Ναι</option>
                    <option value="false">Όχι</option>
                </select>
            </div>
        </div>
    `;
}

function renderSpecialStep() {
    return `
        <h2 class="step-title">📋 Ειδικές Κατηγορίες</h2>
        <p class="step-description">Ελέγξτε αν ισχύει κάποια ειδική περίπτωση.</p>
        
        <div class="form-group">
            <label class="form-label">Είστε σε γάμο με Έλληνα/Ελληνίδα πολίτη;</label>
            <div class="option-cards" data-name="marriedToGreek">
                <label class="option-card" data-value="true">
                    <input type="radio" name="marriedToGreek" value="true">
                    <div class="option-card-content">
                        <span class="option-icon">💍</span>
                        <div class="option-text">
                            <h4>Ναι</h4>
                            <p>Είμαι σε γάμο με Έλληνα/Ελληνίδα</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="marriedToGreek" value="false">
                    <div class="option-card-content">
                        <span class="option-icon">❌</span>
                        <div class="option-text">
                            <h4>Όχι</h4>
                            <p>Δεν είμαι σε γάμο με Έλληνα</p>
                        </div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Έχετε τέκνο με τον/την Έλληνα/Ελληνίδα σύζυγο;</label>
            <div class="option-cards small" data-name="hasChildWithGreekSpouse">
                <label class="option-card" data-value="true">
                    <input type="radio" name="hasChildWithGreekSpouse" value="true">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Ναι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="hasChildWithGreekSpouse" value="false">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Όχι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <hr style="margin: 2rem 0; border: none; border-top: 2px solid var(--border-color);">
        
        <div class="form-group">
            <label class="form-label">Αναγνωριστήκατε ως τέκνο από Έλληνα πολίτη;</label>
            <div class="option-cards small" data-name="recognizedByGreek">
                <label class="option-card" data-value="true">
                    <input type="radio" name="recognizedByGreek" value="true">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Ναι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="recognizedByGreek" value="false">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Όχι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Υιοθετηθήκατε από Έλληνα πολίτη;</label>
            <div class="option-cards small" data-name="adoptedByGreek">
                <label class="option-card" data-value="true">
                    <input type="radio" name="adoptedByGreek" value="true">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Ναι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="adoptedByGreek" value="false">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Όχι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Είχατε στο παρελθόν ελληνική ιθαγένεια που απωλέσατε;</label>
            <div class="option-cards small" data-name="hadGreekCitizenship">
                <label class="option-card" data-value="true">
                    <input type="radio" name="hadGreekCitizenship" value="true">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Ναι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="false">
                    <input type="radio" name="hadGreekCitizenship" value="false">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Όχι</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Είστε αναγνωρισμένος πρόσφυγας ή ανιθαγενής;</label>
            <div class="option-cards small" data-name="isRefugeeOrStateless">
                <label class="option-card" data-value="refugee">
                    <input type="radio" name="isRefugeeOrStateless" value="refugee">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Πρόσφυγας</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="stateless">
                    <input type="radio" name="isRefugeeOrStateless" value="stateless">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Ανιθαγενής</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
                <label class="option-card" data-value="no">
                    <input type="radio" name="isRefugeeOrStateless" value="no">
                    <div class="option-card-content">
                        <div class="option-text"><h4>Κανένα</h4></div>
                    </div>
                    <span class="option-checkmark">✓</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Σημειώσεις</label>
            <textarea class="form-textarea form-input" name="notes" rows="3" placeholder="Προσθέστε οποιεσδήποτε επιπλέον πληροφορίες..."></textarea>
        </div>
    `;
}

function renderResultStep() {
    // Prepare data for analysis - returns a COPY, doesn't modify AppState.caseData
    const analysisData = prepareDataForAnalysis();
    
    // Get citizenship determination using the prepared copy
    const results = window.CitizenshipLogic.determineCitizenshipCategory(analysisData);
    
    if (results.length === 0) {
        return `
            <div class="result-container" style="border-color: var(--warning-color); background: rgba(237, 108, 2, 0.05);">
                <div class="result-header">
                    <span class="result-icon">⚠️</span>
                    <div>
                        <h3 class="result-title" style="color: var(--warning-color);">Δεν Βρέθηκε Κατηγορία</h3>
                        <p class="result-category">Με βάση τα στοιχεία που δώσατε</p>
                    </div>
                </div>
                <p style="margin-top: 1rem; color: var(--text-secondary);">
                    Με τα τρέχοντα στοιχεία δεν φαίνεται να υπάρχει δικαίωμα κτήσης ελληνικής ιθαγένειας. 
                    Ελέγξτε αν υπάρχουν επιπλέον πληροφορίες που μπορείτε να προσθέσετε 
                    (π.χ. ελληνική καταγωγή από παππούδες/προπαππούδες).
                </p>
            </div>
        `;
    }
    
    // Get the best matching category (highest confidence)
    const primaryResult = results.sort((a, b) => {
        const confidenceOrder = { high: 3, medium: 2, low: 1 };
        return (confidenceOrder[b.confidence] || 0) - (confidenceOrder[a.confidence] || 0);
    })[0];
    
    const category = primaryResult.category;
    const documents = window.CitizenshipLogic.formatDocumentsList(category.id, false, analysisData);
    
    // Έλεγχος για σύσταση εναλλακτικής διαδρομής και edge cases
    let recommendationHtml = '';
    let specialCaseBanner = '';
    
    // Banner για ειδικές περιπτώσεις - εμφανίζεται στην κορυφή
    if (primaryResult.specialCase === 'PARENT_CAN_APPLY_FIRST' || primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN') {
        const isDeceased = primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN';
        specialCaseBanner = `
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: ${isDeceased ? 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'}; border-radius: var(--radius-md); border-left: 5px solid ${isDeceased ? 'var(--warning-color)' : 'var(--success-color)'}; cursor: pointer;" onclick="document.getElementById('special-recommendation').scrollIntoView({behavior: 'smooth'})">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.75rem;">${isDeceased ? '⚠️' : '💡'}</span>
                    <div style="flex: 1;">
                        <strong style="color: ${isDeceased ? 'var(--warning-color)' : 'var(--success-color)'}; font-size: 1.1rem;">
                            ${isDeceased ? 'Ειδική Περίπτωση - Αποβιώσας Γονέας' : 'Υπάρχει Οικονομικότερη Διαδρομή!'}
                        </strong>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">
                            ${isDeceased 
                                ? 'Κάντε κλικ ή σκρολάρετε κάτω για να δείτε τις διαθέσιμες επιλογές.' 
                                : 'Ο γονέας μπορεί να αιτηθεί πρώτα - εξοικονομήστε ~520€! Κάντε κλικ για λεπτομέρειες.'}
                        </p>
                    </div>
                    <span style="font-size: 1.5rem; animation: bounce 1s infinite;">⬇️</span>
                </div>
            </div>
            <style>
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
            </style>
        `;
    }
    
    // ΕΙΔΙΚΗ ΠΕΡΙΠΤΩΣΗ: Αποβιώσας γονέας στην αλυσίδα
    if (primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN' && primaryResult.alternativePath) {
        const altPath = primaryResult.alternativePath;
        recommendationHtml = `
            <div id="special-recommendation" style="margin-top: 1.5rem; padding: 1.25rem; background: linear-gradient(135deg, rgba(237, 108, 2, 0.15) 0%, rgba(237, 108, 2, 0.05) 100%); border: 2px solid var(--warning-color); border-radius: var(--radius-md);">
                <h4 style="margin-bottom: 0.75rem; color: var(--warning-color);">⚠️ Ειδική Περίπτωση: Αποβιώσας Γονέας στην Αλυσίδα</h4>
                <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.95rem;">${primaryResult.recommendation}</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <!-- Επιλογή Α: Μεταθανάτια αναγνώριση -->
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); border: 2px solid var(--success-color);">
                        <h5 style="color: var(--success-color); margin-bottom: 0.5rem;">${altPath.option1.name}</h5>
                        <p style="font-size: 0.85rem; color: var(--text-secondary);">${altPath.option1.description}</p>
                        <div style="margin-top: 0.75rem;">
                            <span style="display: block;"><strong>Κόστος:</strong> <span style="color: var(--success-color);">${altPath.option1.cost}</span></span>
                            <span style="display: block;"><strong>Χρόνος:</strong> ${altPath.option1.time}</span>
                            <span style="display: block;"><strong>Πολυπλοκότητα:</strong> ${altPath.option1.complexity}</span>
                        </div>
                        <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(46, 125, 50, 0.1); border-radius: 4px; text-align: center;">
                            <strong style="color: var(--success-color);">✓ Συνιστάται</strong>
                        </div>
                    </div>
                    
                    <!-- Επιλογή Β: Ομογενής -->
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <h5 style="color: var(--text-secondary); margin-bottom: 0.5rem;">${altPath.option2.name}</h5>
                        <p style="font-size: 0.85rem; color: var(--text-secondary);">${altPath.option2.description}</p>
                        <div style="margin-top: 0.75rem;">
                            <span style="display: block;"><strong>Κόστος:</strong> <span style="color: var(--error-color);">${altPath.option2.cost}</span></span>
                            <span style="display: block;"><strong>Χρόνος:</strong> ${altPath.option2.time}</span>
                            <span style="display: block;"><strong>Πολυπλοκότητα:</strong> ${altPath.option2.complexity}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(25, 118, 210, 0.1); border-radius: var(--radius-sm);">
                    <strong style="color: var(--primary-color);">📋 ${altPath.recommendation}</strong>
                </div>
                
                ${primaryResult.warnings && primaryResult.warnings.length > 0 ? `
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(237, 108, 2, 0.1); border-radius: var(--radius-sm);">
                    <strong style="color: var(--warning-color);">Απαιτούμενα Έγγραφα:</strong>
                    <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
                        ${primaryResult.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    }
    // ΚΑΝΟΝΙΚΗ ΠΕΡΙΠΤΩΣΗ: Γονέας εν ζωή - μπορεί να αιτηθεί πρώτα
    else if (primaryResult.specialCase === 'PARENT_CAN_APPLY_FIRST' && primaryResult.alternativePath) {
        const altPath = primaryResult.alternativePath;
        recommendationHtml = `
            <div id="special-recommendation" style="margin-top: 1.5rem; padding: 1.25rem; background: linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%); border: 2px solid var(--success-color); border-radius: var(--radius-md);">
                <h4 style="margin-bottom: 0.75rem; color: var(--success-color);">💡 Προτεινόμενη Εναλλακτική Διαδρομή (Εξοικονόμηση!)</h4>
                <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.95rem;">${primaryResult.recommendation}</p>
                
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
                        <strong style="color: var(--primary-color);">Βήμα 1</strong><br>
                        <span style="font-size: 1.5rem;">👤</span><br>
                        <strong>${altPath.step1.who}</strong><br>
                        <small>${altPath.step1.category}</small><br>
                        <span style="color: var(--success-color); font-weight: 600;">${altPath.step1.cost}</span><br>
                        <small style="color: var(--text-light);">${altPath.step1.time}</small>
                    </div>
                    
                    <div style="font-size: 2rem;">→</div>
                    
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
                        <strong style="color: var(--primary-color);">Βήμα 2</strong><br>
                        <span style="font-size: 1.5rem;">👤</span><br>
                        <strong>${altPath.step2.who}</strong><br>
                        <small>${altPath.step2.category}</small><br>
                        <span style="color: var(--success-color); font-weight: 600;">${altPath.step2.cost}</span><br>
                        <small style="color: var(--text-light);">${altPath.step2.time}</small>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; text-align: center; padding: 0.75rem; background: rgba(46, 125, 50, 0.2); border-radius: var(--radius-sm);">
                    <strong style="color: var(--success-color);">Συνολικό Κόστος: ${altPath.totalCost}</strong>
                    <span style="color: var(--text-secondary);"> ${altPath.vs}</span>
                </div>
                
                ${primaryResult.warnings && primaryResult.warnings.length > 0 ? `
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(237, 108, 2, 0.1); border-radius: var(--radius-sm);">
                    <strong style="color: var(--warning-color);">Σημειώσεις:</strong>
                    <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
                        ${primaryResult.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    }
    // LEGACY SUPPORT: Παλιά μορφή recommendation
    else if (primaryResult.recommendation && primaryResult.alternativePath && primaryResult.alternativePath.step1) {
        const altPath = primaryResult.alternativePath;
        const parentAliveNote = altPath.step1.alive === false ? 
            '<br><span style="color: var(--error-color);">⚠️ Σημείωση: Αν ο γονέας έχει αποβιώσει, μπορεί να χρειαστεί διαφορετική διαδικασία.</span>' : '';
        
        recommendationHtml = `
            <div style="margin-top: 1.5rem; padding: 1.25rem; background: linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%); border: 2px solid var(--success-color); border-radius: var(--radius-md);">
                <h4 style="margin-bottom: 0.75rem; color: var(--success-color);">💡 Προτεινόμενη Εναλλακτική Διαδρομή (Εξοικονόμηση!)</h4>
                <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.95rem;">${primaryResult.recommendation}</p>
                
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
                        <strong style="color: var(--primary-color);">Βήμα 1</strong><br>
                        <span style="font-size: 1.5rem;">👤</span><br>
                        <strong>${altPath.step1.who}</strong><br>
                        <small>${altPath.step1.category}</small><br>
                        <span style="color: var(--success-color); font-weight: 600;">${altPath.step1.cost}</span><br>
                        <small style="color: var(--text-light);">${altPath.step1.time}</small>
                    </div>
                    
                    <div style="font-size: 2rem;">→</div>
                    
                    <div style="background: white; padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
                        <strong style="color: var(--primary-color);">Βήμα 2</strong><br>
                        <span style="font-size: 1.5rem;">👤</span><br>
                        <strong>${altPath.step2.who}</strong><br>
                        <small>${altPath.step2.category}</small><br>
                        <span style="color: var(--success-color); font-weight: 600;">${altPath.step2.cost}</span><br>
                        <small style="color: var(--text-light);">${altPath.step2.time}</small>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; text-align: center; padding: 0.75rem; background: rgba(46, 125, 50, 0.2); border-radius: var(--radius-sm);">
                    <strong style="color: var(--success-color);">Συνολικό Κόστος: ${altPath.totalCost}</strong>
                    <span style="color: var(--text-secondary);"> ${altPath.vs}</span>
                </div>
                ${parentAliveNote}
            </div>
        `;
    }
    
    let alternativesHtml = '';
    if (results.length > 1) {
        alternativesHtml = `
            <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(26, 68, 128, 0.05); border-radius: var(--radius-sm);">
                <h4 style="margin-bottom: 0.75rem; color: var(--primary-color);">Εναλλακτικές Κατηγορίες:</h4>
                <ul style="list-style: none;">
                    ${results.slice(1).map(r => `
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                            <strong>${r.category.name}</strong><br>
                            <small style="color: var(--text-secondary);">${r.reason}</small>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    // Cost info
    const costInfo = category.cost ? 
        `${category.cost.min}${category.cost.max !== category.cost.min ? '-' + category.cost.max : ''}${category.cost.currency}` : 
        '-';
    
    return `
        ${specialCaseBanner}
        <div class="result-container">
            <div class="result-header">
                <span class="result-icon">${category.icon}</span>
                <div>
                    <h3 class="result-title">${category.name}</h3>
                    <p class="result-category">${primaryResult.reason}</p>
                </div>
            </div>
            
            <div class="result-legal">
                <p><strong>Νομική Βάση:</strong> ${category.article}</p>
                <p style="margin-top: 0.5rem;">${category.description}</p>
                <p style="margin-top: 0.5rem;">
                    <strong>Εκτιμώμενο Κόστος:</strong> <span style="color: var(--success-color); font-weight: 600;">${costInfo}</span> | 
                    <strong>Χρόνος:</strong> ${category.estimatedTime || '-'}
                </p>
            </div>
            
            <div style="margin-top: 1.5rem;">
                ${renderAncestralChart(analysisData)}
            </div>
            
            ${recommendationHtml}
            
            <div class="documents-section">
                <h4>📄 Απαιτούμενα Δικαιολογητικά</h4>
                ${documents}
            </div>
            
            ${alternativesHtml}
        </div>
        
        <div style="margin-top: 2rem; text-align: center;">
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Πατήστε "Αποθήκευση" για να καταχωρήσετε την υπόθεση.
            </p>
        </div>
    `;
}

/**
 * Δημιουργεί ένα οπτικό γενεαλογικό δέντρο
 */
function renderAncestralChart(data) {
    // Helper για status icon
    const getStatusIcon = (status) => {
        if (status === 'alive') return '<span style="color: #4caf50;" title="Εν ζωή">●</span>';
        if (status === 'deceased') return '<span style="color: #9e9e9e;" title="Αποβιώσας/σα">✝</span>';
        return '<span style="color: #bdbdbd;" title="Άγνωστο">○</span>';
    };
    
    // Helper για Greek indicator
    const getGreekBadge = (isGreek) => {
        if (isGreek === true || isGreek === 'true') {
            return '<span style="background: #1a4480; color: white; font-size: 0.65rem; padding: 0.1rem 0.3rem; border-radius: 3px; margin-left: 0.25rem;">🇬🇷</span>';
        }
        return '';
    };
    
    // Helper για person box
    const personBox = (name, relation, isGreek, status, isApplicant = false, deathDate = null, deathPlace = null) => {
        const greekClass = (isGreek === true || isGreek === 'true') ? 'greek-person' : '';
        const deceasedClass = status === 'deceased' ? 'deceased-person' : '';
        const applicantClass = isApplicant ? 'applicant-person' : '';
        const displayName = name || (isApplicant ? `${data.firstName || ''} ${data.lastName || ''}`.trim() : 'Άγνωστο');
        
        // Format death info
        let deathInfo = '';
        if (status === 'deceased' && (deathDate || deathPlace)) {
            const dateStr = deathDate ? formatGreekDate(deathDate) : '';
            const placeStr = deathPlace || '';
            if (dateStr || placeStr) {
                deathInfo = `<div class="person-death-info" style="font-size: 0.65rem; color: #757575; margin-top: 2px;">✝ ${dateStr}${dateStr && placeStr ? ', ' : ''}${placeStr}</div>`;
            }
        }
        
        return `
            <div class="tree-person ${greekClass} ${deceasedClass} ${applicantClass}">
                <div class="person-status">${getStatusIcon(status)}</div>
                <div class="person-name">${displayName}${getGreekBadge(isGreek)}</div>
                <div class="person-relation">${relation}</div>
                ${deathInfo}
            </div>
        `;
    };
    
    // Get data values (handle both raw and processed formats)
    const getValue = (key, boolKey) => {
        const val = data[key];
        if (boolKey) {
            return val === true || val === 'true';
        }
        return val || '';
    };
    
    const fatherIsGreek = getValue('fatherIsGreek', true);
    const motherIsGreek = getValue('motherIsGreek', true);
    const fatherStatus = data.fatherStatus || 'unknown';
    const motherStatus = data.motherStatus || 'unknown';
    const fatherName = data.fatherName || 'Πατέρας';
    const motherName = data.motherName || 'Μητέρα';
    
    // Death info for parents
    const fatherDeathDate = data.fatherDeathDate || null;
    const fatherDeathPlace = data.fatherDeathPlace || null;
    const motherDeathDate = data.motherDeathDate || null;
    const motherDeathPlace = data.motherDeathPlace || null;
    
    // Grandparents
    const pgf = data.ancestry?.paternalGrandfather || {};
    const pgm = data.ancestry?.paternalGrandmother || {};
    const mgf = data.ancestry?.maternalGrandfather || {};
    const mgm = data.ancestry?.maternalGrandmother || {};
    
    // Fallback for flat data structure
    const pgfIsGreek = pgf.isGreek ?? (data.paternalGrandfatherIsGreek === 'true' || data.paternalGrandfatherIsGreek === true);
    const pgmIsGreek = pgm.isGreek ?? (data.paternalGrandmotherIsGreek === 'true' || data.paternalGrandmotherIsGreek === true);
    const mgfIsGreek = mgf.isGreek ?? (data.maternalGrandfatherIsGreek === 'true' || data.maternalGrandfatherIsGreek === true);
    const mgmIsGreek = mgm.isGreek ?? (data.maternalGrandmotherIsGreek === 'true' || data.maternalGrandmotherIsGreek === true);
    
    const pgfStatus = pgf.status || data.paternalGrandfatherStatus || 'unknown';
    const pgmStatus = pgm.status || data.paternalGrandmotherStatus || 'unknown';
    const mgfStatus = mgf.status || data.maternalGrandfatherStatus || 'unknown';
    const mgmStatus = mgm.status || data.maternalGrandmotherStatus || 'unknown';
    
    const pgfName = pgf.name || data.paternalGrandfatherName || 'Παππούς';
    const pgmName = pgm.name || data.paternalGrandmotherName || 'Γιαγιά';
    const mgfName = mgf.name || data.maternalGrandfatherName || 'Παππούς';
    const mgmName = mgm.name || data.maternalGrandmotherName || 'Γιαγιά';
    
    // Death info for grandparents
    const pgfDeathDate = pgf.deathDate || data.paternalGrandfatherDeathDate || null;
    const pgfDeathPlace = pgf.deathPlace || data.paternalGrandfatherDeathPlace || null;
    const pgmDeathDate = pgm.deathDate || data.paternalGrandmotherDeathDate || null;
    const pgmDeathPlace = pgm.deathPlace || data.paternalGrandmotherDeathPlace || null;
    const mgfDeathDate = mgf.deathDate || data.maternalGrandfatherDeathDate || null;
    const mgfDeathPlace = mgf.deathPlace || data.maternalGrandfatherDeathPlace || null;
    const mgmDeathDate = mgm.deathDate || data.maternalGrandmotherDeathDate || null;
    const mgmDeathPlace = mgm.deathPlace || data.maternalGrandmotherDeathPlace || null;

    return `
        <style>
            .ancestral-chart {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: var(--radius-md);
                padding: 1.5rem;
                overflow-x: auto;
            }
            .ancestral-chart h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .tree-container {
                display: flex;
                align-items: center;
                gap: 0;
                min-width: max-content;
            }
            .tree-level {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }
            .tree-person {
                background: white;
                border: 2px solid #dee2e6;
                border-radius: 8px;
                padding: 0.75rem;
                min-width: 120px;
                text-align: center;
                position: relative;
                margin: 0.5rem;
                transition: all 0.2s;
            }
            .tree-person:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .tree-person.greek-person {
                border-color: #1a4480;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            }
            .tree-person.deceased-person {
                opacity: 0.7;
                border-style: dashed;
            }
            .tree-person.applicant-person {
                border-color: var(--accent-color);
                border-width: 3px;
                background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            }
            .person-status {
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }
            .person-name {
                font-weight: 600;
                font-size: 0.85rem;
                color: var(--text-primary);
                word-break: break-word;
            }
            .person-relation {
                font-size: 0.7rem;
                color: var(--text-light);
                margin-top: 0.25rem;
            }
            .tree-connector {
                display: flex;
                align-items: center;
                padding: 0 0.5rem;
            }
            .connector-line {
                width: 30px;
                height: 2px;
                background: #adb5bd;
            }
            .connector-arrow {
                color: #adb5bd;
                font-size: 1rem;
            }
            .parent-group {
                display: flex;
                flex-direction: column;
                position: relative;
            }
            .parent-group::before {
                content: '';
                position: absolute;
                left: -15px;
                top: 50%;
                width: 15px;
                height: 2px;
                background: #adb5bd;
            }
            .grandparent-group {
                display: flex;
                flex-direction: column;
            }
            .grandparent-pair {
                display: flex;
                flex-direction: column;
                position: relative;
                margin: 0.25rem 0;
            }
            .grandparent-pair::before {
                content: '';
                position: absolute;
                left: -15px;
                top: 50%;
                width: 15px;
                height: 2px;
                background: #adb5bd;
            }
            .vertical-connector {
                position: absolute;
                left: -15px;
                width: 2px;
                background: #adb5bd;
            }
            .chart-legend {
                display: flex;
                gap: 1.5rem;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #dee2e6;
                flex-wrap: wrap;
                font-size: 0.8rem;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 0.35rem;
                color: var(--text-secondary);
            }
        </style>
        
        <div class="ancestral-chart">
            <h4>🌳 Γενεαλογικό Δέντρο</h4>
            
            <div class="tree-container">
                <!-- Αιτών -->
                <div class="tree-level">
                    ${personBox(null, 'Αιτών/ούσα', data.currentCitizenship === 'Ελληνική', 'alive', true)}
                </div>
                
                <div class="tree-connector">
                    <span class="connector-arrow">→</span>
                </div>
                
                <!-- Γονείς -->
                <div class="tree-level">
                    <div class="parent-group">
                        ${personBox(fatherName, 'Πατέρας', fatherIsGreek, fatherStatus, false, fatherDeathDate, fatherDeathPlace)}
                        ${personBox(motherName, 'Μητέρα', motherIsGreek, motherStatus, false, motherDeathDate, motherDeathPlace)}
                    </div>
                </div>
                
                <div class="tree-connector">
                    <span class="connector-arrow">→</span>
                </div>
                
                <!-- Παππούδες/Γιαγιάδες -->
                <div class="tree-level">
                    <div class="grandparent-group">
                        <div class="grandparent-pair" style="margin-bottom: 0.5rem;">
                            <div style="font-size: 0.65rem; color: var(--text-light); text-align: center; margin-bottom: 0.25rem;">Πατρική πλευρά</div>
                            ${personBox(pgfName, 'Παππούς', pgfIsGreek, pgfStatus, false, pgfDeathDate, pgfDeathPlace)}
                            ${personBox(pgmName, 'Γιαγιά', pgmIsGreek, pgmStatus, false, pgmDeathDate, pgmDeathPlace)}
                        </div>
                        <div class="grandparent-pair">
                            <div style="font-size: 0.65rem; color: var(--text-light); text-align: center; margin-bottom: 0.25rem;">Μητρική πλευρά</div>
                            ${personBox(mgfName, 'Παππούς', mgfIsGreek, mgfStatus, false, mgfDeathDate, mgfDeathPlace)}
                            ${personBox(mgmName, 'Γιαγιά', mgmIsGreek, mgmStatus, false, mgmDeathDate, mgmDeathPlace)}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="chart-legend">
                <div class="legend-item">
                    <span style="color: #4caf50;">●</span> Εν ζωή
                </div>
                <div class="legend-item">
                    <span style="color: #9e9e9e;">✝</span> Αποβιώσας/σα
                </div>
                <div class="legend-item">
                    <span style="color: #bdbdbd;">○</span> Άγνωστο
                </div>
                <div class="legend-item">
                    <span style="background: #1a4480; color: white; font-size: 0.65rem; padding: 0.1rem 0.3rem; border-radius: 3px;">🇬🇷</span> Έλληνας/ίδα
                </div>
                <div class="legend-item">
                    <span style="display: inline-block; width: 20px; height: 12px; border: 2px dashed #9e9e9e; border-radius: 3px;"></span> Αποβιώσας
                </div>
            </div>
        </div>
    `;
}

// Returns a COPY of the data prepared for analysis - does NOT modify AppState.caseData
function prepareDataForAnalysis(sourceData = null) {
    // Use a COPY of the data - never modify the original
    const rawData = sourceData || AppState.caseData;
    const data = JSON.parse(JSON.stringify(rawData)); // Deep copy
    
    // Boolean conversions
    data.bornInGreece = data.bornInGreece === 'true' || data.bornInGreece === true;
    data.fatherIsGreek = data.fatherIsGreek === 'true' || data.fatherIsGreek === true;
    data.motherIsGreek = data.motherIsGreek === 'true' || data.motherIsGreek === true;
    data.schooledInGreece = data.schooledInGreece === 'true' || data.schooledInGreece === true;
    data.graduatedGreekUniversity = data.graduatedGreekUniversity === 'true' || data.graduatedGreekUniversity === true;
    data.marriedToGreek = data.marriedToGreek === 'true' || data.marriedToGreek === true;
    data.hasChildWithGreekSpouse = data.hasChildWithGreekSpouse === 'true' || data.hasChildWithGreekSpouse === true;
    data.recognizedByGreek = data.recognizedByGreek === 'true' || data.recognizedByGreek === true;
    data.adoptedByGreek = data.adoptedByGreek === 'true' || data.adoptedByGreek === true;
    data.hadGreekCitizenship = data.hadGreekCitizenship === 'true' || data.hadGreekCitizenship === true;
    data.isRefugee = data.isRefugeeOrStateless === 'refugee';
    data.isStateless = data.isRefugeeOrStateless === 'stateless';
    
    // Number conversions
    data.residenceYearsInGreece = parseInt(data.residenceYearsInGreece) || 0;
    data.schoolYearsInGreece = parseInt(data.schoolYearsInGreece) || 0;
    
    // Build ancestry object from flat fields
    data.ancestry = {
        paternalGrandfather: {
            name: data.paternalGrandfatherName,
            birthPlace: data.paternalGrandfatherBirthPlace,
            isGreek: data.paternalGrandfatherIsGreek === 'true' || data.paternalGrandfatherIsGreek === true,
            status: data.paternalGrandfatherStatus
        },
        paternalGrandmother: {
            name: data.paternalGrandmotherName,
            birthPlace: data.paternalGrandmotherBirthPlace,
            isGreek: data.paternalGrandmotherIsGreek === 'true' || data.paternalGrandmotherIsGreek === true,
            status: data.paternalGrandmotherStatus
        },
        maternalGrandfather: {
            name: data.maternalGrandfatherName,
            birthPlace: data.maternalGrandfatherBirthPlace,
            isGreek: data.maternalGrandfatherIsGreek === 'true' || data.maternalGrandfatherIsGreek === true,
            status: data.maternalGrandfatherStatus
        },
        maternalGrandmother: {
            name: data.maternalGrandmotherName,
            birthPlace: data.maternalGrandmotherBirthPlace,
            isGreek: data.maternalGrandmotherIsGreek === 'true' || data.maternalGrandmotherIsGreek === true,
            status: data.maternalGrandmotherStatus
        }
    };
    
    return data;
}

function initOptionCards() {
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const parent = card.closest('.option-cards');
            const name = parent.dataset.name;
            const value = card.dataset.value;
            
            // Update UI
            parent.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            // Update radio input
            const input = card.querySelector('input');
            if (input) {
                input.checked = true;
            }
            
            // Save to state
            AppState.caseData[name] = value;
        });
    });
}

function saveFormValues() {
    const inputs = elements.wizardContent.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            if (input.type === 'radio') {
                if (input.checked) {
                    AppState.caseData[input.name] = input.value;
                }
            } else {
                // Convert Greek date format to ISO for storage
                if (input.classList.contains('greek-date-input') && input.value) {
                    AppState.caseData[input.name] = parseGreekDate(input.value);
                } else {
                    AppState.caseData[input.name] = input.value;
                }
            }
        }
    });
}

function restoreFormValues() {
    const data = AppState.caseData;
    console.log('restoreFormValues called, data keys:', Object.keys(data));
    console.log('Current step:', AppState.currentStep);
    
    Object.keys(data).forEach(key => {
        const input = elements.wizardContent.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'radio') {
                const radio = elements.wizardContent.querySelector(`[name="${key}"][value="${data[key]}"]`);
                if (radio) {
                    radio.checked = true;
                    const card = radio.closest('.option-card');
                    if (card) card.classList.add('selected');
                }
            } else {
                // Convert ISO dates to Greek format for date inputs
                if (input.classList.contains('greek-date-input') && data[key]) {
                    input.value = formatGreekDate(data[key]);
                } else {
                    input.value = data[key];
                }
            }
        }
    });
    
    // Initialize conditional fields visibility directly using the data values
    // (not relying on :checked selector which may not work immediately)
    initializeConditionalFields(data);
    initGreekDateInputs();
}

// Initialize all conditional fields based on data values directly
function initializeConditionalFields(data) {
    console.log('initializeConditionalFields called with:', data);
    console.log('fatherStatus:', data.fatherStatus);
    console.log('motherStatus:', data.motherStatus);
    console.log('greekParentNameChange:', data.greekParentNameChange);
    
    // Father death fields
    if (data.fatherStatus === 'deceased') {
        console.log('Showing father death fields');
        toggleDeathFields('father', true);
    }
    
    // Mother death fields
    if (data.motherStatus === 'deceased') {
        console.log('Showing mother death fields');
        toggleDeathFields('mother', true);
    }
    
    // Grandparents death fields
    const grandparents = ['paternalGrandfather', 'paternalGrandmother', 'maternalGrandfather', 'maternalGrandmother'];
    grandparents.forEach(gp => {
        if (data[`${gp}Status`] === 'deceased') {
            console.log(`Showing ${gp} death fields`);
            toggleGrandparentDeathFields(gp, true);
        }
    });
    
    // Parent name change fields
    if (data.greekParentNameChange === 'yes') {
        console.log('Showing name change fields');
        toggleNameChangeFields(true);
    }
    
    // Ancestor name change fields
    if (data.ancestorNameChange === 'yes') {
        console.log('Showing ancestor name change fields');
        toggleAncestorNameChangeFields(true);
    }
    
    // Divorce fields
    if (data.parentsMaritalStatus === 'divorced') {
        console.log('Showing divorce fields');
        toggleDivorceFields(true);
    }
    
    // Previous marriages info
    if (data.greekParentPreviousMarriages === 'yes') {
        console.log('Showing previous marriages info');
        togglePreviousMarriagesInfo(true);
    }
}

function handleNext() {
    saveFormValues();
    
    if (AppState.currentStep === WizardSteps.length - 1) {
        // Save case
        saveCase();
        return;
    }
    
    // Validate current step
    if (!validateCurrentStep()) {
        return;
    }
    
    // Auto-save draft when editing
    if (AppState.editingCaseId) {
        saveEditingDraft();
    }
    
    AppState.currentStep++;
    renderStep(AppState.currentStep);
}

function handlePrev() {
    saveFormValues();
    
    // Auto-save draft when editing
    if (AppState.editingCaseId) {
        saveEditingDraft();
    }
    
    if (AppState.currentStep > 0) {
        AppState.currentStep--;
        renderStep(AppState.currentStep);
    }
}

function validateCurrentStep() {
    const step = WizardSteps[AppState.currentStep];
    
    if (step.id === 'personal') {
        const lastName = AppState.caseData.lastName;
        const firstName = AppState.caseData.firstName;
        
        if (!lastName || !firstName) {
            showToast('Παρακαλώ συμπληρώστε το ονοματεπώνυμο.', 'error');
            return false;
        }
    }
    
    return true;
}

// Case Management
function saveCase() {
    // Αποθήκευση raw δεδομένων πριν τη μετατροπή
    const rawFormData = { ...AppState.caseData };
    
    // IMPORTANT: Remove derived objects - they will be recreated from flat fields
    // The ancestry object is derived from flat fields and can cause sync issues
    delete rawFormData.ancestry;
    delete rawFormData.isRefugee;
    delete rawFormData.isStateless;
    
    // Μετατροπή για ανάλυση - επιστρέφει ΑΝΤΙΓΡΑΦΟ, δεν τροποποιεί το AppState.caseData
    const analysisData = prepareDataForAnalysis();
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(analysisData);
    const primaryResult = results.length > 0 ? results[0] : null;
    
    const caseObj = {
        id: AppState.editingCaseId || generateId(),
        data: rawFormData, // Αποθήκευση RAW δεδομένων για σωστή επεξεργασία
        processedData: analysisData, // Μετατρεμμένα δεδομένα για αναφορά
        category: primaryResult ? primaryResult.category.id : null,
        categoryName: primaryResult ? primaryResult.category.name : 'Άγνωστο',
        allCategories: results,
        status: results.length > 0 ? 'in-progress' : 'pending',
        createdAt: AppState.editingCaseId ? 
            AppState.cases.find(c => c.id === AppState.editingCaseId)?.createdAt : 
            new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (AppState.editingCaseId) {
        // Update existing case
        const index = AppState.cases.findIndex(c => c.id === AppState.editingCaseId);
        if (index !== -1) {
            AppState.cases[index] = caseObj;
        }
        showToast('Η υπόθεση ενημερώθηκε επιτυχώς!', 'success');
    } else {
        // Add new case
        AppState.cases.push(caseObj);
        showToast('Η υπόθεση αποθηκεύτηκε επιτυχώς!', 'success');
    }
    
    saveCases();
    resetWizard();
    switchView('cases');
    document.querySelector('[data-view="cases"]').click();
}

function loadCases() {
    try {
        const saved = localStorage.getItem('greekCitizenshipCases');
        if (saved) {
            AppState.cases = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading cases:', e);
        AppState.cases = [];
    }
}

function saveCases() {
    try {
        localStorage.setItem('greekCitizenshipCases', JSON.stringify(AppState.cases));
    } catch (e) {
        console.error('Error saving cases:', e);
        showToast('Σφάλμα αποθήκευσης', 'error');
    }
}

function renderCasesList(searchTerm = '') {
    let cases = AppState.cases;
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        cases = cases.filter(c => 
            (c.data.firstName && c.data.firstName.toLowerCase().includes(term)) ||
            (c.data.lastName && c.data.lastName.toLowerCase().includes(term))
        );
    }
    
    if (cases.length === 0) {
        elements.casesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📁</div>
                <h3>${searchTerm ? 'Δεν βρέθηκαν αποτελέσματα' : 'Δεν υπάρχουν υποθέσεις'}</h3>
                <p>${searchTerm ? 'Δοκιμάστε διαφορετικούς όρους αναζήτησης.' : 'Δημιουργήστε μια νέα υπόθεση για να ξεκινήσετε.'}</p>
            </div>
        `;
        return;
    }
    
    // Sort by most recent
    cases.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    elements.casesList.innerHTML = cases.map(c => {
        const initials = `${(c.data.firstName || '?')[0]}${(c.data.lastName || '?')[0]}`.toUpperCase();
        const date = new Date(c.updatedAt).toLocaleDateString('el-GR');
        
        return `
            <div class="case-card" data-case-id="${c.id}">
                <div class="case-info">
                    <div class="case-avatar">${initials}</div>
                    <div class="case-details">
                        <h4>${c.data.lastName || ''} ${c.data.firstName || ''}</h4>
                        <p>${c.categoryName || 'Προς εξέταση'}</p>
                    </div>
                </div>
                <div class="case-meta">
                    <span class="case-status ${c.status}">${getStatusLabel(c.status)}</span>
                    <div class="case-date">${date}</div>
                    <button class="btn-delete-case" data-delete-id="${c.id}" title="Διαγραφή υπόθεσης">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers for opening case
    document.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if delete button was clicked
            if (e.target.classList.contains('btn-delete-case')) return;
            
            const caseId = card.dataset.caseId;
            openCaseModal(caseId);
        });
    });
    
    // Add click handlers for delete buttons
    document.querySelectorAll('.btn-delete-case').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            const caseId = btn.dataset.deleteId;
            const caseObj = AppState.cases.find(c => c.id === caseId);
            if (caseObj) {
                showDeleteConfirmation(caseId, `${caseObj.data.lastName} ${caseObj.data.firstName}`);
            }
        });
    });
}

function getStatusLabel(status) {
    const labels = {
        'pending': 'Εκκρεμεί',
        'in-progress': 'Σε Εξέλιξη',
        'complete': 'Ολοκληρωμένη'
    };
    return labels[status] || status;
}

// Modal Functions
function initModal() {
    elements.modalClose.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });
    
    elements.btnEditCase.addEventListener('click', editCurrentCase);
    elements.btnPrintDocs.addEventListener('click', printDocuments);
    
    // Add new buttons for missing documents
    document.getElementById('btn-print-missing').addEventListener('click', printMissingDocuments);
    document.getElementById('btn-email-missing').addEventListener('click', openMissingEmailModal);
    
    // Initialize dropdowns
    initDropdowns();
    
    // Use event delegation for delete button to ensure it always works
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'btn-delete-case' || e.target.closest('#btn-delete-case'))) {
            e.preventDefault();
            e.stopPropagation();
            deleteCurrentCase();
        }
    });
    
    // Initialize email modal
    initEmailModal();
}

function initDropdowns() {
    // Email dropdown
    const emailDropdownTrigger = document.getElementById('btn-email-dropdown');
    const emailDropdownMenu = document.getElementById('email-dropdown-menu');
    
    // Print dropdown
    const printDropdownTrigger = document.getElementById('btn-print-dropdown');
    const printDropdownMenu = document.getElementById('print-dropdown-menu');
    
    // Toggle dropdowns
    emailDropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        emailDropdownTrigger.classList.toggle('active');
        emailDropdownMenu.classList.toggle('active');
        // Close print dropdown if open
        printDropdownTrigger.classList.remove('active');
        printDropdownMenu.classList.remove('active');
    });
    
    printDropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        printDropdownTrigger.classList.toggle('active');
        printDropdownMenu.classList.toggle('active');
        // Close email dropdown if open
        emailDropdownTrigger.classList.remove('active');
        emailDropdownMenu.classList.remove('active');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-btn-container')) {
            emailDropdownTrigger.classList.remove('active');
            emailDropdownMenu.classList.remove('active');
            printDropdownTrigger.classList.remove('active');
            printDropdownMenu.classList.remove('active');
        }
    });
    
    // Close dropdown after selecting an item
    emailDropdownMenu.addEventListener('click', () => {
        emailDropdownTrigger.classList.remove('active');
        emailDropdownMenu.classList.remove('active');
    });
    
    printDropdownMenu.addEventListener('click', () => {
        printDropdownTrigger.classList.remove('active');
        printDropdownMenu.classList.remove('active');
    });
}

let currentModalCaseId = null;

function openCaseModal(caseId) {
    const caseObj = AppState.cases.find(c => c.id === caseId);
    if (!caseObj) return;
    
    currentModalCaseId = caseId;
    
    elements.modalTitle.textContent = `${caseObj.data.lastName} ${caseObj.data.firstName}`;
    elements.modalBody.innerHTML = renderCaseDetails(caseObj);
    elements.modal.classList.add('active');
    
    // Set up event listeners for document checkboxes
    setupDocumentCheckboxListeners();
}

function setupDocumentCheckboxListeners() {
    // Document checkboxes
    const docCheckboxes = document.querySelectorAll('.doc-checkbox');
    docCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const docId = e.target.dataset.docId;
            updateDocumentStatus(docId, e.target.checked);
        });
    });
    
    // Alternative document radio buttons
    const altCheckboxes = document.querySelectorAll('.alt-checkbox');
    altCheckboxes.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const docId = e.target.dataset.docId;
            const altIndex = parseInt(e.target.dataset.altIndex);
            updateDocumentAlternative(docId, altIndex);
        });
    });
}

function updateDocumentStatus(docId, isReceived) {
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    if (!caseObj) return;
    
    if (!caseObj.documentStatus) {
        caseObj.documentStatus = {};
    }
    
    if (!caseObj.documentStatus[docId]) {
        caseObj.documentStatus[docId] = {};
    }
    
    caseObj.documentStatus[docId].received = isReceived;
    
    // If unchecking, also clear the alternative
    if (!isReceived) {
        delete caseObj.documentStatus[docId].alternativeUsed;
    }
    
    saveCases();
    
    // Update the UI to show the status
    const docLi = document.querySelector(`li[data-doc-id="${docId}"]`);
    if (docLi) {
        if (isReceived) {
            docLi.classList.add('doc-received');
        } else {
            docLi.classList.remove('doc-received');
        }
    }
}

function updateDocumentAlternative(docId, altIndex) {
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    if (!caseObj) return;
    
    if (!caseObj.documentStatus) {
        caseObj.documentStatus = {};
    }
    
    if (!caseObj.documentStatus[docId]) {
        caseObj.documentStatus[docId] = {};
    }
    
    caseObj.documentStatus[docId].alternativeUsed = altIndex;
    
    // Automatically check the main checkbox if an alternative is selected
    if (!caseObj.documentStatus[docId].received) {
        caseObj.documentStatus[docId].received = true;
        const mainCheckbox = document.querySelector(`.doc-checkbox[data-doc-id="${docId}"]`);
        if (mainCheckbox) {
            mainCheckbox.checked = true;
        }
    }
    
    saveCases();
}

function closeModal() {
    elements.modal.classList.remove('active');
    currentModalCaseId = null;
}

function renderCaseDetails(caseObj) {
    const data = caseObj.data;
    const primaryResult = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0] : null;
    const category = primaryResult ? primaryResult.category : null;
    
    let documentsHtml = '';
    if (category) {
        // Pass case data for conditional documents (divorce, etc.) and document status
        const documentStatus = caseObj.documentStatus || {};
        documentsHtml = window.CitizenshipLogic.formatDocumentsList(category.id, true, data, documentStatus);
    }
    
    // Banner για ειδικές περιπτώσεις στο modal
    let specialCaseBanner = '';
    if (primaryResult && (primaryResult.specialCase === 'PARENT_CAN_APPLY_FIRST' || primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN')) {
        const isDeceased = primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN';
        specialCaseBanner = `
            <style>
                @keyframes bounce-modal {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
            </style>
            <div class="case-detail-section" style="background: ${isDeceased ? 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'}; border: 2px solid ${isDeceased ? 'var(--warning-color)' : 'var(--success-color)'}; margin-bottom: 1rem; cursor: pointer;" onclick="document.getElementById('modal-special-recommendation')?.scrollIntoView({behavior: 'smooth', block: 'center'})">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.5rem;">${isDeceased ? '⚠️' : '💰'}</span>
                    <div style="flex: 1;">
                        <h4 style="color: ${isDeceased ? 'var(--warning-color)' : 'var(--success-color)'}; margin: 0;">
                            ${isDeceased ? 'Ειδική Περίπτωση' : 'Υπάρχει Οικονομικότερη Διαδρομή!'}
                        </h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-secondary);">
                            ${isDeceased 
                                ? 'Κάντε κλικ για να δείτε τις διαθέσιμες επιλογές παρακάτω.' 
                                : 'Ο γονέας μπορεί να αιτηθεί πρώτα - εξοικονομήστε ~520€! Κάντε κλικ για λεπτομέρειες.'}
                        </p>
                    </div>
                    <span style="font-size: 1.5rem; animation: bounce-modal 1s infinite;">⬇️</span>
                </div>
            </div>
        `;
    }
    
    // Recommendation for alternative path - Updated for all cases
    let recommendationHtml = '';
    if (primaryResult && primaryResult.recommendation && primaryResult.alternativePath) {
        const altPath = primaryResult.alternativePath;
        
        // ΕΙΔΙΚΗ ΠΕΡΙΠΤΩΣΗ: Αποβιώσας γονέας
        if (primaryResult.specialCase === 'DECEASED_PARENT_IN_CHAIN' && altPath.option1) {
            recommendationHtml = `
            <div id="modal-special-recommendation" class="case-detail-section" style="background: linear-gradient(135deg, rgba(237, 108, 2, 0.1) 0%, rgba(237, 108, 2, 0.05) 100%); border: 2px solid var(--warning-color);">
                <h4 style="color: var(--warning-color);">⚠️ Ειδική Περίπτωση: Αποβιώσας Γονέας</h4>
                <p style="margin-bottom: 1rem; font-size: 0.9rem;">${primaryResult.recommendation}</p>
                <div class="detail-grid">
                    <div class="detail-item" style="background: rgba(46, 125, 50, 0.1); padding: 0.75rem; border-radius: 4px;">
                        <label style="color: var(--success-color);">✓ ${altPath.option1.name}</label>
                        <span>${altPath.option1.description}<br><strong style="color: var(--success-color);">${altPath.option1.cost}</strong></span>
                    </div>
                    <div class="detail-item" style="padding: 0.75rem;">
                        <label>${altPath.option2.name}</label>
                        <span>${altPath.option2.description}<br><strong style="color: var(--error-color);">${altPath.option2.cost}</strong></span>
                    </div>
                </div>
                ${primaryResult.warnings && primaryResult.warnings.length > 0 ? `
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(237, 108, 2, 0.1); border-radius: 4px;">
                    <strong>Απαιτούμενα:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.85rem;">
                        ${primaryResult.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            `;
        }
        // ΚΑΝΟΝΙΚΗ ΠΕΡΙΠΤΩΣΗ: Γονέας εν ζωή
        else if (altPath.step1 && altPath.step2) {
            recommendationHtml = `
            <div id="modal-special-recommendation" class="case-detail-section" style="background: linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%); border: 2px solid var(--success-color);">
                <h4 style="color: var(--success-color);">💡 Προτεινόμενη Εναλλακτική Διαδρομή</h4>
                <p style="margin-bottom: 1rem; font-size: 0.9rem;">${primaryResult.recommendation}</p>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Βήμα 1: ${altPath.step1.who}</label>
                        <span>${altPath.step1.category}<br><strong style="color: var(--success-color);">${altPath.step1.cost}</strong></span>
                    </div>
                    <div class="detail-item">
                        <label>Βήμα 2: ${altPath.step2.who}</label>
                        <span>${altPath.step2.category}<br><strong style="color: var(--success-color);">${altPath.step2.cost}</strong></span>
                    </div>
                    <div class="detail-item" style="grid-column: 1 / -1; text-align: center;">
                        <label>Εξοικονόμηση</label>
                        <span style="font-size: 1.1rem;"><strong style="color: var(--success-color);">Σύνολο: ${altPath.totalCost}</strong> ${altPath.vs}</span>
                    </div>
                </div>
                ${primaryResult.warnings && primaryResult.warnings.length > 0 ? `
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(237, 108, 2, 0.1); border-radius: 4px;">
                    <strong>Σημειώσεις:</strong>
                    <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.85rem;">
                        ${primaryResult.warnings.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            `;
        }
    }
    
    return `
        ${specialCaseBanner}
        
        <div class="case-detail-section">
            <h4>Προσωπικά Στοιχεία</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Ονοματεπώνυμο</label>
                    <span>${data.lastName || '-'} ${data.firstName || '-'}</span>
                </div>
                <div class="detail-item">
                    <label>Ημ. Γέννησης</label>
                    <span>${data.birthDate ? new Date(data.birthDate).toLocaleDateString('el-GR') : '-'}</span>
                </div>
                <div class="detail-item">
                    <label>Τόπος Γέννησης</label>
                    <span>${data.birthPlace || '-'}</span>
                </div>
                <div class="detail-item">
                    <label>Τρέχουσα Ιθαγένεια</label>
                    <span>${data.currentCitizenship || '-'}</span>
                </div>
            </div>
        </div>
        
        <div class="case-detail-section">
            <h4>Κατηγορία Ιθαγένειας</h4>
            <div class="detail-grid">
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <label>Κατηγορία</label>
                    <span style="font-weight: 600; color: var(--primary-color);">
                        ${category ? `${category.icon} ${category.name}` : 'Δεν καθορίστηκε'}
                    </span>
                </div>
                ${category ? `
                <div class="detail-item">
                    <label>Εκτιμώμενο Κόστος</label>
                    <span style="font-weight: 600; color: var(--success-color);">
                        ${category.cost ? `${category.cost.min}${category.cost.max !== category.cost.min ? '-' + category.cost.max : ''}${category.cost.currency}` : '-'}
                    </span>
                </div>
                <div class="detail-item">
                    <label>Εκτιμώμενος Χρόνος</label>
                    <span style="font-weight: 600;">
                        ${category.estimatedTime || '-'}
                    </span>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <label>Νομική Βάση</label>
                    <span>${category.article}</span>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <label>Περιγραφή</label>
                    <span style="font-style: italic; font-size: 0.9rem;">"${category.legalText}"</span>
                </div>
                ${category.cost && category.cost.description ? `
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <label>Ανάλυση Κόστους</label>
                    <span style="font-size: 0.9rem;">${category.cost.description}</span>
                </div>
                ` : ''}
                ` : ''}
            </div>
        </div>
        
        <div class="case-detail-section" style="padding: 0; background: transparent; border: none;">
            ${renderAncestralChart(data)}
        </div>
        
        ${recommendationHtml}
        
        ${category ? `
        <div class="case-detail-section">
            <h4>📄 Απαιτούμενα Δικαιολογητικά</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                Κάντε κλικ στο "Εναλλακτικά έγγραφα" για να δείτε υποκατάστατα εγγράφων σε περίπτωση που τα πρωτότυπα δεν είναι διαθέσιμα.
            </p>
            ${documentsHtml}
        </div>
        ` : ''}
        
        <div class="case-detail-section">
            <h4>Γονείς</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <label>Πατέρας</label>
                    <span>${data.fatherName || '-'} ${data.fatherIsGreek === 'true' || data.fatherIsGreek === true ? '🇬🇷' : ''}</span>
                </div>
                <div class="detail-item">
                    <label>Μητέρα</label>
                    <span>${data.motherName || '-'} ${data.motherIsGreek === 'true' || data.motherIsGreek === true ? '🇬🇷' : ''}</span>
                </div>
            </div>
        </div>
        
        ${data.notes ? `
        <div class="case-detail-section">
            <h4>Σημειώσεις</h4>
            <p style="white-space: pre-wrap;">${data.notes}</p>
        </div>
        ` : ''}
    `;
}

function editCurrentCase() {
    if (!currentModalCaseId) return;
    
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    if (!caseObj) return;
    
    AppState.editingCaseId = currentModalCaseId;
    
    // Χρησιμοποιούμε τα raw data αν είναι ήδη σε σωστή μορφή,
    // αλλιώς τα μετατρέπουμε (για συμβατότητα με παλιά δεδομένα)
    const loadedData = { ...caseObj.data };
    
    // Έλεγχος αν τα δεδομένα είναι ήδη σε form format (strings) ή processed format (booleans)
    const needsConversion = typeof loadedData.fatherIsGreek === 'boolean' ||
                           typeof loadedData.motherIsGreek === 'boolean' ||
                           typeof loadedData.bornInGreece === 'boolean';
    
    AppState.caseData = needsConversion ? convertDataForForm(loadedData) : loadedData;
    
    // Clean up derived objects - they should be recreated from flat fields
    delete AppState.caseData.ancestry;
    delete AppState.caseData.isRefugee;
    delete AppState.caseData.isStateless;
    
    AppState.currentStep = 0;
    
    closeModal();
    switchView('new-case');
    document.querySelector('[data-view="new-case"]').click();
    renderStep(0);
    
    showToast('Επεξεργασία υπόθεσης...', 'info');
}

// Μετατρέπει τα αποθηκευμένα δεδομένα σε μορφή που κατανοούν οι φόρμες
function convertDataForForm(data) {
    const booleanFields = [
        'bornInGreece', 'fatherIsGreek', 'motherIsGreek', 'schooledInGreece',
        'graduatedGreekUniversity', 'marriedToGreek', 'hasChildWithGreekSpouse',
        'recognizedByGreek', 'adoptedByGreek', 'hadGreekCitizenship',
        'paternalGrandfatherIsGreek', 'paternalGrandmotherIsGreek',
        'maternalGrandfatherIsGreek', 'maternalGrandmotherIsGreek',
        'paternalGreatGrandfatherIsGreek', 'paternalGreatGrandmotherIsGreek',
        'maternalGreatGrandfatherIsGreek', 'maternalGreatGrandmotherIsGreek',
        'fatherHasDocumentation', 'motherHasDocumentation'
    ];
    
    const convertedData = { ...data };
    
    // Μετατροπή boolean σε string
    booleanFields.forEach(field => {
        if (typeof convertedData[field] === 'boolean') {
            convertedData[field] = convertedData[field] ? 'true' : 'false';
        }
    });
    
    // Μετατροπή αριθμών σε string
    if (typeof convertedData.residenceYearsInGreece === 'number') {
        convertedData.residenceYearsInGreece = String(convertedData.residenceYearsInGreece);
    }
    if (typeof convertedData.schoolYearsInGreece === 'number') {
        convertedData.schoolYearsInGreece = String(convertedData.schoolYearsInGreece);
    }
    
    // Επεξεργασία ancestry object (αν υπάρχει) πίσω σε flat fields
    if (data.ancestry) {
        const ancestorMappings = [
            { prefix: 'paternalGrandfather', obj: data.ancestry.paternalGrandfather },
            { prefix: 'paternalGrandmother', obj: data.ancestry.paternalGrandmother },
            { prefix: 'maternalGrandfather', obj: data.ancestry.maternalGrandfather },
            { prefix: 'maternalGrandmother', obj: data.ancestry.maternalGrandmother },
            { prefix: 'paternalGreatGrandfather', obj: data.ancestry.paternalGreatGrandfather },
            { prefix: 'paternalGreatGrandmother', obj: data.ancestry.paternalGreatGrandmother },
            { prefix: 'maternalGreatGrandfather', obj: data.ancestry.maternalGreatGrandfather },
            { prefix: 'maternalGreatGrandmother', obj: data.ancestry.maternalGreatGrandmother }
        ];
        
        ancestorMappings.forEach(({ prefix, obj }) => {
            if (obj) {
                if (obj.name) convertedData[`${prefix}Name`] = obj.name;
                if (obj.birthPlace) convertedData[`${prefix}BirthPlace`] = obj.birthPlace;
                if (typeof obj.isGreek === 'boolean') {
                    convertedData[`${prefix}IsGreek`] = obj.isGreek ? 'true' : 'false';
                }
                if (obj.status) convertedData[`${prefix}Status`] = obj.status;
            }
        });
    }
    
    // Χειρισμός isRefugee/isStateless
    if (data.isRefugee === true) {
        convertedData.isRefugeeOrStateless = 'refugee';
    } else if (data.isStateless === true) {
        convertedData.isRefugeeOrStateless = 'stateless';
    } else if (convertedData.isRefugeeOrStateless === undefined) {
        convertedData.isRefugeeOrStateless = 'none';
    }
    
    return convertedData;
}

function deleteCurrentCase() {
    if (!currentModalCaseId) {
        return;
    }
    
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    
    if (caseObj) {
        // Save the case ID and name BEFORE closing the modal (which resets currentModalCaseId)
        const caseIdToDelete = currentModalCaseId;
        const caseName = `${caseObj.data.lastName} ${caseObj.data.firstName}`;
        
        closeModal();
        showDeleteConfirmation(caseIdToDelete, caseName);
    }
}

// Custom delete confirmation modal
function showDeleteConfirmation(caseId, caseName) {
    // Create modal if it doesn't exist
    let deleteModal = document.getElementById('delete-confirm-modal');
    if (!deleteModal) {
        deleteModal = document.createElement('div');
        deleteModal.id = 'delete-confirm-modal';
        deleteModal.className = 'modal';
        deleteModal.innerHTML = `
            <div class="modal-content" style="max-width: 450px;">
                <div class="modal-header" style="background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%); color: white;">
                    <h3 class="modal-title">⚠️ Επιβεβαίωση Διαγραφής</h3>
                    <button class="modal-close" id="delete-modal-close">&times;</button>
                </div>
                <div class="modal-body" style="padding: 2rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗑️</div>
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Είστε σίγουροι ότι θέλετε να διαγράψετε την υπόθεση:</p>
                    <p id="delete-case-name" style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin: 1rem 0;"></p>
                    <p style="color: var(--text-light); font-size: 0.9rem;">Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.</p>
                </div>
                <div class="modal-footer" style="display: flex; gap: 1rem; justify-content: center; padding: 1.5rem; background: var(--bg-secondary); border-top: 1px solid var(--border-color);">
                    <button id="btn-cancel-delete" class="btn btn-secondary" style="padding: 0.75rem 2rem;">
                        Ακύρωση
                    </button>
                    <button id="btn-confirm-delete" class="btn btn-primary" style="padding: 0.75rem 2rem; background: #c62828; border-color: #c62828;">
                        🗑️ Διαγραφή
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(deleteModal);
        
        // Add event listeners
        document.getElementById('delete-modal-close').addEventListener('click', closeDeleteModal);
        document.getElementById('btn-cancel-delete').addEventListener('click', closeDeleteModal);
        
        // Close on outside click
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) closeDeleteModal();
        });
    }
    
    // Set case name and ID
    document.getElementById('delete-case-name').textContent = caseName || 'Χωρίς όνομα';
    
    // Set up confirm button with the specific case ID
    const confirmBtn = document.getElementById('btn-confirm-delete');
    confirmBtn.onclick = () => {
        executeDelete(caseId);
    };
    
    // Show modal
    deleteModal.classList.add('active');
}

function closeDeleteModal() {
    const deleteModal = document.getElementById('delete-confirm-modal');
    if (deleteModal) {
        deleteModal.classList.remove('active');
    }
}

function executeDelete(caseId) {
    AppState.cases = AppState.cases.filter(c => c.id !== caseId);
    saveCases();
    closeDeleteModal();
    renderCasesList();
    showToast('Η υπόθεση διαγράφηκε επιτυχώς.', 'success');
}

function printDocuments() {
    // Add print header and footer dynamically
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    if (!caseObj) return;
    
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    // Create print header
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';
    printHeader.innerHTML = `
        <h1>🏛️ Απαιτούμενα Δικαιολογητικά - Ελληνική Ιθαγένεια</h1>
        <div class="print-subtitle">${caseObj.data.lastName} ${caseObj.data.firstName}</div>
        <div class="print-subtitle">${category ? category.name : ''}</div>
        <div class="print-date">Ημερομηνία εκτύπωσης: ${new Date().toLocaleDateString('el-GR')}</div>
    `;
    
    // Create print footer
    const printFooter = document.createElement('div');
    printFooter.className = 'print-footer';
    printFooter.innerHTML = `
        Βάσει του Ν. 3284/2004 (Κώδικας Ελληνικής Ιθαγένειας) | 
        Σημείωση: Τα αλλοδαπά έγγραφα απαιτούν επίσημη μετάφραση, επικύρωση και Apostille
    `;
    
    // Insert header at top of modal body
    const modalBody = elements.modalBody;
    modalBody.insertBefore(printHeader, modalBody.firstChild);
    modalBody.appendChild(printFooter);
    
    // Open all details elements for printing
    const detailsElements = modalBody.querySelectorAll('details');
    detailsElements.forEach(d => d.setAttribute('open', ''));
    
    window.print();
    
    // Clean up after print
    setTimeout(() => {
        printHeader.remove();
        printFooter.remove();
    }, 1000);
}

function printMissingDocuments() {
    const caseObj = AppState.cases.find(c => c.id === currentModalCaseId);
    if (!caseObj) return;
    
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    // Hide all received documents
    const allDocLis = document.querySelectorAll('.documents-list li[data-doc-id]');
    allDocLis.forEach(li => {
        const docId = li.dataset.docId;
        const docStatus = caseObj.documentStatus?.[docId];
        if (docStatus?.received) {
            li.style.display = 'none';
        }
    });
    
    // Create print header
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';
    printHeader.innerHTML = `
        <h1>🏛️ Ελλιπή Δικαιολογητικά - Ελληνική Ιθαγένεια</h1>
        <div class="print-subtitle">${caseObj.data.lastName} ${caseObj.data.firstName}</div>
        <div class="print-subtitle">${category ? category.name : ''}</div>
        <div class="print-date">Ημερομηνία εκτύπωσης: ${new Date().toLocaleDateString('el-GR')}</div>
    `;
    
    // Create print footer
    const printFooter = document.createElement('div');
    printFooter.className = 'print-footer';
    printFooter.innerHTML = `
        Βάσει του Ν. 3284/2004 (Κώδικας Ελληνικής Ιθαγένειας) | 
        Σημείωση: Τα αλλοδαπά έγγραφα απαιτούν επίσημη μετάφραση, επικύρωση και Apostille
    `;
    
    // Insert header at top of modal body
    const modalBody = elements.modalBody;
    modalBody.insertBefore(printHeader, modalBody.firstChild);
    modalBody.appendChild(printFooter);
    
    // Open all details elements for printing
    const detailsElements = modalBody.querySelectorAll('details');
    detailsElements.forEach(d => d.setAttribute('open', ''));
    
    window.print();
    
    // Clean up after print
    setTimeout(() => {
        printHeader.remove();
        printFooter.remove();
        // Restore hidden documents
        allDocLis.forEach(li => {
            li.style.display = '';
        });
    }, 1000);
}

function openMissingEmailModal() {
    currentEmailCaseId = currentModalCaseId;
    currentEmailLang = 'el';
    isShowingMissingOnly = true;
    
    // Reset tabs
    document.querySelectorAll('.email-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.email-tab[data-lang="el"]').classList.add('active');
    
    updateMissingEmailText();
    document.getElementById('email-modal').classList.add('active');
}

function updateMissingEmailText() {
    const caseObj = AppState.cases.find(c => c.id === currentEmailCaseId);
    if (!caseObj) return;
    
    let text = '';
    switch (currentEmailLang) {
        case 'el':
            text = generateGreekMissingEmailText(caseObj);
            break;
        case 'en':
            text = generateEnglishMissingEmailText(caseObj);
            break;
        case 'initial-el':
            text = generateInitialGreekEmail(caseObj);
            break;
        case 'initial-en':
            text = generateInitialEnglishEmail(caseObj);
            break;
        default:
            text = generateGreekMissingEmailText(caseObj);
    }
    
    document.getElementById('email-text-area').value = text;
}

function generateGreekMissingEmailText(caseObj) {
    const data = caseObj.data;
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    if (!category) return 'Δεν βρέθηκε κατηγορία ιθαγένειας.';
    
    const docs = window.CitizenshipLogic.getRequiredDocuments(category.id);
    const sortedDocs = sortDocumentsByImportance(docs);
    const documentStatus = caseObj.documentStatus || {};
    
    // Filter only missing documents
    const missingDocs = {};
    for (const [section, documents] of Object.entries(sortedDocs)) {
        const missing = documents.filter(doc => !documentStatus[doc.id]?.received);
        if (missing.length > 0) {
            missingDocs[section] = missing;
        }
    }
    
    let text = `ΑΙΤΗΣΗ ΕΛΛΗΝΙΚΗΣ ΙΘΑΓΕΝΕΙΑΣ - ΕΛΛΙΠΟΝΤΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ
═══════════════════════════════════════════════════════════

ΣΤΟΙΧΕΙΑ ΑΙΤΟΥΝΤΟΣ:
• Ονοματεπώνυμο: ${data.lastName || ''} ${data.firstName || ''}
• Ημ. Γέννησης: ${data.birthDate ? new Date(data.birthDate).toLocaleDateString('el-GR') : '-'}

ΚΑΤΗΓΟΡΙΑ ΙΘΑΓΕΝΕΙΑΣ:
${category.name}

═══════════════════════════════════════════════════════════
ΕΛΛΙΠΟΝΤΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (κατά σειρά προτεραιότητας)
═══════════════════════════════════════════════════════════

`;

    const sectionLabels = {
        applicant: 'Α. ΕΓΓΡΑΦΑ ΑΙΤΟΥΝΤΟΣ',
        parent: 'Β. ΕΓΓΡΑΦΑ ΓΟΝΕΑ/ΓΟΝΕΩΝ',
        spouse: 'Γ. ΕΓΓΡΑΦΑ ΣΥΖΥΓΟΥ',
        children: 'Δ. ΕΓΓΡΑΦΑ ΤΕΚΝΩΝ',
        ancestry: 'Ε. ΕΓΓΡΑΦΑ ΚΑΤΑΓΩΓΗΣ',
        general: 'ΣΤ. ΓΕΝΙΚΑ ΕΓΓΡΑΦΑ'
    };
    
    let docNumber = 1;
    let hasMissing = false;
    
    for (const [section, documents] of Object.entries(missingDocs)) {
        if (documents.length === 0) continue;
        hasMissing = true;
        
        text += `\n${sectionLabels[section] || section}\n`;
        text += '─'.repeat(50) + '\n\n';
        
        for (const doc of documents) {
            const requiredMark = doc.required ? '[ΥΠΟΧΡΕΩΤΙΚΟ]' : '[ΠΡΟΑΙΡΕΤΙΚΟ]';
            const foreignMark = doc.foreignDoc ? ' ⚠️ ΑΛΛΟΔΑΠΟ' : '';
            
            text += `${docNumber}. ${doc.name} ${requiredMark}${foreignMark}\n`;
            
            if (doc.alternatives && doc.alternatives.length > 0) {
                text += `   Εναλλακτικά (αν δεν είναι διαθέσιμο):\n`;
                doc.alternatives.forEach((alt, i) => {
                    text += `      ${i + 1}) ${alt}\n`;
                });
            }
            text += '\n';
            docNumber++;
        }
    }
    
    if (!hasMissing) {
        text += '\n✅ Όλα τα απαιτούμενα δικαιολογητικά έχουν παραληφθεί!\n\n';
    }
    
    text += `
═══════════════════════════════════════════════════════════
ΣΗΜΑΝΤΙΚΕΣ ΟΔΗΓΙΕΣ
═══════════════════════════════════════════════════════════

⚠️ ΑΛΛΟΔΑΠΑ ΕΓΓΡΑΦΑ:
Όλα τα έγγραφα που εκδίδονται από αλλοδαπές αρχές πρέπει να:
1. Είναι επίσημα μεταφρασμένα στην ελληνική γλώσσα
2. Φέρουν επικύρωση (notarization) από αρμόδια αρχή
3. Φέρουν σφραγίδα Apostille (Σύμβαση Χάγης 1961)

Παρακαλούμε αποστείλετε τα ελλιπόντα δικαιολογητικά το συντομότερο δυνατό.

Ευχαριστούμε,
[Υπογραφή]

───────────────────────────────────────────────────────────
Ημερομηνία: ${new Date().toLocaleDateString('el-GR')}
Αρ. Υπόθεσης: ${caseObj.id}
`;

    return text;
}

function generateEnglishMissingEmailText(caseObj) {
    const data = caseObj.data;
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    if (!category) return 'Citizenship category not found.';
    
    const docs = window.CitizenshipLogic.getRequiredDocuments(category.id);
    const sortedDocs = sortDocumentsByImportance(docs);
    const documentStatus = caseObj.documentStatus || {};
    
    // Filter only missing documents
    const missingDocs = {};
    for (const [section, documents] of Object.entries(sortedDocs)) {
        const missing = documents.filter(doc => !documentStatus[doc.id]?.received);
        if (missing.length > 0) {
            missingDocs[section] = missing;
        }
    }
    
    let text = `GREEK CITIZENSHIP APPLICATION - MISSING DOCUMENTS
═══════════════════════════════════════════════════════════

APPLICANT INFORMATION:
• Full Name: ${data.lastName || ''} ${data.firstName || ''}
• Date of Birth: ${data.birthDate ? new Date(data.birthDate).toLocaleDateString('en-US') : '-'}

CITIZENSHIP CATEGORY:
${category.name}

═══════════════════════════════════════════════════════════
MISSING DOCUMENTS (in order of priority)
═══════════════════════════════════════════════════════════

`;

    const sectionLabels = {
        applicant: 'A. APPLICANT DOCUMENTS',
        parent: 'B. PARENT DOCUMENTS',
        spouse: 'C. SPOUSE DOCUMENTS',
        children: 'D. CHILDREN DOCUMENTS',
        ancestry: 'E. ANCESTRY DOCUMENTS',
        general: 'F. GENERAL DOCUMENTS'
    };
    
    let docNumber = 1;
    let hasMissing = false;
    
    for (const [section, documents] of Object.entries(missingDocs)) {
        if (documents.length === 0) continue;
        hasMissing = true;
        
        text += `\n${sectionLabels[section] || section}\n`;
        text += '─'.repeat(50) + '\n\n';
        
        for (const doc of documents) {
            const requiredMark = doc.required ? '[REQUIRED]' : '[OPTIONAL]';
            const foreignMark = doc.foreignDoc ? ' ⚠️ FOREIGN' : '';
            
            text += `${docNumber}. ${doc.name} ${requiredMark}${foreignMark}\n`;
            
            if (doc.alternatives && doc.alternatives.length > 0) {
                text += `   Alternatives (if not available):\n`;
                doc.alternatives.forEach((alt, i) => {
                    text += `      ${i + 1}) ${alt}\n`;
                });
            }
            text += '\n';
            docNumber++;
        }
    }
    
    if (!hasMissing) {
        text += '\n✅ All required documents have been received!\n\n';
    }
    
    text += `
═══════════════════════════════════════════════════════════
IMPORTANT INSTRUCTIONS
═══════════════════════════════════════════════════════════

⚠️ FOREIGN DOCUMENTS:
All documents issued by foreign authorities must:
1. Be officially translated into Greek
2. Be notarized by the competent authority
3. Bear an Apostille stamp (Hague Convention 1961)

Please send the missing documents as soon as possible.

Thank you,
[Signature]

───────────────────────────────────────────────────────────
Date: ${new Date().toLocaleDateString('en-US')}
Case Reference: ${caseObj.id}
`;

    return text;
}

// Email Text Generation
let currentEmailLang = 'el';
let currentEmailCaseId = null;
let isShowingMissingOnly = false;

function initEmailModal() {
    const emailModal = document.getElementById('email-modal');
    const emailModalClose = document.getElementById('email-modal-close');
    const btnCloseEmail = document.getElementById('btn-close-email');
    const btnCopyEmail = document.getElementById('btn-copy-email');
    const btnEmailText = document.getElementById('btn-email-text');
    const emailTabs = document.querySelectorAll('.email-tab');
    
    btnEmailText.addEventListener('click', openEmailModal);
    emailModalClose.addEventListener('click', closeEmailModal);
    btnCloseEmail.addEventListener('click', closeEmailModal);
    btnCopyEmail.addEventListener('click', copyEmailText);
    
    emailModal.addEventListener('click', (e) => {
        if (e.target === emailModal) closeEmailModal();
    });
    
    emailTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            emailTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentEmailLang = tab.dataset.lang;
            if (isShowingMissingOnly) {
                updateMissingEmailText();
            } else {
                updateEmailText();
            }
        });
    });
}

function openEmailModal() {
    currentEmailCaseId = currentModalCaseId;
    currentEmailLang = 'el';
    isShowingMissingOnly = false;
    
    // Reset tabs
    document.querySelectorAll('.email-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.email-tab[data-lang="el"]').classList.add('active');
    
    updateEmailText();
    document.getElementById('email-modal').classList.add('active');
}

function closeEmailModal() {
    document.getElementById('email-modal').classList.remove('active');
    document.getElementById('copy-success').style.display = 'none';
}

function updateEmailText() {
    const caseObj = AppState.cases.find(c => c.id === currentEmailCaseId);
    if (!caseObj) return;
    
    let text = '';
    switch (currentEmailLang) {
        case 'el':
            text = generateGreekEmailText(caseObj);
            break;
        case 'en':
            text = generateEnglishEmailText(caseObj);
            break;
        case 'initial-el':
            text = generateInitialGreekEmail(caseObj);
            break;
        case 'initial-en':
            text = generateInitialEnglishEmail(caseObj);
            break;
        default:
            text = generateGreekEmailText(caseObj);
    }
    
    document.getElementById('email-text-area').value = text;
}

function generateGreekEmailText(caseObj) {
    const data = caseObj.data;
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    if (!category) return 'Δεν βρέθηκε κατηγορία ιθαγένειας.';
    
    const docs = window.CitizenshipLogic.getRequiredDocuments(category.id);
    const sortedDocs = sortDocumentsByImportance(docs);
    
    // Cost info
    const costInfo = category.cost ? 
        `${category.cost.min}${category.cost.max !== category.cost.min ? '-' + category.cost.max : ''}${category.cost.currency}` : 
        'Δεν προσδιορίζεται';
    const timeInfo = category.estimatedTime || 'Δεν προσδιορίζεται';
    
    let text = `ΑΙΤΗΣΗ ΕΛΛΗΝΙΚΗΣ ΙΘΑΓΕΝΕΙΑΣ - ΑΠΑΙΤΟΥΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ
═══════════════════════════════════════════════════════════

ΣΤΟΙΧΕΙΑ ΑΙΤΟΥΝΤΟΣ:
• Ονοματεπώνυμο: ${data.lastName || ''} ${data.firstName || ''}
• Ημ. Γέννησης: ${data.birthDate ? new Date(data.birthDate).toLocaleDateString('el-GR') : '-'}
• Τόπος Γέννησης: ${data.birthPlace || '-'}
• Τρέχουσα Ιθαγένεια: ${data.currentCitizenship || '-'}

ΚΑΤΗΓΟΡΙΑ ΙΘΑΓΕΝΕΙΑΣ:
${category.name}

ΕΚΤΙΜΩΜΕΝΟ ΚΟΣΤΟΣ: ${costInfo}
ΕΚΤΙΜΩΜΕΝΟΣ ΧΡΟΝΟΣ: ${timeInfo}

═══════════════════════════════════════════════════════════
ΑΠΑΙΤΟΥΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (κατά σειρά προτεραιότητας)
═══════════════════════════════════════════════════════════

`;

    const sectionLabels = {
        applicant: 'Α. ΕΓΓΡΑΦΑ ΑΙΤΟΥΝΤΟΣ',
        parent: 'Β. ΕΓΓΡΑΦΑ ΓΟΝΕΑ/ΓΟΝΕΩΝ',
        spouse: 'Γ. ΕΓΓΡΑΦΑ ΣΥΖΥΓΟΥ',
        children: 'Δ. ΕΓΓΡΑΦΑ ΤΕΚΝΩΝ',
        ancestry: 'Ε. ΕΓΓΡΑΦΑ ΚΑΤΑΓΩΓΗΣ',
        general: 'ΣΤ. ΓΕΝΙΚΑ ΕΓΓΡΑΦΑ'
    };
    
    let docNumber = 1;
    
    for (const [section, documents] of Object.entries(sortedDocs)) {
        if (documents.length === 0) continue;
        
        text += `\n${sectionLabels[section] || section}\n`;
        text += '─'.repeat(50) + '\n\n';
        
        for (const doc of documents) {
            const requiredMark = doc.required ? '[ΥΠΟΧΡΕΩΤΙΚΟ]' : '[ΠΡΟΑΙΡΕΤΙΚΟ]';
            const foreignMark = doc.foreignDoc ? ' ⚠️ ΑΛΛΟΔΑΠΟ' : '';
            
            text += `${docNumber}. ${doc.name} ${requiredMark}${foreignMark}\n`;
            
            if (doc.alternatives && doc.alternatives.length > 0) {
                text += `   Εναλλακτικά (αν δεν είναι διαθέσιμο):\n`;
                doc.alternatives.forEach((alt, i) => {
                    text += `      ${i + 1}) ${alt}\n`;
                });
            }
            text += '\n';
            docNumber++;
        }
    }
    
    text += `
═══════════════════════════════════════════════════════════
ΣΗΜΑΝΤΙΚΕΣ ΟΔΗΓΙΕΣ
═══════════════════════════════════════════════════════════

⚠️ ΑΛΛΟΔΑΠΑ ΕΓΓΡΑΦΑ:
Όλα τα έγγραφα που εκδίδονται από αλλοδαπές αρχές πρέπει να:
1. Είναι επίσημα μεταφρασμένα στην ελληνική γλώσσα
   (από Υπ. Εξωτερικών ή πιστοποιημένο μεταφραστή)
2. Φέρουν επικύρωση (notarization) από αρμόδια αρχή
3. Φέρουν σφραγίδα Apostille (Σύμβαση Χάγης 1961)
   ή προξενική θεώρηση για χώρες εκτός Σύμβασης

═══════════════════════════════════════════════════════════
Ημερομηνία: ${new Date().toLocaleDateString('el-GR')}
Πηγή: ${category.source || 'Ν. 3284/2004'}
`;

    return text;
}

function generateEnglishEmailText(caseObj) {
    const data = caseObj.data;
    const category = caseObj.allCategories && caseObj.allCategories[0] ? 
        caseObj.allCategories[0].category : null;
    
    if (!category) return 'No citizenship category found.';
    
    const docs = window.CitizenshipLogic.getRequiredDocuments(category.id);
    const sortedDocs = sortDocumentsByImportance(docs);
    
    // Category name translations
    const categoryTranslations = {
        'birth_greek_parent': 'Automatic by Birth - Child of Greek Parent',
        'birth_greek_father_pre1982': 'Declaration - Child of Greek Father (born before 18.7.1982)',
        'birth_greek_mother_pre1984': 'Declaration - Child of Greek Mother (born before 8.5.1984)',
        'birth_in_greece': 'Automatic - Born in Greece',
        'birth_declaratory': 'Declaratory Decision - Birth to Greek Parent',
        'declaration_birth_schooling': 'Declaration - Born & Schooled in Greece',
        'declaration_schooling': 'Declaration - Schooled in Greece',
        'declaration_university': 'Declaration - Greek University Graduate',
        'recognition': 'Recognition by Greek Citizen',
        'adoption': 'Adoption by Greek Citizen',
        'naturalization_general': 'Naturalization - General (7 years residence)',
        'naturalization_omogeneis': 'Naturalization - Ethnic Greeks (Omogeneis)',
        'naturalization_spouse': 'Naturalization - Spouse of Greek Citizen',
        'naturalization_refugee': 'Naturalization - Refugee/Stateless',
        'reacquisition': 'Reacquisition of Citizenship',
        'honorary': 'Honorary Naturalization'
    };
    
    // Document name translations
    const docTranslations = {
        'birth_cert': 'Birth Certificate of Applicant',
        'passport': 'Passport of Applicant',
        'photo': 'Passport Photos',
        'parent_citizenship': 'Greek Citizenship Certificate of Parent',
        'parent_birth_cert': 'Birth Certificate of Greek Parent',
        'parent_passport': 'Passport/ID of Greek Parent',
        'family_status': 'Family Status Certificate',
        'marriage_cert': 'Marriage Certificate of Parents',
        'application_form': 'Application Form',
        'criminal_record': 'Criminal Record Certificate (Country of Origin)',
        'criminal_record_gr': 'Criminal Record Certificate (Greece)',
        'criminal_record_origin': 'Criminal Record Certificate (Country of Origin)',
        'residence_permit': 'Residence Permit',
        'tax_clearance': 'Tax Clearance Certificate',
        'ancestor_birth': 'Birth Certificate of Greek Ancestor',
        'ancestor_citizenship': 'Proof of Greek Origin of Ancestor',
        'lineage_docs': 'Documents Proving Lineage',
        'family_tree': 'Family Tree with Certificates',
        'language_cert': 'Greek Language Certificate (B1 Level)',
        'history_cert': 'Greek History/Culture Knowledge Certificate',
        'fee_receipt': 'Application Fee Receipt',
        'social_security': 'Social Security Certificate',
        'integration_proof': 'Proof of Social Integration',
        'spouse_citizenship': 'Citizenship Certificate of Greek Spouse',
        'spouse_id': 'ID/Passport of Greek Spouse',
        'children_birth': 'Birth Certificates of Children',
        'school_enrollment': 'School Enrollment Certificate (1st Grade)',
        'school_attendance': 'Current School Attendance Certificate',
        'school_certs': 'School Certificates (6 years)',
        'parent_residence': 'Residence Permit of Parent',
        'recognition_act': 'Recognition Act/Decree',
        'adoption_decree': 'Adoption Court Decree',
        'loss_proof': 'Proof of Citizenship Loss',
        'previous_citizenship': 'Previous Citizenship Certificate'
    };
    
    // Cost info
    const costInfo = category.cost ? 
        `${category.cost.min}${category.cost.max !== category.cost.min ? '-' + category.cost.max : ''}${category.cost.currency}` : 
        'Not specified';
    const timeInfo = category.estimatedTime || 'Not specified';
    
    let text = `GREEK CITIZENSHIP APPLICATION - REQUIRED DOCUMENTS
═══════════════════════════════════════════════════════════

APPLICANT INFORMATION:
• Full Name: ${data.lastName || ''} ${data.firstName || ''}
• Date of Birth: ${data.birthDate ? new Date(data.birthDate).toLocaleDateString('en-US') : '-'}
• Place of Birth: ${data.birthPlace || '-'}
• Current Citizenship: ${data.currentCitizenship || '-'}

CITIZENSHIP CATEGORY:
${categoryTranslations[category.id] || category.name}

ESTIMATED COST: ${costInfo}
ESTIMATED TIME: ${timeInfo}

═══════════════════════════════════════════════════════════
REQUIRED DOCUMENTS (in order of priority)
═══════════════════════════════════════════════════════════

`;

    const sectionLabelsEn = {
        applicant: 'A. APPLICANT DOCUMENTS',
        parent: 'B. PARENT DOCUMENTS',
        spouse: 'C. SPOUSE DOCUMENTS',
        children: 'D. CHILDREN DOCUMENTS',
        ancestry: 'E. ANCESTRY DOCUMENTS',
        general: 'F. GENERAL DOCUMENTS'
    };
    
    let docNumber = 1;
    
    for (const [section, documents] of Object.entries(sortedDocs)) {
        if (documents.length === 0) continue;
        
        text += `\n${sectionLabelsEn[section] || section}\n`;
        text += '─'.repeat(50) + '\n\n';
        
        for (const doc of documents) {
            const requiredMark = doc.required ? '[REQUIRED]' : '[OPTIONAL]';
            const foreignMark = doc.foreignDoc ? ' ⚠️ FOREIGN' : '';
            const docName = docTranslations[doc.id] || doc.name;
            
            text += `${docNumber}. ${docName} ${requiredMark}${foreignMark}\n`;
            text += `   Original name (Greek): ${doc.name}\n`;
            
            if (doc.alternatives && doc.alternatives.length > 0) {
                text += `   Alternatives (if unavailable):\n`;
                doc.alternatives.slice(0, 3).forEach((alt, i) => {
                    text += `      ${i + 1}) ${alt}\n`;
                });
                if (doc.alternatives.length > 3) {
                    text += `      (+ ${doc.alternatives.length - 3} more alternatives)\n`;
                }
            }
            text += '\n';
            docNumber++;
        }
    }
    
    text += `
═══════════════════════════════════════════════════════════
IMPORTANT INSTRUCTIONS
═══════════════════════════════════════════════════════════

⚠️ FOREIGN DOCUMENTS:
All documents issued by foreign authorities must:
1. Be officially translated into Greek
   (by Ministry of Foreign Affairs or certified translator)
2. Be notarized by the competent authority
3. Bear an Apostille stamp (Hague Convention 1961)
   or consular legalization for non-Convention countries

═══════════════════════════════════════════════════════════
Date: ${new Date().toLocaleDateString('en-US')}
Source: ${category.source || 'Law 3284/2004'}
`;

    return text;
}

function generateInitialGreekEmail(caseObj) {
    const data = caseObj.data;
    
    return `Αγαπητέ/ή ${data.firstName || '[Όνομα]'} ${data.lastName || '[Επώνυμο]'},

Σας ευχαριστούμε για το ενδιαφέρον σας για την απόκτηση της Ελληνικής Ιθαγένειας.

Για να ξεκινήσουμε την εξέταση της υπόθεσής σας, παρακαλούμε να μας αποστείλετε τα παρακάτω ΒΑΣΙΚΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ:

═══════════════════════════════════════════════════════════
ΒΑΣΙΚΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Αρχική Υποβολή)
═══════════════════════════════════════════════════════════

ΓΙΑ ΤΟΝ ΑΙΤΟΥΝΤΑ:
□ 1. Πιστοποιητικό γέννησης (Birth Certificate)
□ 2. Αντίγραφο διαβατηρίου ή ταυτότητας σε ισχύ
□ 3. Δύο (2) πρόσφατες φωτογραφίες τύπου διαβατηρίου

ΓΙΑ ΤΟΥΣ ΓΟΝΕΙΣ:
□ 4. Πιστοποιητικό γέννησης πατέρα
□ 5. Πιστοποιητικό γέννησης μητέρας
□ 6. Πιστοποιητικό γάμου γονέων (αν υπάρχει)
□ 7. Πιστοποιητικό οικογενειακής κατάστασης

ΓΙΑ ΤΟΝ ΕΛΛΗΝΑ ΓΟΝΕΑ Ή ΠΡΟΓΟΝΟ (αν υπάρχει):
□ 8. Αποδεικτικό ελληνικής ιθαγένειας (ένα από τα παρακάτω):
     - Ελληνικό διαβατήριο ή ταυτότητα
     - Πιστοποιητικό εγγραφής σε Δημοτολόγιο
     - Πιστοποιητικό Μητρώου Αρρένων
     - Πιστοποιητικό ιθαγένειας

═══════════════════════════════════════════════════════════
ΣΗΜΑΝΤΙΚΕΣ ΟΔΗΓΙΕΣ
═══════════════════════════════════════════════════════════

⚠️ ΑΛΛΟΔΑΠΑ ΕΓΓΡΑΦΑ:
Όλα τα έγγραφα που εκδίδονται από αλλοδαπές αρχές πρέπει να:
• Είναι επίσημα μεταφρασμένα στα Ελληνικά
• Φέρουν επικύρωση (notarization)
• Φέρουν σφραγίδα Apostille (Σύμβαση Χάγης 1961)

📋 ΕΠΟΜΕΝΑ ΒΗΜΑΤΑ:
Μόλις λάβουμε και εξετάσουμε τα παραπάνω έγγραφα, θα σας 
ενημερώσουμε για:
• Την κατηγορία ιθαγένειας στην οποία εμπίπτετε
• Τα επιπλέον δικαιολογητικά που απαιτούνται
• Το εκτιμώμενο κόστος και χρόνο διεκπεραίωσης

═══════════════════════════════════════════════════════════

Παρακαλούμε αποστείλετε τα έγγραφα ψηφιακά (scan/φωτογραφίες) 
για αρχική αξιολόγηση. Θα χρειαστούμε τα πρωτότυπα ή επικυρωμένα 
αντίγραφα σε μεταγενέστερο στάδιο.

Για οποιαδήποτε απορία, μη διστάσετε να επικοινωνήσετε μαζί μας.

Με εκτίμηση,
[Υπογραφή]

───────────────────────────────────────────────────────────
Ημερομηνία: ${new Date().toLocaleDateString('el-GR')}
Αρ. Υπόθεσης: ${caseObj.id}
`;
}

function generateInitialEnglishEmail(caseObj) {
    const data = caseObj.data;
    
    return `Dear ${data.firstName || '[First Name]'} ${data.lastName || '[Last Name]'},

Thank you for your interest in obtaining Greek Citizenship.

To begin processing your case, please send us the following BASIC DOCUMENTS:

═══════════════════════════════════════════════════════════
BASIC DOCUMENTS (Initial Submission)
═══════════════════════════════════════════════════════════

FOR THE APPLICANT:
□ 1. Birth Certificate
□ 2. Copy of valid passport or ID
□ 3. Two (2) recent passport-size photographs

FOR PARENTS:
□ 4. Father's birth certificate
□ 5. Mother's birth certificate
□ 6. Parents' marriage certificate (if applicable)
□ 7. Family status certificate

FOR THE GREEK PARENT OR ANCESTOR (if applicable):
□ 8. Proof of Greek citizenship (one of the following):
     - Greek passport or ID card
     - Municipal Registry Certificate (Dimotologio)
     - Male Registry Certificate (Mitroo Arrenon)
     - Citizenship Certificate

═══════════════════════════════════════════════════════════
IMPORTANT INSTRUCTIONS
═══════════════════════════════════════════════════════════

⚠️ FOREIGN DOCUMENTS:
All documents issued by foreign authorities must:
• Be officially translated into Greek
• Be notarized by the competent authority
• Bear an Apostille stamp (Hague Convention 1961)

📋 NEXT STEPS:
Once we receive and review the above documents, we will inform 
you about:
• The citizenship category applicable to your case
• Additional documents required
• Estimated cost and processing time

═══════════════════════════════════════════════════════════

Please send the documents digitally (scans/photos) for initial 
assessment. We will need the originals or certified copies at 
a later stage.

If you have any questions, please do not hesitate to contact us.

Best regards,
[Signature]

───────────────────────────────────────────────────────────
Date: ${new Date().toLocaleDateString('en-US')}
Case Reference: ${caseObj.id}
`;
}

function sortDocumentsByImportance(docs) {
    const sorted = {};
    const sectionOrder = ['applicant', 'parent', 'ancestry', 'spouse', 'children', 'general'];
    
    for (const section of sectionOrder) {
        if (docs[section]) {
            // Sort: required first, then by name
            sorted[section] = [...docs[section]].sort((a, b) => {
                if (a.required && !b.required) return -1;
                if (!a.required && b.required) return 1;
                return 0;
            });
        }
    }
    
    return sorted;
}

function copyEmailText() {
    const textArea = document.getElementById('email-text-area');
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile
    
    navigator.clipboard.writeText(textArea.value).then(() => {
        const successMsg = document.getElementById('copy-success');
        successMsg.style.display = 'flex';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        document.execCommand('copy');
        const successMsg = document.getElementById('copy-success');
        successMsg.style.display = 'flex';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 2000);
    });
}

// Search
function initSearch() {
    elements.searchCases.addEventListener('input', (e) => {
        renderCasesList(e.target.value);
    });
}

// Utilities
function resetWizard() {
    AppState.currentStep = 0;
    AppState.caseData = {};
    AppState.editingCaseId = null;
    renderStep(0);
}

function generateId() {
    return 'case_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date in Greek format (DD/MM/YYYY)
 * Handles ISO format (YYYY-MM-DD) without timezone issues
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string
 */
function formatGreekDate(dateInput) {
    if (!dateInput) return '';
    
    // If already in DD/MM/YYYY format, return as is
    if (typeof dateInput === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateInput)) {
        return dateInput;
    }
    
    // If in ISO format (YYYY-MM-DD), parse directly without Date object to avoid timezone issues
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateInput)) {
        const [year, month, day] = dateInput.split('-');
        return `${day}/${month}/${year}`;
    }
    
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return '';
        
        // Use UTC methods to avoid timezone shifts
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${day}/${month}/${year}`;
    } catch (e) {
        return '';
    }
}

/**
 * Parse Greek date format (DD/MM/YYYY) to ISO format for storage
 * Returns simple YYYY-MM-DD string without time component to avoid timezone issues
 * @param {string} greekDate - Date in DD/MM/YYYY format
 * @returns {string} ISO date string or original if invalid
 */
function parseGreekDate(greekDate) {
    if (!greekDate) return '';
    
    // If already in ISO format, return just the date part
    if (/^\d{4}-\d{2}-\d{2}/.test(greekDate)) {
        return greekDate.substring(0, 10);
    }
    
    const match = greekDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) {
        const [, day, month, year] = match;
        // Return simple YYYY-MM-DD format, no time component
        return `${year}-${month}-${day}`;
    }
    
    return greekDate;
}

/**
 * Initialize Greek date input formatting
 */
function initGreekDateInputs() {
    document.querySelectorAll('.greek-date-input').forEach(input => {
        // Auto-format as user types
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length > 8) {
                value = value.substring(0, 8);
            }
            
            // Format: DD/MM/YYYY
            if (value.length >= 4) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4);
            } else if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            this.value = value;
        });
        
        // Validate on blur
        input.addEventListener('blur', function(e) {
            const value = this.value;
            if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                this.classList.add('input-error');
                this.title = 'Μη έγκυρη ημερομηνία. Χρησιμοποιήστε: ΗΗ/ΜΜ/ΕΕΕΕ';
            } else {
                this.classList.remove('input-error');
                this.title = '';
                
                // Validate the actual date
                if (value) {
                    const [day, month, year] = value.split('/').map(Number);
                    const date = new Date(year, month - 1, day);
                    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
                        this.classList.add('input-error');
                        this.title = 'Μη έγκυρη ημερομηνία';
                    }
                }
            }
        });
    });
}

// Make it globally accessible
window.initGreekDateInputs = initGreekDateInputs;

// ============================================
// LAW REFERENCE MODAL
// ============================================

function showLawReference(articleRef) {
    const modal = document.getElementById('law-modal');
    const title = document.getElementById('law-modal-title');
    const body = document.getElementById('law-modal-body');
    
    if (!modal || !title || !body) {
        console.error('Law modal elements not found');
        return;
    }
    
    // Try to find the law text
    const article = window.findLawText ? window.findLawText(articleRef) : null;
    const paragraph = window.findParagraph ? window.findParagraph(articleRef) : null;
    
    title.textContent = articleRef;
    
    if (article) {
        let html = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${article.title}</h3>
                ${article.lastAmended ? `<p style="font-size: 0.85rem; color: var(--text-light);">Τελευταία τροποποίηση: ${article.lastAmended}</p>` : ''}
            </div>
        `;
        
        if (article.paragraphs) {
            html += '<div class="law-paragraphs">';
            for (const [key, para] of Object.entries(article.paragraphs)) {
                const isTarget = articleRef.includes(`παρ. ${key}`) || articleRef.includes(`παρ.${key}`);
                html += `
                    <div class="law-paragraph ${isTarget ? 'highlighted' : ''}" style="margin-bottom: 1.5rem; padding: 1rem; background: ${isTarget ? 'rgba(26, 68, 128, 0.1)' : '#f8f9fa'}; border-radius: var(--radius-sm); ${isTarget ? 'border-left: 4px solid var(--primary-color);' : ''}">
                        <div style="font-family: 'Georgia', serif; line-height: 1.7; color: var(--text-primary);">
                            ${para.text}
                        </div>
                        ${para.notes ? `
                        <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #dee2e6;">
                            <span style="font-size: 0.8rem; color: var(--text-light);">
                                📝 <em>${para.notes}</em>
                            </span>
                        </div>
                        ` : ''}
                        ${para.requirements && para.requirements.length > 0 ? `
                        <div style="margin-top: 0.75rem;">
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Απαιτούμενα:</span>
                            <ul style="margin: 0.25rem 0 0 1rem; font-size: 0.85rem; color: var(--text-secondary);">
                                ${para.requirements.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        ${para.verified ? `
                        <div style="margin-top: 0.5rem;">
                            <span style="font-size: 0.75rem; color: var(--success-color);">✓ Επαληθευμένο</span>
                        </div>
                        ` : `
                        <div style="margin-top: 0.5rem;">
                            <span style="font-size: 0.75rem; color: var(--warning-color);">⚠ Προς επαλήθευση</span>
                        </div>
                        `}
                    </div>
                `;
            }
            html += '</div>';
        }
        
        body.innerHTML = html;
    } else {
        // Article not found in database
        body.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <span style="font-size: 3rem;">📜</span>
                <h3 style="margin: 1rem 0; color: var(--text-secondary);">${articleRef}</h3>
                <p style="color: var(--text-light);">
                    Το πλήρες κείμενο αυτού του άρθρου δεν είναι ακόμα διαθέσιμο στη βάση δεδομένων.
                </p>
                <div style="margin-top: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: var(--radius-sm);">
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">
                        <strong>Πηγές για αναζήτηση:</strong><br>
                        • <a href="https://www.kodiko.gr" target="_blank" style="color: var(--primary-color);">kodiko.gr</a><br>
                        • <a href="https://www.et.gr" target="_blank" style="color: var(--primary-color);">Εφημερίδα της Κυβέρνησης (et.gr)</a><br>
                        • <a href="https://www.mitos.gov.gr" target="_blank" style="color: var(--primary-color);">mitos.gov.gr</a>
                    </p>
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
    modal.classList.add('active');
}

function closeLawModal() {
    const modal = document.getElementById('law-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

// Make functions globally accessible for onclick handlers
window.showLawReference = showLawReference;
window.closeLawModal = closeLawModal;

// Event delegation for law reference links
document.addEventListener('click', function(e) {
    const lawRefLink = e.target.closest('.law-ref-link');
    if (lawRefLink) {
        e.preventDefault();
        e.stopPropagation();
        const articleRef = lawRefLink.dataset.lawRef;
        if (articleRef) {
            showLawReference(articleRef);
        }
    }
});

// ============================================
// DEATH FIELDS TOGGLE
// ============================================

function toggleDeathFields(person, show) {
    console.log(`toggleDeathFields(${person}, ${show})`);
    const fieldsDiv = document.getElementById(`${person}DeathFields`);
    console.log(`  fieldsDiv found:`, fieldsDiv ? 'yes' : 'no');
    if (fieldsDiv) {
        fieldsDiv.style.display = show ? 'block' : 'none';
        console.log(`  Set display to:`, fieldsDiv.style.display);
        // Clear values when hiding
        if (!show) {
            const dateInput = fieldsDiv.querySelector(`input[name="${person}DeathDate"]`);
            const placeInput = fieldsDiv.querySelector(`input[name="${person}DeathPlace"]`);
            if (dateInput) dateInput.value = '';
            if (placeInput) placeInput.value = '';
        }
    }
}

// Toggle divorce details fields
function toggleDivorceFields(show) {
    const fieldsDiv = document.getElementById('divorceDetailsFields');
    if (fieldsDiv) {
        fieldsDiv.style.display = show ? 'block' : 'none';
    }
}
window.toggleDivorceFields = toggleDivorceFields;

// Toggle previous marriages info
function togglePreviousMarriagesInfo(show) {
    const infoDiv = document.getElementById('previousMarriagesInfo');
    if (infoDiv) {
        infoDiv.style.display = show ? 'block' : 'none';
    }
}
window.togglePreviousMarriagesInfo = togglePreviousMarriagesInfo;

// Toggle name change fields (for parent)
function toggleNameChangeFields(show) {
    const fieldsDiv = document.getElementById('nameChangeFields');
    if (fieldsDiv) {
        fieldsDiv.style.display = show ? 'block' : 'none';
    }
}
window.toggleNameChangeFields = toggleNameChangeFields;

// Toggle ancestor name change fields (for grandparents)
function toggleAncestorNameChangeFields(show) {
    const fieldsDiv = document.getElementById('ancestorNameChangeFields');
    if (fieldsDiv) {
        fieldsDiv.style.display = show ? 'block' : 'none';
    }
}
window.toggleAncestorNameChangeFields = toggleAncestorNameChangeFields;

function toggleGrandparentDeathFields(grandparent, show) {
    const fieldsDiv = document.getElementById(`${grandparent}DeathFields`);
    if (fieldsDiv) {
        fieldsDiv.style.display = show ? 'block' : 'none';
        // Clear values when hiding
        if (!show) {
            const dateInput = fieldsDiv.querySelector(`input[name="${grandparent}DeathDate"]`);
            const placeInput = fieldsDiv.querySelector(`input[name="${grandparent}DeathPlace"]`);
            if (dateInput) dateInput.value = '';
            if (placeInput) placeInput.value = '';
        }
    }
}

// Note: initializeDeathFieldsVisibility has been replaced by initializeConditionalFields
// which uses data values directly instead of relying on :checked selectors

// Make death field toggle functions globally accessible for onclick/onchange handlers
window.toggleDeathFields = toggleDeathFields;
window.toggleGrandparentDeathFields = toggleGrandparentDeathFields;

// Close law modal on outside click
document.addEventListener('click', function(e) {
    const lawModal = document.getElementById('law-modal');
    if (e.target === lawModal) {
        closeLawModal();
    }
});

// Close law modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLawModal();
    }
});

// ============================================
// INFO VIEW - TABS AND LAW TEXTS
// ============================================

function initInfoTabs() {
    const tabs = document.querySelectorAll('.info-tab');
    const tabContents = document.querySelectorAll('.info-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active');
                }
            });
            
            // Initialize content if needed
            if (targetTab === 'law-texts') {
                renderLawArticlesList();
            } else if (targetTab === 'fees') {
                renderFeesList();
            }
        });
    });
    
    // Setup search
    const searchInput = document.getElementById('law-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            renderLawArticlesList(this.value);
        }, 300));
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function renderLawArticlesList(searchQuery = '') {
    const container = document.getElementById('law-articles-list');
    if (!container || !window.LawTexts) return;
    
    const query = searchQuery.toLowerCase().trim();
    let html = '';
    let hasResults = false;
    
    // Group articles by chapter
    const chapters = {};
    
    for (const [key, article] of Object.entries(window.LawTexts)) {
        const chapter = article.chapter || 'Άλλα';
        if (!chapters[chapter]) {
            chapters[chapter] = [];
        }
        chapters[chapter].push({ key, ...article });
    }
    
    for (const [chapter, articles] of Object.entries(chapters)) {
        let chapterHasResults = false;
        let articlesHtml = '';
        
        for (const article of articles) {
            // Check if article matches search
            if (query) {
                const searchText = `${article.title} ${JSON.stringify(article.paragraphs)}`.toLowerCase();
                if (!searchText.includes(query)) {
                    continue;
                }
            }
            
            hasResults = true;
            chapterHasResults = true;
            
            // Render article
            articlesHtml += renderLawArticleCard(article);
        }
        
        if (chapterHasResults) {
            html += `
                <div class="law-chapter">
                    <h3 style="color: var(--primary-dark); margin: 1.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-color);">
                        📖 ${chapter}
                    </h3>
                    ${articlesHtml}
                </div>
            `;
        }
    }
    
    if (!hasResults) {
        html = `
            <div class="no-results-message">
                <span>🔍</span>
                <p>Δεν βρέθηκαν αποτελέσματα για "<strong>${searchQuery}</strong>"</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Δοκιμάστε διαφορετικούς όρους αναζήτησης</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Add click handlers for expand/collapse
    container.querySelectorAll('.law-article-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.law-article-card');
            card.classList.toggle('expanded');
        });
    });
}

function renderLawArticleCard(article) {
    let paragraphsHtml = '';
    
    if (article.paragraphs) {
        for (const [key, para] of Object.entries(article.paragraphs)) {
            const paraTitle = key === 'exceptions' ? 'Εξαιρέσεις' : `Παράγραφος ${key}`;
            
            paragraphsHtml += `
                <div class="law-paragraph">
                    <div style="font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem; font-size: 0.9rem;">
                        ${paraTitle}
                    </div>
                    <div class="law-paragraph-text">${para.text}</div>
                    ${para.notes ? `<div class="law-paragraph-notes">📝 ${para.notes}</div>` : ''}
                    ${para.requirements && para.requirements.length > 0 ? `
                        <div class="law-paragraph-requirements">
                            <h5>📋 Απαιτούμενα έγγραφα:</h5>
                            <ul>
                                ${para.requirements.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${para.verified ? `
                        <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--success-color);">
                            ✓ Επαληθευμένο από ${para.source || 'PDF'}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }
    
    return `
        <div class="law-article-card" data-article="${article.key}">
            <div class="law-article-header">
                <div class="law-article-title">
                    <h4>${article.title}</h4>
                    <span class="article-meta">
                        ${article.fek || ''}
                        ${article.lastAmended ? ` • Τροποποίηση: ${article.lastAmended}` : ''}
                    </span>
                </div>
                <span class="law-article-expand">▼</span>
            </div>
            <div class="law-article-body">
                ${paragraphsHtml}
            </div>
        </div>
    `;
}

function renderFeesList() {
    const container = document.getElementById('fees-list');
    if (!container || !window.FeesAndCosts) return;
    
    let html = '';
    
    const feeCategories = {
        'Αυτοδίκαια Κτήση': ['birth_greek_parent'],
        'Πολιτογράφηση': ['naturalization_general', 'naturalization_omogeneis', 'naturalization_spouse'],
        'Δηλώσεις & Αποφάσεις': ['declaration_citizenship', 'declaratory_decision', 'reacquisition']
    };
    
    for (const [category, keys] of Object.entries(feeCategories)) {
        let cardsHtml = '';
        
        for (const key of keys) {
            const fee = window.FeesAndCosts[key];
            if (!fee) continue;
            
            const total = (fee.paravolo || 0) + (fee.pegp || 0) + (fee.languageExam || 0);
            
            cardsHtml += `
                <div class="fee-card">
                    <h4>${fee.description}</h4>
                    <div class="fee-item">
                        <span class="label">Παράβολο:</span>
                        <span class="value">${fee.paravolo === 0 ? 'Δωρεάν' : fee.paravolo + '€'}</span>
                    </div>
                    ${fee.pegp ? `
                    <div class="fee-item">
                        <span class="label">Πιστοποίηση Πολιτισμού:</span>
                        <span class="value">${fee.pegp}€</span>
                    </div>
                    ` : ''}
                    ${fee.languageExam ? `
                    <div class="fee-item">
                        <span class="label">Εξετάσεις Γλώσσας (περ.):</span>
                        <span class="value">~${fee.languageExam}€</span>
                    </div>
                    ` : ''}
                    ${total > 0 ? `
                    <div class="fee-item total">
                        <span class="label">Σύνολο (περ.):</span>
                        <span class="value">${total}€</span>
                    </div>
                    ` : ''}
                    ${fee.source ? `<div class="source">Πηγή: ${fee.source}</div>` : ''}
                </div>
            `;
        }
        
        if (cardsHtml) {
            html += `
                <div style="grid-column: 1 / -1; margin-top: 1rem;">
                    <h3 style="color: var(--primary-dark); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-color);">
                        ${category}
                    </h3>
                </div>
                ${cardsHtml}
            `;
        }
    }
    
    // Processing times
    if (window.ProcessingTimes) {
        html += `
            <div style="grid-column: 1 / -1; margin-top: 2rem;">
                <h3 style="color: var(--primary-dark); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-color);">
                    ⏱️ Εκτιμώμενοι Χρόνοι Επεξεργασίας
                </h3>
            </div>
        `;
        
        const timeLabels = {
            'birth_greek_parent': 'Τέκνο Έλληνα γονέα',
            'declaration': 'Δήλωση (Άρθρο 14)',
            'naturalization_general': 'Γενική πολιτογράφηση',
            'naturalization_omogeneis': 'Πολιτογράφηση ομογενών',
            'naturalization_spouse': 'Σύζυγος Έλληνα',
            'declaratory': 'Διαπιστωτική απόφαση',
            'reacquisition': 'Επανάκτηση'
        };
        
        for (const [key, time] of Object.entries(window.ProcessingTimes)) {
            html += `
                <div class="fee-card" style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">${timeLabels[key] || key}</span>
                    <span style="font-weight: 600; color: var(--primary-color);">📅 ${time}</span>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
}

// Initialize info tabs when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initInfoTabs();
});

// ============================================
// DATA EXPORT / IMPORT
// ============================================

function exportData() {
    try {
        const exportObj = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            application: 'Greek Citizenship Assistant',
            data: {
                cases: AppState.cases,
                // Include any other localStorage items you want to export
                greekCitizenshipCases: localStorage.getItem('greekCitizenshipCases')
            }
        };
        
        const dataStr = JSON.stringify(exportObj, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        const date = new Date().toISOString().slice(0, 10);
        link.download = `greek-citizenship-backup-${date}.json`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showToast(`Εξαγωγή ${AppState.cases.length} υποθέσεων ολοκληρώθηκε!`, 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Σφάλμα κατά την εξαγωγή', 'error');
    }
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importObj = JSON.parse(e.target.result);
            
            // Validate the import file
            if (!importObj.data || !importObj.application) {
                throw new Error('Invalid backup file format');
            }
            
            // Show confirmation dialog
            const existingCount = AppState.cases.length;
            let importedCases = [];
            
            // Try to get cases from different possible formats
            if (importObj.data.cases && Array.isArray(importObj.data.cases)) {
                importedCases = importObj.data.cases;
            } else if (importObj.data.greekCitizenshipCases) {
                importedCases = JSON.parse(importObj.data.greekCitizenshipCases);
            }
            
            const message = existingCount > 0 
                ? `Βρέθηκαν ${importedCases.length} υποθέσεις στο αρχείο.\n\nΈχετε ήδη ${existingCount} υποθέσεις.\n\nΤι θέλετε να κάνετε;`
                : `Βρέθηκαν ${importedCases.length} υποθέσεις στο αρχείο.\n\nΘέλετε να τις εισαγάγετε;`;
            
            // Create custom modal for import options
            showImportModal(importedCases, existingCount);
            
        } catch (error) {
            console.error('Import error:', error);
            showToast('Σφάλμα: Μη έγκυρο αρχείο αντιγράφου ασφαλείας', 'error');
        }
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = '';
}

function analyzeImport(importedCases) {
    const existingMap = new Map(AppState.cases.map(c => [c.id, c]));
    
    const analysis = {
        newCases: [],      // Cases that don't exist locally
        updatedCases: [],  // Cases that exist but imported is newer
        unchangedCases: [], // Cases that exist and local is newer or same
        totalImported: importedCases.length
    };
    
    for (const importedCase of importedCases) {
        const existingCase = existingMap.get(importedCase.id);
        
        if (!existingCase) {
            // New case
            analysis.newCases.push(importedCase);
        } else {
            // Compare timestamps
            const importedTime = new Date(importedCase.updatedAt).getTime();
            const existingTime = new Date(existingCase.updatedAt).getTime();
            
            if (importedTime > existingTime) {
                // Imported is newer
                analysis.updatedCases.push(importedCase);
            } else {
                // Local is newer or same
                analysis.unchangedCases.push(importedCase);
            }
        }
    }
    
    return analysis;
}

function showImportModal(importedCases, existingCount) {
    // Analyze the import
    const analysis = analyzeImport(importedCases);
    
    // Store for later use
    window._importAnalysis = analysis;
    window._importedCases = importedCases;
    
    const hasChanges = analysis.newCases.length > 0 || analysis.updatedCases.length > 0;
    
    const modalHtml = `
        <div id="import-modal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 550px;">
                <div class="modal-header">
                    <h2>📥 Εισαγωγή Δεδομένων</h2>
                    <button class="modal-close" onclick="closeImportModal()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 1.5rem;">
                    <p style="margin-bottom: 1rem;">
                        Ανάλυση αρχείου με <strong>${importedCases.length}</strong> υποθέσεις:
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #dee2e6;">
                            <span>🆕 Νέες υποθέσεις:</span>
                            <strong style="color: var(--success-color);">${analysis.newCases.length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #dee2e6;">
                            <span>🔄 Ενημερωμένες (νεότερες):</span>
                            <strong style="color: var(--primary-color);">${analysis.updatedCases.length}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                            <span>⏸️ Αμετάβλητες (ίδιες ή παλιότερες):</span>
                            <strong style="color: var(--text-light);">${analysis.unchangedCases.length}</strong>
                        </div>
                    </div>
                    
                    ${!hasChanges ? `
                    <div style="background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; border-left: 4px solid var(--success-color);">
                        <p style="margin: 0; color: var(--text-secondary);">
                            ✅ Τα τοπικά δεδομένα είναι ήδη ενημερωμένα. Δεν υπάρχουν αλλαγές προς εισαγωγή.
                        </p>
                    </div>
                    ` : ''}
                    
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${hasChanges ? `
                        <button class="btn btn-primary" onclick="executeSmartImport()">
                            ✅ Έξυπνη Εισαγωγή (${analysis.newCases.length} νέες + ${analysis.updatedCases.length} ενημερώσεις)
                        </button>
                        ${analysis.newCases.length > 0 ? `
                        <button class="btn btn-secondary" onclick="executeImportNewOnly()">
                            🆕 Μόνο νέες υποθέσεις (${analysis.newCases.length})
                        </button>
                        ` : ''}
                        ` : ''}
                        <button class="btn btn-secondary" style="background: #dc3545; border-color: #dc3545; color: white;" onclick="executeImportReplace()">
                            ⚠️ Αντικατάσταση όλων (${importedCases.length})
                        </button>
                        <button class="btn btn-secondary" onclick="closeImportModal()">
                            ❌ Ακύρωση
                        </button>
                    </div>
                    
                    <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-light);">
                        💡 Η σύγκριση γίνεται με βάση το timestamp τελευταίας επεξεργασίας (updatedAt).
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    const modalContainer = document.createElement('div');
    modalContainer.id = 'import-modal-container';
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
}

function closeImportModal() {
    const container = document.getElementById('import-modal-container');
    if (container) {
        container.remove();
    }
    // Clean up
    delete window._importAnalysis;
    delete window._importedCases;
}

function executeSmartImport() {
    try {
        const analysis = window._importAnalysis;
        if (!analysis) {
            showToast('Σφάλμα: Δεν βρέθηκαν δεδομένα ανάλυσης', 'error');
            closeImportModal();
            return;
        }
        
        let addedCount = 0;
        let updatedCount = 0;
        
        // Add new cases
        for (const newCase of analysis.newCases) {
            AppState.cases.push(newCase);
            addedCount++;
        }
        
        // Update existing cases where imported is newer
        for (const updatedCase of analysis.updatedCases) {
            const index = AppState.cases.findIndex(c => c.id === updatedCase.id);
            if (index !== -1) {
                AppState.cases[index] = updatedCase;
                updatedCount++;
            }
        }
        
        // Save to localStorage
        saveCases();
        
        // Re-render the cases list
        renderCasesList();
        
        // Close modal
        closeImportModal();
        
        showToast(`Εισαγωγή: ${addedCount} νέες, ${updatedCount} ενημερωμένες υποθέσεις`, 'success');
        
    } catch (error) {
        console.error('Smart import error:', error);
        showToast('Σφάλμα κατά την εισαγωγή', 'error');
        closeImportModal();
    }
}

function executeImportNewOnly() {
    try {
        const analysis = window._importAnalysis;
        if (!analysis) {
            showToast('Σφάλμα: Δεν βρέθηκαν δεδομένα ανάλυσης', 'error');
            closeImportModal();
            return;
        }
        
        // Add only new cases
        for (const newCase of analysis.newCases) {
            AppState.cases.push(newCase);
        }
        
        // Save to localStorage
        saveCases();
        
        // Re-render the cases list
        renderCasesList();
        
        // Close modal
        closeImportModal();
        
        showToast(`Εισαγωγή ${analysis.newCases.length} νέων υποθέσεων ολοκληρώθηκε!`, 'success');
        
    } catch (error) {
        console.error('Import new only error:', error);
        showToast('Σφάλμα κατά την εισαγωγή', 'error');
        closeImportModal();
    }
}

function executeImportReplace() {
    try {
        const importedCases = window._importedCases;
        if (!importedCases) {
            showToast('Σφάλμα: Δεν βρέθηκαν δεδομένα εισαγωγής', 'error');
            closeImportModal();
            return;
        }
        
        // Confirm replacement
        if (!confirm(`⚠️ ΠΡΟΣΟΧΗ!\n\nΑυτή η ενέργεια θα αντικαταστήσει ΟΛΕΣ τις ${AppState.cases.length} τοπικές υποθέσεις με τις ${importedCases.length} του αρχείου.\n\nΕίστε σίγουροι;`)) {
            return;
        }
        
        // Replace all cases
        AppState.cases = importedCases;
        
        // Save to localStorage
        saveCases();
        
        // Re-render the cases list
        renderCasesList();
        
        // Close modal
        closeImportModal();
        
        showToast(`Αντικατάσταση ${importedCases.length} υποθέσεων ολοκληρώθηκε!`, 'success');
        
    } catch (error) {
        console.error('Replace import error:', error);
        showToast('Σφάλμα κατά την αντικατάσταση', 'error');
        closeImportModal();
    }
}

// Make functions globally accessible
window.exportData = exportData;
window.importData = importData;
window.closeImportModal = closeImportModal;
window.executeSmartImport = executeSmartImport;
window.executeImportNewOnly = executeImportNewOnly;
window.executeImportReplace = executeImportReplace;

function showToast(message, type = 'info') {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

