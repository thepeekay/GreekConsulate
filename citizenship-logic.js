/**
 * Κώδικας Ελληνικής Ιθαγένειας - Λογική Κατηγοριοποίησης
 * Βάσει του Ν. 3284/2004 και τροποποιήσεων (κωδικοποίηση έως 12/2/2025)
 */

const CitizenshipCategories = {
    BIRTH_GREEK_PARENT: {
        id: 'birth_greek_parent',
        name: 'Αυτοδίκαια με τη γέννηση - Τέκνο Έλληνα γονέα',
        article: 'Άρθρο 1, παρ. 1 Ν. 3284/2004',
        legalText: 'Το τέκνο Έλληνα ή Ελληνίδας αποκτά από τη γέννηση του την Ελληνική Ιθαγένεια.',
        description: 'Το τέκνο Έλληνα ή Ελληνίδας αποκτά από τη γέννηση του την Ελληνική Ιθαγένεια.',
        icon: '👶',
        cost: { min: 0, max: 30, currency: '€', description: 'Χωρίς παράβολο (μόνο έξοδα πιστοποιητικών)' },
        estimatedTime: '3-6 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_GREEK_FATHER_PRE1982: {
        id: 'birth_greek_father_pre1982',
        name: 'Με δήλωση - Τέκνο Έλληνα πατέρα (προ 18.7.1982)',
        article: 'Άρθρο 14 παρ. 2 Ν. 3284/2004',
        legalText: 'Το τέκνο που γεννήθηκε εντός του πολιτικού γάμου του Έλληνα με αλλοδαπή πριν από την 18.7.1982 μπορεί να αποκτήσει την Ελληνική ιθαγένεια με δήλωση.',
        description: 'Τέκνο Έλληνα πατέρα που γεννήθηκε πριν τις 18.7.1982 εντός γάμου με αλλοδαπή.',
        icon: '👨‍👧',
        cost: { min: 140, max: 240, currency: '€', description: 'Παράβολο + έξοδα πιστοποιητικών' },
        estimatedTime: '18 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_GREEK_MOTHER_PRE1984: {
        id: 'birth_greek_mother_pre1984',
        name: 'Με δήλωση - Τέκνο Ελληνίδας (προ 8.5.1984)',
        article: 'Άρθρο 14 παρ. 3 Ν. 3284/2004',
        legalText: 'Το τέκνο Ελληνίδας μητέρας που γεννήθηκε πριν από την 8.5.1984 μπορεί να αποκτήσει την Ελληνική ιθαγένεια με δήλωση.',
        description: 'Τέκνο Ελληνίδας μητέρας που γεννήθηκε πριν τις 8.5.1984.',
        icon: '👩‍👧',
        cost: { min: 140, max: 240, currency: '€', description: 'Παράβολο + έξοδα πιστοποιητικών' },
        estimatedTime: '18 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_IN_GREECE: {
        id: 'birth_in_greece',
        name: 'Αυτοδίκαια - Γέννηση στην Ελλάδα',
        article: 'Άρθρο 1, παρ. 2 Ν. 3284/2004',
        legalText: 'Την Ελληνική Ιθαγένεια αποκτά από τη γέννηση του όποιος γεννιέται σε ελληνικό έδαφος, εφόσον ένας από τους γονείς του έχει γεννηθεί στην Ελλάδα και κατοικεί μόνιμα στη Χώρα.',
        description: 'Γέννηση σε ελληνικό έδαφος με ειδικές προϋποθέσεις.',
        icon: '🏛️',
        cost: { min: 0, max: 50, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '3-6 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_DECLARATORY: {
        id: 'birth_declaratory',
        name: 'Κτήση με έκδοση διαπιστωτικής απόφασης',
        article: 'Άρθρο 1 Ν. 3284/2004',
        legalText: 'Έκδοση διαπιστωτικής απόφασης για την κτήση της ελληνικής ιθαγένειας από τη γέννηση.',
        description: 'Διαπιστωτική απόφαση για κτήση ιθαγένειας από γέννηση.',
        icon: '📋',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο + έξοδα' },
        estimatedTime: '6-12 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_BIRTH_SCHOOLING: {
        id: 'declaration_birth_schooling',
        name: 'Δήλωση-Αίτηση - Γέννηση & Φοίτηση στην Ελλάδα',
        article: 'Άρθρο 1Α, παρ. 1 Ν. 3284/2004 (όπως τροποποιήθηκε με Ν. 3838/2010)',
        legalText: 'Τέκνο αλλοδαπών που γεννιέται στην Ελλάδα θεμελιώνει δικαίωμα κτήσης της ελληνικής ιθαγένειας υπό τις προϋποθέσεις της εγγραφής στην Α\' τάξη ελληνικού σχολείου.',
        description: 'Τέκνο αλλοδαπών που γεννήθηκε στην Ελλάδα και φοίτησε σε ελληνικό σχολείο.',
        icon: '🎓',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_SCHOOLING: {
        id: 'declaration_schooling',
        name: 'Δήλωση-Αίτηση - Φοίτηση στην Ελλάδα',
        article: 'Άρθρο 1Α, παρ. 2 Ν. 3284/2004 (όπως τροποποιήθηκε με Ν. 3838/2010)',
        legalText: 'Τέκνο αλλοδαπών που κατοικεί μόνιμα και νόμιμα στην Ελλάδα θεμελιώνει δικαίωμα κτήσης της ελληνικής ιθαγένειας με την επιτυχή παρακολούθηση έξι τουλάχιστον τάξεων ελληνικού σχολείου.',
        description: 'Τέκνο αλλοδαπών με εξαετή φοίτηση σε ελληνικό σχολείο.',
        icon: '📚',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_UNIVERSITY: {
        id: 'declaration_university',
        name: 'Δήλωση-Αίτηση - Απόφοιτος ΑΕΙ/ΤΕΙ',
        article: 'Άρθρο 1Α, παρ. 2 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που έχει αποφοιτήσει από ελληνικό ΑΕΙ ή ΤΕΙ δικαιούται να αιτηθεί την ελληνική ιθαγένεια.',
        description: 'Απόφοιτος ελληνικού ΑΕΙ ή ΤΕΙ.',
        icon: '🎓',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    RECOGNITION: {
        id: 'recognition',
        name: 'Αναγνώριση από Έλληνα',
        article: 'Άρθρο 2 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που αναγνωρίζεται ως τέκνο Έλληνα πολίτη γίνεται Έλληνας από την αναγνώριση.',
        description: 'Αναγνώριση τέκνου από Έλληνα πολίτη.',
        icon: '👨‍👧',
        cost: { min: 50, max: 100, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    ADOPTION: {
        id: 'adoption',
        name: 'Υιοθεσία από Έλληνα',
        article: 'Άρθρο 3 Ν. 3284/2004',
        legalText: 'Ανήλικος αλλοδαπός που υιοθετείται από Έλληνα πολίτη γίνεται Έλληνας από την τέλεση της υιοθεσίας.',
        description: 'Υιοθεσία από Έλληνα πολίτη.',
        icon: '👨‍👩‍👧',
        cost: { min: 50, max: 100, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    NATURALIZATION_GENERAL: {
        id: 'naturalization_general',
        name: 'Πολιτογράφηση - Γενική',
        article: 'Άρθρα 5-9 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που διαμένει νόμιμα στην Ελλάδα για επτά (7) έτη μπορεί να πολιτογραφηθεί Έλληνας.',
        description: 'Αλλοδαπός με 7ετή νόμιμη διαμονή στην Ελλάδα.',
        icon: '📜',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '24-36 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_OMOGENEIS: {
        id: 'naturalization_omogeneis',
        name: 'Πολιτογράφηση - Ομογενείς',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος προηγούμενης νόμιμης διαμονής στην Ελλάδα μειώνεται σε τρία (3) έτη για ομογενείς αλλοδαπούς.',
        description: 'Ομογενείς με μειωμένες προϋποθέσεις.',
        icon: '🇬🇷',
        cost: { min: 700, max: 900, currency: '€', description: 'Παράβολο 700€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_SPOUSE: {
        id: 'naturalization_spouse',
        name: 'Πολιτογράφηση - Σύζυγος Έλληνα',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος μειώνεται σε τρία (3) έτη για αλλοδαπούς που έχουν τέκνο με Έλληνα ή Ελληνίδα.',
        description: 'Σύζυγος Έλληνα πολίτη με τέκνο.',
        icon: '💍',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_REFUGEE: {
        id: 'naturalization_refugee',
        name: 'Πολιτογράφηση - Πρόσφυγας/Ανιθαγενής',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος μειώνεται σε τρία (3) έτη για αναγνωρισμένους πρόσφυγες και ανιθαγενείς.',
        description: 'Αναγνωρισμένος πρόσφυγας ή ανιθαγενής.',
        icon: '🏠',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    REACQUISITION: {
        id: 'reacquisition',
        name: 'Επανάκτηση Ιθαγένειας',
        article: 'Άρθρο 4 Ν. 3284/2004',
        legalText: 'Όποιος απώλεσε την ελληνική ιθαγένεια μπορεί να την επανακτήσει με δήλωσή του.',
        description: 'Επανάκτηση ιθαγένειας που απωλέσθη.',
        icon: '🔄',
        cost: { min: 100, max: 200, currency: '€', description: 'Παράβολο + έξοδα' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    HONORARY: {
        id: 'honorary',
        name: 'Τιμητική Πολιτογράφηση',
        article: 'Άρθρο 12 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που έχει προσφέρει εξαιρετικές υπηρεσίες στην Ελλάδα μπορεί να τιμηθεί με απονομή ιθαγένειας.',
        description: 'Τιμητική απονομή ιθαγένειας.',
        icon: '🏆',
        cost: { min: 0, max: 0, currency: '€', description: 'Χωρίς κόστος' },
        estimatedTime: 'Κατά περίπτωση',
        source: 'Ν. 3284/2004'
    },
    // Ειδική κατηγορία για μεταθανάτια αναγνώριση
    POSTHUMOUS_PARENT: {
        id: 'posthumous_parent',
        name: 'Μεταθανάτια Αναγνώριση Ιθαγένειας Γονέα',
        article: 'Άρθρο 1 & 14 Ν. 3284/2004',
        legalText: 'Δυνατότητα αναγνώρισης ιθαγένειας αποβιώσαντος προσώπου που είχε δικαίωμα στην ελληνική ιθαγένεια.',
        description: 'Μεταθανάτια απόκτηση ιθαγένειας για γονέα που δεν πρόλαβε να αιτηθεί.',
        icon: '🕊️',
        cost: { min: 150, max: 300, currency: '€', description: 'Παράβολο + έξοδα εγγράφων' },
        estimatedTime: '12-18 μήνες',
        source: 'Ν. 3284/2004'
    }
};

// Σημείωση για αλλοδαπά έγγραφα
const FOREIGN_DOCUMENT_NOTE = {
    title: '⚠️ Σημαντική Σημείωση για Αλλοδαπά Έγγραφα',
    description: 'Όλα τα έγγραφα που εκδίδονται από αλλοδαπές αρχές πρέπει να:',
    requirements: [
        'Είναι επίσημα μεταφρασμένα στην ελληνική γλώσσα από το Υπουργείο Εξωτερικών ή πιστοποιημένο μεταφραστή',
        'Φέρουν επικύρωση (notarization) από αρμόδια αρχή της χώρας έκδοσης',
        'Φέρουν σφραγίδα Apostille (Σύμβαση Χάγης 1961) ή προξενική θεώρηση για χώρες εκτός Σύμβασης'
    ],
    legalBasis: 'Άρθρο 6, παρ. 1 Ν. 3284/2004 & Κανονισμός (ΕΕ) 2016/1191'
};

// Σημείωση για έγγραφα που δεν μπορούν να εκδοθούν
const UNAVAILABLE_DOCUMENT_NOTE = {
    title: '📋 Αν ένα έγγραφο δεν μπορεί να βρεθεί',
    description: 'Σε περίπτωση που ένα απαιτούμενο έγγραφο δεν μπορεί να εκδοθεί (καταστροφή αρχείων, πόλεμος, φυσικές καταστροφές κλπ.), μπορούν να χρησιμοποιηθούν:',
    alternatives: [
        'Πιστοποιητικό αδυναμίας έκδοσης από την αρμόδια αρχή',
        'Ένορκη Βεβαίωση (Affidavit) από συγγενείς που γνωρίζουν τα γεγονότα',
        'Υπεύθυνη Δήλωση (Ν. 1599/1986) με εξήγηση της αδυναμίας',
        'Εναλλακτικά έγγραφα που αποδεικνύουν το ίδιο γεγονός (εκκλησιαστικά, κοιμητηριακά, νοσοκομειακά αρχεία)',
        'Μαρτυρίες συγγενών ή τρίτων με ένορκη βεβαίωση'
    ],
    process: 'Συνιστάται επικοινωνία με το αρμόδιο Προξενείο ή τη Διεύθυνση Ιθαγένειας για την αποδοχή εναλλακτικών εγγράφων πριν την υποβολή της αίτησης.',
    legalBasis: 'Κώδικας Διοικητικής Διαδικασίας, Ν. 2690/1999'
};

// Ειδικές οδηγίες για ΗΠΑ
const US_DOCUMENT_SOURCES = {
    title: '🇺🇸 Πηγές Εγγράφων στις ΗΠΑ',
    description: 'Για θανάτους ή γεγονότα που συνέβησαν στις ΗΠΑ, υπάρχουν πολλές πηγές:',
    deathCertificate: {
        title: 'Death Certificate',
        sources: [
            { name: 'State Vital Records Office', url: 'https://www.cdc.gov/nchs/w2w/index.htm', note: 'Κάθε πολιτεία έχει δικό της office - κύρια πηγή' },
            { name: 'County Clerk\'s Office', url: null, note: 'Τοπικά αρχεία, συχνά πιο γρήγορα' },
            { name: 'VitalChek.com', url: 'https://www.vitalchek.com', note: 'Online παραγγελία για πολλές πολιτείες' }
        ]
    },
    alternatives: {
        title: 'Εναλλακτικές Πηγές (αν δεν βρεθεί Death Certificate)',
        sources: [
            { name: 'Social Security Administration', note: 'Letter confirming death - αν είχε Social Security Number', url: 'https://www.ssa.gov' },
            { name: 'FindAGrave.com', note: 'Κοιμητηριακά αρχεία - δωρεάν αναζήτηση', url: 'https://www.findagrave.com' },
            { name: 'BillionGraves.com', note: 'Φωτογραφίες μνημάτων με στοιχεία', url: 'https://billiongraves.com' },
            { name: 'Ancestry.com / FamilySearch.org', note: 'Social Security Death Index (SSDI)', url: 'https://www.familysearch.org' },
            { name: 'Newspapers.com', note: 'Ιστορικές νεκρολογίες', url: 'https://www.newspapers.com' },
            { name: 'Greek Orthodox Archdiocese', note: 'Αρχεία ελληνορθόδοξων εκκλησιών', url: 'https://www.goarch.org' },
            { name: 'Funeral Home Records', note: 'Επικοινωνήστε με το γραφείο τελετών', url: null }
        ]
    },
    noRecordFound: {
        title: 'Αν δεν υπάρχει καταγεγραμμένος θάνατος',
        steps: [
            'Ζητήστε "Letter of No Record" από το State Vital Records Office',
            'Συντάξτε Affidavit (ένορκη βεβαίωση) με στοιχεία θανάτου από συγγενείς',
            'Συγκεντρώστε circumstantial evidence (εκκλησία, κοιμητήριο, εφημερίδες)',
            'Επικοινωνήστε με το Ελληνικό Προξενείο για καθοδήγηση'
        ]
    }
};

// Απαιτούμενα δικαιολογητικά ανά κατηγορία με νομικές αναφορές και εναλλακτικά
// Πηγή: mitos.gov.gr, ypes.gr, Ν. 3284/2004
const RequiredDocuments = {
    // Νέα κατηγορία: Τέκνο Έλληνα πατέρα πριν το 1982
    BIRTH_GREEK_FATHER_PRE1982: {
        applicant: [
            { 
                id: 'declaration_form', 
                name: 'Δήλωση βούλησης κτήσης ιθαγένειας', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Βαπτιστικό με πλήρη στοιχεία'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο αιτούντος σε ισχύ', 
                required: true,
                legalRef: 'Ταυτοποίηση',
                foreignDoc: true,
                alternatives: [
                    'Ταυτότητα χώρας προέλευσης'
                ]
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'father_citizenship', 
                name: 'Πιστοποιητικό ελληνικής ιθαγένειας πατέρα', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό εγγραφής σε Δημοτολόγιο',
                    'Πιστοποιητικό Μητρώου Αρρένων',
                    'Ελληνικό διαβατήριο πατέρα'
                ]
            },
            { 
                id: 'parents_marriage_cert', 
                name: 'Ληξιαρχική πράξη γάμου γονέων', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 2 - Απόδειξη γέννησης εντός γάμου',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό γάμου από εκκλησία',
                    'Πιστοποιητικό οικογενειακής κατάστασης'
                ]
            },
            { 
                id: 'father_birth_cert', 
                name: 'Πιστοποιητικό γέννησης πατέρα', 
                required: false,
                legalRef: 'Συμπληρωματικό',
                foreignDoc: false,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (100-150€)', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ηλεκτρονικό παράβολο (e-paravolo)'
                ]
            }
        ]
    },
    // Νέα κατηγορία: Τέκνο Ελληνίδας μητέρας πριν το 1984
    BIRTH_GREEK_MOTHER_PRE1984: {
        applicant: [
            { 
                id: 'declaration_form', 
                name: 'Δήλωση βούλησης κτήσης ιθαγένειας', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 3 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Βαπτιστικό με πλήρη στοιχεία'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο αιτούντος σε ισχύ', 
                required: true,
                legalRef: 'Ταυτοποίηση',
                foreignDoc: true,
                alternatives: [
                    'Ταυτότητα χώρας προέλευσης'
                ]
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'mother_citizenship', 
                name: 'Πιστοποιητικό ελληνικής ιθαγένειας μητέρας', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 3 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό εγγραφής σε Δημοτολόγιο',
                    'Ελληνικό διαβατήριο μητέρας',
                    'Ελληνική ταυτότητα μητέρας'
                ]
            },
            { 
                id: 'mother_birth_cert', 
                name: 'Πιστοποιητικό γέννησης μητέρας', 
                required: true,
                legalRef: 'Άρθρο 14 παρ. 3 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Απόσπασμα Δημοτολογίου'
                ]
            },
            { 
                id: 'family_status', 
                name: 'Πιστοποιητικό οικογενειακής κατάστασης', 
                required: true,
                legalRef: 'Απόδειξη μητρότητας',
                foreignDoc: false,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (100-150€)', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ηλεκτρονικό παράβολο (e-paravolo)'
                ]
            }
        ]
    },
    // Νέα κατηγορία: Διαπιστωτική απόφαση
    BIRTH_DECLARATORY: {
        applicant: [
            { 
                id: 'application_form', 
                name: 'Αίτηση έκδοσης διαπιστωτικής απόφασης', 
                required: true,
                legalRef: 'Άρθρο 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'birth_cert', 
                name: 'Ληξιαρχική πράξη γέννησης αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό γέννησης',
                    'Βαπτιστικό'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο/Ταυτότητα αιτούντος', 
                required: true,
                legalRef: 'Ταυτοποίηση',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'parent_citizenship', 
                name: 'Πιστοποιητικό ελληνικής ιθαγένειας Έλληνα γονέα', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό Δημοτολογίου',
                    'Πιστοποιητικό Μητρώου Αρρένων',
                    'Ελληνικό διαβατήριο γονέα'
                ]
            },
            { 
                id: 'parent_birth_cert', 
                name: 'Πιστοποιητικό γέννησης Έλληνα γονέα', 
                required: true,
                legalRef: 'Άρθρο 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Απόσπασμα Μητρώου Αρρένων'
                ]
            },
            { 
                id: 'family_status', 
                name: 'Πιστοποιητικό οικογενειακής κατάστασης', 
                required: true,
                legalRef: 'Απόδειξη γονικής σχέσης',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'marriage_cert', 
                name: 'Ληξιαρχική πράξη γάμου γονέων', 
                required: false,
                legalRef: 'Για τέκνα εντός γάμου',
                foreignDoc: true,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (100€)', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    BIRTH_GREEK_PARENT: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης από το ληξιαρχείο τόπου γέννησης',
                    'Βαπτιστικό (για Ορθοδόξους) με πλήρη στοιχεία',
                    'Πιστοποιητικό νοσοκομείου/μαιευτηρίου γέννησης',
                    'Ένορκη βεβαίωση δύο μαρτύρων ενώπιον Ειρηνοδίκη (αν δεν υπάρχουν άλλα έγγραφα)'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004 - Ταυτοποίηση',
                foreignDoc: true,
                alternatives: [
                    'Ταυτότητα χώρας προέλευσης',
                    'Ταξιδιωτικό έγγραφο',
                    'Προσωρινό διαβατήριο'
                ]
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'parent_citizenship', 
                name: 'Πιστοποιητικό ελληνικής ιθαγένειας γονέα', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004 - Απόδειξη ιθαγένειας γονέα',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό εγγραφής σε Μητρώα Αρρένων/Δημοτολόγιο',
                    'Ελληνικό διαβατήριο γονέα (σε ισχύ ή ληγμένο)',
                    'Ελληνική ταυτότητα γονέα',
                    'Πιστοποιητικό στρατολογικής κατάστασης (για άρρενες)',
                    'Βεβαίωση εγγραφής από Δήμο/Κοινότητα'
                ]
            },
            { 
                id: 'parent_birth_cert', 
                name: 'Πιστοποιητικό γέννησης Έλληνα γονέα', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης από ελληνικό ληξιαρχείο',
                    'Απόσπασμα Μητρώου Αρρένων (για άρρενες)',
                    'Πιστοποιητικό οικογενειακής κατάστασης (περιλαμβάνει στοιχεία γέννησης)',
                    'Βαπτιστικό από ελληνική εκκλησία',
                    'Αντίγραφο από βιβλία εκκλησίας (Μητρώο Βαπτίσεων)'
                ]
            },
            { 
                id: 'parent_passport', 
                name: 'Διαβατήριο Έλληνα γονέα', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ελληνική αστυνομική ταυτότητα',
                    'Ληγμένο ελληνικό διαβατήριο',
                    'Στρατιωτική ταυτότητα (αν υπηρέτησε)'
                ]
            },
            { 
                id: 'family_status', 
                name: 'Πιστοποιητικό οικογενειακής κατάστασης', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004 - Απόδειξη συγγένειας',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό γέννησης που αναγράφει τους γονείς',
                    'Ληξιαρχική πράξη γάμου γονέων + πράξεις γέννησης',
                    'Δικαστική απόφαση αναγνώρισης συγγένειας'
                ]
            },
            { 
                id: 'marriage_cert', 
                name: 'Ληξιαρχική πράξη γάμου γονέων', 
                required: false,
                legalRef: 'Άρθρο 1 Ν. 3284/2004 (για τέκνα εντός γάμου)',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό γάμου από εκκλησία (θρησκευτικός γάμος)',
                    'Πιστοποιητικό γάμου από Δημαρχείο (πολιτικός γάμος)',
                    'Πιστοποιητικό οικογενειακής κατάστασης που αναφέρει τον γάμο'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση (έντυπο υπηρεσίας)', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    NATURALIZATION_OMOGENEIS: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης αιτούντος (μεταφρασμένο)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 & Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης από χώρα προέλευσης',
                    'Βαπτιστικό Ορθόδοξης Εκκλησίας (εξωτερικού)',
                    'Πιστοποιητικό από Προξενείο χώρας καταγωγής',
                    'Ένορκη βεβαίωση + μαρτυρικές καταθέσεις (έσχατη λύση)'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ταυτότητα χώρας προέλευσης',
                    'Προξενική ταυτότητα',
                    'Ταξιδιωτικό έγγραφο'
                ]
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (3 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'criminal_record', 
                name: 'Ποινικό μητρώο (χώρας προέλευσης)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1β Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό μη καταδίκης από αστυνομία χώρας προέλευσης',
                    'Βεβαίωση προξενείου περί μη ποινικού παρελθόντος',
                    'Υπεύθυνη δήλωση με επιφύλαξη αυτεπάγγελτης αναζήτησης (για χώρες που δεν εκδίδουν)'
                ]
            },
            { 
                id: 'residence_permit', 
                name: 'Άδεια διαμονής', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Βεβαίωση κατάθεσης αίτησης άδειας διαμονής',
                    'Δελτίο αιτούντος διεθνή προστασία',
                    'Ειδικό δελτίο ταυτότητας ομογενούς'
                ]
            },
            { 
                id: 'tax_clearance', 
                name: 'Φορολογική ενημερότητα', 
                required: true,
                legalRef: 'Άρθρο 5α Ν. 3284/2004 (προστέθηκε με Ν. 4332/2015)',
                foreignDoc: false,
                alternatives: [
                    'Βεβαίωση Δ.Ο.Υ. περί μη οφειλής',
                    'Εκκαθαριστικό σημείωμα φόρου εισοδήματος'
                ]
            }
        ],
        ancestry: [
            { 
                id: 'ancestor_birth', 
                name: 'Πιστοποιητικό γέννησης Έλληνα προγόνου', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004 - Απόδειξη ομογένειας',
                foreignDoc: false,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης από ελληνικό ληξιαρχείο',
                    'Απόσπασμα Μητρώου Αρρένων (για άρρενες)',
                    'Βαπτιστικό από ελληνική ορθόδοξη εκκλησία',
                    'Αντίγραφο από παλαιά Μητρώα Δήμου/Κοινότητας',
                    'Πιστοποιητικό από Γενικά Αρχεία του Κράτους (ΓΑΚ)',
                    'Βεβαίωση Ιεράς Μητρόπολης για καταχώρηση σε εκκλησιαστικά βιβλία',
                    'Ένορκη βεβαίωση τριών μαρτύρων ενώπιον Ειρηνοδίκη (αν δεν υπάρχουν αρχεία)'
                ]
            },
            { 
                id: 'ancestor_citizenship', 
                name: 'Αποδεικτικό ελληνικής καταγωγής προγόνου', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό εγγραφής σε Δημοτολόγιο',
                    'Πιστοποιητικό εγγραφής σε Μητρώα Αρρένων',
                    'Παλαιό ελληνικό διαβατήριο',
                    'Στρατολογικά έγγραφα (πιστοποιητικό τύπου Α\' ή Β\')',
                    'Πιστοποιητικό εκλογικών καταλόγων (προ 1940)',
                    'Έγγραφα από Οθωμανικά Αρχεία (με πιστοποίηση)',
                    'Βεβαίωση Ελληνικής Πρεσβείας/Προξενείου',
                    'Αρχειακό υλικό από ΓΑΚ ή τοπικά αρχεία'
                ]
            },
            { 
                id: 'lineage_docs', 
                name: 'Έγγραφα που αποδεικνύουν τη γραμμή καταγωγής', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004 - Αλυσίδα συγγένειας',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικά γέννησης κάθε γενιάς στη σειρά',
                    'Ληξιαρχικές πράξεις γάμου κάθε γενιάς',
                    'Πιστοποιητικά οικογενειακής κατάστασης',
                    'Βαπτιστικά που αναφέρουν γονείς και ανάδοχους',
                    'Πιστοποιητικά θανάτου (για αποβιώσαντες προγόνους)',
                    'Ένορκες βεβαιώσεις συγγενών για ελλείποντα έγγραφα',
                    'Οικογενειακή μερίδα από Δήμο'
                ]
            },
            { 
                id: 'family_tree', 
                name: 'Οικογενειακό δέντρο με πιστοποιητικά', 
                required: true,
                legalRef: 'Διοικητική απαίτηση για τεκμηρίωση',
                foreignDoc: false,
                alternatives: [
                    'Γραφική αναπαράσταση γενεαλογικού δέντρου',
                    'Υπεύθυνη δήλωση με αναλυτική περιγραφή συγγένειας',
                    'Αναφορά γενεαλογικής έρευνας από πιστοποιημένο ερευνητή'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση πολιτογράφησης', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'language_cert', 
                name: 'Πιστοποιητικό ελληνομάθειας (Β1)', 
                required: true,
                legalRef: 'Άρθρο 5α παρ. 1 Ν. 3284/2004 (Ν. 4332/2015)',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό Κέντρου Ελληνικής Γλώσσας',
                    'Απολυτήριο ελληνικού σχολείου',
                    'Πτυχίο ελληνικού πανεπιστημίου',
                    'Πιστοποιητικό επιτυχούς εξέτασης (Ν. 4735/2020)'
                ]
            },
            { 
                id: 'history_cert', 
                name: 'Πιστοποιητικό γνώσης ελληνικής ιστορίας/πολιτισμού', 
                required: true,
                legalRef: 'Άρθρο 5α παρ. 2 Ν. 3284/2004 (Ν. 4332/2015)',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό επιτυχούς εξέτασης σε εξουσιοδοτημένο κέντρο',
                    'Απολυτήριο ελληνικού Λυκείου',
                    'Βεβαίωση παρακολούθησης σεμιναρίων κοινωνικής ένταξης'
                ]
            },
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (700€ για ομογενείς)', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 2 Ν. 3284/2004 & ΚΥΑ',
                foreignDoc: false,
                alternatives: [
                    'Ηλεκτρονικό παράβολο (e-paravolo)',
                    'Αποδεικτικό τραπεζικής κατάθεσης'
                ]
            }
        ]
    },
    NATURALIZATION_GENERAL: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης (μεταφρασμένο & επικυρωμένο)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1 & Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης από χώρα προέλευσης',
                    'Πιστοποιητικό από Προξενείο χώρας καταγωγής στην Ελλάδα'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ταυτότητα χώρας προέλευσης',
                    'Ταξιδιωτικό έγγραφο'
                ]
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (3 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'criminal_record_gr', 
                name: 'Ποινικό μητρώο (Ελλάδα)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1β Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'criminal_record_origin', 
                name: 'Ποινικό μητρώο (χώρας προέλευσης)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1β Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό μη καταδίκης από αστυνομία',
                    'Βεβαίωση προξενείου'
                ]
            },
            { 
                id: 'residence_permit', 
                name: 'Άδεια διαμονής (7+ έτη)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Σύνολο αδειών διαμονής που καλύπτουν 7ετία',
                    'Βεβαιώσεις νόμιμης διαμονής'
                ]
            },
            { 
                id: 'tax_clearance', 
                name: 'Φορολογική ενημερότητα', 
                required: true,
                legalRef: 'Άρθρο 5α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'social_security', 
                name: 'Βεβαίωση ασφαλιστικού φορέα', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1δ Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Βεβαίωση ΕΦΚΑ',
                    'Ένσημα ΙΚΑ/ΕΦΚΑ',
                    'Βεβαίωση ασφάλισης από ιδιωτικό φορέα'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση πολιτογράφησης', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'language_cert', 
                name: 'Πιστοποιητικό ελληνομάθειας (Β1)', 
                required: true,
                legalRef: 'Άρθρο 5α παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Απολυτήριο ελληνικού σχολείου',
                    'Πτυχίο ελληνικού ΑΕΙ/ΤΕΙ'
                ]
            },
            { 
                id: 'history_cert', 
                name: 'Πιστοποιητικό γνώσης ελληνικής ιστορίας/πολιτισμού', 
                required: true,
                legalRef: 'Άρθρο 5α παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (550€)', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'integration_proof', 
                name: 'Αποδεικτικά κοινωνικής ένταξης', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1γ Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Βεβαίωση εργασίας',
                    'Μισθωτήριο κατοικίας',
                    'Λογαριασμοί ΔΕΚΟ στο όνομά του',
                    'Βεβαιώσεις συμμετοχής σε τοπικούς συλλόγους/οργανώσεις'
                ]
            }
        ]
    },
    NATURALIZATION_SPOUSE: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης (μεταφρασμένο)', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Πιστοποιητικό προξενείου'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (3 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'criminal_record', 
                name: 'Ποινικό μητρώο', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 1β Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'residence_permit', 
                name: 'Άδεια διαμονής', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        spouse: [
            { 
                id: 'spouse_citizenship', 
                name: 'Πιστοποιητικό ιθαγένειας συζύγου', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ελληνική ταυτότητα συζύγου',
                    'Ελληνικό διαβατήριο συζύγου',
                    'Πιστοποιητικό εγγραφής σε Δημοτολόγιο'
                ]
            },
            { 
                id: 'spouse_id', 
                name: 'Ταυτότητα Έλληνα συζύγου', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ελληνικό διαβατήριο'
                ]
            },
            { 
                id: 'marriage_cert', 
                name: 'Ληξιαρχική πράξη γάμου', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό γάμου από εκκλησία (αν ο γάμος ήταν θρησκευτικός)',
                    'Απόσπασμα οικογενειακής μερίδας που αναφέρει τον γάμο'
                ]
            },
            { 
                id: 'family_status', 
                name: 'Πιστοποιητικό οικογενειακής κατάστασης', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        children: [
            { 
                id: 'children_birth', 
                name: 'Πιστοποιητικά γέννησης τέκνων', 
                required: true,
                legalRef: 'Άρθρο 5 παρ. 2 Ν. 3284/2004 - Απόδειξη κοινού τέκνου',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης τέκνου',
                    'Οικογενειακή μερίδα που περιλαμβάνει τα τέκνα'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση πολιτογράφησης', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'language_cert', 
                name: 'Πιστοποιητικό ελληνομάθειας (Β1)', 
                required: true,
                legalRef: 'Άρθρο 5α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (550€)', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    DECLARATION_BIRTH_SCHOOLING: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Ληξιαρχική πράξη γέννησης στην Ελλάδα', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο/Ταξιδιωτικό έγγραφο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'school_enrollment', 
                name: 'Βεβαίωση εγγραφής σε σχολείο Α\' Δημοτικού', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 1α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'school_attendance', 
                name: 'Βεβαίωση τρέχουσας φοίτησης', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'parent_residence', 
                name: 'Άδεια διαμονής γονέα (ενός τουλάχιστον)', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'parent_passport', 
                name: 'Διαβατήριο γονέα', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Κοινή δήλωση-αίτηση γονέων', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    DECLARATION_SCHOOLING: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης (μεταφρασμένο)', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 2 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'school_certs', 
                name: 'Τίτλοι σπουδών (6 τάξεις)', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Απολυτήρια κάθε τάξης',
                    'Βεβαιώσεις φοίτησης ανά σχολικό έτος',
                    'Ενιαία βεβαίωση από σχολείο για όλα τα έτη φοίτησης'
                ]
            },
            { 
                id: 'school_attendance', 
                name: 'Βεβαίωση φοίτησης', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'parent_residence', 
                name: 'Άδεια διαμονής γονέα', 
                required: true,
                legalRef: 'Άρθρο 1Α παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση', 
                required: true,
                legalRef: 'Άρθρο 1Α Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    RECOGNITION: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 2 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Βαπτιστικό'
                ]
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο αιτούντος', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'recognition_act', 
                name: 'Πράξη αναγνώρισης τέκνου', 
                required: true,
                legalRef: 'Άρθρο 2 παρ. 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Συμβολαιογραφική πράξη αναγνώρισης',
                    'Δικαστική απόφαση αναγνώρισης πατρότητας',
                    'Διαθήκη με αναγνώριση τέκνου'
                ]
            },
            { 
                id: 'parent_citizenship', 
                name: 'Πιστοποιητικό ιθαγένειας αναγνωρίσαντος', 
                required: true,
                legalRef: 'Άρθρο 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ελληνική ταυτότητα',
                    'Ελληνικό διαβατήριο',
                    'Πιστοποιητικό Δημοτολογίου'
                ]
            },
            { 
                id: 'parent_id', 
                name: 'Ταυτότητα/διαβατήριο αναγνωρίσαντος', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    ADOPTION: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης', 
                required: true,
                legalRef: 'Άρθρο 3 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            }
        ],
        parent: [
            { 
                id: 'adoption_decree', 
                name: 'Δικαστική απόφαση υιοθεσίας', 
                required: true,
                legalRef: 'Άρθρο 3 παρ. 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Τελεσίδικη δικαστική απόφαση ελληνικού δικαστηρίου',
                    'Αναγνωρισμένη απόφαση αλλοδαπού δικαστηρίου (με exequatur)'
                ]
            },
            { 
                id: 'parent_citizenship', 
                name: 'Πιστοποιητικό ιθαγένειας υιοθετούντος', 
                required: true,
                legalRef: 'Άρθρο 3 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'parent_id', 
                name: 'Ταυτότητα/διαβατήριο υιοθετούντος', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    },
    // Νέα κατηγορία: Μεταθανάτια αναγνώριση γονέα
    POSTHUMOUS_PARENT: {
        deceased_parent: [
            { 
                id: 'death_cert', 
                name: 'Ληξιαρχική πράξη θανάτου αποβιώσαντος γονέα', 
                required: true,
                legalRef: 'Άρθρο 1 & 14 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό θανάτου από νοσοκομείο/ιατροδικαστή',
                    'Δικαστική απόφαση κήρυξης θανάτου (για αγνοούμενους)',
                    'Πιστοποιητικό αδυναμίας έκδοσης από Ληξιαρχείο + Ένορκη Βεβαίωση συγγενών',
                    'Εκκλησιαστικό πιστοποιητικό κηδείας/ταφής',
                    'Βεβαίωση κοιμητηρίου',
                    'Δημοσιευμένη νεκρολογία σε εφημερίδα της εποχής'
                ]
            },
            { 
                id: 'parent_birth_cert', 
                name: 'Πιστοποιητικό γέννησης αποβιώσαντος', 
                required: true,
                legalRef: 'Άρθρο 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γέννησης',
                    'Βαπτιστικό'
                ]
            },
            { 
                id: 'parent_greek_ancestor_proof', 
                name: 'Αποδεικτικό ελληνικής καταγωγής αποβιώσαντος', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό γέννησης του Έλληνα παππού/γιαγιάς',
                    'Πιστοποιητικό εγγραφής σε Δημοτολόγιο παππού/γιαγιάς',
                    'Πιστοποιητικό Μητρώου Αρρένων παππού',
                    'Ελληνικό διαβατήριο παππού/γιαγιάς'
                ]
            },
            { 
                id: 'lineage_proof', 
                name: 'Έγγραφα απόδειξης συγγένειας αποβιώσαντος με Έλληνα πρόγονο', 
                required: true,
                legalRef: 'Άρθρο 1 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: [
                    'Ληξιαρχική πράξη γάμου παππούδων',
                    'Πιστοποιητικό οικογενειακής κατάστασης παππούδων',
                    'Βαπτιστικό αποβιώσαντος που αναφέρει τους γονείς'
                ]
            }
        ],
        grandparent: [
            { 
                id: 'grandparent_citizenship', 
                name: 'Πιστοποιητικό ιθαγένειας Έλληνα παππού/γιαγιάς', 
                required: true,
                legalRef: 'Άρθρο 1 παρ. 1 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Πιστοποιητικό Δημοτολογίου',
                    'Πιστοποιητικό Μητρώου Αρρένων',
                    'Ελληνικό διαβατήριο (έστω ληγμένο)',
                    'Στρατολογικά έγγραφα'
                ]
            },
            { 
                id: 'grandparent_death_cert', 
                name: 'Ληξιαρχική πράξη θανάτου παππού/γιαγιάς (αν έχει αποβιώσει)', 
                required: false,
                legalRef: 'Τεκμηρίωση',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό αδυναμίας έκδοσης + Ένορκη Βεβαίωση',
                    'Εκκλησιαστικό πιστοποιητικό κηδείας',
                    'Βεβαίωση κοιμητηρίου',
                    'Μαρτυρία συγγενών με ένορκη βεβαίωση'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση μεταθανάτιας αναγνώρισης ιθαγένειας', 
                required: true,
                legalRef: 'Άρθρο 1 & 14 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο (100-150€)', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Ηλεκτρονικό παράβολο (e-paravolo)'
                ]
            },
            { 
                id: 'applicant_relation_proof', 
                name: 'Απόδειξη σχέσης αιτούντος με αποβιώσαντα', 
                required: true,
                legalRef: 'Τεκμηρίωση εννόμου συμφέροντος',
                foreignDoc: true,
                alternatives: [
                    'Πιστοποιητικό γέννησης αιτούντος',
                    'Πιστοποιητικό οικογενειακής κατάστασης'
                ]
            }
        ]
    },
    REACQUISITION: {
        applicant: [
            { 
                id: 'birth_cert', 
                name: 'Πιστοποιητικό γέννησης', 
                required: true,
                legalRef: 'Άρθρο 4 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'passport', 
                name: 'Διαβατήριο', 
                required: true,
                legalRef: 'Άρθρο 6 Ν. 3284/2004',
                foreignDoc: true,
                alternatives: []
            },
            { 
                id: 'photo', 
                name: 'Φωτογραφίες (2 τεμ.)', 
                required: true,
                legalRef: 'Διοικητική απαίτηση',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'loss_proof', 
                name: 'Αποδεικτικό απώλειας ιθαγένειας', 
                required: true,
                legalRef: 'Άρθρο 4 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Απόφαση αποβολής ιθαγένειας',
                    'Πιστοποιητικό από Αποκεντρωμένη Διοίκηση',
                    'Πιστοποιητικό από Δήμο εγγραφής'
                ]
            },
            { 
                id: 'previous_citizenship', 
                name: 'Παλαιό πιστοποιητικό ιθαγένειας', 
                required: false,
                legalRef: 'Άρθρο 4 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: [
                    'Παλαιό ελληνικό διαβατήριο',
                    'Παλαιά ελληνική ταυτότητα',
                    'Πιστοποιητικό εγγραφής στα Μητρώα Αρρένων'
                ]
            }
        ],
        general: [
            { 
                id: 'application_form', 
                name: 'Αίτηση επανάκτησης', 
                required: true,
                legalRef: 'Άρθρο 4 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            },
            { 
                id: 'fee_receipt', 
                name: 'Παράβολο', 
                required: true,
                legalRef: 'Άρθρο 6 παρ. 2 Ν. 3284/2004',
                foreignDoc: false,
                alternatives: []
            }
        ]
    }
};

