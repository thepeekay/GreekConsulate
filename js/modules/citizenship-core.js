/**
 * Citizenship Core Business Logic Module
 * Contains the main business logic functions for citizenship determination
 * Based on Ν. 3284/2004 and amendments
 */

function analyzeAncestryChain(data) {
    const analysis = {
        // Άμεσοι γονείς
        father: {
            isGreek: data.fatherIsGreek || false,
            status: data.fatherStatus || 'unknown',
            hasDocumentation: data.fatherHasDocumentation || false
        },
        mother: {
            isGreek: data.motherIsGreek || false,
            status: data.motherStatus || 'unknown',
            hasDocumentation: data.motherHasDocumentation || false
        },
        // Παππούδες/Γιαγιάδες
        grandparents: {
            paternal: {
                grandfather: data.ancestry?.paternalGrandfather || { isGreek: false, status: 'unknown' },
                grandmother: data.ancestry?.paternalGrandmother || { isGreek: false, status: 'unknown' }
            },
            maternal: {
                grandfather: data.ancestry?.maternalGrandfather || { isGreek: false, status: 'unknown' },
                grandmother: data.ancestry?.maternalGrandmother || { isGreek: false, status: 'unknown' }
            }
        },
        // Προπαππούδες (για Ομογενείς)
        greatGrandparents: {
            paternal: {
                grandfather: data.ancestry?.paternalGreatGrandfather || { isGreek: false, status: 'unknown' },
                grandmother: data.ancestry?.paternalGreatGrandmother || { isGreek: false, status: 'unknown' }
            },
            maternal: {
                grandfather: data.ancestry?.maternalGreatGrandfather || { isGreek: false, status: 'unknown' },
                grandmother: data.ancestry?.maternalGreatGrandmother || { isGreek: false, status: 'unknown' }
            }
        },
        // Αποτελέσματα ανάλυσης
        results: {
            hasGreekParent: false,
            hasGreekGrandparent: false,
            hasGreekGreatGrandparent: false,
            closestGreekAncestor: null,
            chainGaps: [],
            deceasedInChain: [],
            optimalPath: null,
            warnings: [],
            errors: []
        }
    };
    
    // === ΕΛΕΓΧΟΣ ΑΜΕΣΩΝ ΓΟΝΕΩΝ ===
    if (analysis.father.isGreek) {
        analysis.results.hasGreekParent = true;
        analysis.results.closestGreekAncestor = { relation: 'father', ...analysis.father };
    }
    if (analysis.mother.isGreek) {
        analysis.results.hasGreekParent = true;
        if (!analysis.results.closestGreekAncestor) {
            analysis.results.closestGreekAncestor = { relation: 'mother', ...analysis.mother };
        }
    }
    
    // === ΕΛΕΓΧΟΣ ΠΑΠΠΟΥΔΩΝ ===
    const checkGrandparent = (gp, side, relation) => {
        if (gp.isGreek) {
            analysis.results.hasGreekGrandparent = true;
            if (!analysis.results.closestGreekAncestor) {
                analysis.results.closestGreekAncestor = { relation: `${side}_${relation}`, ...gp };
            }
            return true;
        }
        return false;
    };
    
    checkGrandparent(analysis.grandparents.paternal.grandfather, 'paternal', 'grandfather');
    checkGrandparent(analysis.grandparents.paternal.grandmother, 'paternal', 'grandmother');
    checkGrandparent(analysis.grandparents.maternal.grandfather, 'maternal', 'grandfather');
    checkGrandparent(analysis.grandparents.maternal.grandmother, 'maternal', 'grandmother');
    
    // === ΕΛΕΓΧΟΣ ΠΡΟΠΑΠΠΟΥΔΩΝ ===
    const checkGreatGrandparent = (ggp, side, relation) => {
        if (ggp.isGreek) {
            analysis.results.hasGreekGreatGrandparent = true;
            if (!analysis.results.closestGreekAncestor) {
                analysis.results.closestGreekAncestor = { relation: `${side}_great_${relation}`, ...ggp };
            }
            return true;
        }
        return false;
    };
    
    checkGreatGrandparent(analysis.greatGrandparents.paternal.grandfather, 'paternal', 'grandfather');
    checkGreatGrandparent(analysis.greatGrandparents.paternal.grandmother, 'paternal', 'grandmother');
    checkGreatGrandparent(analysis.greatGrandparents.maternal.grandfather, 'maternal', 'grandfather');
    checkGreatGrandparent(analysis.greatGrandparents.maternal.grandmother, 'maternal', 'grandmother');
    
    // === ΕΝΤΟΠΙΣΜΟΣ ΚΕΝΩΝ ΣΤΗΝ ΑΛΥΣΙΔΑ ===
    
    // Πατρική πλευρά: Παππούς/Γιαγιά Έλληνας αλλά πατέρας όχι
    if ((analysis.grandparents.paternal.grandfather.isGreek || analysis.grandparents.paternal.grandmother.isGreek) 
        && !analysis.father.isGreek) {
        analysis.results.chainGaps.push({
            type: 'parent_not_greek',
            parent: 'father',
            greekAncestor: analysis.grandparents.paternal.grandfather.isGreek ? 'paternalGrandfather' : 'paternalGrandmother',
            parentStatus: analysis.father.status,
            message: 'Ο πατέρας δεν έχει αποκτήσει ελληνική ιθαγένεια παρόλο που έχει Έλληνα γονέα.'
        });
        
        if (analysis.father.status === 'deceased') {
            analysis.results.deceasedInChain.push({
                relation: 'father',
                hadRightToCitizenship: true,
                message: 'Ο πατέρας είχε δικαίωμα στην ιθαγένεια αλλά απεβίωσε χωρίς να το ασκήσει.'
            });
        }
    }
    
    // Μητρική πλευρά: Παππούς/Γιαγιά Έλληνας αλλά μητέρα όχι
    if ((analysis.grandparents.maternal.grandfather.isGreek || analysis.grandparents.maternal.grandmother.isGreek) 
        && !analysis.mother.isGreek) {
        analysis.results.chainGaps.push({
            type: 'parent_not_greek',
            parent: 'mother',
            greekAncestor: analysis.grandparents.maternal.grandfather.isGreek ? 'maternalGrandfather' : 'maternalGrandmother',
            parentStatus: analysis.mother.status,
            message: 'Η μητέρα δεν έχει αποκτήσει ελληνική ιθαγένεια παρόλο που έχει Έλληνα γονέα.'
        });
        
        if (analysis.mother.status === 'deceased') {
            analysis.results.deceasedInChain.push({
                relation: 'mother',
                hadRightToCitizenship: true,
                message: 'Η μητέρα είχε δικαίωμα στην ιθαγένεια αλλά απεβίωσε χωρίς να το ασκήσει.'
            });
        }
    }
    
    // === ΥΠΟΛΟΓΙΣΜΟΣ ΒΕΛΤΙΣΤΗΣ ΔΙΑΔΡΟΜΗΣ ===
    analysis.results.optimalPath = calculateOptimalPath(analysis);
    
    // === ΠΡΟΕΙΔΟΠΟΙΗΣΕΙΣ ===
    generateWarnings(analysis);
    
    return analysis;
}

