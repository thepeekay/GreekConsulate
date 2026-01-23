/**
 * Citizenship UI/Formatting Module
 * Contains functions for formatting and displaying citizenship information
 * Handles document lists, HTML generation, and UI presentation
 */

function formatDocumentsList(categoryId, showAlternatives = false, caseData = null, documentStatus = {}) {
    const docs = getRequiredDocuments(categoryId);
    let html = '';
    
    // Add foreign document note
    html += `
        <div class="foreign-doc-note" style="background: rgba(237, 108, 2, 0.1); border-left: 4px solid var(--warning-color); padding: 1rem; margin-bottom: 1.5rem; border-radius: var(--radius-sm);">
            <h5 style="color: var(--warning-color); margin-bottom: 0.5rem;">${FOREIGN_DOCUMENT_NOTE.title}</h5>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${FOREIGN_DOCUMENT_NOTE.description}</p>
            <ul style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; padding-left: 1.25rem;">
                ${FOREIGN_DOCUMENT_NOTE.requirements.map(r => `<li>${r}</li>`).join('')}
            </ul>
            <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem; margin-bottom: 0;"><em>Νομική βάση: ${FOREIGN_DOCUMENT_NOTE.legalBasis}</em></p>
        </div>
        
        <details style="margin-bottom: 1rem;">
            <summary style="cursor: pointer; padding: 0.75rem 1rem; background: rgba(25, 118, 210, 0.1); border-left: 4px solid var(--primary-color); border-radius: var(--radius-sm); font-weight: 600; color: var(--primary-color);">
                ${UNAVAILABLE_DOCUMENT_NOTE.title}
            </summary>
            <div style="padding: 1rem; background: rgba(25, 118, 210, 0.05); border-radius: 0 0 var(--radius-sm) var(--radius-sm); margin-top: -0.25rem;">
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${UNAVAILABLE_DOCUMENT_NOTE.description}</p>
                <ul style="font-size: 0.85rem; color: var(--text-secondary); margin: 0 0 0.75rem 0; padding-left: 1.25rem;">
                    ${UNAVAILABLE_DOCUMENT_NOTE.alternatives.map(a => `<li>${a}</li>`).join('')}
                </ul>
                <p style="font-size: 0.85rem; color: var(--success-color); margin-bottom: 0.5rem; font-weight: 500;">💡 ${UNAVAILABLE_DOCUMENT_NOTE.process}</p>
                <p style="font-size: 0.8rem; color: var(--text-light); margin: 0;"><em>Νομική βάση: ${UNAVAILABLE_DOCUMENT_NOTE.legalBasis}</em></p>
            </div>
        </details>
        
        <details style="margin-bottom: 1.5rem;">
            <summary style="cursor: pointer; padding: 0.75rem 1rem; background: rgba(60, 90, 153, 0.1); border-left: 4px solid #3c5a99; border-radius: var(--radius-sm); font-weight: 600; color: #3c5a99;">
                ${US_DOCUMENT_SOURCES.title}
            </summary>
            <div style="padding: 1rem; background: rgba(60, 90, 153, 0.05); border-radius: 0 0 var(--radius-sm) var(--radius-sm); margin-top: -0.25rem;">
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">${US_DOCUMENT_SOURCES.description}</p>
                
                <div style="margin-bottom: 1rem;">
                    <h6 style="color: #3c5a99; margin-bottom: 0.5rem; font-size: 0.9rem;">📄 ${US_DOCUMENT_SOURCES.deathCertificate.title}</h6>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; padding-left: 1.25rem;">
                        ${US_DOCUMENT_SOURCES.deathCertificate.sources.map(s => 
                            `<li><strong>${s.name}</strong>${s.url ? ` (<a href="${s.url}" target="_blank" style="color: var(--primary-color);">link</a>)` : ''} - ${s.note}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <h6 style="color: #3c5a99; margin-bottom: 0.5rem; font-size: 0.9rem;">🔄 ${US_DOCUMENT_SOURCES.alternatives.title}</h6>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; padding-left: 1.25rem;">
                        ${US_DOCUMENT_SOURCES.alternatives.sources.map(s => 
                            `<li><strong>${s.name}</strong>${s.url ? ` (<a href="${s.url}" target="_blank" style="color: var(--primary-color);">link</a>)` : ''} - ${s.note}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div style="padding: 0.75rem; background: rgba(198, 40, 40, 0.1); border-radius: var(--radius-sm);">
                    <h6 style="color: var(--error-color); margin-bottom: 0.5rem; font-size: 0.9rem;">⚠️ ${US_DOCUMENT_SOURCES.noRecordFound.title}</h6>
                    <ol style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; padding-left: 1.25rem;">
                        ${US_DOCUMENT_SOURCES.noRecordFound.steps.map(s => `<li>${s}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </details>
    `;
    
    for (const [section, documents] of Object.entries(docs)) {
        const sectionLabels = {
            applicant: 'Έγγραφα Αιτούντος',
            parent: 'Έγγραφα Γονέα/Γονέων',
            spouse: 'Έγγραφα Συζύγου',
            children: 'Έγγραφα Τέκνων',
            ancestry: 'Έγγραφα Καταγωγής',
            general: 'Γενικά Έγγραφα'
        };
        
        html += `<div class="doc-section" style="margin-bottom: 1.5rem;">
            <h5 style="color: var(--primary-color); margin-bottom: 0.75rem; font-size: 1rem;">${sectionLabels[section] || section}</h5>
            <ul class="documents-list" style="list-style: none; padding: 0;">`;
        
        for (const doc of documents) {
            const docStatus = documentStatus[doc.id] || {};
            const isChecked = docStatus.received || false;
            const alternativeUsed = docStatus.alternativeUsed || null;
            const statusClass = doc.required ? 'pending' : '';
            const statusText = doc.required ? 'Υποχρεωτικό' : 'Προαιρετικό';
            const foreignBadge = doc.foreignDoc ? '<span style="background: var(--warning-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">Αλλοδαπό</span>' : '';
            
            html += `<li data-doc-id="${doc.id}" style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;" class="${isChecked ? 'doc-received' : ''}">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                    <label class="doc-checkbox-container" style="display: flex; align-items: center; cursor: pointer; margin-top: 0.25rem;">
                        <input type="checkbox" class="doc-checkbox" data-doc-id="${doc.id}" ${isChecked ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
                    </label>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                                    <span style="font-weight: 500; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">📄 ${doc.name}</span>
                                    ${foreignBadge}
                                    ${isChecked ? '<span style="background: var(--success-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">✓ Ελήφθη</span>' : ''}
                                    ${alternativeUsed ? `<span style="background: var(--primary-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">🔄 Εναλλακτικό</span>` : ''}
                                </div>
                                <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;">
                                    <em>Νομική βάση: <a href="#" class="law-ref-link" data-law-ref="${doc.legalRef.replace(/"/g, '&quot;')}" style="color: var(--primary-color); text-decoration: underline; cursor: pointer;">${doc.legalRef}</a></em>
                                </div>
                            </div>
                            <span class="doc-status ${statusClass}" style="white-space: nowrap;">${statusText}</span>
                        </div>
                    </div>
                </div>`;
            
            // Add alternatives section
            if (doc.alternatives && doc.alternatives.length > 0) {
                html += `
                    <details style="margin-top: 0.75rem;" ${alternativeUsed !== null && alternativeUsed !== undefined ? 'open' : ''}>
                        <summary style="cursor: pointer; font-size: 0.85rem; color: var(--primary-color); font-weight: 500;">
                            🔄 Εναλλακτικά έγγραφα (${doc.alternatives.length})
                        </summary>
                        <ul style="margin-top: 0.5rem; padding-left: 0.5rem; font-size: 0.85rem; list-style: none;">
                            ${doc.alternatives.map((alt, idx) => `
                                <li style="margin-bottom: 0.5rem; display: flex; align-items: start; gap: 0.5rem;">
                                    <label style="display: flex; align-items: center; cursor: pointer; gap: 0.5rem; flex: 1;">
                                        <input type="radio" name="alt-${doc.id}" value="${idx}" class="alt-checkbox" data-doc-id="${doc.id}" data-alt-index="${idx}" ${Number(alternativeUsed) === idx ? 'checked' : ''} style="cursor: pointer;">
                                        <span style="color: var(--text-secondary);">${alt}</span>
                                    </label>
                                </li>
                            `).join('')}
                        </ul>
                    </details>`;
            }
            
            html += '</li>';
        }
        
        html += '</ul></div>';
    }
    
    // Add divorce-related documents if applicable
    if (caseData && caseData.parentsMaritalStatus) {
        const maritalStatus = caseData.parentsMaritalStatus;
        
        if (maritalStatus === 'divorced') {
            html += `
                <div class="doc-section divorce-section" style="margin-top: 2rem; padding: 1.5rem; background: rgba(237, 108, 2, 0.08); border-radius: var(--radius-md); border: 2px solid var(--warning-color);">
                    <h4 style="color: var(--warning-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>${DivorceRelatedDocuments.icon}</span>
                        ${DivorceRelatedDocuments.title}
                    </h4>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
                        Λόγω του ότι οι γονείς έχουν διαζευχθεί, απαιτούνται τα παρακάτω επιπλέον έγγραφα:
                    </p>
                    <ul class="documents-list" style="list-style: none; padding: 0;">`;
            
            // Base divorce documents
            for (const doc of DivorceRelatedDocuments.documents) {
                html += formatSingleDocument(doc, documentStatus);
            }
            
            // Documents for multiple marriages
            if (caseData.greekParentPreviousMarriages === 'yes') {
                html += `
                    <li style="margin-top: 1rem; padding: 0.75rem; background: rgba(25, 118, 210, 0.1); border-radius: var(--radius-sm);">
                        <strong style="color: var(--primary-color);">📋 Προηγούμενοι Γάμοι:</strong>
                        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Ο Έλληνας γονέας είχε προηγούμενους γάμους - απαιτούνται επιπλέον:</p>
                    </li>`;
                for (const doc of DivorceRelatedDocuments.documentsForMultipleMarriages) {
                    html += formatSingleDocument(doc, documentStatus);
                }
            }
            
            // Documents for born after divorce
            if (caseData.bornDuringMarriage === 'after') {
                html += `
                    <li style="margin-top: 1rem; padding: 0.75rem; background: rgba(211, 47, 47, 0.1); border-radius: var(--radius-sm);">
                        <strong style="color: var(--error-color);">⚠️ Γέννηση μετά το διαζύγιο:</strong>
                        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Απαιτείται υποχρεωτικά αναγνώριση πατρότητας/μητρότητας:</p>
                    </li>`;
                for (const doc of DivorceRelatedDocuments.documentsForBornAfterDivorce) {
                    html += formatSingleDocument(doc, documentStatus);
                }
            }
            
            html += '</ul></div>';
        }
        
        // Documents for never married parents
        if (maritalStatus === 'never_married') {
            html += `
                <div class="doc-section never-married-section" style="margin-top: 2rem; padding: 1.5rem; background: rgba(156, 39, 176, 0.08); border-radius: var(--radius-md); border: 2px solid #9c27b0;">
                    <h4 style="color: #9c27b0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>👤</span>
                        Έγγραφα για Γέννηση Εκτός Γάμου
                    </h4>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
                        Για τέκνα που γεννήθηκαν εκτός γάμου, απαιτείται αποδεικτικό της σχέσης με τον Έλληνα γονέα:
                    </p>
                    <ul class="documents-list" style="list-style: none; padding: 0;">`;
            
            for (const doc of DivorceRelatedDocuments.documentsForNeverMarried) {
                html += formatSingleDocument(doc, documentStatus);
            }
            
            html += '</ul></div>';
        }
    }
    
    // Add name change documents if applicable
    if (caseData && caseData.greekParentNameChange === 'yes') {
        const reason = caseData.nameChangeReason || 'other';
        const oldName = caseData.greekParentOldName || '';
        const newName = caseData.greekParentNewName || '';
        const country = caseData.nameChangeCountry || '';
        
        // Debug: log the reason being used
        console.log('Name change reason:', reason, '- Available keys:', Object.keys(NameChangeDocuments.documents));
        
        // Get reason label
        const reasonLabels = {
            'naturalization': 'Πολιτογράφηση',
            'marriage': 'Γάμος',
            'court_order': 'Δικαστική Απόφαση',
            'other': 'Άλλο'
        };
        const reasonLabel = reasonLabels[reason] || 'Άγνωστο';
        
        html += `
            <div class="doc-section name-change-section" style="margin-top: 2rem; padding: 1.5rem; background: rgba(25, 118, 210, 0.08); border-radius: var(--radius-md); border: 2px solid var(--primary-color);">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span>${NameChangeDocuments.icon}</span>
                    ${NameChangeDocuments.title}
                </h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    ${NameChangeDocuments.description}
                </p>
                ${oldName || newName || reason !== 'other' ? `
                <div style="margin-bottom: 1rem; padding: 0.75rem; background: white; border-radius: var(--radius-sm);">
                    ${oldName && newName ? `
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                        <span style="font-weight: 500;">📝</span>
                        <span><strong>Παλιό:</strong> ${oldName}</span>
                        <span>→</span>
                        <span><strong>Νέο:</strong> ${newName}</span>
                        ${country ? `<span style="color: var(--text-light);">(${country})</span>` : ''}
                    </div>
                    ` : ''}
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 500;">📋 Λόγος:</span>
                        <span style="background: var(--primary-color); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem;">${reasonLabel}</span>
                    </div>
                </div>
                ` : ''}
                <ul class="documents-list" style="list-style: none; padding: 0;">`;
        
        // Get documents based on reason
        const reasonDocs = NameChangeDocuments.documents[reason] || NameChangeDocuments.documents.other;
        for (const doc of reasonDocs) {
            html += formatSingleDocument(doc, documentStatus);
        }
        
        // Add common documents
        for (const doc of NameChangeDocuments.documents.common) {
            html += formatSingleDocument(doc, documentStatus);
        }
        
        html += '</ul></div>';
    }
    
    // Add ancestor (grandparent) name change documents if applicable
    if (caseData && caseData.ancestorNameChange === 'yes') {
        const reason = caseData.ancestorNameChangeReason || 'other';
        const oldName = caseData.ancestorOldName || '';
        const newName = caseData.ancestorNewName || '';
        const country = caseData.ancestorNameChangeCountry || '';
        const whichAncestor = caseData.ancestorWithNameChange || '';
        
        // Get ancestor label
        const ancestorLabels = {
            'paternalGrandfather': 'Παππούς (πατρικής πλευράς)',
            'paternalGrandmother': 'Γιαγιά (πατρικής πλευράς)',
            'maternalGrandfather': 'Παππούς (μητρικής πλευράς)',
            'maternalGrandmother': 'Γιαγιά (μητρικής πλευράς)',
            'multiple': 'Πολλαπλοί πρόγονοι'
        };
        const ancestorLabel = ancestorLabels[whichAncestor] || 'Πρόγονος';
        
        html += `
            <div class="doc-section ancestor-name-change-section" style="margin-top: 2rem; padding: 1.5rem; background: rgba(156, 39, 176, 0.08); border-radius: var(--radius-md); border: 2px solid #9c27b0;">
                <h4 style="color: #9c27b0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span>👴</span>
                    Έγγραφα λόγω Αλλαγής Ονόματος Προγόνου
                </h4>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
                    Ο/Η <strong>${ancestorLabel}</strong> άλλαξε όνομα. Απαιτούνται αποδεικτικά για τη σύνδεση του παλιού ονόματος (στα ελληνικά έγγραφα) με το νέο όνομα.
                </p>
                ${oldName && newName ? `
                <div style="margin-bottom: 1rem; padding: 0.75rem; background: white; border-radius: var(--radius-sm); display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                    <span style="font-weight: 500;">📝</span>
                    <span><strong>Παλιό:</strong> ${oldName}</span>
                    <span>→</span>
                    <span><strong>Νέο:</strong> ${newName}</span>
                    ${country ? `<span style="color: var(--text-light);">(${country})</span>` : ''}
                </div>
                ` : ''}
                <ul class="documents-list" style="list-style: none; padding: 0;">`;
        
        // Get documents based on reason - reuse the same document types
        const ancestorReasonMap = {
            'immigration': 'other',  // Immigration uses affidavit approach
            'naturalization': 'naturalization',
            'marriage': 'marriage',
            'other': 'other'
        };
        const mappedReason = ancestorReasonMap[reason] || 'other';
        const reasonDocs = NameChangeDocuments.documents[mappedReason] || NameChangeDocuments.documents.other;
        
        for (const doc of reasonDocs) {
            html += formatSingleDocument(doc, documentStatus);
        }
        
        // Add immigration-specific documents
        if (reason === 'immigration') {
            const immigrationDocs = [
                {
                    id: 'immigration_records',
                    name: 'Μεταναστευτικά Αρχεία (Immigration Records)',
                    required: true,
                    legalRef: 'Άρθρο 14 Ν. 3284/2004 - Ταυτοπροσωπία',
                    foreignDoc: true,
                    note: 'Ellis Island records, ship manifests, passenger lists κ.λπ.',
                    alternatives: ['Αρχεία από ancestry.com ή familysearch.org']
                }
            ];
            for (const doc of immigrationDocs) {
                html += formatSingleDocument(doc, documentStatus);
            }
        }
        
        // Add common documents
        for (const doc of NameChangeDocuments.documents.common) {
            html += formatSingleDocument(doc, documentStatus);
        }
        
        html += '</ul></div>';
    }
    
    return html;
}

// Helper function to format a single document entry
function formatSingleDocument(doc, documentStatus = {}) {
    const docStatus = documentStatus[doc.id] || {};
    const isChecked = docStatus.received || false;
    const alternativeUsed = docStatus.alternativeUsed || null;
    const foreignBadge = doc.foreignDoc ? '<span style="background: var(--warning-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">Αλλοδαπό</span>' : '';
    const statusText = doc.required ? 'Υποχρεωτικό' : 'Προαιρετικό';
    const statusClass = doc.required ? 'pending' : '';
    
    let html = `<li data-doc-id="${doc.id}" style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;" class="${isChecked ? 'doc-received' : ''}">
        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
            <label class="doc-checkbox-container" style="display: flex; align-items: center; cursor: pointer; margin-top: 0.25rem;">
                <input type="checkbox" class="doc-checkbox" data-doc-id="${doc.id}" ${isChecked ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
            </label>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                            <span style="font-weight: 500; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">📄 ${doc.name}</span>
                            ${foreignBadge}
                            ${isChecked ? '<span style="background: var(--success-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">✓ Ελήφθη</span>' : ''}
                            ${alternativeUsed !== null ? `<span style="background: var(--primary-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">🔄 Εναλλακτικό</span>` : ''}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;">
                            <em>Νομική βάση: <a href="#" class="law-ref-link" data-law-ref="${doc.legalRef.replace(/"/g, '&quot;')}" style="color: var(--primary-color); text-decoration: underline; cursor: pointer;">${doc.legalRef}</a></em>
                        </div>
                        ${doc.note ? `<div style="font-size: 0.8rem; color: var(--warning-color); margin-top: 0.25rem;"><em>💡 ${doc.note}</em></div>` : ''}
                    </div>
                    <span class="doc-status ${statusClass}" style="white-space: nowrap;">${statusText}</span>
                </div>
            </div>
        </div>`;
    
    if (doc.alternatives && doc.alternatives.length > 0) {
        html += `
            <details style="margin-top: 0.75rem;" ${alternativeUsed !== null && alternativeUsed !== undefined ? 'open' : ''}>
                <summary style="cursor: pointer; font-size: 0.85rem; color: var(--primary-color); font-weight: 500;">
                    🔄 Εναλλακτικά έγγραφα (${doc.alternatives.length})
                </summary>
                <ul style="margin-top: 0.5rem; padding-left: 0.5rem; font-size: 0.85rem; list-style: none;">
                    ${doc.alternatives.map((alt, idx) => `
                        <li style="margin-bottom: 0.5rem; display: flex; align-items: start; gap: 0.5rem;">
                            <label style="display: flex; align-items: center; cursor: pointer; gap: 0.5rem; flex: 1;">
                                <input type="radio" name="alt-${doc.id}" value="${idx}" class="alt-checkbox" data-doc-id="${doc.id}" data-alt-index="${idx}" ${Number(alternativeUsed) === idx ? 'checked' : ''} style="cursor: pointer;">
                                <span style="color: var(--text-secondary);">${alt}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </details>`;
    }
    
    html += '</li>';
    return html;
}


// Export for browser (window) and Node.js (module.exports)
if (typeof window !== 'undefined') {
    window.formatDocumentsList = formatDocumentsList;
    window.formatSingleDocument = formatSingleDocument;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDocumentsList,
        formatSingleDocument
    };
}