/**
 * Ολοκληρωμένη ανάλυση της αλυσίδας καταγωγής
 * Εντοπίζει πιθανά προβλήματα και προτείνει τη βέλτιστη διαδρομή
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
            'NATURALIZATION_OMOGENEIS': 6,
            'NATURALIZATION_SPOUSE': 7,
            'DECLARATION_BIRTH_SCHOOLING': 8,
            'DECLARATION_SCHOOLING': 9
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

// Έγγραφα για αλλαγή ονόματος γονέα
const NameChangeDocuments = {
    title: 'Έγγραφα λόγω Αλλαγής Ονόματος Γονέα',
    icon: '✏️',
    description: 'Αν ο Έλληνας γονέας άλλαξε όνομα, απαιτούνται αποδεικτικά για τη σύνδεση του παλιού ονόματος (στα ελληνικά έγγραφα) με το νέο όνομα (στα τρέχοντα έγγραφα ταυτότητας).',
    documents: {
        naturalization: [
            {
                id: 'naturalization_certificate',
                name: 'Πιστοποιητικό Πολιτογράφησης (Certificate of Naturalization)',
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004 - Ταυτοπροσωπία',
                foreignDoc: true,
                note: 'Συνήθως αναγράφει τόσο το παλιό όσο και το νέο όνομα',
                alternatives: ['Court Order με αναφορά στο παλιό όνομα']
            },
            {
                id: 'name_change_court_order',
                name: 'Δικαστική Απόφαση Αλλαγής Ονόματος (Court Order)',
                required: false,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                note: 'Απαιτείται αν το πιστοποιητικό πολιτογράφησης δεν αναγράφει το παλιό όνομα',
                alternatives: []
            }
        ],
        marriage: [
            {
                id: 'marriage_certificate_name_change',
                name: 'Ληξιαρχική Πράξη Γάμου (που δείχνει την αλλαγή επωνύμου)',
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                note: 'Πρέπει να φαίνεται το πατρικό και το νέο επώνυμο',
                alternatives: []
            }
        ],
        court_order: [
            {
                id: 'legal_name_change_order',
                name: 'Δικαστική Απόφαση Αλλαγής Ονόματος',
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                note: 'Επίσημη δικαστική απόφαση με αναφορά στα δύο ονόματα',
                alternatives: []
            }
        ],
        other: [
            {
                id: 'affidavit_name_change',
                name: 'Ένορκη Βεβαίωση (Affidavit) - Σύνδεση Ονομάτων',
                required: true,
                legalRef: 'Άρθρο 14 Ν. 3284/2004',
                foreignDoc: true,
                note: 'Ένορκη βεβαίωση που δηλώνει ότι τα δύο ονόματα αφορούν το ίδιο πρόσωπο',
                alternatives: ['Πιστοποιητικό ταυτοπροσωπίας από αρμόδια αρχή']
            }
        ],
        common: [
            {
                id: 'old_name_id_doc',
                name: 'Έγγραφο ταυτότητας με το παλιό όνομα (αν υπάρχει)',
                required: false,
                legalRef: 'Συμπληρωματικό',
                foreignDoc: true,
                note: 'Οτιδήποτε δείχνει το παλιό όνομα (παλιό διαβατήριο, ταυτότητα, κλπ.)',
                alternatives: []
            }
        ]
    }
};

// Επιπλέον έγγραφα για ειδικές περιπτώσεις
const DivorceRelatedDocuments = {
    title: 'Επιπλέον Έγγραφα λόγω Διαζυγίου Γονέων',
    icon: '💔',
    documents: [
        {
            id: 'parents_marriage_cert_original',
            name: 'Ληξιαρχική πράξη γάμου γονέων (του γάμου από τον οποίο προέρχεται ο αιτών)',
            required: true,
            legalRef: 'Άρθρο 14 Ν. 3284/2004 - Απόδειξη νομιμότητας τέκνου',
            foreignDoc: true,
            note: 'Απαιτείται το πιστοποιητικό του συγκεκριμένου γάμου, όχι τυχόν μεταγενέστερων',
            alternatives: ['Πιστοποιητικό γάμου από εκκλησία/ιερέα']
        },
        {
            id: 'divorce_decree',
            name: 'Δικαστική απόφαση διαζυγίου ή Ληξιαρχική πράξη διαζυγίου',
            required: true,
            legalRef: 'Άρθρο 14 Ν. 3284/2004 - Απόδειξη χρονολογίας',
            foreignDoc: true,
            note: 'Για επιβεβαίωση ότι ο αιτών γεννήθηκε κατά τη διάρκεια του γάμου',
            alternatives: ['Βεβαίωση δικαστηρίου περί τελεσιδικίας διαζυγίου']
        },
        {
            id: 'family_status_greek_parent',
            name: 'Πιστοποιητικό οικογενειακής κατάστασης του Έλληνα γονέα',
            required: true,
            legalRef: 'Άρθρο 14 Ν. 3284/2004',
            foreignDoc: false,
            note: 'Να φαίνονται όλοι οι γάμοι και τα τέκνα από κάθε γάμο',
            alternatives: []
        }
    ],
    documentsForMultipleMarriages: [
        {
            id: 'all_marriages_certs',
            name: 'Πιστοποιητικά όλων των προηγούμενων γάμων και διαζυγίων του Έλληνα γονέα',
            required: true,
            legalRef: 'Άρθρο 14 Ν. 3284/2004',
            foreignDoc: true,
            note: 'Για αποσαφήνιση της σειράς και να προκύπτει ο γάμος του αιτούντος',
            alternatives: []
        }
    ],
    documentsForBornAfterDivorce: [
        {
            id: 'paternity_recognition',
            name: 'Πράξη αναγνώρισης πατρότητας/μητρότητας',
            required: true,
            legalRef: 'Άρθρο 2 Ν. 3284/2004',
            foreignDoc: true,
            note: 'Υποχρεωτικό αν ο αιτών γεννήθηκε ΜΕΤΑ τη λύση του γάμου',
            alternatives: ['Δικαστική απόφαση αναγνώρισης πατρότητας']
        }
    ],
    documentsForNeverMarried: [
        {
            id: 'paternity_recognition_required',
            name: 'Πράξη εκούσιας αναγνώρισης ή Δικαστική απόφαση αναγνώρισης',
            required: true,
            legalRef: 'Άρθρο 2 Ν. 3284/2004',
            foreignDoc: true,
            note: 'Υποχρεωτικό για τέκνα που γεννήθηκαν εκτός γάμου',
            alternatives: []
        }
    ]
};

function formatDocumentsList(categoryId, showAlternatives = false, caseData = null) {
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
            const statusClass = doc.required ? 'pending' : '';
            const statusText = doc.required ? 'Υποχρεωτικό' : 'Προαιρετικό';
            const foreignBadge = doc.foreignDoc ? '<span style="background: var(--warning-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">Αλλοδαπό</span>' : '';
            
            html += `<li data-doc-id="${doc.id}" style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                            <span style="font-weight: 500;">📄 ${doc.name}</span>
                            ${foreignBadge}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;">
                            <em>Νομική βάση: <a href="#" class="law-ref-link" data-law-ref="${doc.legalRef.replace(/"/g, '&quot;')}" style="color: var(--primary-color); text-decoration: underline; cursor: pointer;">${doc.legalRef}</a></em>
                        </div>
                    </div>
                    <span class="doc-status ${statusClass}" style="white-space: nowrap;">${statusText}</span>
                </div>`;
            
            // Add alternatives section
            if (doc.alternatives && doc.alternatives.length > 0) {
                html += `
                    <details style="margin-top: 0.75rem;">
                        <summary style="cursor: pointer; font-size: 0.85rem; color: var(--primary-color); font-weight: 500;">
                            🔄 Εναλλακτικά έγγραφα (${doc.alternatives.length})
                        </summary>
                        <ul style="margin-top: 0.5rem; padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary);">
                            ${doc.alternatives.map(alt => `<li style="margin-bottom: 0.25rem;">${alt}</li>`).join('')}
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
                html += formatSingleDocument(doc);
            }
            
            // Documents for multiple marriages
            if (caseData.greekParentPreviousMarriages === 'yes') {
                html += `
                    <li style="margin-top: 1rem; padding: 0.75rem; background: rgba(25, 118, 210, 0.1); border-radius: var(--radius-sm);">
                        <strong style="color: var(--primary-color);">📋 Προηγούμενοι Γάμοι:</strong>
                        <p style="font-size: 0.85rem; margin-top: 0.25rem;">Ο Έλληνας γονέας είχε προηγούμενους γάμους - απαιτούνται επιπλέον:</p>
                    </li>`;
                for (const doc of DivorceRelatedDocuments.documentsForMultipleMarriages) {
                    html += formatSingleDocument(doc);
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
                    html += formatSingleDocument(doc);
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
                html += formatSingleDocument(doc);
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
            html += formatSingleDocument(doc);
        }
        
        // Add common documents
        for (const doc of NameChangeDocuments.documents.common) {
            html += formatSingleDocument(doc);
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
            html += formatSingleDocument(doc);
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
                html += formatSingleDocument(doc);
            }
        }
        
        // Add common documents
        for (const doc of NameChangeDocuments.documents.common) {
            html += formatSingleDocument(doc);
        }
        
        html += '</ul></div>';
    }
    
    return html;
}

// Helper function to format a single document entry
function formatSingleDocument(doc) {
    const foreignBadge = doc.foreignDoc ? '<span style="background: var(--warning-color); color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 3px; margin-left: 0.5rem;">Αλλοδαπό</span>' : '';
    const statusText = doc.required ? 'Υποχρεωτικό' : 'Προαιρετικό';
    const statusClass = doc.required ? 'pending' : '';
    
    let html = `<li data-doc-id="${doc.id}" style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-weight: 500;">📄 ${doc.name}</span>
                    ${foreignBadge}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.25rem;">
                    <em>Νομική βάση: <a href="#" class="law-ref-link" data-law-ref="${doc.legalRef.replace(/"/g, '&quot;')}" style="color: var(--primary-color); text-decoration: underline; cursor: pointer;">${doc.legalRef}</a></em>
                </div>
                ${doc.note ? `<div style="font-size: 0.8rem; color: var(--warning-color); margin-top: 0.25rem;"><em>💡 ${doc.note}</em></div>` : ''}
            </div>
            <span class="doc-status ${statusClass}" style="white-space: nowrap;">${statusText}</span>
        </div>`;
    
    if (doc.alternatives && doc.alternatives.length > 0) {
        html += `
            <details style="margin-top: 0.75rem;">
                <summary style="cursor: pointer; font-size: 0.85rem; color: var(--primary-color); font-weight: 500;">
                    🔄 Εναλλακτικά έγγραφα (${doc.alternatives.length})
                </summary>
                <ul style="margin-top: 0.5rem; padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary);">
                    ${doc.alternatives.map(alt => `<li style="margin-bottom: 0.25rem;">${alt}</li>`).join('')}
                </ul>
            </details>`;
    }
    
    html += '</li>';
    return html;
}

// Export για χρήση από app.js
window.CitizenshipLogic = {
    CitizenshipCategories,
    RequiredDocuments,
    FOREIGN_DOCUMENT_NOTE,
    UNAVAILABLE_DOCUMENT_NOTE,
    US_DOCUMENT_SOURCES,
    DivorceRelatedDocuments,
    NameChangeDocuments,
    determineCitizenshipCategory,
    getRequiredDocuments,
    formatDocumentsList,
    formatSingleDocument,
    hasGreekParent,
    hasGreekAncestry,
    analyzeAncestryChain,
    checkIfParentCanApplyFirst,
    calculateOptimalPath
};