/**
 * Υπολογίζει τη βέλτιστη διαδρομή για απόκτηση ιθαγένειας
 */
function calculateOptimalPath(analysis) {
    const paths = [];
    
    // ΣΕΝΑΡΙΟ 1: Άμεσος Έλληνας γονέας - Απλούστερη διαδρομή
    if (analysis.results.hasGreekParent) {
        return {
            type: 'DIRECT_PARENT',
            steps: [{
                who: analysis.father.isGreek ? 'Αιτών' : 'Αιτών',
                via: analysis.father.isGreek ? 'πατέρα' : 'μητέρα',
                category: 'BIRTH_GREEK_PARENT',
                cost: '~30€',
                time: '3-6 μήνες',
                description: 'Αυτοδίκαια κτήση ιθαγένειας ως τέκνο Έλληνα γονέα'
            }],
            totalCost: '~30€',
            totalTime: '3-6 μήνες',
            complexity: 'Χαμηλή',
            recommended: true
        };
    }
    
    // ΣΕΝΑΡΙΟ 2: Έλληνας παππούς/γιαγιά - Γονέας εν ζωή
    for (const gap of analysis.results.chainGaps) {
        if (gap.type === 'parent_not_greek' && gap.parentStatus === 'alive') {
            paths.push({
                type: 'PARENT_FIRST',
                steps: [
                    {
                        who: gap.parent === 'father' ? 'Πατέρας' : 'Μητέρα',
                        via: gap.greekAncestor.includes('Grandfather') ? 'παππού' : 'γιαγιάς',
                        category: 'BIRTH_GREEK_PARENT',
                        cost: '~150€',
                        time: '6-12 μήνες',
                        description: `Ο/Η ${gap.parent === 'father' ? 'πατέρας' : 'μητέρα'} αιτείται πρώτα`
                    },
                    {
                        who: 'Αιτών',
                        via: gap.parent === 'father' ? 'πατέρα' : 'μητέρα',
                        category: 'BIRTH_GREEK_PARENT',
                        cost: '~30€',
                        time: '3-6 μήνες',
                        description: 'Μετά την απόκτηση ιθαγένειας του γονέα'
                    }
                ],
                totalCost: '~180€',
                totalTime: '9-18 μήνες',
                complexity: 'Μέτρια',
                recommended: true,
                savings: '~520€ έναντι Ομογενείς'
            });
        }
    }
    
    // ΣΕΝΑΡΙΟ 3: Έλληνας παππούς/γιαγιά - Γονέας αποβιώσας
    for (const gap of analysis.results.chainGaps) {
        if (gap.type === 'parent_not_greek' && gap.parentStatus === 'deceased') {
            // Επιλογή Α: Μεταθανάτια αναγνώριση
            paths.push({
                type: 'POSTHUMOUS_THEN_APPLICANT',
                steps: [
                    {
                        who: gap.parent === 'father' ? 'Πατέρας (μεταθανάτια)' : 'Μητέρα (μεταθανάτια)',
                        via: 'μεταθανάτια αναγνώριση',
                        category: 'POSTHUMOUS_PARENT',
                        cost: '~200€',
                        time: '12-18 μήνες',
                        description: 'Αίτηση για μεταθανάτια αναγνώριση ιθαγένειας'
                    },
                    {
                        who: 'Αιτών',
                        via: gap.parent === 'father' ? 'πατέρα' : 'μητέρα',
                        category: 'BIRTH_GREEK_PARENT',
                        cost: '~30€',
                        time: '3-6 μήνες',
                        description: 'Μετά τη μεταθανάτια αναγνώριση'
                    }
                ],
                totalCost: '~230€',
                totalTime: '15-24 μήνες',
                complexity: 'Μέτρια-Υψηλή',
                recommended: true,
                note: 'Απαιτούνται επαρκή αποδεικτικά για τον αποβιώσαντα γονέα'
            });
            
            // Επιλογή Β: Απευθείας ως Ομογενής
            paths.push({
                type: 'DIRECT_OMOGENEIS',
                steps: [{
                    who: 'Αιτών',
                    via: 'απευθείας καταγωγή',
                    category: 'NATURALIZATION_OMOGENEIS',
                    cost: '700€+',
                    time: '18-24 μήνες',
                    description: 'Πολιτογράφηση ως ομογενής'
                }],
                totalCost: '700€+',
                totalTime: '18-24 μήνες',
                complexity: 'Υψηλή',
                recommended: false,
                note: 'Απαιτεί εξετάσεις ελληνομάθειας και ιστορίας'
            });
        }
    }
    
    // ΣΕΝΑΡΙΟ 4: Μόνο προπάππους/προγιαγιά - Ομογενείς
    if (analysis.results.hasGreekGreatGrandparent && !analysis.results.hasGreekGrandparent && !analysis.results.hasGreekParent) {
        paths.push({
            type: 'OMOGENEIS_GREAT_GRANDPARENT',
            steps: [{
                who: 'Αιτών',
                via: 'καταγωγή από προπάππου/προγιαγιά',
                category: 'NATURALIZATION_OMOGENEIS',
                cost: '700€+',
                time: '18-24 μήνες',
                description: 'Πολιτογράφηση ως ομογενής (απομακρυσμένη καταγωγή)'
            }],
            totalCost: '700€+',
            totalTime: '18-24 μήνες',
            complexity: 'Υψηλή',
            recommended: true,
            note: 'Μοναδική διαθέσιμη επιλογή για καταγωγή από προπάππου/προγιαγιά'
        });
    }
    
    // Επιστροφή καλύτερης διαδρομής
    if (paths.length > 0) {
        // Προτεραιότητα στις συστάσεις
        const recommendedPaths = paths.filter(p => p.recommended);
        if (recommendedPaths.length > 0) {
            return {
                primary: recommendedPaths[0],
                alternatives: paths.filter(p => p !== recommendedPaths[0])
            };
        }
        return {
            primary: paths[0],
            alternatives: paths.slice(1)
        };
    }
    
    return null;
}

/**
 * Δημιουργεί προειδοποιήσεις βάσει της ανάλυσης
 */
function generateWarnings(analysis) {
    // Προειδοποίηση για αποβιώσαντες στην αλυσίδα
    for (const deceased of analysis.results.deceasedInChain) {
        analysis.results.warnings.push({
            type: 'deceased_in_chain',
            severity: 'high',
            message: deceased.message,
            action: 'Θα χρειαστεί ληξιαρχική πράξη θανάτου (ή εναλλακτικά: πιστοποιητικό κηδείας, βεβαίωση κοιμητηρίου, ένορκη βεβαίωση) και έγγραφα που αποδεικνύουν το δικαίωμα στην ιθαγένεια.'
        });
    }
    
    // Προειδοποίηση για κενά στην αλυσίδα
    for (const gap of analysis.results.chainGaps) {
        if (gap.parentStatus === 'alive') {
            analysis.results.warnings.push({
                type: 'optimization_opportunity',
                severity: 'info',
                message: `${gap.message} Συστήνεται να αιτηθεί πρώτα ο γονέας.`,
                action: 'Αυτή η διαδρομή θα είναι πιο οικονομική (~180€ vs 700€+).'
            });
        }
    }
    
    // Προειδοποίηση αν δεν υπάρχει τεκμηρίωση
    if (!analysis.father.hasDocumentation && analysis.father.isGreek) {
        analysis.results.warnings.push({
            type: 'missing_documentation',
            severity: 'medium',
            message: 'Λείπει τεκμηρίωση για τον Έλληνα πατέρα.',
            action: 'Θα χρειαστούν εναλλακτικά έγγραφα (Δημοτολόγιο, Μητρώο Αρρένων κλπ.).'
        });
    }
    
    if (!analysis.mother.hasDocumentation && analysis.mother.isGreek) {
        analysis.results.warnings.push({
            type: 'missing_documentation',
            severity: 'medium',
            message: 'Λείπει τεκμηρίωση για την Ελληνίδα μητέρα.',
            action: 'Θα χρειαστούν εναλλακτικά έγγραφα (Δημοτολόγιο, Πιστοποιητικό Ιθαγένειας κλπ.).'
        });
    }
    
    // Προειδοποίηση για αποβιώσαντες παππούδες
    const allGrandparentsDeceased = 
        analysis.grandparents.paternal.grandfather.status === 'deceased' &&
        analysis.grandparents.paternal.grandmother.status === 'deceased' &&
        analysis.grandparents.maternal.grandfather.status === 'deceased' &&
        analysis.grandparents.maternal.grandmother.status === 'deceased';
        
    if (allGrandparentsDeceased && (analysis.results.hasGreekGrandparent && !analysis.results.hasGreekParent)) {
        analysis.results.warnings.push({
            type: 'all_grandparents_deceased',
            severity: 'medium',
            message: 'Όλοι οι παππούδες/γιαγιάδες έχουν αποβιώσει.',
            action: 'Θα χρειαστούν ληξιαρχικές πράξεις θανάτου για όλους.'
        });
    }
}

// Λογική καθορισμού κατηγορίας - Βελτιωμένη με ανάλυση αλυσίδας
function determineCitizenshipCategory(data) {
    const results = [];
    
    // Εκτέλεση ολοκληρωμένης ανάλυσης αλυσίδας καταγωγής
    const chainAnalysis = analyzeAncestryChain(data);
    
    // Υπολογισμός ηλικίας/ημερομηνίας γέννησης
    const birthDate = data.birthDate ? new Date(data.birthDate) : null;
    const cutoffDateFather = new Date('1982-07-18');
    const cutoffDateMother = new Date('1984-05-08');
    
    // === ΕΛΕΓΧΟΣ ΑΜΕΣΩΝ ΓΟΝΕΩΝ ===
    
    // Έλεγχος 1: Τέκνο Έλληνα πατέρα πριν τις 18.7.1982
    if (data.fatherIsGreek && birthDate && birthDate < cutoffDateFather) {
        results.push({
            category: CitizenshipCategories.BIRTH_GREEK_FATHER_PRE1982,
            confidence: 'high',
            reason: 'Τέκνο Έλληνα πατέρα που γεννήθηκε πριν τις 18.7.1982',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 2: Τέκνο Ελληνίδας μητέρας πριν τις 8.5.1984
    if (data.motherIsGreek && birthDate && birthDate < cutoffDateMother && !data.fatherIsGreek) {
        results.push({
            category: CitizenshipCategories.BIRTH_GREEK_MOTHER_PRE1984,
            confidence: 'high',
            reason: 'Τέκνο Ελληνίδας μητέρας που γεννήθηκε πριν τις 8.5.1984',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 3: Τέκνο Έλληνα γονέα (σύγχρονη νομοθεσία) - ΧΩΡΙΣ εξετάσεις
    if (hasGreekParent(data)) {
        // Αν δεν ισχύουν οι ειδικές κατηγορίες, γενική κατηγορία
        if (!birthDate || (birthDate >= cutoffDateFather && data.fatherIsGreek) || 
            (birthDate >= cutoffDateMother && data.motherIsGreek)) {
            results.push({
                category: CitizenshipCategories.BIRTH_GREEK_PARENT,
                confidence: 'high',
                reason: 'Ο αιτών έχει Έλληνα γονέα - Αυτοδίκαια κτήση χωρίς εξετάσεις',
                chainAnalysis: chainAnalysis
            });
        }
    }
    
    // === ΕΛΕΓΧΟΣ ΕΙΔΙΚΩΝ ΚΑΤΗΓΟΡΙΩΝ ===
    
    // Έλεγχος 4: Αναγνώριση από Έλληνα
    if (data.recognizedByGreek) {
        results.push({
            category: CitizenshipCategories.RECOGNITION,
            confidence: 'high',
            reason: 'Αναγνώριση τέκνου από Έλληνα πολίτη',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 5: Υιοθεσία από Έλληνα
    if (data.adoptedByGreek) {
        results.push({
            category: CitizenshipCategories.ADOPTION,
            confidence: 'high',
            reason: 'Υιοθεσία από Έλληνα πολίτη',
            chainAnalysis: chainAnalysis
        });
    }
    
    // === ΕΛΕΓΧΟΣ ΚΑΤΑΓΩΓΗΣ (Ομογενείς) ===
    // ΣΗΜΑΝΤΙΚΟ: Μόνο αν ΔΕΝ υπάρχει άμεσος Έλληνας γονέας
    
    if (hasGreekAncestry(data) && !hasGreekParent(data)) {
        // Αναλυτική εξέταση με βάση την κατάσταση των γονέων
        const parentCanApply = checkIfParentCanApplyFirst(data);
        
        if (parentCanApply.canApply) {
            // Υπάρχει βελτιστοποίηση
            if (parentCanApply.specialCase === 'DECEASED_INTERMEDIATE') {
                // Γονέας αποβιώσας - Ειδική διαχείριση
                results.push({
                    category: CitizenshipCategories.NATURALIZATION_OMOGENEIS,
                    confidence: 'medium',
                    reason: getAncestryReason(data),
                    recommendation: parentCanApply.recommendation,
                    alternativePath: parentCanApply.alternativePath,
                    warnings: parentCanApply.warnings,
                    specialCase: 'DECEASED_PARENT_IN_CHAIN',
                    chainAnalysis: chainAnalysis
                });
            } else {
                // Γονέας εν ζωή - Σύσταση να αιτηθεί πρώτα
                results.push({
                    category: CitizenshipCategories.NATURALIZATION_OMOGENEIS,
                    confidence: 'medium',
                    reason: getAncestryReason(data),
                    recommendation: parentCanApply.recommendation,
                    alternativePath: parentCanApply.alternativePath,
                    warnings: parentCanApply.warnings,
                    specialCase: 'PARENT_CAN_APPLY_FIRST',
                    chainAnalysis: chainAnalysis
                });
            }
        } else {
            // Καμία βελτιστοποίηση - Απευθείας Ομογενείς
            results.push({
                category: CitizenshipCategories.NATURALIZATION_OMOGENEIS,
                confidence: data.ancestryProofLevel || 'medium',
                reason: getAncestryReason(data),
                chainAnalysis: chainAnalysis
            });
        }
    }
    
    // === ΕΛΕΓΧΟΣ ΦΟΙΤΗΣΗΣ/ΓΕΝΝΗΣΗΣ ΣΤΗΝ ΕΛΛΑΔΑ ===
    
    // Έλεγχος 6: Γέννηση στην Ελλάδα + Φοίτηση
    if (data.bornInGreece && data.schooledInGreece) {
        results.push({
            category: CitizenshipCategories.DECLARATION_BIRTH_SCHOOLING,
            confidence: 'high',
            reason: 'Γέννηση στην Ελλάδα και φοίτηση σε ελληνικό σχολείο',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 7: Φοίτηση 6+ ετών στην Ελλάδα
    if (data.schoolYearsInGreece >= 6) {
        results.push({
            category: CitizenshipCategories.DECLARATION_SCHOOLING,
            confidence: 'high',
            reason: 'Εξαετής ή μεγαλύτερη φοίτηση σε ελληνικό σχολείο',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 8: Απόφοιτος ΑΕΙ/ΤΕΙ
    if (data.graduatedGreekUniversity) {
        results.push({
            category: CitizenshipCategories.DECLARATION_UNIVERSITY,
            confidence: 'high',
            reason: 'Απόφοιτος ελληνικού ΑΕΙ/ΤΕΙ',
            chainAnalysis: chainAnalysis
        });
    }
    
    // === ΕΛΕΓΧΟΣ ΠΟΛΙΤΟΓΡΑΦΗΣΗΣ ===
    
    // Έλεγχος 9: Σύζυγος Έλληνα με τέκνο
    if (data.marriedToGreek && data.hasChildWithGreekSpouse) {
        results.push({
            category: CitizenshipCategories.NATURALIZATION_SPOUSE,
            confidence: 'high',
            reason: 'Σύζυγος Έλληνα πολίτη με κοινό τέκνο',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 10: Πρόσφυγας/Ανιθαγενής
    if (data.isRefugee || data.isStateless) {
        results.push({
            category: CitizenshipCategories.NATURALIZATION_REFUGEE,
            confidence: 'high',
            reason: data.isRefugee ? 'Αναγνωρισμένος πρόσφυγας' : 'Ανιθαγενής',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 10A: Πολιτογράφηση ομογενών στο εξωτερικό (Άρθρο 10)
    // ΚΡΙΣΙΜΟ: Μόνο για όσους διαμένουν ΜΟΝΙΜΑ στο εξωτερικό
    if (data.residesAbroad && hasGreekAncestry(data) && !hasGreekParent(data)) {
        results.push({
            category: CitizenshipCategories.NATURALIZATION_EXPATRIATE,
            confidence: 'high',
            reason: 'Ομογενής που διαμένει μόνιμα στο εξωτερικό - Άρθρο 10',
            chainAnalysis: chainAnalysis,
            note: 'Απαιτείται συνέντευξη και έκθεση από προξενική αρχή'
        });
    }
    
    // Έλεγχος 10B: Τέκνα πολιτογραφούμενου γονέα (Άρθρο 11)
    if (data.parentRecentlyNaturalized || data.parentNaturalizationPending) {
        const isMinor = birthDate && ((new Date() - birthDate) / (1000 * 60 * 60 * 24 * 365)) < 18;
        const isUnmarried = data.maritalStatus === 'unmarried' || !data.maritalStatus;
        
        if (isMinor || isUnmarried) {
            results.push({
                category: CitizenshipCategories.NATURALIZATION_CHILDREN,
                confidence: 'high',
                reason: isMinor ? 
                    'Ανήλικο τέκνο πολιτογραφούμενου γονέα - Αυτόματη κτήση' :
                    'Άγαμο ενήλικο τέκνο - Δήλωση εντός 3 ετών από πολιτογράφηση γονέα',
                chainAnalysis: chainAnalysis,
                note: isMinor ? 
                    'Αυτόματη πολιτογράφηση με τον γονέα' :
                    'Απαιτείται δήλωση εντός 3 ετών'
            });
        }
    }
    
    // Έλεγχος 10C: Πολίτης ΕΕ (Άρθρο 5 παρ. 2ε) - 3ετής διαμονή
    if (data.isEUCitizen && data.residenceYearsInGreece >= 3 && !hasGreekParent(data)) {
        results.push({
            category: CitizenshipCategories.NATURALIZATION_EU_CITIZEN,
            confidence: 'high',
            reason: 'Πολίτης ΕΕ με 3ετή νόμιμη διαμονή στην Ελλάδα',
            chainAnalysis: chainAnalysis,
            note: 'Μειωμένος χρόνος διαμονής για πολίτες ΕΕ'
        });
    }
    
    // Έλεγχος 10D: Απόφοιτος ελληνικού πανεπιστημίου (Άρθρο 5 παρ. 2στ) - 3ετής διαμονή
    if (data.graduatedGreekUniversity && data.residenceYearsInGreece >= 3 && !hasGreekParent(data)) {
        // This is a DIFFERENT route than DECLARATION_UNIVERSITY
        // DECLARATION_UNIVERSITY = Article 14 (declaration route)
        // NATURALIZATION_UNIVERSITY_GRAD = Article 5 (naturalization with reduced time)
        // Both routes can be valid, so we should show both options
        results.push({
            category: CitizenshipCategories.NATURALIZATION_UNIVERSITY_GRAD,
            confidence: 'high',
            reason: 'Απόφοιτος ελληνικού ΑΕΙ/ΤΕΙ με 3ετή διαμονή - Πολιτογράφηση',
            chainAnalysis: chainAnalysis,
            note: 'Μειωμένος χρόνος διαμονής και εξαίρεση από ελληνομάθεια'
        });
    }
    
    // Έλεγχος 11: Γενική πολιτογράφηση (7 έτη)
    if (data.residenceYearsInGreece >= 7) {
        results.push({
            category: CitizenshipCategories.NATURALIZATION_GENERAL,
            confidence: 'medium',
            reason: `Νόμιμη διαμονή ${data.residenceYearsInGreece} ετών στην Ελλάδα`,
            chainAnalysis: chainAnalysis
        });
    }
    
    // Έλεγχος 12: Επανάκτηση ιθαγένειας
    if (data.hadGreekCitizenship) {
        results.push({
            category: CitizenshipCategories.REACQUISITION,
            confidence: 'high',
            reason: 'Προηγούμενη ελληνική ιθαγένεια που απωλέσθη',
            chainAnalysis: chainAnalysis
        });
    }
    
    // Ταξινόμηση με προτεραιότητα στις αυτοδίκαιες κατηγορίες
    results.sort((a, b) => {
        const priority = {
            'BIRTH_GREEK_PARENT': 1,
            'BIRTH_GREEK_FATHER_PRE1982': 2,
            'BIRTH_GREEK_MOTHER_PRE1984': 3,
            'RECOGNITION': 4,
            'ADOPTION': 5,
            'NATURALIZATION_CHILDREN': 6,
            'NATURALIZATION_EXPATRIATE': 7,
            'NATURALIZATION_OMOGENEIS': 8,
            'NATURALIZATION_EU_CITIZEN': 9,
            'NATURALIZATION_UNIVERSITY_GRAD': 10,
            'NATURALIZATION_SPOUSE': 11,
            'DECLARATION_BIRTH_SCHOOLING': 12,
            'DECLARATION_SCHOOLING': 13,
            'NATURALIZATION_GENERAL': 14,
            'REACQUISITION': 15
        };
        return (priority[a.category.id.toUpperCase()] || 99) - (priority[b.category.id.toUpperCase()] || 99);
    });
    
    return results;
}

function hasGreekParent(data) {
    return data.fatherIsGreek || data.motherIsGreek;
}

/**
 * Ολοκληρωμένος έλεγχος για βέλτιστη διαδρομή και edge cases
 * Λαμβάνει υπόψη αποβιώσαντες στην αλυσίδα καταγωγής
 */
function checkIfParentCanApplyFirst(data) {
    const result = {
        canApply: false,
        recommendation: null,
        alternativePath: null,
        warnings: [],
        specialCase: null
    };
    
    if (!data.ancestry) return result;
    
    // === ΠΑΤΡΙΚΗ ΠΛΕΥΡΑ ===
    const paternalGrandfatherGreek = data.ancestry.paternalGrandfather?.isGreek;
    const paternalGrandmotherGreek = data.ancestry.paternalGrandmother?.isGreek;
    const paternalGreek = paternalGrandfatherGreek || paternalGrandmotherGreek;
    
    const fatherNotGreek = !data.fatherIsGreek;
    const fatherAlive = data.fatherStatus === 'alive';
    const fatherDeceased = data.fatherStatus === 'deceased';
    
    const paternalGrandfatherDeceased = data.ancestry.paternalGrandfather?.status === 'deceased';
    const paternalGrandmotherDeceased = data.ancestry.paternalGrandmother?.status === 'deceased';
    
    // === ΜΗΤΡΙΚΗ ΠΛΕΥΡΑ ===
    const maternalGrandfatherGreek = data.ancestry.maternalGrandfather?.isGreek;
    const maternalGrandmotherGreek = data.ancestry.maternalGrandmother?.isGreek;
    const maternalGreek = maternalGrandfatherGreek || maternalGrandmotherGreek;
    
    const motherNotGreek = !data.motherIsGreek;
    const motherAlive = data.motherStatus === 'alive';
    const motherDeceased = data.motherStatus === 'deceased';
    
    const maternalGrandfatherDeceased = data.ancestry.maternalGrandfather?.status === 'deceased';
    const maternalGrandmotherDeceased = data.ancestry.maternalGrandmother?.status === 'deceased';
    
    // === ΣΕΝΑΡΙΟ: ΠΑΤΡΙΚΗ ΠΛΕΥΡΑ ===
    if (paternalGreek && fatherNotGreek) {
        result.canApply = true;
        
        // Υπο-σενάριο 1: Πατέρας ΕΝ ΖΩΗ ή ΑΓΝΩΣΤΗ ΚΑΤΑΣΤΑΣΗ (υποθέτουμε εν ζωή)
        if (fatherAlive || (!fatherDeceased && !fatherAlive)) {
            const statusUnknown = !fatherDeceased && !fatherAlive;
            result.recommendation = '💡 ΣΥΣΤΑΣΗ: Ο πατέρας σας μπορεί να αιτηθεί πρώτα την ελληνική ιθαγένεια (ως τέκνο Έλληνα), και στη συνέχεια εσείς ως τέκνο Έλληνα. Αυτή η διαδρομή είναι πιο οικονομική.';
            result.alternativePath = {
                step1: { who: 'Πατέρας', category: 'Τέκνο Έλληνα γονέα', cost: '~150€', time: '6-12 μήνες', alive: true },
                step2: { who: 'Αιτών/ούσα', category: 'Τέκνο Έλληνα πατέρα', cost: '~30€', time: '3-6 μήνες' },
                totalCost: '~180€',
                vs: 'vs 700€+ ως Ομογενής'
            };
            
            if (statusUnknown) {
                result.warnings.push('⚠️ Δεν έχει καθοριστεί η κατάσταση του πατέρα. Αν είναι εν ζωή, μπορεί να αιτηθεί πρώτος. Αν έχει αποβιώσει, ενημερώστε μας για εναλλακτικές.');
            }
            
            if (paternalGrandfatherDeceased && paternalGrandmotherDeceased) {
                result.warnings.push('⚠️ Και ο παππούς και η γιαγιά (πατρικής πλευράς) έχουν αποβιώσει. Θα χρειαστούν ληξιαρχικές πράξεις θανάτου.');
            }
        }
        // Υπο-σενάριο 2: Πατέρας ΑΠΟΒΙΩΣΑΣ
        else if (fatherDeceased) {
            result.specialCase = 'DECEASED_INTERMEDIATE';
            result.recommendation = '⚠️ ΕΙΔΙΚΗ ΠΕΡΙΠΤΩΣΗ: Ο πατέρας σας έχει αποβιώσει χωρίς να έχει αποκτήσει ελληνική ιθαγένεια. Υπάρχουν δύο επιλογές:';
            result.alternativePath = {
                option1: {
                    name: 'Επιλογή Α: Μεταθανάτια απόκτηση για τον πατέρα',
                    description: 'Κατάθεση αίτησης για μεταθανάτια αναγνώριση ιθαγένειας του πατέρα, και στη συνέχεια δική σας αίτηση.',
                    cost: '~200-300€',
                    time: '12-24 μήνες',
                    complexity: 'Μέτρια'
                },
                option2: {
                    name: 'Επιλογή Β: Απευθείας ως Ομογενής',
                    description: 'Απευθείας αίτηση ως ομογενής με απόδειξη καταγωγής.',
                    cost: '700€+',
                    time: '18-24 μήνες',
                    complexity: 'Υψηλή (εξετάσεις γλώσσας/ιστορίας)'
                },
                recommendation: 'Η Επιλογή Α είναι συνήθως προτιμότερη αν υπάρχουν επαρκή αποδεικτικά.'
            };
            result.warnings.push('📋 Απαιτείται ληξιαρχική πράξη θανάτου του πατέρα (αν δεν υπάρχει: εναλλακτικά έγγραφα - βλ. λίστα εγγράφων).');
            result.warnings.push('📋 Θα χρειαστούν έγγραφα που αποδεικνύουν ότι ο πατέρας ΕΙΧΕ δικαίωμα στην ιθαγένεια (ως τέκνο Έλληνα).');
        }
        
        return result;
    }
    
    // === ΣΕΝΑΡΙΟ: ΜΗΤΡΙΚΗ ΠΛΕΥΡΑ ===
    if (maternalGreek && motherNotGreek) {
        result.canApply = true;
        
        // Υπο-σενάριο 1: Μητέρα ΕΝ ΖΩΗ ή ΑΓΝΩΣΤΗ ΚΑΤΑΣΤΑΣΗ (υποθέτουμε εν ζωή)
        if (motherAlive || (!motherDeceased && !motherAlive)) {
            const statusUnknown = !motherDeceased && !motherAlive;
            result.recommendation = '💡 ΣΥΣΤΑΣΗ: Η μητέρα σας μπορεί να αιτηθεί πρώτα την ελληνική ιθαγένεια (ως τέκνο Έλληνα), και στη συνέχεια εσείς ως τέκνο Ελληνίδας. Αυτή η διαδρομή είναι πιο οικονομική.';
            result.alternativePath = {
                step1: { who: 'Μητέρα', category: 'Τέκνο Έλληνα γονέα', cost: '~150€', time: '6-12 μήνες', alive: true },
                step2: { who: 'Αιτών/ούσα', category: 'Τέκνο Ελληνίδας μητέρας', cost: '~30€', time: '3-6 μήνες' },
                totalCost: '~180€',
                vs: 'vs 700€+ ως Ομογενής'
            };
            
            if (statusUnknown) {
                result.warnings.push('⚠️ Δεν έχει καθοριστεί η κατάσταση της μητέρας. Αν είναι εν ζωή, μπορεί να αιτηθεί πρώτη. Αν έχει αποβιώσει, ενημερώστε μας για εναλλακτικές.');
            }
            
            if (maternalGrandfatherDeceased && maternalGrandmotherDeceased) {
                result.warnings.push('⚠️ Και ο παππούς και η γιαγιά (μητρικής πλευράς) έχουν αποβιώσει. Θα χρειαστούν ληξιαρχικές πράξεις θανάτου.');
            }
        }
        // Υπο-σενάριο 2: Μητέρα ΑΠΟΒΙΩΣΑΣΑ
        else if (motherDeceased) {
            result.specialCase = 'DECEASED_INTERMEDIATE';
            result.recommendation = '⚠️ ΕΙΔΙΚΗ ΠΕΡΙΠΤΩΣΗ: Η μητέρα σας έχει αποβιώσει χωρίς να έχει αποκτήσει ελληνική ιθαγένεια. Υπάρχουν δύο επιλογές:';
            result.alternativePath = {
                option1: {
                    name: 'Επιλογή Α: Μεταθανάτια απόκτηση για τη μητέρα',
                    description: 'Κατάθεση αίτησης για μεταθανάτια αναγνώριση ιθαγένειας της μητέρας, και στη συνέχεια δική σας αίτηση.',
                    cost: '~200-300€',
                    time: '12-24 μήνες',
                    complexity: 'Μέτρια'
                },
                option2: {
                    name: 'Επιλογή Β: Απευθείας ως Ομογενής',
                    description: 'Απευθείας αίτηση ως ομογενής με απόδειξη καταγωγής.',
                    cost: '700€+',
                    time: '18-24 μήνες',
                    complexity: 'Υψηλή (εξετάσεις γλώσσας/ιστορίας)'
                },
                recommendation: 'Η Επιλογή Α είναι συνήθως προτιμότερη αν υπάρχουν επαρκή αποδεικτικά.'
            };
            result.warnings.push('📋 Απαιτείται ληξιαρχική πράξη θανάτου της μητέρας (αν δεν υπάρχει: εναλλακτικά έγγραφα - βλ. λίστα εγγράφων).');
            result.warnings.push('📋 Θα χρειαστούν έγγραφα που αποδεικνύουν ότι η μητέρα ΕΙΧΕ δικαίωμα στην ιθαγένεια (ως τέκνο Έλληνα).');
        }
        
        return result;
    }
    
    return result;
}

function hasGreekAncestry(data) {
    const ancestors = ['paternalGrandfather', 'paternalGrandmother', 
                       'maternalGrandfather', 'maternalGrandmother',
                       'paternalGreatGrandfather', 'paternalGreatGrandmother',
                       'maternalGreatGrandfather', 'maternalGreatGrandmother'];
    
    for (const ancestor of ancestors) {
        if (data.ancestry && data.ancestry[ancestor] && data.ancestry[ancestor].isGreek) {
            return true;
        }
    }
    
    return false;
}

function getAncestryReason(data) {
    if (!data.ancestry) return 'Ελληνική καταγωγή';
    
    const greekAncestors = [];
    
    const ancestorLabels = {
        'paternalGrandfather': 'Παππούς (πατρική)',
        'paternalGrandmother': 'Γιαγιά (πατρική)',
        'maternalGrandfather': 'Παππούς (μητρική)',
        'maternalGrandmother': 'Γιαγιά (μητρική)',
        'paternalGreatGrandfather': 'Προπάππους (πατρική)',
        'paternalGreatGrandmother': 'Προγιαγιά (πατρική)',
        'maternalGreatGrandfather': 'Προπάππους (μητρική)',
        'maternalGreatGrandmother': 'Προγιαγιά (μητρική)'
    };
    
    for (const [key, label] of Object.entries(ancestorLabels)) {
        if (data.ancestry[key] && data.ancestry[key].isGreek) {
            greekAncestors.push(label);
        }
    }
    
    if (greekAncestors.length > 0) {
        return `Ελληνική καταγωγή μέσω: ${greekAncestors.join(', ')}`;
    }
    
    return 'Ελληνική καταγωγή';
}

function getRequiredDocuments(categoryId) {
    const docKey = categoryId.toUpperCase();
    return RequiredDocuments[docKey] || RequiredDocuments.NATURALIZATION_GENERAL;
}

// Export for browser (window) and Node.js (module.exports)
if (typeof window !== 'undefined') {
    window.analyzeAncestryChain = analyzeAncestryChain;
    window.calculateOptimalPath = calculateOptimalPath;
    window.generateWarnings = generateWarnings;
    window.determineCitizenshipCategory = determineCitizenshipCategory;
    window.hasGreekParent = hasGreekParent;
    window.checkIfParentCanApplyFirst = checkIfParentCanApplyFirst;
    window.hasGreekAncestry = hasGreekAncestry;
    window.getAncestryReason = getAncestryReason;
    window.getRequiredDocuments = getRequiredDocuments;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeAncestryChain,
        calculateOptimalPath,
        generateWarnings,
        determineCitizenshipCategory,
        hasGreekParent,
        checkIfParentCanApplyFirst,
        hasGreekAncestry,
        getAncestryReason,
        getRequiredDocuments
    };
}
