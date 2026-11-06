// --- GLOBAL SETTINGS & URL INITIALIZATION ---
let userSettings = JSON.parse(localStorage.getItem('budgetSettings')) || {
  name: '', 
  url: '', 
  currency: '$', 
  dateFormat: 'MM/DD/YYYY', 
  language: 'en',
  accounts: ['Checking', 'Savings', 'Credit Card', 'Cash'], // NEW LINE
  categories: [
    { id: 'c1', name: 'Housing', type: 'Expense', icon: 'fa-house' },
    { id: 'c2', name: 'Food', type: 'Expense', icon: 'fa-utensils' },
    { id: 'c3', name: 'Salary', type: 'Income', icon: 'fa-money-bill' }
  ]
};

// Ensure budgets exist for users with older cache data
userSettings.budgets = userSettings.budgets || {};

// Failsafe for users who already have old data saved
if (!userSettings.accounts) {
  userSettings.accounts = ['Checking', 'Savings', 'Credit Card', 'Cash'];
  localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
}

// --- GLOBAL DICTIONARY ---
const i18n = {
  en: {
    navHome: "Home", navExpense: "Expense", navIncome: "Income", navCalendar: "Calendar", navGoals: "Goals", navSettings: "Settings",
    dashboardTitle: "Dashboard", totalBalance: "Total Balance", recentActivity: "Recent Activity",
    expenseLog: "Expense Log", incomeLog: "Income Log", date: "Date", amount: "Amount", category: "Category", description: "Description",
    selectCategory: "Select category...", descPlaceholder: "What was this for?", addExpenseBtn: "Add Expense", addIncomeBtn: "Add Income",
    noActivity: "No recent activity.", noTransactions: "No transactions on this date.", noGoals: "No goals yet. Click the + icon above to create one!",
    navAdd: "Add", navDebt: "Debt", navBills: "Bills", navSplit: "Split", navBudget: "Budget",
    addTransactionTitle: "Add Transaction", expenseTab: "Expense", incomeTab: "Income", accountLabel: "Account",
    upcomingBills: "Upcoming Bills", upcomingDebts: "Upcoming Debts", noBillsUpcoming: "No bills due in the next 7 days.", noDebtsUpcoming: "No debts due in the next 7 days.",
    dueIn: "Due in", days: "day(s)", minPay: "Min. Pay", expenseBreakdown: "Expense Breakdown", past30Days: "Past 30 Days Spending",
    dailyNetCashflow: "DAILY NET CASHFLOW", selectedDayTrans: "Selected Day Transactions", totalSaved: "TOTAL SAVED", leftToAssign: "LEFT TO ASSIGN",
    nearestGoal: "NEAREST GOAL", estCompletion: "EST. COMPLETION", yourGoals: "Your Goals", assignBtn: "Assign",
    debtPayoffTitle: "Debt Payoff", addDebtBtn: "Add Debt", payoffStrategy: "PAYOFF STRATEGY", extraMonthly: "EXTRA MONTHLY PAYMENT",
    debtFreeBy: "DEBT FREE BY", totalInterest: "TOTAL INTEREST", amountLeft: "AMOUNT LEFT TO PAY", totalPaidSoFar: "TOTAL PAID SO FAR",
    principalProjection: "Principal Payoff Projection", targetPriority: "Target Priority", activeDebts: "Active Debts",
    billsAndSubsTitle: "Bills & Subs", addBillBtn: "Add Bill", monthlyFixed: "MONTHLY FIXED COSTS", next7Days: "NEXT 7 DAYS",
    activeBills: "Active Bills/Subscriptions", logAsPaid: "Log as Paid & Roll Date", splitBillTitle: "Split Bill",
    whatWasThisFor: "WHAT WAS THIS BILL FOR?", totalAmount: "TOTAL AMOUNT", splitStrategy: "SPLIT STRATEGY", whoSplitting: "WHO'S SPLITTING IT?",
    whoPaid: "WHO PAID THE BILL?", calcBreakdown: "Calculate Breakdown", monthlyBudgetTitle: "Monthly Budget", totalBudget: "TOTAL BUDGET",
    totalSpent: "TOTAL SPENT", budgetVsActual: "Budget vs Actual", categoryLimits: "Category Limits", spentLabel: "Spent", limitLabel: "Limit", leftLabel: "left",
    settingsGeneral: "General", settingsName: "Your Name (Optional)", settingsUrl: "Google Web App URL", settingsPrefs: "Preferences",
    settingsCurrency: "Currency", settingsDateFormat: "Date Format", settingsLang: "Language", settingsTheme: "App Theme",
    settingsThemeDesc: "Toggle between Light and Dark mode", settingsSwitchTheme: "Switch Theme", settingsCategories: "Categories",
    settingsAccounts: "Accounts", settingsSaveBtn: "Save Settings", goodMorning: "Good morning", goodAfternoon: "Good afternoon", goodEvening: "Good evening",
    sun: "SUN", mon: "MON", tue: "TUE", wed: "WED", thu: "THU", fri: "FRI", sat: "SAT",
    jan: "January", feb: "February", mar: "March", apr: "April", may: "May", jun: "June", jul: "July", aug: "August", sep: "September", oct: "October", nov: "November", dec: "December",
    todayBtn: "Today", timeRemaining: "TIME REMAINING", contributionHistory: "Contribution History", dateAssigned: "Date Assigned",
    moRemaining: "mo. remaining", achieved: "Achieved! 🎉", completed: "Completed", logPayment: "Log Payment", individualPayoff: "INDIVIDUAL PAYOFF", individualInterest: "INDIVIDUAL INTEREST", paymentHistory: "Payment History", projectedTotalPaid: "Projected total paid", historicalPayments: "Historical payments", mosLeft: "mos left", yrs: "yrs", paymentsTooLow: "Payments too low", overdueBy: "Overdue by", dueToday: "Due Today", statusText: "STATUS", totalPaidAllTime: "TOTAL PAID (ALL TIME)", onTrack: "On Track", overdue: "Overdue", dueSoon: "Due Soon", missedBy: "Missed by", dueLabel: "Due"
  },
  es: {
    navHome: "Inicio", navExpense: "Gastos", navIncome: "Ingresos", navCalendar: "Calendario", navGoals: "Metas", navSettings: "Ajustes",
    dashboardTitle: "Panel", totalBalance: "Saldo Total", recentActivity: "Actividad Reciente",
    expenseLog: "Registro de Gastos", incomeLog: "Registro de Ingresos", date: "Fecha", amount: "Monto", category: "Categoría", description: "Descripción",
    selectCategory: "Seleccionar categoría...", descPlaceholder: "¿Para qué fue esto?", addExpenseBtn: "Agregar Gasto", addIncomeBtn: "Agregar Ingreso",
    noActivity: "No hay actividad reciente.", noTransactions: "No hay transacciones en esta fecha.", noGoals: "Aún no hay metas. ¡Haz clic en el icono +!",
    navAdd: "Añadir", navDebt: "Deuda", navBills: "Recibos", navSplit: "Dividir", navBudget: "Presupuesto",
    addTransactionTitle: "Añadir Transacción", expenseTab: "Gasto", incomeTab: "Ingreso", accountLabel: "Cuenta",
    upcomingBills: "Próximos Recibos", upcomingDebts: "Próximas Deudas", noBillsUpcoming: "No hay recibos en los próximos 7 días.", noDebtsUpcoming: "No hay deudas en los próximos 7 días.",
    dueIn: "Vence en", days: "día(s)", minPay: "Pago Min.", expenseBreakdown: "Desglose de Gastos", past30Days: "Gastos de los últimos 30 días",
    dailyNetCashflow: "FLUJO DE CAJA NETO DIARIO", selectedDayTrans: "Transacciones del Día Seleccionado", totalSaved: "TOTAL AHORRADO", leftToAssign: "FALTA POR ASIGNAR",
    nearestGoal: "META MÁS CERCANA", estCompletion: "COMPLECIÓN EST.", yourGoals: "Tus Metas", assignBtn: "Asignar",
    debtPayoffTitle: "Pago de Deudas", addDebtBtn: "Añadir Deuda", payoffStrategy: "ESTRATEGIA DE PAGO", extraMonthly: "PAGO MENSUAL EXTRA",
    debtFreeBy: "LIBRE DE DEUDAS EN", totalInterest: "INTERÉS TOTAL", amountLeft: "MONTO RESTANTE POR PAGAR", totalPaidSoFar: "TOTAL PAGADO HASTA AHORA",
    principalProjection: "Proyección de Pago del Principal", targetPriority: "Prioridad Objetivo", activeDebts: "Deudas Activas",
    billsAndSubsTitle: "Recibos y Suscripciones", addBillBtn: "Añadir Recibo", monthlyFixed: "COSTOS FIJOS MENSUALES", next7Days: "PRÓXIMOS 7 DÍAS",
    activeBills: "Recibos/Suscripciones Activos", logAsPaid: "Registrar como Pagado y Actualizar Fecha", splitBillTitle: "Dividir Cuenta",
    whatWasThisFor: "¿PARA QUÉ FUE ESTA CUENTA?", totalAmount: "MONTO TOTAL", splitStrategy: "ESTRATEGIA DE DIVISIÓN", whoSplitting: "¿QUIÉN DIVIDE?",
    whoPaid: "¿QUIÉN PAGÓ LA CUENTA?", calcBreakdown: "Calcular Desglose", monthlyBudgetTitle: "Presupuesto Mensual", totalBudget: "PRESUPUESTO TOTAL",
    totalSpent: "TOTAL GASTADO", budgetVsActual: "Presupuesto vs Realidad", categoryLimits: "Límites por Categoría", spentLabel: "Gastado", limitLabel: "Límite", leftLabel: "restante",
    settingsGeneral: "General", settingsName: "Tu Nombre (Opcional)", settingsUrl: "URL de Google Web App", settingsPrefs: "Preferencias",
    settingsCurrency: "Moneda", settingsDateFormat: "Formato de Fecha", settingsLang: "Idioma", settingsTheme: "Tema de la App",
    settingsThemeDesc: "Alternar entre modo Claro y Oscuro", settingsSwitchTheme: "Cambiar Tema", settingsCategories: "Categorías",
    settingsAccounts: "Cuentas", settingsSaveBtn: "Guardar Ajustes", goodMorning: "Buenos días", goodAfternoon: "Buenas tardes", goodEvening: "Buenas noches",
    sun: "DOM", mon: "LUN", tue: "MAR", wed: "MIÉ", thu: "JUE", fri: "VIE", sat: "SÁB",
    jan: "Enero", feb: "Febrero", mar: "Marzo", apr: "Abril", may: "Mayo", jun: "Junio", jul: "Julio", aug: "Agosto", sep: "Septiembre", oct: "Octubre", nov: "Noviembre", dec: "Diciembre",
    todayBtn: "Hoy", timeRemaining: "TIEMPO RESTANTE", contributionHistory: "Historial de Aportes", dateAssigned: "Fecha Asignada",
    moRemaining: "meses rest.", achieved: "¡Logrado! 🎉", completed: "Completado", logPayment: "Registrar Pago", individualPayoff: "PAGO INDIVIDUAL", individualInterest: "INTERÉS INDIVIDUAL", paymentHistory: "Historial de Pagos", projectedTotalPaid: "Total proyectado", historicalPayments: "Pagos históricos", mosLeft: "meses rest.", yrs: "años", paymentsTooLow: "Pagos muy bajos", overdueBy: "Vencido por", dueToday: "Vence hoy", statusText: "ESTADO", totalPaidAllTime: "TOTAL PAGADO (SIEMPRE)", onTrack: "Al Día", overdue: "Vencido", dueSoon: "Vence Pronto", missedBy: "Atrasado por", dueLabel: "Vence"
  },
  de: {
    navHome: "Start", navExpense: "Ausgaben", navIncome: "Einnahmen", navCalendar: "Kalender", navGoals: "Ziele", navSettings: "Einstellungen",
    dashboardTitle: "Übersicht", totalBalance: "Gesamtsaldo", recentActivity: "Letzte Aktivitäten",
    expenseLog: "Ausgabenprotokoll", incomeLog: "Einnahmenprotokoll", date: "Datum", amount: "Betrag", category: "Kategorie", description: "Beschreibung",
    selectCategory: "Kategorie wählen...", descPlaceholder: "Wofür war das?", addExpenseBtn: "Ausgabe hinzufügen", addIncomeBtn: "Einnahme hinzufügen",
    noActivity: "Keine letzten Aktivitäten.", noTransactions: "Keine Transaktionen an diesem Datum.", noGoals: "Noch keine Ziele. Klicken Sie auf das + Symbol!",
    navAdd: "Hinzufügen", navDebt: "Schulden", navBills: "Rechnungen", navSplit: "Teilen", navBudget: "Budget",
    addTransactionTitle: "Transaktion hinzufügen", expenseTab: "Ausgabe", incomeTab: "Einnahme", accountLabel: "Konto",
    upcomingBills: "Anstehende Rechnungen", upcomingDebts: "Anstehende Schulden", noBillsUpcoming: "Keine Rechnungen in den nächsten 7 Tagen.", noDebtsUpcoming: "Keine Schulden in den nächsten 7 Tagen.",
    dueIn: "Fällig in", days: "Tag(en)", minPay: "Min. Zahlung", expenseBreakdown: "Ausgabenaufschlüsselung", past30Days: "Ausgaben der letzten 30 Tage",
    dailyNetCashflow: "TÄGLICHER NETTO-CASHFLOW", selectedDayTrans: "Transaktionen des ausgewählten Tages", totalSaved: "GESAMT GESPART", leftToAssign: "ZU WEISEN",
    nearestGoal: "NÄCHSTES ZIEL", estCompletion: "GESCHÄTZTE FERTIGSTELLUNG", yourGoals: "Deine Ziele", assignBtn: "Zuweisen",
    debtPayoffTitle: "Schuldenabbau", addDebtBtn: "Schulden hinzufügen", payoffStrategy: "ZAHLUNGSSTRATEGIE", extraMonthly: "ZUSÄTZLICHE MONATLICHE ZAHLUNG",
    debtFreeBy: "SCHULDENFREI BIS", totalInterest: "GESAMTZINSEN", amountLeft: "VERBLEIBENDER BETRAG", totalPaidSoFar: "BISHER BEZAHLT",
    principalProjection: "Kapitalrückzahlungsprognose", targetPriority: "Zielpriorität", activeDebts: "Aktive Schulden",
    billsAndSubsTitle: "Rechnungen & Abos", addBillBtn: "Rechnung hinzufügen", monthlyFixed: "MONATLICHE FIXKOSTEN", next7Days: "NÄCHSTE 7 TAGE",
    activeBills: "Aktive Rechnungen/Abos", logAsPaid: "Als bezahlt markieren & Datum aktualisieren", splitBillTitle: "Rechnung teilen",
    whatWasThisFor: "WOFÜR WAR DIESE RECHNUNG?", totalAmount: "GESAMTBETRAG", splitStrategy: "TEILUNGSSTRATEGIE", whoSplitting: "WER TEILT SICH DAS?",
    whoPaid: "WER HAT BEZAHLT?", calcBreakdown: "Aufschlüsselung berechnen", monthlyBudgetTitle: "Monatliches Budget", totalBudget: "GESAMTBUDGET",
    totalSpent: "GESAMTAUSGABEN", budgetVsActual: "Budget vs. Ist", categoryLimits: "Kategorielimits", spentLabel: "Ausgegeben", limitLabel: "Limit", leftLabel: "übrig",
    settingsGeneral: "Allgemein", settingsName: "Dein Name (Optional)", settingsUrl: "Google Web App URL", settingsPrefs: "Präferenzen",
    settingsCurrency: "Währung", settingsDateFormat: "Datumsformat", settingsLang: "Sprache", settingsTheme: "App-Design",
    settingsThemeDesc: "Zwischen Hell- und Dunkelmodus wechseln", settingsSwitchTheme: "Design wechseln", settingsCategories: "Kategorien",
    settingsAccounts: "Konten", settingsSaveBtn: "Einstellungen speichern", goodMorning: "Guten Morgen", goodAfternoon: "Guten Tag", goodEvening: "Guten Abend",
    sun: "SO", mon: "MO", tue: "DI", wed: "MI", thu: "DO", fri: "FR", sat: "SA",
    jan: "Januar", feb: "Februar", mar: "März", apr: "April", may: "Mai", jun: "Juni", jul: "Juli", aug: "August", sep: "September", oct: "Oktober", nov: "November", dec: "Dezember",
    todayBtn: "Heute", timeRemaining: "VERBLEIBENDE ZEIT", contributionHistory: "Beitragsverlauf", dateAssigned: "Zugewiesenes Datum",
    moRemaining: "Monate verbl.", achieved: "Erreicht! 🎉", completed: "Abgeschlossen", logPayment: "Zahlung eintragen", individualPayoff: "INDIVIDUELLE TILGUNG", individualInterest: "INDIVIDUELLE ZINSEN", paymentHistory: "Zahlungsverlauf", projectedTotalPaid: "Voraussichtlich gezahlt", historicalPayments: "Bisherige Zahlungen", mosLeft: "Monate übrig", yrs: "Jahre", paymentsTooLow: "Zahlungen zu niedrig", overdueBy: "Überfällig seit", dueToday: "Heute fällig", statusText: "STATUS", totalPaidAllTime: "INSGESAMT BEZAHLT", onTrack: "Im Plan", overdue: "Überfällig", dueSoon: "Bald fällig", missedBy: "Verpasst um", dueLabel: "Fällig"
  },
  fr: {
    navHome: "Accueil", navExpense: "Dépenses", navIncome: "Revenus", navCalendar: "Calendrier", navGoals: "Objectifs", navSettings: "Paramètres",
    dashboardTitle: "Tableau de Bord", totalBalance: "Solde Total", recentActivity: "Activité Récente",
    expenseLog: "Journal des Dépenses", incomeLog: "Journal des Revenus", date: "Date", amount: "Montant", category: "Catégorie", description: "Description",
    selectCategory: "Sélectionner une catégorie...", descPlaceholder: "C'était pour quoi ?", addExpenseBtn: "Ajouter Dépense", addIncomeBtn: "Ajouter Revenu",
    noActivity: "Aucune activité récente.", noTransactions: "Aucune transaction à cette date.", noGoals: "Pas encore d'objectifs. Cliquez sur l'icône + !",
    navAdd: "Ajouter", navDebt: "Dettes", navBills: "Factures", navSplit: "Partager", navBudget: "Budget",
    addTransactionTitle: "Ajouter une Transaction", expenseTab: "Dépense", incomeTab: "Revenu", accountLabel: "Compte",
    upcomingBills: "Factures à venir", upcomingDebts: "Dettes à venir", noBillsUpcoming: "Aucune facture dans les 7 prochains jours.", noDebtsUpcoming: "Aucune dette dans les 7 prochains jours.",
    dueIn: "Dû dans", days: "jour(s)", minPay: "Paiement Min.", expenseBreakdown: "Répartition des Dépenses", past30Days: "Dépenses des 30 derniers jours",
    dailyNetCashflow: "FLUX DE TRÉSORERIE NET QUOTIDIEN", selectedDayTrans: "Transactions du Jour Sélectionné", totalSaved: "TOTAL ÉPARGNÉ", leftToAssign: "RESTE À ASSIGNER",
    nearestGoal: "OBJECTIF LE PLUS PROCHE", estCompletion: "RÉALISATION EST.", yourGoals: "Vos Objectifs", assignBtn: "Assigner",
    debtPayoffTitle: "Remboursement de Dettes", addDebtBtn: "Ajouter une Dette", payoffStrategy: "STRATÉGIE DE REMBOURSEMENT", extraMonthly: "PAIEMENT MENSUEL SUPPLÉMENTAIRE",
    debtFreeBy: "SANS DETTE D'ICI", totalInterest: "INTÉRÊT TOTAL", amountLeft: "MONTANT RESTANT À PAYER", totalPaidSoFar: "TOTAL PAYÉ JUSQU'À PRÉSENT",
    principalProjection: "Projection du Remboursement du Capital", targetPriority: "Priorité Cible", activeDebts: "Dettes Actives",
    billsAndSubsTitle: "Factures et Abos", addBillBtn: "Ajouter une Facture", monthlyFixed: "FRAIS FIXES MENSUELS", next7Days: "PROCHAINS 7 JOURS",
    activeBills: "Factures/Abonnements Actifs", logAsPaid: "Marquer comme payé & Mettre à jour la date", splitBillTitle: "Partager la Facture",
    whatWasThisFor: "POUR QUOI ÉTAIT CETTE FACTURE ?", totalAmount: "MONTANT TOTAL", splitStrategy: "STRATÉGIE DE PARTAGE", whoSplitting: "QUI PARTAGE ?",
    whoPaid: "QUI A PAYÉ ?", calcBreakdown: "Calculer la Répartition", monthlyBudgetTitle: "Budget Mensuel", totalBudget: "BUDGET TOTAL",
    totalSpent: "TOTAL DÉPENSÉ", budgetVsActual: "Budget vs Réel", categoryLimits: "Limites par Catégorie", spentLabel: "Dépensé", limitLabel: "Limite", leftLabel: "restant",
    settingsGeneral: "Général", settingsName: "Votre Nom (Optionnel)", settingsUrl: "URL Google Web App", settingsPrefs: "Préférences",
    settingsCurrency: "Devise", settingsDateFormat: "Format de Date", settingsLang: "Langue", settingsTheme: "Thème de l'App",
    settingsThemeDesc: "Basculer entre le mode Clair et Sombre", settingsSwitchTheme: "Changer de Thème", settingsCategories: "Catégories",
    settingsAccounts: "Comptes", settingsSaveBtn: "Enregistrer les paramètres", goodMorning: "Bonjour", goodAfternoon: "Bon après-midi", goodEvening: "Bonsoir",
    sun: "DIM", mon: "LUN", tue: "MAR", wed: "MER", thu: "JEU", fri: "VEN", sat: "SAM",
    jan: "Janvier", feb: "Février", mar: "Mars", apr: "Avril", may: "Mai", jun: "Juin", jul: "Juillet", aug: "Août", sep: "Septembre", oct: "Octobre", nov: "Novembre", dec: "Décembre",
    todayBtn: "Aujourd'hui", timeRemaining: "TEMPS RESTANT", contributionHistory: "Historique des Contributions", dateAssigned: "Date Assignée",
    moRemaining: "mois restants", achieved: "Atteint ! 🎉", completed: "Terminé", logPayment: "Enregistrer le paiement", individualPayoff: "PAIEMENT INDIVIDUEL", individualInterest: "INTÉRÊT INDIVIDUEL", paymentHistory: "Historique des Paiements", projectedTotalPaid: "Total projeté payé", historicalPayments: "Paiements historiques", mosLeft: "mois restants", yrs: "ans", paymentsTooLow: "Paiements trop faibles", overdueBy: "En retard de", dueToday: "Dû aujourd'hui", statusText: "STATUT", totalPaidAllTime: "TOTAL PAYÉ (TOUJOURS)", onTrack: "En Bonne Voie", overdue: "En Retard", dueSoon: "Bientôt Dû", missedBy: "Manqué de", dueLabel: "Dû"
  },
  it: {
    navHome: "Home", navExpense: "Spese", navIncome: "Entrate", navCalendar: "Calendario", navGoals: "Obiettivi", navSettings: "Impostazioni",
    dashboardTitle: "Dashboard", totalBalance: "Saldo Totale", recentActivity: "Attività Recente",
    expenseLog: "Registro Spese", incomeLog: "Registro Entrate", date: "Data", amount: "Importo", category: "Categoria", description: "Descrizione",
    selectCategory: "Seleziona categoria...", descPlaceholder: "Per cosa era?", addExpenseBtn: "Aggiungi Spesa", addIncomeBtn: "Aggiungi Entrata",
    noActivity: "Nessuna attività recente.", noTransactions: "Nessuna transazione in questa data.", noGoals: "Ancora nessun obiettivo. Clicca sull'icona + in alto!",
    navAdd: "Aggiungi", navDebt: "Debiti", navBills: "Bollette", navSplit: "Dividi", navBudget: "Budget",
    addTransactionTitle: "Aggiungi Transazione", expenseTab: "Spesa", incomeTab: "Entrata", accountLabel: "Conto",
    upcomingBills: "Prossime Bollette", upcomingDebts: "Prossimi Debiti", noBillsUpcoming: "Nessuna bolletta nei prossimi 7 giorni.", noDebtsUpcoming: "Nessun debito nei prossimi 7 giorni.",
    dueIn: "Scade in", days: "giorno/i", minPay: "Pagamento Min.", expenseBreakdown: "Ripartizione Spese", past30Days: "Spese degli ultimi 30 giorni",
    dailyNetCashflow: "FLUSSO DI CASSA NETTO GIORNALIERO", selectedDayTrans: "Transazioni del Giorno Selezionato", totalSaved: "TOTALE RISPARMIATO", leftToAssign: "DA ASSEGNARE",
    nearestGoal: "OBIETTIVO PIÙ VICINO", estCompletion: "COMPLETAMENTO STIMATO", yourGoals: "I Tuoi Obiettivi", assignBtn: "Assegna",
    debtPayoffTitle: "Pagamento Debiti", addDebtBtn: "Aggiungi Debito", payoffStrategy: "STRATEGIA DI PAGAMENTO", extraMonthly: "PAGAMENTO MENSILE EXTRA",
    debtFreeBy: "SENZA DEBITI ENTRO", totalInterest: "INTERESSE TOTALE", amountLeft: "IMPORTO RIMANENTE", totalPaidSoFar: "TOTALE PAGATO FINORA",
    principalProjection: "Proiezione Pagamento Capitale", targetPriority: "Priorità Obiettivo", activeDebts: "Debiti Attivi",
    billsAndSubsTitle: "Bollette e Abb.", addBillBtn: "Aggiungi Bolletta", monthlyFixed: "COSTI FISSI MENSILI", next7Days: "PROSSIMI 7 GIORNI",
    activeBills: "Bollette/Abbonamenti Attivi", logAsPaid: "Segna come pagato & Aggiorna data", splitBillTitle: "Dividi Conto",
    whatWasThisFor: "PER COSA ERA QUESTO CONTO?", totalAmount: "IMPORTO TOTALE", splitStrategy: "STRATEGIA DI DIVISIONE", whoSplitting: "CHI DIVIDE?",
    whoPaid: "CHI HA PAGATO?", calcBreakdown: "Calcola Ripartizione", monthlyBudgetTitle: "Budget Mensile", totalBudget: "BUDGET TOTALE",
    totalSpent: "TOTALE SPESO", budgetVsActual: "Budget vs Consuntivo", categoryLimits: "Limiti Categoria", spentLabel: "Speso", limitLabel: "Limite", leftLabel: "rimanente",
    settingsGeneral: "Generale", settingsName: "Tuo Nome (Opzionale)", settingsUrl: "URL Google Web App", settingsPrefs: "Preferenze",
    settingsCurrency: "Valuta", settingsDateFormat: "Formato Data", settingsLang: "Lingua", settingsTheme: "Tema App",
    settingsThemeDesc: "Alterna tra modalità Chiara e Scura", settingsSwitchTheme: "Cambia Tema", settingsCategories: "Categorie",
    settingsAccounts: "Conti", settingsSaveBtn: "Salva Impostazioni", goodMorning: "Buongiorno", goodAfternoon: "Buon pomeriggio", goodEvening: "Buonasera",
    sun: "DOM", mon: "LUN", tue: "MAR", wed: "MER", thu: "GIO", fri: "VEN", sat: "SAB",
    jan: "Gennaio", feb: "Febbraio", mar: "Marzo", apr: "Aprile", may: "Maggio", jun: "Giugno", jul: "Luglio", aug: "Agosto", sep: "Settembre", oct: "Ottobre", nov: "Novembre", dec: "Dicembre",
    todayBtn: "Oggi", timeRemaining: "TEMPO RIMANENTE", contributionHistory: "Cronologia Contributi", dateAssigned: "Data Assegnata",
    moRemaining: "mesi rimasti", achieved: "Raggiunto! 🎉", completed: "Completato", logPayment: "Registra Pagamento", individualPayoff: "PAGAMENTO INDIVIDUALE", individualInterest: "INTERESSE INDIVIDUALE", paymentHistory: "Cronologia Pagamenti", projectedTotalPaid: "Totale previsto pagato", historicalPayments: "Pagamenti storici", mosLeft: "mesi rimasti", yrs: "anni", paymentsTooLow: "Pagamenti troppo bassi", overdueBy: "In ritardo di", dueToday: "Scade Oggi", statusText: "STATO", totalPaidAllTime: "TOTALE PAGATO (SEMPRE)", onTrack: "In Regola", overdue: "In Ritardo", dueSoon: "Scade Presto", missedBy: "In ritardo di", dueLabel: "Scade"
  },
  pt: {
    navHome: "Início", navExpense: "Despesas", navIncome: "Receitas", navCalendar: "Calendário", navGoals: "Metas", navSettings: "Configurações",
    dashboardTitle: "Painel", totalBalance: "Saldo Total", recentActivity: "Atividade Recente",
    expenseLog: "Registro de Despesas", incomeLog: "Registro de Receitas", date: "Data", amount: "Valor", category: "Categoria", description: "Descrição",
    selectCategory: "Selecionar categoria...", descPlaceholder: "Para que foi isso?", addExpenseBtn: "Adicionar Despesa", addIncomeBtn: "Adicionar Receita",
    noActivity: "Nenhuma atividade recente.", noTransactions: "Nenhuma transação nesta data.", noGoals: "Ainda não há metas. Clique no ícone + acima!",
    navAdd: "Adicionar", navDebt: "Dívidas", navBills: "Contas", navSplit: "Dividir", navBudget: "Orçamento",
    addTransactionTitle: "Adicionar Transação", expenseTab: "Despesa", incomeTab: "Receita", accountLabel: "Conta",
    upcomingBills: "Próximas Contas", upcomingDebts: "Próximas Dívidas", noBillsUpcoming: "Nenhuma conta nos próximos 7 dias.", noDebtsUpcoming: "Nenhuma dívida nos próximos 7 dias.",
    dueIn: "Vence em", days: "dia(s)", minPay: "Pagamento Mín.", expenseBreakdown: "Distribuição de Despesas", past30Days: "Despesas dos últimos 30 dias",
    dailyNetCashflow: "FLUXO DE CAIXA LÍQUIDO DIÁRIO", selectedDayTrans: "Transações do Dia Selecionado", totalSaved: "TOTAL ECONOMIZADO", leftToAssign: "FALTA ATRIBUIR",
    nearestGoal: "META MAIS PRÓXIMA", estCompletion: "CONCLUSÃO EST.", yourGoals: "Suas Metas", assignBtn: "Atribuir",
    debtPayoffTitle: "Pagamento de Dívidas", addDebtBtn: "Adicionar Dívida", payoffStrategy: "ESTRATÉGIA DE PAGAMENTO", extraMonthly: "PAGAMENTO MENSAL EXTRA",
    debtFreeBy: "LIVRE DE DÍVIDAS EM", totalInterest: "JUROS TOTAIS", amountLeft: "VALOR RESTANTE", totalPaidSoFar: "TOTAL PAGO ATÉ AGORA",
    principalProjection: "Projeção de Pagamento do Principal", targetPriority: "Prioridade Alvo", activeDebts: "Dívidas Ativas",
    billsAndSubsTitle: "Contas e Assinaturas", addBillBtn: "Adicionar Conta", monthlyFixed: "CUSTOS FIXOS MENSAIS", next7Days: "PRÓXIMOS 7 DIAS",
    activeBills: "Contas/Assinaturas Ativas", logAsPaid: "Marcar como pago & Atualizar data", splitBillTitle: "Dividir Conta",
    whatWasThisFor: "PARA QUE FOI ESTA CONTA?", totalAmount: "VALOR TOTAL", splitStrategy: "ESTRATÉGIA DE DIVISÃO", whoSplitting: "QUEM ESTÁ DIVIDINDO?",
    whoPaid: "QUEM PAGOU A CONTA?", calcBreakdown: "Calcular Distribuição", monthlyBudgetTitle: "Orçamento Mensal", totalBudget: "ORÇAMENTO TOTAL",
    totalSpent: "TOTAL GASTO", budgetVsActual: "Orçamento vs Real", categoryLimits: "Limites por Categoria", spentLabel: "Gasto", limitLabel: "Limite", leftLabel: "restante",
    settingsGeneral: "Geral", settingsName: "Seu Nome (Opcional)", settingsUrl: "URL do Google Web App", settingsPrefs: "Preferências",
    settingsCurrency: "Moeda", settingsDateFormat: "Formato de Data", settingsLang: "Idioma", settingsTheme: "Tema do App",
    settingsThemeDesc: "Alternar entre modo Claro e Escuro", settingsSwitchTheme: "Mudar Tema", settingsCategories: "Categorias",
    settingsAccounts: "Contas", settingsSaveBtn: "Salvar Configurações", goodMorning: "Bom dia", goodAfternoon: "Boa tarde", goodEvening: "Boa noite",
    sun: "DOM", mon: "SEG", tue: "TER", wed: "QUA", thu: "QUI", fri: "SEX", sat: "SÁB",
    jan: "Janeiro", feb: "Fevereiro", mar: "Março", apr: "Abril", may: "Maio", jun: "Junho", jul: "Julho", aug: "Agosto", sep: "Setembro", oct: "Outubro", nov: "Novembro", dec: "Dezembro",
    todayBtn: "Hoje", timeRemaining: "TEMPO RESTANTE", contributionHistory: "Histórico de Contribuições", dateAssigned: "Data Atribuída",
    moRemaining: "meses rest.", achieved: "Alcançado! 🎉", completed: "Concluído", logPayment: "Registrar Pagamento", individualPayoff: "PAGAMENTO INDIVIDUAL", individualInterest: "JUROS INDIVIDUAIS", paymentHistory: "Histórico de Pagamentos", projectedTotalPaid: "Total projetado", historicalPayments: "Pagamentos históricos", mosLeft: "meses rest.", yrs: "anos", paymentsTooLow: "Pagamentos muito baixos", overdueBy: "Atrasado em", dueToday: "Vence Hoje", statusText: "STATUS", totalPaidAllTime: "TOTAL PAGO (SEMPRE)", onTrack: "Em Dia", overdue: "Atrasado", dueSoon: "Vence em Breve", missedBy: "Atrasado por", dueLabel: "Vence"
  },
  nl: {
    navHome: "Start", navExpense: "Uitgaven", navIncome: "Inkomsten", navCalendar: "Kalender", navGoals: "Doelen", navSettings: "Instellingen",
    dashboardTitle: "Dashboard", totalBalance: "Totaalsaldo", recentActivity: "Recente Activiteit",
    expenseLog: "Uitgavenlogboek", incomeLog: "Inkomstenlogboek", date: "Datum", amount: "Bedrag", category: "Categorie", description: "Beschrijving",
    selectCategory: "Selecteer categorie...", descPlaceholder: "Waar was dit voor?", addExpenseBtn: "Uitgave toevoegen", addIncomeBtn: "Inkomst toevoegen",
    noActivity: "Geen recente activiteit.", noTransactions: "Geen transacties op deze datum.", noGoals: "Nog geen doelen. Klik op het + icoon hierboven!",
    navAdd: "Toevoegen", navDebt: "Schulden", navBills: "Rekeningen", navSplit: "Verdelen", navBudget: "Budget",
    addTransactionTitle: "Transactie Toevoegen", expenseTab: "Uitgave", incomeTab: "Inkomsten", accountLabel: "Rekening",
    upcomingBills: "Aankomende Rekeningen", upcomingDebts: "Aankomende Schulden", noBillsUpcoming: "Geen rekeningen in de komende 7 dagen.", noDebtsUpcoming: "Geen schulden in de komende 7 dagen.",
    dueIn: "Vervalt over", days: "dag(en)", minPay: "Min. Betaling", expenseBreakdown: "Uitgavenoverzicht", past30Days: "Uitgaven afgelopen 30 dagen",
    dailyNetCashflow: "DAGELIJKSE NETTO KASSTROOM", selectedDayTrans: "Transacties Geselecteerde Dag", totalSaved: "TOTAAL GESPAARD", leftToAssign: "NOG TOE TE WIJZEN",
    nearestGoal: "DICHTSTBIJZIJNDE DOEL", estCompletion: "VERWACHTE VOLTOOIING", yourGoals: "Jouw Doelen", assignBtn: "Toewijzen",
    debtPayoffTitle: "Schulden Aflossen", addDebtBtn: "Schuld Toevoegen", payoffStrategy: "AFLOSSINGSSTRATEGIE", extraMonthly: "EXTRA MAANDELIJKSE BETALING",
    debtFreeBy: "SCHULDENVRIJ IN", totalInterest: "TOTALE RENTE", amountLeft: "RESTEREND BEDRAG", totalPaidSoFar: "TOTAAL BETAALD TOT NU TOE",
    principalProjection: "Prognose Kapitaalaflossing", targetPriority: "Doelprioriteit", activeDebts: "Actieve Schulden",
    billsAndSubsTitle: "Rekeningen & Abo's", addBillBtn: "Rekening Toevoegen", monthlyFixed: "MAANDELIJKSE VASTE KOSTEN", next7Days: "KOMENDE 7 DAGEN",
    activeBills: "Actieve Rekeningen/Abonnementen", logAsPaid: "Markeren als betaald & Datum bijwerken", splitBillTitle: "Rekening Verdelen",
    whatWasThisFor: "WAARVOOR WAS DEZE REKENING?", totalAmount: "TOTAALBEDRAG", splitStrategy: "VERDEELSTRATEGIE", whoSplitting: "WIE VERDEELT ER?",
    whoPaid: "WIE HEEFT BETAALD?", calcBreakdown: "Verdeling Berekenen", monthlyBudgetTitle: "Maandelijks Budget", totalBudget: "TOTAAL BUDGET",
    totalSpent: "TOTAAL UITGEGEVEN", budgetVsActual: "Budget vs Werkelijk", categoryLimits: "Categorielimieten", spentLabel: "Uitgegeven", limitLabel: "Limiet", leftLabel: "over",
    settingsGeneral: "Algemeen", settingsName: "Jouw Naam (Optioneel)", settingsUrl: "Google Web App URL", settingsPrefs: "Voorkeuren",
    settingsCurrency: "Valuta", settingsDateFormat: "Datumformaat", settingsLang: "Taal", settingsTheme: "App Thema",
    settingsThemeDesc: "Schakel tussen Lichte en Donkere modus", settingsSwitchTheme: "Thema Wijzigen", settingsCategories: "Categorieën",
    settingsAccounts: "Rekeningen", settingsSaveBtn: "Instellingen Opslaan", goodMorning: "Goedemorgen", goodAfternoon: "Goedemiddag", goodEvening: "Goedenavond",
    sun: "ZO", mon: "MA", tue: "DI", wed: "WO", thu: "DO", fri: "VR", sat: "ZA",
    jan: "Januari", feb: "Februari", mar: "Maart", apr: "April", may: "Mei", jun: "Juni", jul: "Juli", aug: "Augustus", sep: "September", oct: "Oktober", nov: "November", dec: "December",
    todayBtn: "Vandaag", timeRemaining: "RESTERENDE TIJD", contributionHistory: "Bijdragegeschiedenis", dateAssigned: "Datum Toegewezen",
    moRemaining: "mnd resterend", achieved: "Behaald! 🎉", completed: "Voltooid", logPayment: "Betaling Registreren", individualPayoff: "INDIVIDUELE AFLOSSING", individualInterest: "INDIVIDUELE RENTE", paymentHistory: "Betalingsgeschiedenis", projectedTotalPaid: "Verwacht totaal betaald", historicalPayments: "Historische betalingen", mosLeft: "mnd over", yrs: "jaar", paymentsTooLow: "Betalingen te laag", overdueBy: "Te laat met", dueToday: "Vervalt Vandaag", statusText: "STATUS", totalPaidAllTime: "TOTAAL BETAALD (ALTIJD)", onTrack: "Op Schema", overdue: "Te Laat", dueSoon: "Vervalt Binnenkort", missedBy: "Te laat met", dueLabel: "Vervalt"
  }
};

function applyTranslations(lang) {
  const dict = i18n[lang] || i18n['en'];
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (dict[key]) element.innerText = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (dict[key]) element.placeholder = dict[key];
  });
}

let SCRIPT_URL = userSettings.url;
let globalTransactions = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentSelectedDate = null;
let currentTimeRange = 'all';

// --- 1. NAVIGATION & INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  try { initSettings(); } catch(e) { console.warn("Init bypassed:", e); }
  try { initSplitPage(); } catch(e) { console.warn("Split init bypassed:", e); }

  // NEW: Restore saved debt preferences on page load
  const savedDebt = JSON.parse(localStorage.getItem('debtSettings')) || { strategy: 'avalanche', extra: 0 };
  if (document.getElementById('debt-strategy')) document.getElementById('debt-strategy').value = savedDebt.strategy;
  if (document.getElementById('debt-extra-payment')) document.getElementById('debt-extra-payment').value = savedDebt.extra;

  document.querySelectorAll('.currency-input span').forEach(span => {
    span.innerText = userSettings.currency;
  });

  const transDate = document.getElementById('trans-date');
  if (transDate) {
    transDate.value = new Date().toISOString().split('T')[0];
    setTransactionType('Expense'); 
  }

  const navBtns = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (targetId) { // Only run for actual pages
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
          
          // 1. Remove active class from ALL navigation buttons completely
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove("active"));
          
          // 2. Highlight the EXACT button that was clicked
          btn.classList.add("active");
          
          // 3. (Mobile Only) If it's a submenu item, also light up its parent category icon
          if (btn.classList.contains('sub-nav-btn')) {
            const parentMenu = btn.closest('.nav-menu-container');
            if (parentMenu) {
              const toggle = parentMenu.querySelector('.menu-toggle');
              if (toggle) toggle.classList.add("active");
            }
          }
          
          // 4. Switch the page
          pages.forEach(p => p.classList.remove("active"));
          targetPage.classList.add("active");
          
          // 5. Close menus
          document.querySelectorAll('.nav-submenu').forEach(m => m.classList.remove('show'));
        }
      }
    });
  });

  // Remove the URL lock and always load the dashboard
  loadDashboardData();

  // NEW: Set dynamic greeting
  updateGreeting();

  // Auto-open native calendar picker when clicking any date field
  document.querySelectorAll('input[type="date"]').forEach(dateInput => {
    dateInput.addEventListener('click', function() {
      try {
        this.showPicker();
      } catch (e) {
        // Silently ignore on unsupported older browsers
      }
    });
  });

  // UNIFIED FORM SUBMISSION (Optimized for Offline & Instant Speed)
  const transactionForm = document.getElementById('transaction-form');
  if (transactionForm) {
    transactionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('trans-submit-btn');
      const originalText = btn.innerText;
      btn.innerText = "Saving...";
      btn.disabled = true;

      const transType = document.getElementById('trans-type').value;
      const transDate = document.getElementById('trans-date').value;
      const transAmount = parseFloat(document.getElementById('trans-amount').value) || 0;
      const transCategory = document.getElementById('trans-category').value;
      const transAccount = document.getElementById('trans-account') ? document.getElementById('trans-account').value : userSettings.accounts[0];
      const transDesc = document.getElementById('trans-desc') ? document.getElementById('trans-desc').value : '';
      const newId = Date.now().toString();

      const payload = {
        action: 'add',
        id: newId,
        type: transType,
        date: transDate,
        amount: transAmount,
        category: transCategory,
        description: transDesc,
        account: transAccount
      };

      // 1. INSTANT LOCAL UPDATE
      globalTransactions.push({ ID: newId, Type: transType, Date: transDate, Amount: transAmount, Category: transCategory, Description: transDesc, Account: transAccount });
      localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));

      // 2. RESET FORM & REDIRECT
      transactionForm.reset();
      document.getElementById('trans-date').value = new Date().toISOString().split('T')[0];
      const homeBtn = document.querySelector('.nav-btn[data-target="dashboard-page"]');
      if (homeBtn) homeBtn.click();

      // 3. REDRAW UI
      processAndRenderDashboard();

      btn.innerText = originalText;
      btn.disabled = false;

      // 4. OFFLINE QUEUE
      queueAndSync(payload);
    });
  }

  // Update Budget Form Listener to save with month key
const budgetForm = document.getElementById('budget-form');
if (budgetForm) {
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('budget-category-id').value;
    const limit = parseFloat(document.getElementById('budget-amount').value) || 0;
    
    const monthKey = `${viewingBudgetYear}-${String(viewingBudgetMonth + 1).padStart(2, '0')}`;
    userSettings.budgets[monthKey] = userSettings.budgets[monthKey] || {};
    userSettings.budgets[monthKey][category] = limit;
    
    localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
    
    document.getElementById('budget-modal').style.display = 'none';
    renderBudgetPage(); 

    const payload = {
      action: 'updateBudget',
      month: monthKey,
      category: category,
      limit: limit
    };
    if (typeof queueAndSync === "function") queueAndSync(payload);
  });
}

  // CALENDAR LISTENERS
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderFullCalendar();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderFullCalendar();
    });
  }

  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  if (yearSelect) {
    yearSelect.innerHTML = '';
    const currentY = new Date().getFullYear();
    for (let i = currentY - 5; i <= currentY + 5; i++) {
      yearSelect.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }
  }
  if (monthSelect) monthSelect.value = currentMonth;
  if (yearSelect) yearSelect.value = currentYear;

  if (monthSelect && yearSelect) {
    monthSelect.addEventListener('change', (e) => { currentMonth = parseInt(e.target.value); renderFullCalendar(); });
    yearSelect.addEventListener('change', (e) => { currentYear = parseInt(e.target.value); renderFullCalendar(); });
  }
});

// --- CORE UTILITY FUNCTIONS ---
function queueAndSync(payload) {
  let pendingQueue = JSON.parse(localStorage.getItem('pending_transactions') || '[]');
  pendingQueue.push(payload);
  localStorage.setItem('pending_transactions', JSON.stringify(pendingQueue));
  if (typeof syncPendingTransactions === 'function') syncPendingTransactions();
}

function deleteTransaction(id) {
  if (!confirm('Are you sure you want to delete this?')) return;
  
  // 1. Force both to strings to fix the Google Sheets Number/String mismatch
  globalTransactions = globalTransactions.filter(t => String(t.ID) !== String(id));
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));

  // 2. Fire to Offline Queue immediately
  queueAndSync({ action: 'delete', id: String(id) });

  // 3. Instantly update UI 
  processAndRenderDashboard(); 
}

function formatAppDate(dateString) {
  if (!dateString) return 'No date';
  const d = new Date(dateString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  if (userSettings.dateFormat === 'DD/MM/YYYY') return `${dd}/${mm}/${yyyy}`;
  if (userSettings.dateFormat === 'YYYY-MM-DD') return `${yyyy}-${mm}-${dd}`;
  return `${mm}/${dd}/${yyyy}`; 
}

// --- NUMBER COUNT-UP ANIMATION ---
function animateValue(elementId, endValue, duration) {
  const obj = document.getElementById(elementId);
  if (!obj) return;
  
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Ease-out effect so it slows down near the end
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const currentVal = (easeProgress * endValue).toFixed(2);
    
    // Format with currency
    obj.innerText = `${userSettings.currency}${currentVal}`;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      // Ensure the exact final value is set when finished
      obj.innerText = `${userSettings.currency}${endValue.toFixed(2)}`;
    }
  };
  window.requestAnimationFrame(step);
}

// --- QUICK ADD NAVIGATION ---
function navigateToAddTransaction(prefillDate = null) {
  // 1. Clear active states
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  
  // 2. Dynamically find whichever page holds your unified transaction form
  const formEl = document.getElementById('transaction-form');
  const addPage = formEl ? formEl.closest('.page') : document.getElementById('add-page');
  
  if (addPage) {
    addPage.classList.add("active"); // Show the page
    
    // Light up the correct button in the sidebar based on the page ID
    const addNavBtn = document.querySelector(`.nav-btn[data-target="${addPage.id}"]`);
    if (addNavBtn) addNavBtn.classList.add("active");
  }
  
  // 3. Handle Date Pre-filling
  const transDateInput = document.getElementById('trans-date');
  if (prefillDate && transDateInput) {
    transDateInput.value = prefillDate;
  } else if (transDateInput) {
    transDateInput.value = new Date().toISOString().split('T')[0];
  }
  
  // 4. Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (addPage) addPage.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- UNIFIED TRANSACTION TOGGLE ---
function setTransactionType(type) {
  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  const typeInput = document.getElementById('trans-type');
  const expBtn = document.getElementById('type-expense-btn');
  const incBtn = document.getElementById('type-income-btn');
  const submitBtn = document.getElementById('trans-submit-btn');
  
  if (!typeInput || !expBtn || !incBtn || !submitBtn) return; 

  typeInput.value = type;
  
  if (type === 'Expense') {
    expBtn.style.background = 'var(--text-main)';
    expBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    expBtn.style.color = 'var(--bg-color)';
    expBtn.style.fontWeight = 'bold';
    
    incBtn.style.background = 'transparent';
    incBtn.style.boxShadow = 'none';
    incBtn.style.color = 'var(--text-muted)';
    incBtn.style.fontWeight = '500';
    
    submitBtn.style.background = 'var(--danger)';
    submitBtn.innerText = dict.addExpenseBtn;
  } else {
    incBtn.style.background = 'var(--text-main)';
    incBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    incBtn.style.color = 'var(--bg-color)';
    incBtn.style.fontWeight = 'bold';
    
    expBtn.style.background = 'transparent';
    expBtn.style.boxShadow = 'none';
    expBtn.style.color = 'var(--text-muted)';
    expBtn.style.fontWeight = '500';
    
    submitBtn.style.background = 'var(--accent-color)';
    submitBtn.innerText = dict.addIncomeBtn;
  }
  
  populateCategoryDropdowns();
}

// --- 3. DASHBOARD LOGIC (SPLIT FOR SPEED) ---
async function loadDashboardData() {
  const cachedData = localStorage.getItem('budget_app_transactions');
  if (cachedData) {
    try {
      globalTransactions = JSON.parse(cachedData);
      processAndRenderDashboard();
    } catch (e) {
      console.error("Cache parse error", e);
    }
  }

  // Only attempt cloud fetch if a URL exists
  if (SCRIPT_URL) {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=get`);
      const data = await response.json();
      if (Array.isArray(data)) {
        const newDataString = JSON.stringify(data);
        
        // NEW: Only redraw and re-animate if the data actually changed
        if (cachedData !== newDataString) {
          globalTransactions = data;
          localStorage.setItem('budget_app_transactions', newDataString);
          processAndRenderDashboard(); 
        }
      }
    } catch (error) {
      console.error("Failed to sync fresh data, using local cache.", error);
    }
  }
}

// Renders the entire UI from memory instantaneously
function processAndRenderDashboard() {
  const activityList = document.getElementById('recent-activity-list');
  if (!activityList) return;

  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  
  let totalBalance = 0, totalIncome = 0, totalExpense = 0;
  let totalSavingsPool = 0, allocatedSavings = 0;
  let goalSavedAmounts = {}; 
  let dynamicGoals = []; 
  let uniqueCategories = new Set();
  
  activityList.innerHTML = ''; 

  if (!globalTransactions || globalTransactions.length === 0) {
    activityList.innerHTML = `<p class="empty-state">${dict.noActivity}</p>`;
    document.getElementById('dash-total-balance').innerText = `${userSettings.currency}0.00`;
    try { renderFullCalendar(); } catch (e) { console.error("Calendar Empty State Error:", e); }
    try { renderGoals({}, []); } catch (e) { console.error("Goals Empty State Error:", e); }
    return;
  }

  // Faster batch HTML string generation
  let activityHtmlBuffer = '';
  let displayedCount = 0; // Tracker for the 10-item limit

  // Sort transactions chronologically (Newest Date first). 
  const sortedTransactions = [...globalTransactions].sort((a, b) => {
    const dateA = new Date(a.Date || 0).getTime();
    const dateB = new Date(b.Date || 0).getTime();
    if (dateA === dateB) return Number(b.ID) - Number(a.ID);
    return dateB - dateA;
  });

  sortedTransactions.forEach(transaction => {
    const amount = parseFloat(transaction.Amount) || 0; 
    
    // KPI calculations (these must still process all-time data)
    if (transaction.Type === 'Goal Definition') {
      dynamicGoals.push({ id: transaction.ID, name: transaction.Category, target: amount });
    }
    if (transaction.Type === 'Income') {
      totalBalance += amount;
      totalIncome += amount;
      if (transaction.Category) uniqueCategories.add(transaction.Category);
    }
    if (transaction.Type === 'Expense') {
      totalBalance -= amount;
      totalExpense += amount;
      if (transaction.Category) uniqueCategories.add(transaction.Category);
      if (transaction.Category === 'Savings') totalSavingsPool += amount;
    }
    if (transaction.Type === 'Goal Allocation') {
      allocatedSavings += amount;
      goalSavedAmounts[transaction.Category] = (goalSavedAmounts[transaction.Category] || 0) + amount;
    }

    // HTML List Generation (Strictly limited to 10 items)
    if (transaction.Type !== 'Goal Allocation' && transaction.Type !== 'Goal Definition' && transaction.Type !== 'Subscription' && transaction.Type !== 'Debt Definition') {
      if (displayedCount < 10) {
        const isIncome = transaction.Type === 'Income';
        const amountClass = isIncome ? 'amount-income' : 'amount-expense';
        const sign = isIncome ? '+' : '-';
        
        // Generate Account Tag
        const accBadge = transaction.Account ? `<span style="font-size: 10px; background: var(--bg-color); padding: 2px 6px; border-radius: 4px; margin-left: 6px; color: var(--text-muted); border: 1px solid var(--border-color);"><i class="fa-solid fa-building-columns" style="margin-right: 3px;"></i>${transaction.Account}</span>` : '';
        
        const safeDesc = transaction.Description ? transaction.Description.replace(/'/g, "\\'") : '';
        const safeAcct = transaction.Account || userSettings.accounts[0];
        
        // Hide Edit button if it's a system-linked Bill or Debt Payment
        const isSystemLinked = transaction.Category === 'Bills' || transaction.Category === 'Debt Payment';
        const editBtnHtml = isSystemLinked ? '' : `<button onclick="openEditModal('${transaction.ID}', '${transaction.Type}', '${transaction.Category}', '${amount}', '${transaction.Date}', '${safeDesc}', '${safeAcct}')" style="background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;"><i class="fa-solid fa-pen"></i> Edit</button>`;
        
        activityHtmlBuffer += `
          <div class="transaction-item" data-category="${transaction.Category || ''}">
            <div class="transaction-info">
              <span class="transaction-title">${transaction.Category || 'Unknown'} ${accBadge}</span>
              <span class="transaction-date">${formatAppDate(transaction.Date)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="transaction-amount ${amountClass}" data-amount="${amount}" data-type="${transaction.Type}">${sign}${userSettings.currency}${amount.toFixed(2)}</span>
              <div style="display: flex; gap: 6px;">
                ${editBtnHtml}
                <button onclick="deleteTransaction('${transaction.ID}')" style="background: rgba(231, 76, 60, 0.1); color: var(--danger); border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;"><i class="fa-solid fa-trash"></i> Delete</button>
              </div>
            </div>
          </div>
        `;
        displayedCount++;
      }
    }

    // Force the "All" category filter to be selected by default
    filterDashboard('All');
  });

  // Display a fallback message if no transactions exist
  if (activityHtmlBuffer === '') {
    activityHtmlBuffer = '<p class="empty-state" style="padding: 20px; text-align: center; color: var(--text-muted);">No recent activity.</p>';
  }

  activityList.innerHTML = activityHtmlBuffer; // Apply all at once

  // Run Dashboard specific updates safely
  try { filterDashboardTime(currentTimeRange); } catch (e) { console.warn("Time Filter issue:", e); }
  
  const filterContainer = document.getElementById('dash-category-filters');
  if (filterContainer) {
    let pillsHtml = `<button class="pill-btn active filter-btn" onclick="filterDashboard('All')" style="background: var(--text-main); color: var(--bg-color); white-space: nowrap; border: 1px solid var(--text-main); padding: 8px 16px; border-radius: 20px; cursor: pointer;">All</button>`;
    Array.from(uniqueCategories).sort().forEach(cat => {
      pillsHtml += `<button class="pill-btn filter-btn" onclick="filterDashboard('${cat}')" style="background: transparent; color: var(--text-main); border: 1px solid var(--border-color); white-space: nowrap; padding: 8px 16px; border-radius: 20px; cursor: pointer; transition: 0.2s;">${cat}</button>`;
    });
    filterContainer.innerHTML = pillsHtml;
  }

  const unallocated = totalSavingsPool - allocatedSavings;
  const kpiTotal = document.getElementById('total-saved-kpi');
  const kpiUnallocated = document.getElementById('unallocated-kpi');
  if (kpiTotal) kpiTotal.innerText = `${userSettings.currency}${totalSavingsPool.toFixed(2)}`;
  if (kpiUnallocated) kpiUnallocated.innerText = `${userSettings.currency}${unallocated.toFixed(2)}`;

  // --- ISOLATED PAGE RENDERING --- 
  // By separating these in try/catch blocks, one corrupted page will never blank out the rest of the app again!
  try { filterDashboard('All'); } catch (e) { console.error("Filter All Error:", e); }
  try { renderFullCalendar(); } catch (e) { console.error("Calendar Error:", e); }
  try { renderGoals(goalSavedAmounts, dynamicGoals); } catch (e) { console.error("Goals Error:", e); }
  try { renderDashboardSparkline(); } catch (e) { console.error("Sparkline Error:", e); }
  try { renderBillsPage(); } catch (e) { console.error("Bills Error:", e); }
  try { renderDebtPage(); } catch (e) { console.error("Debt Error:", e); }
  try { renderDashboardUpcoming(); } catch (e) { console.error("Upcoming Error:", e); }
  try { renderBudgetPage(); } catch (e) { console.error("Budget Error:", e); }
  
  if (currentSelectedDate) {
    const activeCell = document.querySelector('.calendar-cell.selected');
    if (activeCell) {
      try { renderCalendarDay(currentSelectedDate, activeCell); } catch (e) { console.error("Selected Day Error:", e); }
    }
  }
}

// --- UPDATE DASHBOARD GREETING ---
function updateGreeting() {
  const greetingEl = document.getElementById('dashboard-greeting');
  if (!greetingEl) return;
  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  
  const currentHour = new Date().getHours();
  let timeGreeting = dict.goodEvening;
  if (currentHour < 12) timeGreeting = dict.goodMorning;
  else if (currentHour < 18) timeGreeting = dict.goodAfternoon;

  const userName = userSettings.name && userSettings.name.trim() !== "" ? userSettings.name.trim() : "";
  greetingEl.innerText = userName ? `${timeGreeting}, ${userName}!` : `${timeGreeting}!`;
}

// --- UPDATE DASHBOARD GREETING ---
function updateGreeting() {
  const greetingEl = document.getElementById('dashboard-greeting');
  const dateEl = document.getElementById('dashboard-date');
  if (!greetingEl) return;

  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  
  const today = new Date();
  const currentHour = today.getHours();
  
  // 1. Set the Greeting
  let timeGreeting = dict.goodEvening;
  if (currentHour < 12) timeGreeting = dict.goodMorning;
  else if (currentHour < 18) timeGreeting = dict.goodAfternoon;

  const userName = userSettings.name && userSettings.name.trim() !== "" ? userSettings.name.trim() : "";
  greetingEl.innerText = userName ? `${timeGreeting}, ${userName}!` : `${timeGreeting}!`;

  // 2. Set the localized Date
  if (dateEl) {
    // Map internal language codes to standard locale codes for perfect native formatting
    const localeMap = { en: 'en-US', es: 'es-ES', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', pt: 'pt-BR', nl: 'nl-NL' };
    const activeLocale = localeMap[lang] || 'en-US';
    
    const formattedDate = today.toLocaleDateString(activeLocale, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Capitalize the first letter (as some languages default to lowercase days)
    dateEl.innerText = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
}

// --- 4. RENDER CALENDAR DAY FUNCTION (Fixed Event Bug) ---
function renderCalendarDay(selectedDate, cellElement) {
  currentSelectedDate = selectedDate; 
  const dailyTotalElement = document.getElementById('calendar-daily-total');
  const calendarList = document.getElementById('calendar-activity-list');
  if (!dailyTotalElement || !calendarList) return;
  
  document.querySelectorAll('.calendar-cell').forEach(cell => cell.classList.remove('selected'));
  if (cellElement) cellElement.classList.add('selected'); // Safely targets the clicked cell

  calendarList.innerHTML = '';
  let dailyTotal = 0;
  
  const dayTransactions = globalTransactions.filter(transaction => {
    if (!transaction.Date) return false;
    
    // Hide Goals, Subscriptions, and Debt Definitions from the cashflow list
    if (transaction.Type === 'Goal Definition' || transaction.Type === 'Subscription' || transaction.Type === 'Debt Definition') return false; 
    
    // Safely parse all date formats (Sheets or ISO) so it perfectly matches the grid
    const d = new Date(transaction.Date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}` === selectedDate;
  });
  
  if (dayTransactions.length === 0) {
    const lang = userSettings.language;
    calendarList.innerHTML = `<p class="empty-state">${i18n[lang] ? i18n[lang].noTransactions : i18n['en'].noTransactions}</p>`;
    dailyTotalElement.innerText = '$0.00';
    return;
  }
  
  let listHtmlBuffer = '';
  dayTransactions.forEach(transaction => {
    const amount = parseFloat(transaction.Amount) || 0;
    if (transaction.Type === 'Income') dailyTotal += amount;
    if (transaction.Type === 'Expense') dailyTotal -= amount;
    
    const isIncome = transaction.Type === 'Income';
    const amountClass = isIncome ? 'amount-income' : 'amount-expense';
    const sign = isIncome ? '+' : '-';
    
    // NEW: Generate Account Tag
    const accBadge = transaction.Account ? `<span style="font-size: 10px; background: var(--bg-color); padding: 2px 6px; border-radius: 4px; margin-left: 6px; color: var(--text-muted); border: 1px solid var(--border-color);"><i class="fa-solid fa-building-columns" style="margin-right: 3px;"></i>${transaction.Account}</span>` : '';
    
    const safeDesc = transaction.Description ? transaction.Description.replace(/'/g, "\\'") : '';
    const safeAcct = transaction.Account || userSettings.accounts[0];
    
    // Hide Edit button if it's a system-linked Bill or Debt Payment
    const isSystemLinked = transaction.Category === 'Bills' || transaction.Category === 'Debt Payment';
    const editBtnHtml = isSystemLinked ? '' : `<button onclick="openEditModal('${transaction.ID}', '${transaction.Type}', '${transaction.Category}', '${amount}', '${transaction.Date}', '${safeDesc}', '${safeAcct}')" style="background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;"><i class="fa-solid fa-pen"></i> Edit</button>`;

    listHtmlBuffer += `
      <div class="transaction-item">
        <div class="transaction-info">
          <span class="transaction-title">${transaction.Category || 'Unknown'} ${accBadge}</span>
          <span class="transaction-date">${transaction.Description || 'No description'}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <span class="transaction-amount ${amountClass}">${sign}${userSettings.currency}${amount.toFixed(2)}</span>
          <div style="display: flex; gap: 6px;">
            ${editBtnHtml}
            <button onclick="deleteTransaction('${transaction.ID}')" style="background: rgba(231, 76, 60, 0.1); color: var(--danger); border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>
    `;
  });
  calendarList.innerHTML = listHtmlBuffer;

  if (dailyTotal > 0) {
    dailyTotalElement.innerText = `+${userSettings.currency}${dailyTotal.toFixed(2)}`;
    dailyTotalElement.style.color = 'var(--accent-color)';
  } else if (dailyTotal < 0) {
    dailyTotalElement.innerText = `-${userSettings.currency}${Math.abs(dailyTotal).toFixed(2)}`;
    dailyTotalElement.style.color = 'var(--danger)'; 
  } else {
    dailyTotalElement.innerText = `${userSettings.currency}0.00`;
    dailyTotalElement.style.color = 'var(--text-main)';
  }
}

// --- 5. RENDER FULL CALENDAR GRID (Optimized for Speed) ---
function renderFullCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return; 

  const monthSelect = document.getElementById('month-select');
  const yearSelect = document.getElementById('year-select');
  if (monthSelect) monthSelect.value = currentMonth;
  if (yearSelect) yearSelect.value = currentYear;
  
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dailyTotals = {};
  let maxExpense = 0;

  globalTransactions.forEach(t => {
    if (!t.Date) return;
    const d = new Date(t.Date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate();
      if (!dailyTotals[day]) dailyTotals[day] = { income: 0, expense: 0 };
      const amount = parseFloat(t.Amount) || 0;
      if (t.Type === 'Income') dailyTotals[day].income += amount;
      if (t.Type === 'Expense') {
        dailyTotals[day].expense += amount;
        if (dailyTotals[day].expense > maxExpense) maxExpense = dailyTotals[day].expense;
      }
    }
  });

  // Batch DOM manipulation for massive speed boost
  let gridHtmlBuffer = '';

  for (let i = 0; i < firstDay; i++) {
    gridHtmlBuffer += `<div class="calendar-cell empty"></div>`;
  }

  const actualToday = new Date();
  const isThisMonthAndYear = (actualToday.getMonth() === currentMonth && actualToday.getFullYear() === currentYear);
  const todayDay = actualToday.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isToday = (isThisMonthAndYear && i === todayDay) ? ' today' : '';
    const isSelected = (formattedDate === currentSelectedDate) ? ' selected' : '';
    
    // 1. Check for Bills and Debts due on day 'i'
    let alertIconsHtml = '';
    
    // Scan globalTransactions for Subscriptions (Bills) or Debt Definitions due on this day of the month
    const hasBill = globalTransactions.some(t => t.Type === 'Subscription' && t.Date && new Date(t.Date).getDate() === i);
    const hasDebt = globalTransactions.some(t => t.Type === 'Debt Definition' && t.Date && new Date(t.Date).getDate() === i);
    
    if (hasBill) {
      alertIconsHtml += `<i class="fa-solid fa-file-invoice-dollar" style="color: var(--danger); font-size: 12px; margin-left: 4px;" title="Bill Due"></i>`;
    }
    
    if (hasDebt) {
      alertIconsHtml += `<i class="fa-solid fa-credit-card" style="color: var(--danger); font-size: 12px; margin-left: 4px;" title="Debt Due"></i>`;
    }

    // 2. Build cell with flexbox header for date and icons
    let cellHtml = `<div class="calendar-cell${isToday}${isSelected}" onclick="renderCalendarDay('${formattedDate}', this)" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
        <span class="cell-date">${i}</span>
        <div style="display: flex; gap: 2px;">
          ${alertIconsHtml}
        </div>
      </div>`;
    
    if (dailyTotals[i] && (dailyTotals[i].income > 0 || dailyTotals[i].expense > 0)) {
      const inc = dailyTotals[i].income;
      const exp = dailyTotals[i].expense;
      const net = inc - exp;
      
      let displayAmount = '';
      let textColor = '';
      
      if (net > 0) {
        displayAmount = `+${userSettings.currency}${net.toFixed(0)}`;
        textColor = 'var(--accent-color)'; 
      } else if (net < 0) {
        displayAmount = `-${userSettings.currency}${Math.abs(net).toFixed(0)}`;
        textColor = 'var(--danger)'; 
      } else {
        displayAmount = `${userSettings.currency}0`;
        textColor = 'var(--text-main)';
      }

      let barWidth = 0;
      if (exp > 0) {
        barWidth = maxExpense > 0 ? (exp / maxExpense) * 100 : 0;
      } else if (inc > 0) {
        barWidth = 100; 
      }
      
      cellHtml += `
        <div>
          <div class="cell-amount" style="color: ${textColor}; font-weight: bold;">${displayAmount}</div>
          <div class="cell-bar-container" style="height: 4px; background: var(--track-bg); border-radius: 2px; margin-top: 4px;">
            <div class="cell-bar" style="width: ${barWidth}%; height: 100%; background: var(--accent-color);"></div>
          </div>
        </div>`;
    }
    cellHtml += `</div>`;
    gridHtmlBuffer += cellHtml;
  }
  
  grid.innerHTML = gridHtmlBuffer;
}

// --- 6. ALLOCATE TO SAVINGS GOAL (Optimized for Offline) ---
function allocateToGoal(goalName, inputId) {
  const inputEl = document.getElementById(inputId);
  const amountToAssign = parseFloat(inputEl.value);

  if (!amountToAssign || amountToAssign <= 0) return alert('Enter a valid amount.');

  const unallocatedText = document.getElementById('unallocated-kpi').innerText;
  const unallocatedAmount = parseFloat(unallocatedText.replace(/[^0-9.-]+/g,""));

  if (amountToAssign > unallocatedAmount) {
    return alert("You don't have enough unallocated savings for this!");
  }

  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const transactionData = {
    action: 'add',
    id: Date.now().toString(),
    type: 'Goal Allocation',
    date: dateString,
    amount: amountToAssign,
    category: goalName,
    description: 'Internal transfer'
  };

  // 1. Optimistic Update
  globalTransactions.push({
    ID: transactionData.id,
    Type: transactionData.type,
    Date: transactionData.date,
    Amount: transactionData.amount,
    Category: transactionData.category,
    Description: transactionData.description
  });
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));
  
  inputEl.value = ''; 
  processAndRenderDashboard();

  // 2. Offline Queue
  queueAndSync(transactionData);
}

// --- 7. DYNAMIC SAVINGS GOALS (Optimized for Offline) ---
function toggleGoalForm() {
  const form = document.getElementById('add-goal-form');
  if(form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveNewGoal() {
  const name = document.getElementById('new-goal-name').value;
  const target = document.getElementById('new-goal-target').value;
  if(!name || !target) return alert("Please fill in both fields");
  
  const data = {
    action: 'add',
    id: Date.now().toString(),
    type: 'Goal Definition',
    date: new Date().toISOString().split('T')[0],
    amount: target,
    category: name,
    description: 'Target Amount'
  };

  // 1. Optimistic Update
  globalTransactions.push({
    ID: data.id,
    Type: data.type,
    Date: data.date,
    Amount: data.amount,
    Category: data.category,
    Description: data.description
  });
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));
  
  document.getElementById('new-goal-name').value = '';
  document.getElementById('new-goal-target').value = '';
  document.getElementById('add-goal-form').style.display = 'none';
  processAndRenderDashboard();

  // 2. Offline Queue
  queueAndSync(data);
}

function renderGoals(savedAmounts, goals) {
  const container = document.getElementById('goals-container');
  if (!container) return;
  
  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];

  if (goals.length === 0) {
    container.innerHTML = `<p class="empty-state">${dict.noGoals || 'No goals yet.'}</p>`;
    const nearestNameEl = document.getElementById('nearest-goal-name');
    const nearestDateEl = document.getElementById('nearest-goal-date');
    if (nearestNameEl) nearestNameEl.innerText = '--';
    if (nearestDateEl) nearestDateEl.innerText = '--';
    return;
  }

  let nearestGoal = null;
  let minMonthsLeft = Infinity;
  const today = new Date();
  const msPerMonth = 1000 * 60 * 60 * 24 * 30.44;

  let goalHtmlBuffer = '';

  goals.forEach(goal => {
    const saved = savedAmounts[goal.name] || 0;
    const percent = Math.min((saved / goal.target) * 100, 100);
    const safeName = goal.name.replace(/'/g, "\\'");

    const remaining = goal.target - saved;
    if (remaining > 0 && saved > 0) {
      const allocations = globalTransactions.filter(t => t.Type === 'Goal Allocation' && t.Category === goal.name);
      if (allocations.length > 0) {
        allocations.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        const firstDate = new Date(allocations[0].Date);
        let monthsElapsed = (today - firstDate) / msPerMonth;
        if (monthsElapsed < 1) monthsElapsed = 1;
        
        const monthlyPace = saved / monthsElapsed;
        const monthsLeft = remaining / monthlyPace;
        
        if (monthsLeft < minMonthsLeft) {
          minMonthsLeft = monthsLeft;
          nearestGoal = goal.name;
        }
      }
    }

    goalHtmlBuffer += `
      <div style="background: var(--card-bg); padding: 24px; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); margin-bottom: 16px;">
        <div style="cursor: pointer; margin-bottom: 16px;" onclick="openGoalDetails('${safeName}', ${goal.target}, ${saved})">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-weight: bold; font-size: 16px; color: var(--text-main);">
              ${goal.name}
              <div style="display: inline-flex; gap: 6px; margin-left: 12px;">
                <button onclick="event.stopPropagation(); openEditModal('${goal.id}', 'Goal Definition', '${safeName}', '${goal.target}', '', '')" style="background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border: none; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-pen"></i> Edit</button>
                <button onclick="event.stopPropagation(); deleteTransaction('${goal.id}')" style="background: rgba(231, 76, 60, 0.1); color: var(--danger); border: none; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px;"><i class="fa-solid fa-trash"></i> Delete</button>
              </div>
            </span>
            <span style="font-size: 14px; color: var(--text-muted);">${userSettings.currency}${saved.toFixed(0)} / ${userSettings.currency}${goal.target.toLocaleString()}</span>
          </div>
          <div style="height: 8px; background: var(--track-bg); border-radius: 4px; overflow: hidden;">
            <div style="width: ${percent}%; height: 100%; background: var(--accent-color);"></div>
          </div>
        </div>

        <div style="display: flex; gap: 12px;" onclick="event.stopPropagation();">
          <div class="currency-input" style="flex: 1; display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: 12px; padding: 0 12px;">
            <span style="color: var(--text-muted);">${userSettings.currency}</span>
            <input type="number" id="input-${goal.id}" placeholder="0.00" step="0.01" style="border: none; background: transparent; padding: 12px; width: 100%; outline: none; font-size: 16px; color: var(--text-main);">
          </div>
          <button onclick="allocateToGoal('${safeName}', 'input-${goal.id}')" style="background: var(--accent-color); color: white; border: none; border-radius: 12px; padding: 0 20px; font-weight: bold; cursor: pointer;">${dict.assignBtn}</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = goalHtmlBuffer;

  const nearestNameEl = document.getElementById('nearest-goal-name');
  const nearestDateEl = document.getElementById('nearest-goal-date');
  if (nearestNameEl && nearestDateEl) {
    if (nearestGoal) {
      nearestNameEl.innerText = nearestGoal;
      const estDate = new Date(today.getTime());
      estDate.setMonth(estDate.getMonth() + Math.ceil(minMonthsLeft));
      const dateLang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
      nearestDateEl.innerText = estDate.toLocaleDateString(dateLang, { month: 'short', year: 'numeric' });
    } else {
      nearestNameEl.innerText = 'No active pacing';
      nearestDateEl.innerText = '--';
    }
  }
}

// --- 8. EDIT MODAL LOGIC (Optimized for Offline) ---

// NEW: Helper function to generate dropdown options dynamically
function populateEditCategories(selectedCategory = '') {
  const type = document.getElementById('edit-type').value;
  const wrapper = document.getElementById('edit-category-wrapper');
  
  // If editing a goal, it stays a text input. Otherwise, it becomes a dropdown.
  if (type === 'Goal Definition') {
    wrapper.innerHTML = `<input type="text" id="edit-category" required value="${selectedCategory}">`;
  } else {
    let optionsHtml = '<option value="" disabled>Select category...</option>';
    let savingsExists = false;

    userSettings.categories.filter(c => c.type === type).forEach(cat => {
      if (cat.name === 'Savings') savingsExists = true;
      const isSelected = cat.name === selectedCategory ? 'selected' : '';
      optionsHtml += `<option value="${cat.name}" ${isSelected}>${cat.name}</option>`;
    });

    // Force 'Savings' into the edit dropdown for expenses
    if (type === 'Expense' && !savingsExists) {
      const isSelected = selectedCategory === 'Savings' ? 'selected' : '';
      optionsHtml += `<option value="Savings" ${isSelected} style="font-weight: bold; color: var(--accent-color);">Savings</option>`;
    }

    wrapper.innerHTML = `<select id="edit-category" required>${optionsHtml}</select>`;
  }
}

function openEditModal(id, type, category, amount, date, desc) {
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-type').value = type;
  
  // Call the helper to populate the dropdown BEFORE the modal opens
  populateEditCategories(category);
  
  document.getElementById('edit-amount').value = parseFloat(amount).toFixed(2);
  
  const isGoal = (type === 'Goal Definition');
  document.getElementById('edit-modal-title').innerText = isGoal ? 'Edit Savings Goal' : 'Edit Transaction';
  document.getElementById('edit-category-label').innerText = isGoal ? 'Goal Name' : 'Category';
  document.getElementById('edit-amount-label').innerText = isGoal ? 'Target Amount' : 'Amount';
  
  document.getElementById('edit-type-group').style.display = isGoal ? 'none' : 'flex';
  document.getElementById('edit-account-group').style.display = isGoal ? 'none' : 'flex';
  document.getElementById('edit-date-group').style.display = isGoal ? 'none' : 'flex';
  document.getElementById('edit-desc-group').style.display = isGoal ? 'none' : 'flex';
  
  // FIX: Disable HTML5 validation on hidden fields so the form can submit
  document.getElementById('edit-date').required = !isGoal;
  document.getElementById('edit-account').required = !isGoal;
  
  if (!isGoal) {
    const d = new Date(date);
    document.getElementById('edit-date').value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    document.getElementById('edit-desc').value = (desc !== 'undefined' && desc !== 'null') ? desc : '';
  }
  
  document.getElementById('edit-modal').style.display = 'flex';
}

// (Keep your document.getElementById('edit-form').addEventListener... exactly as it is below this)

document.getElementById('edit-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const isGoal = document.getElementById('edit-type').value === 'Goal Definition';
  
  const transactionData = {
    action: 'edit',
    id: document.getElementById('edit-id').value,
    type: document.getElementById('edit-type').value,
    category: document.getElementById('edit-category').value,
    account: document.getElementById('edit-account').value,
    amount: parseFloat(document.getElementById('edit-amount').value),
    date: isGoal ? new Date().toISOString().split('T')[0] : document.getElementById('edit-date').value,
    description: isGoal ? 'Custom Cloud Goal' : document.getElementById('edit-desc').value
  };

  // 1. Force both to strings to ensure a match is found
  const index = globalTransactions.findIndex(t => String(t.ID) === String(transactionData.id));
  if (index !== -1) {
    globalTransactions[index].Category = transactionData.category;
    globalTransactions[index].Account = transactionData.account;
    globalTransactions[index].Amount = transactionData.amount;
    globalTransactions[index].Date = transactionData.date;
    globalTransactions[index].Description = transactionData.description;
  }
  
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));
  document.getElementById('edit-modal').style.display = 'none';

  // 2. Fire to Offline Queue immediately
  queueAndSync(transactionData);

  // 3. Instantly update UI 
  processAndRenderDashboard(); 
});

// --- 9. GLOBAL SETTINGS & CATEGORIES ---
const availableIcons = ['fa-cart-shopping', 'fa-utensils', 'fa-mug-hot', 'fa-car', 'fa-gas-pump', 'fa-house', 'fa-heart', 'fa-bag-shopping', 'fa-user', 'fa-paw', 'fa-file-invoice', 'fa-dumbbell', 'fa-briefcase', 'fa-gift', 'fa-graduation-cap', 'fa-shield-halved', 'fa-bolt', 'fa-mobile-screen', 'fa-wifi', 'fa-piggy-bank', 'fa-ellipsis'];

function initSettings() {
  document.getElementById('set-name').value = userSettings.name;
  document.getElementById('set-url').value = userSettings.url;
  document.getElementById('set-currency').value = userSettings.currency;
  document.getElementById('set-date-format').value = userSettings.dateFormat;
  document.getElementById('set-language').value = userSettings.language;
  
  populateCategoryDropdowns();
  renderSettingsCategories();
  populateAccountDropdowns();
  renderSettingsAccounts();
  applyTranslations(userSettings.language);
}

function populateAccountDropdowns() {
  const transAcc = document.getElementById('trans-account');
  const editAcc = document.getElementById('edit-account');
  const billAcc = document.getElementById('bill-account');
  const debtAcc = document.getElementById('log-debt-account');
  let options = '';
  userSettings.accounts.forEach(acc => {
    options += `<option value="${acc}">${acc}</option>`;
  });
  if (transAcc) transAcc.innerHTML = options;
  if (editAcc) editAcc.innerHTML = options;
  if (billAcc) billAcc.innerHTML = options;
  if (debtAcc) debtAcc.innerHTML = options;
}

function renderSettingsAccounts() {
  const list = document.getElementById('settings-account-list');
  if (!list) return;
  list.innerHTML = '';
  userSettings.accounts.forEach(acc => {
    list.insertAdjacentHTML('beforeend', `
      <div class="transaction-item" style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 32px; height: 32px; background: rgba(26, 188, 156, 0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--accent-color);"><i class="fa-solid fa-building-columns"></i></div>
          <div class="transaction-title">${acc}</div>
        </div>
        <button onclick="deleteAccount('${acc}')" class="icon-btn" style="color: var(--danger); padding: 0;"><i class="fa-solid fa-trash"></i></button>
      </div>
    `);
  });
}

function saveCustomAccount() {
  const name = document.getElementById('acc-name').value.trim();
  if (!name) return alert('Enter an account name.');
  if (userSettings.accounts.includes(name)) return alert('Account already exists.');
  
  userSettings.accounts.push(name);
  localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
  
  document.getElementById('acc-name').value = '';
  document.getElementById('account-modal').style.display = 'none';
  initSettings(); 

  pushSettingsToCloud();
}

function deleteAccount(accName) {
  if(userSettings.accounts.length <= 1) return alert('You must keep at least one account.');
  if(!confirm(`Delete account "${accName}"?`)) return;
  userSettings.accounts = userSettings.accounts.filter(a => a !== accName);
  localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
  initSettings();
}

async function saveAllSettings() {
  userSettings.name = document.getElementById('set-name').value;
  userSettings.url = document.getElementById('set-url').value;
  userSettings.currency = document.getElementById('set-currency').value;
  userSettings.dateFormat = document.getElementById('set-date-format').value;
  userSettings.language = document.getElementById('set-language').value;

  // Save to local memory first
  localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
  
  // Change the button text so the user knows it is loading
  const saveBtn = document.querySelector('button[onclick="saveAllSettings()"]');
  if (saveBtn) saveBtn.innerText = "Syncing to Cloud...";

  // WAIT for the cloud push to finish before reloading the page!
  await pushSettingsToCloud();
  
  // Now it is safe to reload
  window.location.reload();
}

function populateCategoryDropdowns() {
  const transSelect = document.getElementById('trans-category');
  const typeInput = document.getElementById('trans-type');
  const currentType = typeInput ? typeInput.value : 'Expense';
  
  if (transSelect) {
    transSelect.innerHTML = '<option value="" disabled selected>Select category...</option>';
    
    let savingsExists = false;

    userSettings.categories
      .filter(c => c.type === currentType)
      .forEach(cat => {
        if (cat.name === 'Savings') savingsExists = true;
        transSelect.insertAdjacentHTML('beforeend', `<option value="${cat.name}">${cat.name}</option>`);
      });

    // Automatically inject 'Savings' into the Expense list if it isn't there
    // This guarantees you can always route money to your Goals tab!
    if (currentType === 'Expense' && !savingsExists) {
      transSelect.insertAdjacentHTML('beforeend', `<option value="Savings" style="font-weight: bold; color: var(--accent-color);">Savings</option>`);
    }
  }
}

function openCategoryModal() {
  const grid = document.getElementById('cat-icon-grid');
  grid.innerHTML = '';
  availableIcons.forEach(icon => {
    grid.insertAdjacentHTML('beforeend', `<div class="icon-option" onclick="selectIcon(this, '${icon}')"><i class="fa-solid ${icon}"></i></div>`);
  });
  document.getElementById('category-modal').style.display = 'flex';
}

function selectIcon(element, iconClass) {
  document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  document.getElementById('cat-selected-icon').value = iconClass;
}

function saveCustomCategory() {
  const name = document.getElementById('cat-name').value.trim();
  const type = document.getElementById('cat-type').value;
  const icon = document.getElementById('cat-selected-icon').value;
  
  if (!name) return alert('Enter a category name.');
  
  userSettings.categories.push({ id: 'cat-' + Date.now(), name, type, icon });
  localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
  
  document.getElementById('category-modal').style.display = 'none';
  initSettings(); 

  pushSettingsToCloud();
}

function renderSettingsCategories() {
  const container = document.getElementById('settings-category-list');
  if (!container) return;

  let html = '';
  userSettings.categories.forEach((cat) => {
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--card-bg); padding: 16px; border-radius: 16px; border: 1px solid var(--border-color); margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="background: var(--track-bg); width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--text-main);">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <div>
            <div style="font-weight: bold; font-size: 14px; color: var(--text-main);">${cat.name}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${cat.type}</div>
          </div>
        </div>
        <!-- DELETE BUTTON -->
        <button onclick="deleteCategory('${cat.id}')" style="background: transparent; border: none; color: var(--danger); cursor: pointer; padding: 8px; font-size: 16px; transition: 0.2s;">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });
  container.innerHTML = html;
}

function deleteCategory(categoryId) {
  if (userSettings.categories.length <= 1) {
    alert("You must keep at least one category active.");
    return;
  }

  if (confirm("Are you sure you want to delete this category?")) {
    userSettings.categories = userSettings.categories.filter(c => c.id !== categoryId);
    localStorage.setItem('budgetSettings', JSON.stringify(userSettings));
    renderSettingsCategories();
    
    // Optional: Refresh global dropdowns if that function exists
    if (typeof populateCategoryDropdowns === "function") populateCategoryDropdowns();
  }
}

// --- 10. GOAL ANALYTICS & PROJECTION ---
function openGoalDetails(goalName, targetAmount, savedAmount) {
  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  const modal = document.getElementById('goal-details-modal');
  if (!modal) return alert("Modal HTML is missing!");
  
  document.getElementById('gd-title').innerText = goalName;

  const allocations = globalTransactions.filter(t => t.Type === 'Goal Allocation' && t.Category === goalName);
  allocations.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  const logList = document.getElementById('gd-log-list');
  const chartContainer = document.getElementById('gd-chart-container');
  logList.innerHTML = '';
  chartContainer.innerHTML = '';

  if (allocations.length === 0) {
    document.getElementById('gd-est-date').innerText = 'No data';
    document.getElementById('gd-time-left').innerText = 'Make a deposit';
    logList.innerHTML = '<p class="empty-state">No contributions yet.</p>';
    modal.style.display = 'flex';
    return;
  }

  let logBuffer = '';
  [...allocations].reverse().forEach(t => {
    const amt = parseFloat(t.Amount);
    logBuffer += `
      <div class="transaction-item" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--bg-color);">
        <span class="transaction-date" style="font-weight: 500;">${formatAppDate(t.Date)}</span>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="color: var(--accent-color); font-weight: bold;">+${userSettings.currency}${amt.toFixed(2)}</span>
          <button onclick="document.getElementById('goal-details-modal').style.display='none'; deleteTransaction('${t.ID}')" class="icon-btn" style="color: var(--danger); padding: 4px; background: transparent; border: none; cursor: pointer;" title="Unassign this amount">
            <i class="fa-solid fa-rotate-left"></i> 
          </button>
        </div>
      </div>
    `;
  });
  logList.innerHTML = logBuffer;

  const dailyData = {};
  allocations.forEach(t => {
    // Safely parse into local timezone to prevent UTC mismatch duplication
    const d = new Date(t.Date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dayKey = `${yyyy}-${mm}-${dd}`; 
    
    if (!dailyData[dayKey]) {
      dailyData[dayKey] = { date: t.Date, amount: 0 };
    }
    dailyData[dayKey].amount += parseFloat(t.Amount);
  });
  
  const chartNodes = Object.values(dailyData);

  chartContainer.style.display = 'block';
  chartContainer.style.position = 'relative';
  chartContainer.style.height = '140px'; 
  chartContainer.style.marginTop = '40px'; 
  chartContainer.style.marginBottom = '40px'; 
  chartContainer.style.border = 'none';
  chartContainer.style.overflow = 'visible'; 

  const pts = chartNodes.length;
  const maxChartAmt = Math.max(...chartNodes.map(n => n.amount));
  let pathD = "";
  let fillD = "";
  let overlaysHtml = "";

  chartNodes.forEach((node, i) => {
    const amt = node.amount;
    const x = pts === 1 ? 50 : 10 + (i / (pts - 1)) * 80;
    const y = 100 - ((amt / maxChartAmt) * 70) - 10; 

    if (i === 0) {
      pathD += `M ${x} ${y} `;
      fillD += `M ${x} 100 L ${x} ${y} `;
    } else {
      const prevX = 10 + ((i - 1) / (pts - 1)) * 80;
      const prevAmt = chartNodes[i-1].amount;
      const prevY = 100 - ((prevAmt / maxChartAmt) * 70) - 10;
      const cpX = (prevX + x) / 2;
      
      pathD += `C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y} `;
      fillD += `C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y} `;
    }

    const dateObj = new Date(node.date);
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    const dayStr = dateObj.toLocaleDateString(lang, { month: 'short', day: 'numeric' });
    const isNotable = (i === 0 || i === pts - 1 || amt === maxChartAmt || pts <= 6);

    overlaysHtml += `<div style="position:absolute; top:${y}%; left:${x}%; width:10px; height:10px; background:var(--card-bg); border:3px solid var(--accent-color); border-radius:50%; transform:translate(-50%, -50%); z-index:2; box-shadow: 0 2px 5px rgba(26, 188, 156, 0.4);"></div>`;
    
    if (isNotable) {
      overlaysHtml += `<div style="position:absolute; top:calc(${y}% - 32px); left:${x}%; transform:translateX(-50%); background:var(--text-main); color:var(--bg-color); font-size:11px; font-weight:bold; padding:4px 8px; border-radius:8px; z-index:3; white-space:nowrap;">${userSettings.currency}${amt.toFixed(0)}</div>`;
    }
    
    if (pts <= 6 || i === 0 || i === pts - 1 || i === Math.floor(pts/2)) {
      overlaysHtml += `<div style="position:absolute; bottom:-28px; left:${x}%; transform:translateX(-50%); font-size:11px; color:var(--text-muted); white-space:nowrap; font-weight:bold;">${dayStr}</div>`;
    }
  });

  if (pts > 0) {
    const lastX = pts === 1 ? 50 : 90;
    fillD += `L ${lastX} 100 Z`;
  }

  chartContainer.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute; top:0; left:0; z-index:1; overflow:visible;">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent-color)" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="var(--accent-color)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${fillD}" fill="url(#lineGrad)" />
      <path d="${pathD}" fill="none" stroke="var(--accent-color)" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round" />
    </svg>
    ${overlaysHtml}
  `;

  const firstDate = new Date(allocations[0].Date);
  const today = new Date();
  const msPerMonth = 1000 * 60 * 60 * 24 * 30.44;
  
  let monthsElapsed = (today - firstDate) / msPerMonth;
  if (monthsElapsed < 1) monthsElapsed = 1; 

  const monthlyPace = savedAmount / monthsElapsed;
  const remainingAmount = targetAmount - savedAmount;

  if (remainingAmount <= 0) {
    document.getElementById('gd-est-date').innerText = dict.achieved;
    document.getElementById('gd-time-left').innerText = dict.completed;
  } else {
    const monthsLeft = Math.ceil(remainingAmount / monthlyPace);
    document.getElementById('gd-time-left').innerText = `${monthsLeft} ${dict.moRemaining}`;

    const estDate = new Date(today.setMonth(today.getMonth() + monthsLeft));
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    document.getElementById('gd-est-date').innerText = estDate.toLocaleDateString(lang, { month: 'short', year: 'numeric' });
  }

  modal.style.display = 'flex';
}

// --- 11. DASHBOARD SPARKLINE ---
function renderDashboardSparkline() {
  const container = document.getElementById('dashboard-sparkline');
  if (!container) return;

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysToDraw = 30;
  const dailyData = [];

  const today = new Date();
  const baseline = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (let i = daysToDraw - 1; i >= 0; i--) {
    const d = new Date(baseline.getTime() - i * msPerDay);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    const shortDate = d.toLocaleDateString(lang, { month: 'short', day: 'numeric' });
    
    dailyData.push({
      dateStr: `${yyyy}-${mm}-${dd}`,
      label: shortDate,
      amount: 0
    });
  }

  globalTransactions.forEach(t => {
    if (t.Type === 'Expense' && t.Date) {
      // Safely parse into local timezone to prevent UTC mismatch duplication
      const d = new Date(t.Date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const localDateStr = `${yyyy}-${mm}-${dd}`;
      
      const dataPoint = dailyData.find(d => d.dateStr === localDateStr);
      if (dataPoint) dataPoint.amount += (parseFloat(t.Amount) || 0);
    }
  });

  const maxExp = Math.max(...dailyData.map(d => d.amount));
  
  if (maxExp === 0) {
    container.innerHTML = '<p class="empty-state" style="font-size: 12px; margin-top: 16px; color: var(--text-muted);">No expenses in the past 30 days.</p>';
    return;
  }

  // NEW: Calculate the 30-day average and map it to the Y-axis
  const totalExp = dailyData.reduce((sum, d) => sum + d.amount, 0);
  const avgExp = totalExp / daysToDraw;
  const avgY = 85 - ((avgExp / maxExp) * 65);

  let pathD = "";
  let fillD = "";
  let overlaysHtml = "";
  
  let maxIndex = 0;
  let maxVal = dailyData[0].amount;

  dailyData.forEach((d, i) => {
    if (d.amount > maxVal) {
      maxVal = d.amount;
      maxIndex = i;
    }
    
    const x = (i / (daysToDraw - 1)) * 100;
    const y = 85 - ((d.amount / maxExp) * 65); 
    
    if (i === 0) {
      pathD += `M ${x} ${y} `;
      fillD += `M ${x} 85 L ${x} ${y} `;
    } else {
      const prevX = ((i - 1) / (daysToDraw - 1)) * 100;
      const prevY = 85 - ((dailyData[i-1].amount / maxExp) * 65);
      const cpX = (prevX + x) / 2;
      pathD += `C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y} `;
      fillD += `C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y} `;
    }
  });

  fillD += `L 100 85 Z`;

  const maxX = (maxIndex / (daysToDraw - 1)) * 100;
  const maxY = 85 - ((maxVal / maxExp) * 65);
  
  let labelTransform = "translateX(-50%)";
  if (maxIndex < 4) labelTransform = "translateX(0)";
  if (maxIndex > daysToDraw - 5) labelTransform = "translateX(-100%)";

  overlaysHtml += `
    <div style="position: absolute; left: ${maxX}%; top: ${maxY}%; bottom: 15%; width: 1px; border-left: 1px dashed var(--danger); opacity: 0.4; z-index: 1;"></div>
    <div style="position: absolute; left: ${maxX}%; top: ${maxY}%; width: 8px; height: 8px; background: var(--card-bg); border: 2px solid var(--danger); border-radius: 50%; transform: translate(-50%, -50%); z-index: 2; box-shadow: 0 0 6px rgba(231, 76, 60, 0.4);"></div>
    <div style="position: absolute; left: ${maxX}%; top: calc(${maxY}% - 28px); transform: ${labelTransform}; background: var(--danger); color: white; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 6px; z-index: 3; white-space: nowrap; box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);">
      ${userSettings.currency}${maxVal.toFixed(0)} on ${dailyData[maxIndex].label}
    </div>
    
    <!-- NEW: Average Line Label -->
    <div style="position: absolute; left: 0; top: calc(${avgY}% - 18px); font-size: 10px; font-weight: bold; color: var(--text-muted); background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 4px; z-index: 2;">
      Avg: ${userSettings.currency}${avgExp.toFixed(0)}
    </div>
  `;
  
  const xAxisHtml = `
    <div style="position:absolute; bottom: 0; left: 0; font-size: 11px; font-weight: 500; color: var(--text-muted);">${dailyData[0].label}</div>
    <div style="position:absolute; bottom: 0; left: 50%; transform: translateX(-50%); font-size: 11px; font-weight: 500; color: var(--text-muted);">${dailyData[Math.floor(daysToDraw/2)].label}</div>
    <div style="position:absolute; bottom: 0; right: 0; font-size: 11px; font-weight: 500; color: var(--text-muted);">${dailyData[daysToDraw-1].label}</div>
  `;

  container.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute; top:0; left:0; overflow:visible; z-index: 0;">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--danger)" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="var(--danger)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${fillD}" fill="url(#sparkGrad)" />
      <path d="${pathD}" fill="none" stroke="var(--danger)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round" />
      
      <!-- NEW: Dashed Average SVG Line -->
      <line x1="0" y1="${avgY}" x2="100" y2="${avgY}" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" opacity="0.6" />
      
      <line x1="0" y1="85" x2="100" y2="85" stroke="var(--border-color)" stroke-width="1.5" vector-effect="non-scaling-stroke" />
    </svg>
    ${overlaysHtml}
    ${xAxisHtml}
  `;
}

// --- 12. OFFLINE SYNC ENGINE (Race-Condition Fixed) ---
let isSyncing = false; // Prevents overlapping syncs

async function syncPendingTransactions() {
  // Abort if offline, already syncing, or no URL provided
  if (!navigator.onLine || isSyncing || !SCRIPT_URL) return; 

  let pending = JSON.parse(localStorage.getItem('pending_transactions') || '[]');
  if (pending.length === 0) return;

  isSyncing = true; // Lock the sync process
  
  // Clear the local queue IMMEDIATELY so new clicks don't grab these items again
  localStorage.setItem('pending_transactions', JSON.stringify([]));
  
  console.log(`Syncing ${pending.length} offline transactions to Google Sheets...`);
  let failed = [];

  for (let tx of pending) {
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(tx)
      });
    } catch (error) {
      console.error("Network drop during sync. Retaining in queue.", error);
      failed.push(tx); 
    }
  }
  
  // If any failed due to network drop, put them back into the queue
  if (failed.length > 0) {
    let currentQueue = JSON.parse(localStorage.getItem('pending_transactions') || '[]');
    localStorage.setItem('pending_transactions', JSON.stringify([...failed, ...currentQueue]));
  }
  
  isSyncing = false; // Unlock the sync process
  
  // If new transactions were added while we were syncing, run it again instantly
  const newPending = JSON.parse(localStorage.getItem('pending_transactions') || '[]');
  if (newPending.length > 0) syncPendingTransactions();
}

window.addEventListener('load', syncPendingTransactions);
window.addEventListener('online', () => {
  console.log("Internet restored. Flushing queue...");
  syncPendingTransactions();
});

// --- 13. BILLS & SUBSCRIPTIONS LOGIC ---

// Form Submission for New & Edited Bills
document.getElementById('add-bill-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const editId = document.getElementById('bill-edit-id').value;
  const isEdit = editId !== '';

  const payload = {
    action: isEdit ? 'edit' : 'add',
    id: isEdit ? editId : Date.now().toString(),
    type: 'Subscription',
    date: document.getElementById('bill-date').value,
    amount: parseFloat(document.getElementById('bill-amount').value),
    category: document.getElementById('bill-name').value,
    description: document.getElementById('bill-cycle').value, // Stores Monthly/Yearly
    account: document.getElementById('bill-account').value // NEW: Saves account preference
  };

  if (isEdit) {
    const index = globalTransactions.findIndex(t => String(t.ID) === String(payload.id));
    if (index !== -1) {
      globalTransactions[index].Category = payload.category;
      globalTransactions[index].Amount = payload.amount;
      globalTransactions[index].Date = payload.date;
      globalTransactions[index].Description = payload.description;
      globalTransactions[index].Account = payload.account;
    }
  } else {
    globalTransactions.push({ ID: payload.id, Type: payload.type, Date: payload.date, Amount: payload.amount, Category: payload.category, Description: payload.description, Account: payload.account });
  }

  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));
  
  closeBillModal();
  queueAndSync(payload);
  processAndRenderDashboard();
});

function openEditBillModal(id, name, amount, date, cycle, account) {
  try {
    document.getElementById('bill-edit-id').value = id || '';
    document.getElementById('bill-name').value = name || '';
    document.getElementById('bill-amount').value = parseFloat(amount || 0).toFixed(2);
    
    // Safely set the date
    const dateInput = document.getElementById('bill-date');
    if (dateInput && date) dateInput.value = String(date).split('T')[0];
    
    // Safely set the cycle
    const cycleInput = document.getElementById('bill-cycle');
    if (cycleInput) cycleInput.value = (cycle && cycle !== 'undefined') ? cycle : 'Monthly';
    
    // Safely set the account (prevents crashing if the HTML dropdown is missing)
    const accountInput = document.getElementById('bill-account');
    if (accountInput) accountInput.value = account || userSettings.accounts[0];
    
    document.getElementById('bill-modal-title').innerText = 'Edit Bill';
    document.getElementById('add-bill-modal').style.display = 'flex';
  } catch (e) {
    console.error("Error opening bill modal:", e);
    // Force it open anyway even if a field assignment fails
    document.getElementById('add-bill-modal').style.display = 'flex';
  }
}

function closeBillModal() {
  document.getElementById('add-bill-modal').style.display = 'none';
  document.getElementById('add-bill-form').reset();
  document.getElementById('bill-edit-id').value = '';
  document.getElementById('bill-modal-title').innerText = 'Add New Bill';
}

function renderBillsPage() {
  const billsList = document.getElementById('bills-list');
  if (!billsList) return;

  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];

  const bills = globalTransactions.filter(t => t.Type === 'Subscription');
  let monthlyTotal = 0;
  let upcomingTotal = 0;
  let htmlBuffer = '';

  const today = new Date();
  today.setHours(0,0,0,0);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  bills.sort((a, b) => new Date(a.Date) - new Date(b.Date));

  if (bills.length === 0) {
    htmlBuffer = '<p class="empty-state">No active subscriptions found.</p>';
  }

  bills.forEach(bill => {
    const amt = parseFloat(bill.Amount) || 0;
    
    // Let the browser naturally parse the date to automatically reverse Google's UTC shift
    const dueDate = new Date(bill.Date);
    dueDate.setHours(0, 0, 0, 0);
    
    // Generate a safe local date string for the Edit and Action buttons
    const localYear = dueDate.getFullYear();
    const localMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
    const localDay = String(dueDate.getDate()).padStart(2, '0');
    const safeLocalDate = `${localYear}-${localMonth}-${localDay}`;
    
    // 1. Calculate Monthly Fixed Costs accurately
    if (bill.Description === 'Yearly') {
      monthlyTotal += (amt / 12);
    } else if (bill.Description === 'Semi-Annual') {
      monthlyTotal += (amt / 6);
    } else if (bill.Description === 'Quarterly') {
      monthlyTotal += (amt / 3);
    } else {
      monthlyTotal += amt; 
    }

    // 2. Calculate Next 7 Days KPI
    if (dueDate >= today && dueDate <= nextWeek) {
      upcomingTotal += amt;
    }

    const isDueSoon = dueDate <= nextWeek;
    const dateColor = isDueSoon ? 'var(--danger)' : 'var(--text-muted)';
    const badgeText = bill.Description || 'Monthly';
    
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    const dateStr = dueDate.toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' });
    const safeName = bill.Category.replace(/'/g, "\\'");

    htmlBuffer += `
      <div style="background: var(--card-bg); border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); margin-bottom: 12px; display: flex; flex-direction: column; gap: 16px; width: 100%; box-sizing: border-box;">
        
        <!-- Top Row: Details (Left) & Amount (Right) -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
          
          <!-- NEW: Clickable Title Block -->
          <div onclick="openBillDetails('${bill.ID}', '${safeName}', ${amt}, '${bill.Description}', '${safeLocalDate}')" style="display: flex; flex-direction: column; gap: 8px; text-align: left; cursor: pointer; transition: 0.2s;" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1" title="View details and payment history">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-weight: bold; font-size: 16px; color: var(--text-main);">${bill.Category}</span>
              <i class="fa-solid fa-circle-info" style="font-size: 12px; color: var(--accent-color);"></i>
              <span style="font-size: 11px; background: var(--track-bg); padding: 4px 8px; border-radius: 12px; color: var(--text-muted); font-weight: 600;">${badgeText}</span>
            </div>
            <span style="color: ${dateColor}; font-size: 13px; font-weight: ${isDueSoon ? 'bold' : 'normal'};">
              <i class="fa-regular fa-calendar" style="margin-right: 6px;"></i> Due: ${dateStr}
            </span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <span style="font-weight: bold; font-size: 18px; color: var(--text-main);">${userSettings.currency}${amt.toFixed(2)}</span>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button onclick="openEditBillModal('${bill.ID}', '${safeName}', '${amt}', '${safeLocalDate}', '${bill.Description}', '${bill.Account || ''}')" style="background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button onclick="deleteTransaction('${bill.ID}')" style="background: rgba(231, 76, 60, 0.1); color: var(--danger); border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Action Buttons -->
        <div style="display: flex; gap: 12px; width: 100%; border-top: 1px solid var(--track-bg); padding-top: 16px;">
          <button onclick="this.disabled = true; logBillAsPaid('${bill.ID}', '${safeName}', ${amt}, '${bill.Description}', '${safeLocalDate}')" style="flex: 1; background: ${isDueSoon ? 'var(--accent-color)' : 'transparent'}; color: ${isDueSoon ? 'white' : 'var(--accent-color)'}; border: 1px solid var(--accent-color); padding: 10px; font-size: 14px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;">
            <i class="fa-solid fa-check-double" style="margin-right: 6px;"></i> ${dict.logAsPaid}
          </button>
          <button onclick="undoLastBillPayment('${bill.ID}', '${safeName}', '${bill.Description}', '${safeLocalDate}')" style="background: transparent; border: 1px solid var(--border-color); padding: 10px 18px; border-radius: 12px; color: var(--text-main); cursor: pointer; transition: 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02);" title="Undo Last Payment">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
        </div>

      </div>
    `;
  });

  document.getElementById('bill-monthly-kpi').innerText = `${userSettings.currency}${monthlyTotal.toFixed(2)}`;
  document.getElementById('bill-upcoming-kpi').innerText = `${userSettings.currency}${upcomingTotal.toFixed(2)}`;
  billsList.innerHTML = htmlBuffer;
}

// Open Individual Bill Details & History
function openBillDetails(id, name, amount, cycle, dueDateString) {
  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];
  document.getElementById('bd-title').innerText = name;

  // Calculate Due Status
  const today = new Date();
  today.setHours(0,0,0,0);
  const dueDate = new Date(dueDateString);
  dueDate.setHours(0,0,0,0);
  
  const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  const statusEl = document.getElementById('bd-status');
  const cardEl = document.getElementById('bd-status-card');
  const dateEl = document.getElementById('bd-due-date');
  
  if (daysDiff < 0) {
    statusEl.innerText = dict.overdue;
    statusEl.style.color = "var(--danger)";
    cardEl.style.background = "rgba(231, 76, 60, 0.1)";
    dateEl.innerText = `${dict.missedBy} ${Math.abs(daysDiff)} ${dict.days}`;
  } else if (daysDiff <= 7) {
    statusEl.innerText = dict.dueSoon;
    statusEl.style.color = "var(--danger)";
    cardEl.style.background = "rgba(231, 76, 60, 0.1)";
    dateEl.innerText = `${dict.dueIn} ${daysDiff} ${dict.days}`;
  } else {
    statusEl.innerText = dict.onTrack;
    statusEl.style.color = "var(--accent-color)";
    cardEl.style.background = "rgba(26, 188, 156, 0.1)";
    dateEl.innerText = `${dict.dueLabel}: ${formatAppDate(dueDateString)}`;
  }

  // Generate Payment History
  const payments = globalTransactions.filter(t => 
    t.Type === 'Expense' && (t.Category === name || t.Title === name || (t.Description && t.Description.includes(name)))
  );
  payments.sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Newest first

  // Calculate Total Paid
  const totalPaid = payments.reduce((sum, p) => sum + (parseFloat(p.Amount) || 0), 0);
  document.getElementById('bd-total-paid').innerText = `${userSettings.currency}${totalPaid.toFixed(2)}`;

  // Build Log List
  const logList = document.getElementById('bd-log-list');
  if (payments.length === 0) {
    logList.innerHTML = '<p class="empty-state" style="margin-top: 10px;">No payment history yet.</p>';
  } else {
    let logBuffer = '';
    payments.forEach(t => {
      const amt = parseFloat(t.Amount);
      logBuffer += `
        <div class="transaction-item" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color);">
          <span class="transaction-date" style="font-weight: 500;">${formatAppDate(t.Date)}</span>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="color: var(--text-main); font-weight: bold;">${userSettings.currency}${amt.toFixed(2)}</span>
            <button onclick="deleteTransaction('${t.ID}'); document.getElementById('bill-details-modal').style.display='none';" class="icon-btn" style="color: var(--danger); padding: 4px; background: transparent; border: none; cursor: pointer;" title="Delete Payment">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
    logList.innerHTML = logBuffer;
  }

  document.getElementById('bill-details-modal').style.display = 'flex';
}

function logBillAsPaid(id, name, amount, cycle, currentDate) {
  const todayStr = new Date().toISOString().split('T')[0];

  // Pull the account from the saved bill, or default to the first account
  const billDef = globalTransactions.find(t => String(t.ID) === String(id));
  const billAccount = (billDef && billDef.Account) ? billDef.Account : userSettings.accounts[0];
  
  const expensePayload = {
    action: 'add',
    id: Date.now().toString(),
    type: 'Expense',
    date: todayStr,
    amount: amount,
    category: 'Bills', 
    description: `Paid: ${name}`,
    account: billAccount
  };

  const currentD = new Date(currentDate.split('T')[0]);
  if (cycle === 'Yearly') {
    currentD.setFullYear(currentD.getFullYear() + 1);
  } else if (cycle === 'Semi-Annual') {
    currentD.setMonth(currentD.getMonth() + 6);
  } else if (cycle === 'Quarterly') {
    currentD.setMonth(currentD.getMonth() + 3);
  } else {
    currentD.setMonth(currentD.getMonth() + 1);
  }
  const nextDateStr = currentD.toISOString().split('T')[0];

  const updatePayload = {
    action: 'edit',
    id: String(id),
    type: 'Subscription',
    category: name,
    amount: amount,
    date: nextDateStr,
    description: cycle
  };

  globalTransactions.push({ ID: expensePayload.id, Type: expensePayload.type, Date: expensePayload.date, Amount: expensePayload.amount, Category: expensePayload.category, Description: expensePayload.description, Account: expensePayload.account });
  
  const subIndex = globalTransactions.findIndex(t => String(t.ID) === String(id));
  if (subIndex !== -1) globalTransactions[subIndex].Date = nextDateStr;
  
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));

  // Send both to the queue instantly
  queueAndSync(expensePayload);
  queueAndSync(updatePayload);
  
  processAndRenderDashboard();
}

function undoLastBillPayment(id, name, cycle, currentDate) {
  if (!confirm(`Undo the last payment logged for ${name}?`)) return;

  const paidExpenses = globalTransactions.filter(t => t.Type === 'Expense' && t.Category === 'Bills' && t.Description === `Paid: ${name}`);
  
  if (paidExpenses.length === 0) {
    alert("No recent payments found to undo.");
    return;
  }

  paidExpenses.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  const latestPayment = paidExpenses[0];

  const currentD = new Date(currentDate.split('T')[0]);
  if (cycle === 'Yearly') {
    currentD.setFullYear(currentD.getFullYear() - 1);
  } else if (cycle === 'Semi-Annual') {
    currentD.setMonth(currentD.getMonth() - 6);
  } else if (cycle === 'Quarterly') {
    currentD.setMonth(currentD.getMonth() - 3);
  } else {
    currentD.setMonth(currentD.getMonth() - 1);
  }
  const prevDateStr = currentD.toISOString().split('T')[0];

  globalTransactions = globalTransactions.filter(t => String(t.ID) !== String(latestPayment.ID));
  
  const subIndex = globalTransactions.findIndex(t => String(t.ID) === String(id));
  if (subIndex !== -1) globalTransactions[subIndex].Date = prevDateStr;

  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));

  // Send both to the queue instantly
  queueAndSync({ action: 'delete', id: String(latestPayment.ID) });
  queueAndSync({
    action: 'edit',
    id: String(id),
    type: 'Subscription',
    category: name,
    amount: globalTransactions[subIndex].Amount,
    date: prevDateStr,
    description: cycle
  });

  processAndRenderDashboard();
}

// --- 14. DEBT TRACKER LOGIC ---
function openAddDebtModal() {
  document.getElementById('debt-edit-id').value = '';
  document.getElementById('debt-form').reset();
  document.getElementById('debt-name').disabled = false;
  document.getElementById('debt-date').value = new Date().toISOString().split('T')[0]; // Default to today
  document.getElementById('debt-modal-title').innerText = 'Add New Debt';
  document.getElementById('add-debt-modal').style.display = 'flex';
}

function openEditDebt(id, name, balance, apr, min, dateStr) {
  document.getElementById('debt-edit-id').value = id;
  document.getElementById('debt-name').value = name;
  document.getElementById('debt-name').disabled = true; // Lock name to preserve payment links
  document.getElementById('debt-balance').value = balance;
  document.getElementById('debt-apr').value = apr;
  document.getElementById('debt-min').value = min;
  
  // Failsafe: Only attempt to set the date if the HTML element actually exists
  const dateInput = document.getElementById('debt-date');
  if (dateInput) {
    if (dateStr && dateStr !== 'undefined' && dateStr !== 'null') {
      dateInput.value = dateStr.split('T')[0];
    } else {
      // Fallback to today if this is an older debt missing a date
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }
  
  document.getElementById('debt-modal-title').innerText = 'Edit Debt';
  document.getElementById('add-debt-modal').style.display = 'flex';
}

document.getElementById('debt-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const isEdit = document.getElementById('debt-edit-id').value !== '';
  const id = isEdit ? document.getElementById('debt-edit-id').value : Date.now().toString();
  const name = document.getElementById('debt-name').value;
  
  // Reconstruct the internal baseline amount so the UI exactly matches the newly typed current balance
  let internalAmount = parseFloat(document.getElementById('debt-balance').value);
  if (isEdit) {
     const pastPayments = globalTransactions.filter(t => t.Type === 'Expense' && t.Description === `Paid: ${name}`);
     pastPayments.forEach(p => internalAmount += parseFloat(p.Amount));
  }

  // Safely capture the date
  const dateInput = document.getElementById('debt-date');
  const finalDate = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];

  const payload = {
    action: isEdit ? 'edit' : 'add',
    id: id,
    type: 'Debt Definition',
    date: finalDate,
    amount: internalAmount,
    category: name,
    description: `${document.getElementById('debt-apr').value}|${document.getElementById('debt-min').value}`
  };

  if (isEdit) {
    const index = globalTransactions.findIndex(t => String(t.ID) === String(id));
    if (index !== -1) {
      globalTransactions[index].Amount = payload.amount;
      globalTransactions[index].Description = payload.description;
      globalTransactions[index].Date = payload.date; // CRITICAL: Now correctly saves edited dates
    }
  } else {
    globalTransactions.push({ ID: payload.id, Type: payload.type, Date: payload.date, Amount: payload.amount, Category: payload.category, Description: payload.description });
  }

  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));
  document.getElementById('add-debt-modal').style.display = 'none';
  
  queueAndSync(payload);
  processAndRenderDashboard();
});

function renderDebtPage() {
  const listContainer = document.getElementById('debt-list');
  if (!listContainer) return;

  const lang = userSettings.language || 'en';
  const dict = i18n[lang] || i18n['en'];

  const debtDefs = globalTransactions.filter(t => t.Type === 'Debt Definition');
  const payments = globalTransactions.filter(t => t.Type === 'Expense' && t.Category === 'Debt Payment');

  let activeDebts = [];
  let totalMinMonthly = 0;
  let totalCurrentBalance = 0;

  debtDefs.forEach(def => {
    let currentBalance = parseFloat(def.Amount) || 0; // Safely catch NaN
    
    // Deduct cash payments from the internal baseline
    const relatedPayments = payments.filter(p => p.Description === `Paid: ${def.Category}`);
    relatedPayments.forEach(p => {
      currentBalance -= (parseFloat(p.Amount) || 0);
    });
    
    if (currentBalance < 0.01) currentBalance = 0;

    // SAFELY parse the description to prevent undefined/number crashes
    const descString = String(def.Description || '');
    const parts = descString.split('|');
    const apr = parseFloat(parts[0]) || 0;
    const minPay = parseFloat(parts[1]) || 0;

    if (currentBalance > 0) {
      // Add the date property to the array
      activeDebts.push({ id: def.ID, name: def.Category, balance: currentBalance, apr: apr, min: minPay, date: def.Date });
      totalMinMonthly += minPay;
      totalCurrentBalance += currentBalance;
    }
  });

  document.getElementById('debt-total-left').innerText = `${userSettings.currency}${totalCurrentBalance.toFixed(2)}`;
  document.getElementById('debt-min-monthly').innerText = `Min Payment: ${userSettings.currency}${totalMinMonthly.toFixed(2)}/mo`;
  // Calculate Total Paid So Far
  const totalPaidSoFar = payments.reduce((sum, p) => sum + (parseFloat(p.Amount) || 0), 0);
  const paidSoFarEl = document.getElementById('debt-paid-sofar');
  if (paidSoFarEl) paidSoFarEl.innerText = `${userSettings.currency}${totalPaidSoFar.toFixed(2)}`;

  if (activeDebts.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">No active debts! You are debt free.</p>';
    document.getElementById('debt-free-date').innerText = 'Achieved 🎉';
    document.getElementById('debt-time-left').innerText = '0 months left';
    document.getElementById('debt-total-interest').innerText = `${userSettings.currency}0.00`;
    document.getElementById('debt-chart-container').innerHTML = '';
    return;
  }

  // Amortization Simulation
  const strategy = document.getElementById('debt-strategy').value;
  const extraMonthly = parseFloat(document.getElementById('debt-extra-payment').value) || 0;

  // NEW: Save preferences instantly so they survive a refresh
  localStorage.setItem('debtSettings', JSON.stringify({ strategy: strategy, extra: extraMonthly }));
  
  let simDebts = activeDebts.map(d => ({ ...d, interestPaid: 0, payoffMonth: 0 })); 
  let totalInterestPaid = 0;
  let monthsPassed = 0;
  let chartData = [{ month: 0, balance: totalCurrentBalance }];
  const MAX_MONTHS = 360; // 30-year failsafe limit

  // Generate Initial Payment Priority List for the UI
  let priorityDebts = activeDebts.map(d => ({ ...d }));
  if (strategy === 'avalanche') {
    priorityDebts.sort((a, b) => b.apr - a.apr);
  } else {
    priorityDebts.sort((a, b) => a.balance - b.balance); 
  }
  
  let orderHtml = '';
  priorityDebts.forEach((d, index) => {
    orderHtml += `
      <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--bg-color); border-radius: 12px;">
        <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--accent-color); color: white; display: flex; justify-content: center; align-items: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">${index + 1}</div>
        <div style="display: flex; flex-direction: column;">
          <span style="font-weight: bold; font-size: 14px; color: var(--text-main);">${d.name}</span>
          <span style="font-size: 11px; color: var(--text-muted);">${strategy === 'avalanche' ? 'APR: ' + d.apr + '%' : 'Bal: ' + userSettings.currency + d.balance.toFixed(2)}</span>
        </div>
      </div>
    `;
  });
  const orderContainer = document.getElementById('debt-payment-order');
  if (orderContainer) orderContainer.innerHTML = orderHtml;

  while (simDebts.reduce((sum, d) => sum + d.balance, 0) > 0.01 && monthsPassed < MAX_MONTHS) {
    monthsPassed++;
    let overflow = extraMonthly;
    
    // Prioritize Targets
    if (strategy === 'avalanche') {
      simDebts.sort((a, b) => b.apr - a.apr); // Highest Interest First
    } else {
      simDebts.sort((a, b) => a.balance - b.balance); // Lowest Balance First
    }

    // 1. Accrue Interest & Process Min Payments
    simDebts.forEach(d => {
      if (d.balance > 0) {
        const interest = d.balance * (d.apr / 100 / 12);
        d.balance += interest;
        d.interestPaid += interest; // NEW: Track individual interest
        totalInterestPaid += interest;

        if (d.balance <= d.min) {
          overflow += (d.min - d.balance); 
          d.balance = 0;
          if (d.payoffMonth === 0) d.payoffMonth = monthsPassed; // NEW: Record individual payoff month
        } else {
          d.balance -= d.min;
        }
      }
    });

    // 2. Dump overflow pool onto the priority target
    while (overflow > 0) {
      const target = simDebts.find(d => d.balance > 0);
      if (!target) break; 
      
      if (target.balance <= overflow) {
        overflow -= target.balance;
        target.balance = 0;
        if (target.payoffMonth === 0) target.payoffMonth = monthsPassed; // NEW: Record individual payoff month
      } else {
        target.balance -= overflow;
        overflow = 0;
      }
    }
    
    const monthBalance = simDebts.reduce((sum, d) => sum + d.balance, 0);
    if (monthsPassed % 3 === 0 || monthBalance <= 0 || monthsPassed === 1) { 
      chartData.push({ month: monthsPassed, balance: monthBalance });
    }
  }

  document.getElementById('debt-total-interest').innerText = `${userSettings.currency}${totalInterestPaid.toFixed(2)}`;
  
  if (monthsPassed >= MAX_MONTHS) {
    document.getElementById('debt-free-date').innerText = '30+ Years';
    document.getElementById('debt-time-left').innerText = 'Payments too low to beat interest';
    document.getElementById('debt-time-left').style.color = 'var(--danger)';
  } else {
    const today = new Date();
    today.setMonth(today.getMonth() + monthsPassed);
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    document.getElementById('debt-free-date').innerText = today.toLocaleDateString(lang, { month: 'short', year: 'numeric' });
    
    const yrs = Math.floor(monthsPassed / 12);
    const mos = monthsPassed % 12;
    document.getElementById('debt-time-left').innerText = `${yrs > 0 ? yrs + ' yrs ' : ''}${mos} mos left`;
    document.getElementById('debt-time-left').style.color = 'var(--text-muted)';
  }

  // Identify the current #1 Target
  const topTargetId = priorityDebts.length > 0 ? priorityDebts[0].id : null;

  // HTML Rendering
  let listHtml = '';
  activeDebts.forEach(d => {
    const safeName = d.name.replace(/'/g, "\\'");
    const isTopTarget = d.id === topTargetId;
    const extraToSuggest = isTopTarget ? extraMonthly : 0; 

    const simData = simDebts.find(s => s.id === d.id);
    const payoffMonth = simData ? simData.payoffMonth : 0;
    const indInterest = simData ? simData.interestPaid : 0;

    // Date math for 7-day warnings
    const today = new Date();
    today.setHours(0,0,0,0);
    const dueDate = new Date(d.date);
    dueDate.setHours(0, 0, 0, 0);
    const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    const dateStr = dueDate.toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' });
    
    let dateWarning = '';
    let alertColor = 'var(--text-main)';
    let borderColor = 'var(--border-color)';
    
    if (daysDiff < 0) {
      dateWarning = `<div style="font-size: 11px; font-weight: bold; color: var(--danger); margin-top: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Overdue: ${dateStr}</div>`;
      alertColor = 'var(--danger)';
      borderColor = 'var(--danger)';
    } else if (daysDiff <= 7) {
      dateWarning = `<div style="font-size: 11px; font-weight: bold; color: var(--danger); margin-top: 6px;"><i class="fa-solid fa-clock"></i> Due in ${daysDiff} day(s)</div>`;
      alertColor = 'var(--danger)';
      borderColor = 'var(--danger)';
    } else {
      dateWarning = `<div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;"><i class="fa-regular fa-calendar"></i> Due: ${dateStr}</div>`;
    }

    listHtml += `
      <div style="background: var(--card-bg); border-radius: 16px; padding: 20px; border: 1px solid ${borderColor}; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          
          <div onclick="openDebtDetails('${safeName}', ${payoffMonth}, ${indInterest})" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.opacity=0.6" onmouseout="this.style.opacity=1" title="View details and payment history">
            <div style="font-weight: bold; font-size: 18px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              ${d.name} <i class="fa-solid fa-circle-info" style="font-size: 12px; color: var(--accent-color);"></i>
            </div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px; font-weight: 600;">APR: ${d.apr}% &nbsp;|&nbsp; Min: ${userSettings.currency}${d.min.toFixed(2)}</div>
            ${dateWarning}
          </div>
          
          <div style="text-align: right;">
            <div style="font-weight: bold; font-size: 20px; color: var(--text-main);">${userSettings.currency}${d.balance.toFixed(2)}</div>
            
            <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 10px; align-items: center;">
              <button onclick="openEditDebt('${d.id}', '${safeName}', ${d.balance}, ${d.apr}, ${d.min}, '${d.date}')" style="background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button onclick="deleteTransaction('${d.id}')" style="background: rgba(231, 76, 60, 0.1); color: var(--danger); border: none; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: 0.2s;">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
        <button style="width: 100%; background: ${alertColor}; color: var(--bg-color); border: none; border-radius: 12px; padding: 12px; font-weight: bold; cursor: pointer;" onclick="openLogDebtPayment('${d.id}', '${safeName}', ${d.min}, ${extraToSuggest})">
          <i class="fa-solid fa-money-bill-wave" style="margin-right: 6px;"></i> ${dict.logPayment}
        </button>
      </div>
    `;
  });
  listContainer.innerHTML = listHtml;

  // SVG Chart Projection Rendering
  const chartContainer = document.getElementById('debt-chart-container');
  if (chartData.length > 1 && monthsPassed < MAX_MONTHS) {
    let pathD = "";
    let fillD = "";
    const pts = chartData.length;
    const maxBal = chartData[0].balance;

    chartData.forEach((pt, i) => {
      const x = (i / (pts - 1)) * 100;
      const y = maxBal > 0 ? 100 - ((pt.balance / maxBal) * 95) : 100;

      if (i === 0) {
        pathD += `M ${x} ${y} `;
        fillD += `M ${x} 100 L ${x} ${y} `;
      } else {
        // Use straight lines (L) between dense points to eliminate the bezier wobble
        pathD += `L ${x} ${y} `;
        fillD += `L ${x} ${y} `;
      }
    });
    fillD += `L 100 100 Z`;

    chartContainer.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute; top:0; left:0; z-index:1; overflow:visible;">
        <defs>
          <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--danger)" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="var(--danger)" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <path d="${fillD}" fill="url(#debtGrad)" />
        <path d="${pathD}" fill="none" stroke="var(--danger)" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round" />
      </svg>
      <div style="position: absolute; bottom: -28px; left: 0; font-size: 11px; font-weight: bold; color: var(--text-muted);">Today</div>
      <div style="position: absolute; bottom: -28px; right: 0; font-size: 11px; font-weight: bold; color: var(--text-muted);">${document.getElementById('debt-free-date').innerText}</div>
    `;
  } else {
    chartContainer.innerHTML = '<p class="empty-state">Add a debt to see projection.</p>';
  }
}

// Log Actual Cash Payment with Smart Helper
function openLogDebtPayment(id, name, minPayment, extraPayment) {
  document.getElementById('log-debt-id').value = id;
  document.getElementById('log-debt-title').innerText = name;
  document.getElementById('log-debt-date').value = new Date().toISOString().split('T')[0];
  
  // Calculate the mathematically perfect payment
  const totalSuggested = minPayment + extraPayment;
  document.getElementById('log-debt-amount').value = totalSuggested.toFixed(2);
  
  // Generate the smart helper text
  const helperEl = document.getElementById('log-debt-helper');
  if (extraPayment > 0) {
    helperEl.innerHTML = `<span style="color: var(--accent-color);"><i class="fa-solid fa-bullseye"></i> <b>Target Priority:</b> Pay exactly ${userSettings.currency}${totalSuggested.toFixed(2)} (Min: ${userSettings.currency}${minPayment.toFixed(2)} + ${userSettings.currency}${extraPayment.toFixed(2)} Extra) to stay on track for your projected debt-free date!</span>`;
  } else {
    helperEl.innerHTML = `<span style="color: var(--text-muted);"><i class="fa-solid fa-check"></i> <b>Standard Payment:</b> Pay your minimum of ${userSettings.currency}${minPayment.toFixed(2)} while focusing extra cash on your #1 target.</span>`;
  }

  document.getElementById('log-debt-modal').style.display = 'flex';
}

document.getElementById('log-debt-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const payload = {
    action: 'add',
    id: Date.now().toString(),
    type: 'Expense',
    date: document.getElementById('log-debt-date').value,
    amount: parseFloat(document.getElementById('log-debt-amount').value),
    category: 'Debt Payment',
    description: `Paid: ${document.getElementById('log-debt-title').innerText}`,
    account: document.getElementById('log-debt-account').value // NEW: Captures selected account
  };

  // FIX: Push with Capitalized keys to match the rest of the application's memory
  globalTransactions.push({ 
    ID: payload.id, 
    Type: payload.type, 
    Date: payload.date, 
    Amount: payload.amount, 
    Category: payload.category, 
    Description: payload.description,
    Account: payload.account 
  });
  
  localStorage.setItem('budget_app_transactions', JSON.stringify(globalTransactions));

  // Auto-roll the debt definition date forward by 1 month
  const debtId = document.getElementById('log-debt-id').value;
  const defIndex = globalTransactions.findIndex(t => String(t.ID) === String(debtId));
  if (defIndex !== -1) {
    const currentD = new Date(globalTransactions[defIndex].Date);
    currentD.setMonth(currentD.getMonth() + 1);
    const nextDateStr = currentD.toISOString().split('T')[0];
    
    globalTransactions[defIndex].Date = nextDateStr;
    queueAndSync({
      action: 'edit',
      id: String(debtId),
      type: 'Debt Definition',
      category: globalTransactions[defIndex].Category,
      amount: globalTransactions[defIndex].Amount,
      date: nextDateStr,
      description: globalTransactions[defIndex].Description
    });
  }
  
  document.getElementById('log-debt-modal').style.display = 'none';
  queueAndSync(payload);
  processAndRenderDashboard();
});

// Open Individual Debt Analytics & History
function openDebtDetails(name, payoffMonth, interestPaid) {
  document.getElementById('dd-title').innerText = name;
  document.getElementById('dd-total-interest').innerText = `${userSettings.currency}${interestPaid.toFixed(2)}`;

  const today = new Date();
  if (payoffMonth === 0) {
    document.getElementById('dd-est-date').innerText = 'Achieved 🎉';
    document.getElementById('dd-time-left').innerText = '0 months left';
  } else if (payoffMonth >= 360) {
    document.getElementById('dd-est-date').innerText = '30+ Years';
    document.getElementById('dd-time-left').innerText = 'Payments too low';
  } else {
    const estDate = new Date(today);
    estDate.setMonth(estDate.getMonth() + payoffMonth);
    const lang = userSettings.language === 'en' ? 'en-US' : userSettings.language;
    document.getElementById('dd-est-date').innerText = estDate.toLocaleDateString(lang, { month: 'short', year: 'numeric' });

    const yrs = Math.floor(payoffMonth / 12);
    const mos = payoffMonth % 12;
    document.getElementById('dd-time-left').innerText = `${yrs > 0 ? yrs + ' yrs ' : ''}${mos} mos left`;
  }

  // Generate Payment History
  const payments = globalTransactions.filter(t => t.Type === 'Expense' && t.Description === `Paid: ${name}`);
  payments.sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Newest first

  const logList = document.getElementById('dd-log-list');
  if (payments.length === 0) {
    logList.innerHTML = '<p class="empty-state" style="margin-top: 10px;">No payment history yet.</p>';
  } else {
    let logBuffer = '';
    payments.forEach(t => {
      const amt = parseFloat(t.Amount);
      logBuffer += `
        <div class="transaction-item" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color);">
          <span class="transaction-date" style="font-weight: 500;">${formatAppDate(t.Date)}</span>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="color: var(--accent-color); font-weight: bold;">+${userSettings.currency}${amt.toFixed(2)}</span>
            <button onclick="deleteTransaction('${t.ID}'); document.getElementById('debt-details-modal').style.display='none';" class="icon-btn" style="color: var(--danger); padding: 4px; background: transparent; border: none; cursor: pointer;" title="Delete Payment">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
    logList.innerHTML = logBuffer;
  }

  document.getElementById('debt-details-modal').style.display = 'flex';
}

// --- SPLIT BILL ENGINE ---
let splitPersons = [{ id: 'p1', name: 'You' }, { id: 'p2', name: 'Person 2' }];

function initSplitPage() {
  // Safety check to ensure the elements exist before trying to draw them
  if (!document.getElementById('split-persons-list')) return;

  renderSplitPersons();
  renderSplitFields();
}

function renderSplitPersons() {
  const listEl = document.getElementById('split-persons-list');
  const payerEl = document.getElementById('split-payer');
  listEl.innerHTML = '';
  payerEl.innerHTML = '';

  splitPersons.forEach((p, index) => {
    // Render Person Input
    listEl.innerHTML += `
      <div style="display: flex; gap: 12px; align-items: center;">
        <input type="text" value="${p.name}" onchange="updateSplitPerson('${p.id}', this.value)" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: transparent; color: var(--text-main); outline: none;">
        ${index > 0 ? `<i class="fa-solid fa-trash" style="color: var(--danger); cursor: pointer;" onclick="removeSplitPerson('${p.id}')"></i>` : `<i class="fa-solid fa-trash" style="color: transparent;"></i>`}
      </div>
    `;
    // Render Payer Option
    payerEl.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
  renderSplitFields();
}

function updateSplitPerson(id, newName) {
  const person = splitPersons.find(p => p.id === id);
  if (person) person.name = newName || 'Unnamed';
  renderSplitPersons();
}

function addSplitPerson() {
  splitPersons.push({ id: 'p' + Date.now(), name: `Person ${splitPersons.length + 1}` });
  renderSplitPersons();
}

function removeSplitPerson(id) {
  splitPersons = splitPersons.filter(p => p.id !== id);
  renderSplitPersons();
}

function renderSplitFields() {
  const strategy = document.getElementById('split-strategy').value;
  const fieldsContainer = document.getElementById('split-strategy-fields');
  fieldsContainer.innerHTML = '';

  if (strategy === 'equal') return;

  let html = '';
  if (strategy === 'item') {
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <label style="font-size: 12px; color: var(--text-muted); font-weight: bold; margin: 0;">WHAT WAS ORDERED? (Tax/Tip auto-calculated)</label>
        <button onclick="addSharedItemRow()" style="background: none; border: none; color: var(--accent-color); cursor: pointer; font-size: 12px; font-weight: bold;"><i class="fa-solid fa-plus"></i> Add Item</button>
      </div>
      <div id="shared-items-container" style="display: flex; flex-direction: column; gap: 16px;"></div>
    `;
    fieldsContainer.innerHTML = html;
    addSharedItemRow(); // Render first empty item automatically
  } else {
    // Existing Amount/Ratio Layout
    html += `<label style="font-size: 12px; color: var(--text-muted); font-weight: bold; margin-bottom: 12px; display: block;">SPECIFY ${strategy === 'amount' ? 'AMOUNTS' : 'RATIOS'} PER PERSON</label>`;
    splitPersons.forEach(p => {
      const symbol = strategy === 'amount' ? userSettings.currency : '%';
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="color: var(--text-main); font-weight: 500;">${p.name}</span>
          <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: 8px; padding: 0 8px; width: 120px;">
            <span style="color: var(--text-muted); font-weight: bold; font-size: 12px;">${symbol}</span>
            <input type="number" id="split-val-${p.id}" placeholder="0" style="border: none; background: transparent; padding: 8px; width: 100%; outline: none; color: var(--text-main); text-align: right;">
          </div>
        </div>
      `;
    });
    fieldsContainer.innerHTML = html;
  }
}

// NEW HELPER FUNCTIONS FOR ITEM-WISE TOGGLES
function addSharedItemRow() {
  const container = document.getElementById('shared-items-container');
  if (!container) return;
  const rowId = 'item-' + Date.now();

  let togglesHtml = `<button type="button" style="padding: 6px 12px; font-size: 12px; border-radius: 20px; border: 1px solid var(--border-color); background: transparent; color: var(--text-main); cursor: pointer;" onclick="toggleAllPersons('${rowId}')">All</button>`;
  
  // Create toggle buttons for everyone (Default: active/selected)
  splitPersons.forEach(p => {
     togglesHtml += `<button type="button" class="person-toggle-${rowId}" data-person-id="${p.id}" data-active="true" style="padding: 6px 12px; font-size: 12px; border-radius: 20px; border: 1px solid var(--accent-color); background: var(--accent-color); color: white; cursor: pointer; transition: 0.2s;" onclick="togglePerson(this)">${p.name}</button>`;
  });

  const row = document.createElement('div');
  row.className = "shared-item-row";
  row.style.cssText = "background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px;";
  row.innerHTML = `
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <input type="text" placeholder="Item name" style="flex: 2; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: transparent; color: var(--text-main); outline: none;">
      <div style="display: flex; align-items: center; flex: 1; border: 1px solid var(--border-color); border-radius: 8px; padding: 0 8px;">
        <span style="color: var(--text-muted); font-weight: bold; font-size: 12px;">${userSettings.currency}</span>
        <input type="number" placeholder="0.00" class="shared-item-cost" style="border: none; background: transparent; padding: 10px; width: 100%; outline: none; color: var(--text-main); text-align: right;">
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0 4px;"><i class="fa-solid fa-xmark" style="font-size: 18px;"></i></button>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <span style="font-size: 11px; font-weight: bold; color: var(--text-muted); margin-right: 8px;">WHO HAD THIS?</span>
      ${togglesHtml}
    </div>
  `;
  container.appendChild(row);
}

function togglePerson(btn) {
  const isActive = btn.getAttribute('data-active') === 'true';
  if (isActive) {
    btn.style.background = 'transparent';
    btn.style.color = 'var(--text-main)';
    btn.style.borderColor = 'var(--border-color)';
    btn.setAttribute('data-active', 'false');
  } else {
    btn.style.background = 'var(--accent-color)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--accent-color)';
    btn.setAttribute('data-active', 'true');
  }
}

function toggleAllPersons(rowId) {
  const btns = document.querySelectorAll(`.person-toggle-${rowId}`);
  const allActive = Array.from(btns).every(b => b.getAttribute('data-active') === 'true');
  
  btns.forEach(btn => {
    if (allActive) { // Turn all off
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-main)';
      btn.style.borderColor = 'var(--border-color)';
      btn.setAttribute('data-active', 'false');
    } else { // Turn all on
      btn.style.background = 'var(--accent-color)';
      btn.style.color = 'white';
      btn.style.borderColor = 'var(--accent-color)';
      btn.setAttribute('data-active', 'true');
    }
  });
}

// Add this helper function immediately below renderSplitFields()
function addSplitItemField(personId) {
  const container = document.getElementById(`items-${personId}`);
  if (!container) return;
  const row = document.createElement('div');
  row.style.cssText = "display: flex; gap: 8px;";
  row.innerHTML = `
    <input type="text" placeholder="Item name" style="flex: 2; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-main); outline: none;">
    <div style="display: flex; align-items: center; flex: 1; border: 1px solid var(--border-color); border-radius: 8px; padding: 0 8px; background: var(--bg-color);">
      <span style="color: var(--text-muted); font-weight: bold; font-size: 12px;">${userSettings.currency}</span>
      <input type="number" placeholder="0" class="split-val-item-${personId}" style="border: none; background: transparent; padding: 10px; width: 100%; outline: none; color: var(--text-main); text-align: right;">
    </div>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; color: var(--danger); cursor: pointer; padding: 0 8px;"><i class="fa-solid fa-trash"></i></button>
  `;
  container.appendChild(row);
}

function calculateSplit() {
  const totalAmount = parseFloat(document.getElementById('split-amount').value) || 0;
  const strategy = document.getElementById('split-strategy').value;
  const payerId = document.getElementById('split-payer').value;
  const payerName = splitPersons.find(p => p.id === payerId).name;
  
  let breakdown = [];

  if (totalAmount <= 0) {
    alert("Please enter a valid total amount.");
    return;
  }

  if (strategy === 'equal') {
    const splitAmount = totalAmount / splitPersons.length;
    splitPersons.forEach(p => {
      if (p.id !== payerId) breakdown.push({ name: p.name, owes: splitAmount });
    });
  } 
  else if (strategy === 'amount') {
    let sum = 0;
    splitPersons.forEach(p => {
      const amt = parseFloat(document.getElementById(`split-val-${p.id}`).value) || 0;
      sum += amt;
      if (p.id !== payerId && amt > 0) breakdown.push({ name: p.name, owes: amt });
    });
    if (Math.abs(sum - totalAmount) > 0.1) {
      alert(`The individual amounts must add up to exactly ${userSettings.currency}${totalAmount.toFixed(2)}. Currently: ${userSettings.currency}${sum.toFixed(2)}`);
      return;
    }
  } 
  else if (strategy === 'ratio') {
    let ratioSum = 0;
    splitPersons.forEach(p => ratioSum += parseFloat(document.getElementById(`split-val-${p.id}`).value) || 0);
    if (ratioSum <= 0) {
      alert("Total ratio/percentage must be greater than 0.");
      return;
    }
    splitPersons.forEach(p => {
      const val = parseFloat(document.getElementById(`split-val-${p.id}`).value) || 0;
      const owesAmt = totalAmount * (val / ratioSum);
      if (p.id !== payerId && owesAmt > 0) breakdown.push({ name: p.name, owes: owesAmt });
    });
  } 
  else if (strategy === 'item') {
    let totalItemSum = 0;
    let personTotals = {};
    splitPersons.forEach(p => personTotals[p.id] = 0);

    const itemRows = document.querySelectorAll('.shared-item-row');
    
    // Distribute exact item costs based on who was selected
    itemRows.forEach(row => {
      const costInput = row.querySelector('.shared-item-cost');
      const cost = parseFloat(costInput.value) || 0;
      
      if (cost > 0) {
        // Find everyone toggled "on" for this specific item
        const activeBtns = Array.from(row.querySelectorAll('[data-person-id]')).filter(btn => btn.getAttribute('data-active') === 'true');
        
        if (activeBtns.length > 0) {
          const splitCost = cost / activeBtns.length; // Split item cost evenly among sharers
          activeBtns.forEach(btn => {
            const pid = btn.getAttribute('data-person-id');
            if (personTotals[pid] !== undefined) personTotals[pid] += splitCost;
          });
          totalItemSum += cost;
        }
      }
    });

    if (totalItemSum === 0) {
      alert("Please enter item amounts and select who shared them.");
      return;
    }

    // Automatically distribute tax and tip proportionally based on base item share
    splitPersons.forEach(p => {
      const ratio = personTotals[p.id] / totalItemSum;
      const owesAmt = totalAmount * ratio;
      if (p.id !== payerId && owesAmt > 0) {
        breakdown.push({ name: p.name, owes: owesAmt });
      }
    });
  }

  // Render Results
  document.getElementById('split-result-title').style.display = 'block';
  const resultsContainer = document.getElementById('split-results');
  let resultHtml = '';

  if (breakdown.length === 0) {
    resultHtml = `<div style="padding: 16px; background: rgba(26, 188, 156, 0.1); color: var(--accent-color); border-radius: 12px; font-weight: bold; text-align: center;">No one owes anything!</div>`;
  } else {
    breakdown.forEach(b => {
      resultHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
          <div>
            <div style="font-weight: bold; color: var(--text-main); font-size: 16px;">${b.name}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">owes ${payerName}</div>
          </div>
          <div style="font-weight: bold; font-size: 20px; color: var(--danger);">${userSettings.currency}${b.owes.toFixed(2)}</div>
        </div>
      `;
    });
  }
  resultsContainer.innerHTML = resultHtml;
}

// --- DASHBOARD UPCOMING WIDGETS ---
function renderDashboardUpcoming() {
  const billsContainer = document.getElementById('dash-upcoming-bills');
  const debtsContainer = document.getElementById('dash-upcoming-debts');
  if (!billsContainer || !debtsContainer) return;

  const today = new Date();
  today.setHours(0,0,0,0);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  let billsHtml = '';
  let debtsHtml = '';

  // 1. Process Upcoming Bills
  const bills = globalTransactions.filter(t => t.Type === 'Subscription' && t.Date);
  let upcomingBills = bills.filter(b => {
    const d = new Date(b.Date);
    d.setHours(0,0,0,0);
    return d <= nextWeek; // Includes upcoming 7 days AND overdue
  }).sort((a, b) => new Date(a.Date) - new Date(b.Date));

  if (upcomingBills.length === 0) {
    billsHtml = '<p class="empty-state" style="padding: 16px; background: var(--card-bg); border-radius: 12px; font-size: 12px; margin: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">No bills due in the next 7 days.</p>';
  } else {
    upcomingBills.forEach(b => {
       const amt = parseFloat(b.Amount) || 0;
       const d = new Date(b.Date);
       d.setHours(0,0,0,0);
       const daysDiff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
       
       let dueText, iconColor;
       if (daysDiff < 0) {
         dueText = `Overdue by ${Math.abs(daysDiff)} day(s)`;
         iconColor = 'var(--danger)';
       } else if (daysDiff === 0) {
         dueText = 'Due Today';
         iconColor = 'var(--danger)';
       } else {
         dueText = `Due in ${daysDiff} day(s)`;
         iconColor = 'var(--accent-color)';
       }
       
       const borderCol = daysDiff <= 3 ? 'var(--danger)' : 'var(--accent-color)';

       billsHtml += `
         <div style="background: var(--card-bg); padding: 14px 16px; border-radius: 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid ${borderCol}; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
           <div>
             <div style="font-weight: bold; font-size: 14px; color: var(--text-main); margin-bottom: 4px;">${b.Category}</div>
             <div style="font-size: 11px; color: ${iconColor}; font-weight: bold;"><i class="fa-regular fa-clock" style="margin-right: 4px;"></i>${dueText}</div>
           </div>
           <div style="font-weight: bold; color: var(--text-main); font-size: 15px;">${userSettings.currency}${amt.toFixed(2)}</div>
         </div>
       `;
    });
  }

  // 2. Process Upcoming Debts
  const debts = globalTransactions.filter(t => t.Type === 'Debt Definition' && t.Date);
  const debtPayments = globalTransactions.filter(t => t.Type === 'Expense' && t.Category === 'Debt Payment');
  
  let upcomingDebts = debts.filter(d => {
    const dDate = new Date(d.Date);
    dDate.setHours(0,0,0,0);
    
    // Check if balance > 0 so we don't show paid off debts
    let currentBalance = parseFloat(d.Amount) || 0;
    const relatedPayments = debtPayments.filter(p => p.Description === `Paid: ${d.Category}`);
    relatedPayments.forEach(p => { currentBalance -= (parseFloat(p.Amount) || 0); });
    
    return dDate <= nextWeek && currentBalance > 0;
  }).sort((a, b) => new Date(a.Date) - new Date(b.Date));

  if (upcomingDebts.length === 0) {
    debtsHtml = '<p class="empty-state" style="padding: 16px; background: var(--card-bg); border-radius: 12px; font-size: 12px; margin: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">No debts due in the next 7 days.</p>';
  } else {
    upcomingDebts.forEach(d => {
       const parts = String(d.Description || '').split('|');
       const minPay = parseFloat(parts[1]) || 0;
       const dDate = new Date(d.Date);
       dDate.setHours(0,0,0,0);
       const daysDiff = Math.ceil((dDate - today) / (1000 * 60 * 60 * 24));
       
       let dueText, iconColor;
       if (daysDiff < 0) {
         dueText = `Overdue by ${Math.abs(daysDiff)} day(s)`;
         iconColor = 'var(--danger)';
       } else if (daysDiff === 0) {
         dueText = 'Due Today';
         iconColor = 'var(--danger)';
       } else {
         dueText = `Due in ${daysDiff} day(s)`;
         iconColor = 'var(--accent-color)';
       }
       
       const borderCol = daysDiff <= 3 ? 'var(--danger)' : 'var(--accent-color)';
       
       debtsHtml += `
         <div style="background: var(--card-bg); padding: 14px 16px; border-radius: 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid ${borderCol}; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
           <div>
             <div style="font-weight: bold; font-size: 14px; color: var(--text-main); margin-bottom: 4px;">${d.Category}</div>
             <div style="font-size: 11px; color: ${iconColor}; font-weight: bold;"><i class="fa-regular fa-clock" style="margin-right: 4px;"></i>${dueText}</div>
           </div>
           <div style="font-weight: bold; color: var(--text-main); text-align: right; font-size: 15px;">
             <div>${userSettings.currency}${minPay.toFixed(2)}</div>
             <div style="font-size: 10px; color: var(--text-muted); font-weight: normal; margin-top: 2px;">Min. Pay</div>
           </div>
         </div>
       `;
    });
  }

  billsContainer.innerHTML = billsHtml;
  debtsContainer.innerHTML = debtsHtml;
}

// Jump directly to Today's date on the Calendar
function goToToday(e) {
  // Prevent default bubbling
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  const today = new Date();
  
  // 1. Update the internal memory variables
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  
  // 2. Force a redraw (this updates the dropdowns and generates the cells)
  renderFullCalendar();
  
  // 3. Format today's date strictly as YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayFormatted = `${year}-${month}-${day}`;
  
  // 4. Wait a fraction of a second for the grid to render, find the cell, and load transactions
  setTimeout(() => {
    // The calendar builder automatically adds the '.today' class to today's cell
    const todayCell = document.querySelector('.calendar-cell.today');
    
    if (todayCell) {
      // Directly call your app's native function to load the bottom UI and highlight the cell
      renderCalendarDay(todayFormatted, todayCell);
    }
  }, 50);
}

function filterDashboard(category) {
  try {
    // 1. Reset all buttons to the default unselected state
    const allButtons = document.querySelectorAll('#dash-category-filters .pill-btn');
    allButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-main)';
    });

    // 2. Highlight the exact button that was clicked
    const clickedText = category === 'All' ? 'All Categories' : category;
    const activeBtn = Array.from(allButtons).find(b => b.innerText.trim() === clickedText);
    if (activeBtn) {
      activeBtn.classList.add('active');
      activeBtn.style.background = 'var(--text-main)';
      activeBtn.style.color = 'white';
    }

    // 3. Show or hide the transaction items based on the data-category attribute
    let categorySum = 0;
    const items = document.querySelectorAll('#recent-activity-list .transaction-item');
    
    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      
      if (category === 'All' || itemCategory === category) {
        item.style.display = 'flex'; // Restores the default flex layout
        
        // Add to total if a specific category is selected
        if (category !== 'All') {
          const amtSpan = item.querySelector('.transaction-amount');
          if (amtSpan) {
            categorySum += parseFloat(amtSpan.getAttribute('data-amount') || 0);
          }
        }
      } else {
        item.style.display = 'none'; // Hides unmatched items
      }
    });

    // 4. Update the category total badge dynamically
    const totalSpan = document.getElementById('dash-category-total');
    if (totalSpan) {
      if (category === 'All') {
        totalSpan.style.display = 'none';
      } else {
        totalSpan.innerText = `${userSettings.currency}${Math.abs(categorySum).toFixed(2)}`;
        totalSpan.style.display = 'inline-block';
        totalSpan.style.color = 'var(--accent-color)';
        totalSpan.style.background = 'rgba(26, 188, 156, 0.1)';
        totalSpan.style.padding = '4px 10px';
        totalSpan.style.borderRadius = '12px';
      }
    }
  } catch (e) {
    console.error("Dashboard filter error:", e);
  }
}

// --- KPI TIME FILTERS ---
function filterDashboardTime(range) {
  currentTimeRange = range;
  
  // 1. Update Pill Button Styles
  document.querySelectorAll('.time-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-range') === range) {
      btn.style.background = 'var(--text-main)';
      btn.style.color = 'var(--bg-color)';
      btn.style.borderColor = 'var(--text-main)';
    } else {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-main)';
      btn.style.borderColor = 'var(--border-color)';
    }
  });
  
  // 2. Calculate the Cutoff Date
  const today = new Date();
  let cutoff = new Date(1970, 0, 1); // Default to All Time
  
  if (range === '1m') { cutoff = new Date(today); cutoff.setMonth(today.getMonth() - 1); }
  else if (range === '3m') { cutoff = new Date(today); cutoff.setMonth(today.getMonth() - 3); }
  else if (range === '6m') { cutoff = new Date(today); cutoff.setMonth(today.getMonth() - 6); }
  else if (range === '1y') { cutoff = new Date(today); cutoff.setFullYear(today.getFullYear() - 1); }

  // 3. Calculate totals based on timeframe
  let calcIncome = 0;
  let calcExpense = 0;

  globalTransactions.forEach(t => {
    if (!t.Date) return;
    
    // Ignore Goal/Debt backend data for the raw cashflow KPI
    if (t.Type === 'Goal Definition' || t.Type === 'Subscription' || t.Type === 'Debt Definition') return;

    const d = new Date(t.Date);
    if (d >= cutoff) {
      const amt = parseFloat(t.Amount) || 0;
      if (t.Type === 'Income') calcIncome += amt;
      if (t.Type === 'Expense') calcExpense += amt;
    }
  });
  
  const calcBalance = calcIncome - calcExpense;
  
  // 4. Update the Green KPI Card
  const balEl = document.getElementById('dash-total-balance');
  const incEl = document.getElementById('dash-total-income');
  const expEl = document.getElementById('dash-total-expense');
  
  if (balEl) animateValue('dash-total-balance', calcBalance, 1000);
  if (incEl) animateValue('dash-total-income', calcIncome, 1000);
  if (expEl) animateValue('dash-total-expense', calcExpense, 1000);

  // NEW: 5. Render Donut Chart
  renderDonutChart(cutoff);
}

// --- EXPENSE BREAKDOWN DONUT CHART ---
function renderDonutChart(cutoffDate) {
  const container = document.getElementById('dash-donut-container');
  const legend = document.getElementById('dash-donut-legend');
  if (!container || !legend) return;

  let categoryTotals = {};
  let totalTrackedExpense = 0;

  // 1. Calculate Totals (Filtering out internal transfers)
  globalTransactions.forEach(t => {
    if (!t.Date || t.Type !== 'Expense') return;
    
    // Explicitly exclude Internal Transfers, Savings, and Goal logic
    if (t.Category === 'Savings' || t.Type === 'Goal Allocation') return;
    if (t.Description && t.Description.toLowerCase().includes('internal transfer')) return;

    const d = new Date(t.Date);
    if (d >= cutoffDate) {
      const amt = parseFloat(t.Amount) || 0;
      categoryTotals[t.Category] = (categoryTotals[t.Category] || 0) + amt;
      totalTrackedExpense += amt;
    }
  });

  // Handle Empty State
  if (totalTrackedExpense === 0) {
    container.innerHTML = '<p class="empty-state" style="font-size:12px; margin: 0;">No external expenses for this period.</p>';
    legend.innerHTML = '';
    return;
  }

  // 2. Sort Categories & Generate Colors
  const sortedCategories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);
  const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e', '#16a085', '#2980b9', '#8e44ad'];
  
  // 3. Draw SVG Donut
  let svgHtml = `
    <div style="position: relative; width: 160px; height: 160px;">
      <svg width="100%" height="100%" viewBox="0 0 42 42" style="transform: rotate(-90deg); overflow: visible;">
        <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--track-bg)" stroke-width="6"></circle>`;
  
  let legendHtml = '';
  let currentOffset = 100;

  sortedCategories.forEach((cat, index) => {
    const amt = categoryTotals[cat];
    const pct = (amt / totalTrackedExpense) * 100;
    const color = colors[index % colors.length];

    // Draw crisp SVG arcs with a dynamic gap between segments
    if (pct > 0) {
      const visiblePct = Math.max(0, pct - 1.5); // Subtracts 1.5% to create a clean gap
      
      svgHtml += `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${color}" stroke-width="7.5" stroke-dasharray="${visiblePct} ${100 - visiblePct}" stroke-dashoffset="${currentOffset}" style="transition: all 0.5s ease;"></circle>`;
      currentOffset -= pct; // Keeps the true mathematical offset intact
    }

    legendHtml += `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 12px; height: 12px; border-radius: 4px; background: ${color};"></div>
          <span style="color: var(--text-main); font-weight: 500;">${cat}</span>
        </div>
        <span style="font-weight: bold; color: var(--text-main);">${userSettings.currency}${amt.toFixed(2)}</span>
      </div>
    `;
  });

  // 4. Inject Center Text & Assemble
  svgHtml += `
      </svg>
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; pointer-events: none;">
        <span style="font-size: 11px; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">Total</span>
        <span style="font-size: 16px; color: var(--text-main); font-weight: bold;">${userSettings.currency}${totalTrackedExpense.toFixed(0)}</span>
      </div>
    </div>`;

  container.innerHTML = svgHtml;
  legend.innerHTML = legendHtml;
}

// Track currently viewed month on the Budget page
let viewingBudgetYear = new Date().getFullYear();
let viewingBudgetMonth = new Date().getMonth();

function shiftBudgetMonth(direction) {
  viewingBudgetMonth += direction;
  if (viewingBudgetMonth > 11) {
    viewingBudgetMonth = 0;
    viewingBudgetYear++;
  } else if (viewingBudgetMonth < 0) {
    viewingBudgetMonth = 11;
    viewingBudgetYear--;
  }
  renderBudgetPage();
}

// Replace your renderBudgetPage() function with this dynamic version:
function renderBudgetPage() {
  const container = document.getElementById('budget-cards-container');
  const chartContainer = document.getElementById('budget-chart-container');
  const label = document.getElementById('budget-month-label');
  const chartTitle = document.getElementById('chart-month-title');
  if (!container || !chartContainer) return;

  // Format month label
  const dateObj = new Date(viewingBudgetYear, viewingBudgetMonth, 1);
  const monthStr = dateObj.toLocaleString(userSettings.language || 'en', { month: 'long', year: 'numeric' });
  if (label) label.innerText = monthStr;
  if (chartTitle) chartTitle.innerText = monthStr;

  // Key for storage: e.g., "2026-10"
  const monthKey = `${viewingBudgetYear}-${String(viewingBudgetMonth + 1).padStart(2, '0')}`;
  
  // Ensure storage object exists for this month
  userSettings.budgets = userSettings.budgets || {};
  userSettings.budgets[monthKey] = userSettings.budgets[monthKey] || {};
  const monthBudgets = userSettings.budgets[monthKey];

  // NEW: Initialize trackers for the top KPI cards
  let overallTotalBudget = 0;
  let overallTotalSpent = 0;

  // 1. Initialize spending and calculate the Total Budget
  const spent = {};
  const expenseCategories = userSettings.categories.filter(c => c.type === 'Expense' && c.name !== 'Savings');
  
  expenseCategories.forEach(c => {
    spent[c.name] = 0;
    // Add each category's limit to the overall budget total
    overallTotalBudget += parseFloat(monthBudgets[c.name] || 0); 
  });

  // 2. Calculate Spending for this specific viewed month
  globalTransactions.forEach(t => {
    if (t.Type !== 'Expense' || !t.Date || t.Category === 'Savings') return;
    const d = new Date(t.Date);
    if (d.getMonth() === viewingBudgetMonth && d.getFullYear() === viewingBudgetYear) {
      if (spent[t.Category] !== undefined) {
        const amt = parseFloat(t.Amount) || 0;
        spent[t.Category] += amt;
        overallTotalSpent += amt; // NEW: Add this transaction to the overall spent total
      }
    }
  });

  let cardsHtml = '';
  let chartData = [];
  
  // 3. Build Category Cards
  expenseCategories.forEach(c => {
    const limit = monthBudgets[c.name] || 0;
    const amountSpent = spent[c.name] || 0;
    const remaining = limit - amountSpent;
    
    let pct = limit > 0 ? (amountSpent / limit) * 100 : 0;
    if (pct > 100) pct = 100;
    if (limit === 0 && amountSpent > 0) pct = 100;
    
    const color = amountSpent > limit && limit > 0 ? 'var(--danger)' : 'var(--accent-color)';
    const overageColor = amountSpent > limit && limit > 0 ? 'var(--danger)' : 'var(--text-muted)';
    
    chartData.push({ name: c.name, spent: amountSpent, limit: limit });

    cardsHtml += `
      <div style="background: var(--card-bg); padding: 20px; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; align-items: center;">
          <div style="font-weight: bold; font-size: 16px; color: var(--text-main);"><i class="fa-solid ${c.icon}" style="margin-right: 8px; color: var(--text-muted);"></i>${c.name}</div>
          <button onclick="openBudgetModal('${c.name}', ${limit})" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;"><i class="fa-solid fa-pen" style="margin-right: 6px;"></i>Edit</button>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
          <span style="color: var(--text-muted);">Spent: <span style="font-weight: bold; color: ${color};">${userSettings.currency}${amountSpent.toFixed(2)}</span></span>
          <span style="color: var(--text-muted);">Limit: <b style="color: var(--text-main);">${userSettings.currency}${limit.toFixed(2)}</b></span>
        </div>
        <div style="height: 8px; background: var(--track-bg); border-radius: 4px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: ${color}; transition: width 0.4s ease;"></div>
        </div>
        <div style="text-align: right; font-size: 11px; font-weight: bold; margin-top: 8px; color: ${overageColor};">
          ${limit === 0 ? 'No budget set' : (remaining < 0 ? 'Over budget by ' + userSettings.currency + Math.abs(remaining).toFixed(2) : userSettings.currency + remaining.toFixed(2) + ' left')}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = cardsHtml;

  // 4. Draw Double Bar Chart
  const activeChartData = chartData.filter(d => d.limit > 0 || d.spent > 0);
  if (activeChartData.length === 0) {
    chartContainer.innerHTML = '<div style="display: flex; height: 100%; justify-content: center; align-items: center; color: var(--text-muted); font-size: 12px; font-weight: bold;">Set a budget for this month</div>';
    // NEW: Ensure total cards hit 0 if no budget exists
    animateValue('budget-overall-limit', overallTotalBudget, 1000);
    animateValue('budget-overall-spent', overallTotalSpent, 1000);
    return;
  }
  
  let maxVal = Math.max(...activeChartData.map(d => Math.max(d.spent, d.limit)));
  if (maxVal === 0) maxVal = 1;

  let svgHtml = `<svg width="100%" height="100%" style="overflow: visible; font-family: inherit;">`;
  const groupWidth = 100 / activeChartData.length;
  
  activeChartData.forEach((d, i) => {
    const centerX = (i * groupWidth) + (groupWidth / 2);
    const w = Math.min(groupWidth / 2.5, 8); 
    
    const limitH = (d.limit / maxVal) * 65;
    const spentH = (d.spent / maxVal) * 65;
    
    const limitY = 80 - limitH;
    const spentY = 80 - spentH;
    const spentColor = d.spent > d.limit && d.limit > 0 ? 'var(--danger)' : 'var(--accent-color)';
    const shortName = d.name.substring(0, 3).toUpperCase();

    if (d.limit > 0) {
      svgHtml += `<rect x="${centerX - w - 0.5}%" y="${limitY}%" width="${w}%" height="${limitH}%" fill="var(--track-bg)" rx="2"></rect>`;
      svgHtml += `<text x="${centerX - (w/2) - 0.5}%" y="${limitY - 3}%" font-size="10px" fill="var(--text-muted)" text-anchor="middle">${userSettings.currency}${Math.round(d.limit)}</text>`;
    }
    if (d.spent > 0) {
      svgHtml += `<rect x="${centerX + 0.5}%" y="${spentY}%" width="${w}%" height="${spentH}%" fill="${spentColor}" rx="2"></rect>`;
      svgHtml += `<text x="${centerX + (w/2) + 0.5}%" y="${spentY - 3}%" font-size="10px" fill="${spentColor}" text-anchor="middle" font-weight="bold">${userSettings.currency}${Math.round(d.spent)}</text>`;
    }
    svgHtml += `<text x="${centerX}%" y="95%" font-size="11px" fill="var(--text-main)" text-anchor="middle" font-weight="bold">${shortName}</text>`;
  });
  
  svgHtml += `</svg>`;
  chartContainer.innerHTML = svgHtml;

  // NEW: Apply totals to the KPI cards at the very end
  animateValue('budget-overall-limit', overallTotalBudget, 1000);
  animateValue('budget-overall-spent', overallTotalSpent, 1000);
}

function openBudgetModal(category, currentLimit) {
  document.getElementById('budget-category-id').value = category;
  document.getElementById('budget-amount').value = currentLimit > 0 ? currentLimit : '';
  
  // Set placeholder currency dynamic
  document.querySelector('#budget-form .currency-input span').innerText = userSettings.currency;
  
  document.getElementById('budget-modal-title').innerText = `Limit for ${category}`;
  document.getElementById('budget-modal').style.display = 'flex';
}

// --- THEME TOGGLE LOGIC ---
function toggleTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('budget_app_theme', newTheme);
  
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Auto-load saved theme on startup
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('budget_app_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
});

// --- DYNAMIC SUBMENU LOGIC ---
function toggleNavMenu(menuId) {
  // Close other open menus first
  document.querySelectorAll('.nav-submenu').forEach(menu => {
    if (menu.id !== menuId) menu.classList.remove('show');
  });
  
  const menu = document.getElementById(menuId);
  if (menu) menu.classList.toggle('show');
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-menu-container')) {
    document.querySelectorAll('.nav-submenu').forEach(menu => menu.classList.remove('show'));
  }
});

// --- EXPORT LOCAL BACKUP (CSV) ---
function exportLocalData() {
  if (!globalTransactions || globalTransactions.length === 0) {
    alert("No transactions to export yet!");
    return;
  }

  // 1. Define CSV headers
  const headers = ["ID", "Type", "Date", "Amount", "Category", "Account", "Description"];
  const csvRows = [];
  csvRows.push(headers.join(",")); 
  
  // 2. Map transactions to CSV rows, escaping commas and quotes
  globalTransactions.forEach(t => {
    const row = [
      t.ID || "",
      t.Type || "",
      t.Date || "",
      t.Amount || 0,
      `"${(t.Category || "").toString().replace(/"/g, '""')}"`,
      `"${(t.Account || "").toString().replace(/"/g, '""')}"`,
      `"${(t.Description || "").toString().replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(","));
  });

  // 3. Convert to CSV string
  const csvString = csvRows.join("\n");
  
  // 4. Create a temporary invisible download link
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  // 5. Trigger the download with a date-stamped filename
  const dateStamp = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `Budget_Transactions_${dateStamp}.csv`;
  document.body.appendChild(a);
  a.click();
  
  // 6. Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- MANUAL CLOUD SYNC ---
async function syncFromCloud() {
  const scriptUrl = document.getElementById('set-url').value;
  if (!scriptUrl) {
    alert("Please set your Google Web App URL in the Settings tab first.");
    return;
  }
  
  const btn = document.getElementById('cloud-sync-btn');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
  
  try {
    const cacheBusterUrl = scriptUrl + (scriptUrl.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
    const response = await fetch(cacheBusterUrl, { cache: 'no-store' });
    const data = await response.json();
    
    if (data.transactions && data.transactions.length > 0) {
      localStorage.setItem('budget_app_transactions', JSON.stringify(data.transactions));
    }
    
    if (data.settings) {
      const localMemory = JSON.parse(localStorage.getItem('budgetSettings')) || {};
      const protectedName = localMemory.name || ''; 
      
      const mergedSettings = { ...data.settings, name: protectedName };
      
      // NEW: Wipe stale JSON budgets and rebuild them strictly from the Budgets tab data
      mergedSettings.budgets = {}; 
      if (data.budgets && data.budgets.length > 0) {
        data.budgets.forEach(b => {
          if (!mergedSettings.budgets[b.Month]) mergedSettings.budgets[b.Month] = {};
          mergedSettings.budgets[b.Month][b.Category] = b.Limit;
        });
      }
      
      localStorage.setItem('budgetSettings', JSON.stringify(mergedSettings));

      // NEW: Bridge the gap between cloud settings and local debt memory
      if (data.settings.debtExtraPayment !== undefined) {
        const localDebtSettings = JSON.parse(localStorage.getItem('debtSettings')) || { strategy: 'avalanche', extra: 0 };
        localDebtSettings.extra = data.settings.debtExtraPayment;
        localStorage.setItem('debtSettings', JSON.stringify(localDebtSettings));
      }
    }
    
    window.location.reload(); 
  } catch (error) {
    console.error(error);
    alert("Sync failed. Check your internet connection or URL.");
  } finally {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
  }
}

// --- SYNC SETTINGS TO CLOUD ---
async function pushSettingsToCloud() {
  const scriptUrl = document.getElementById('set-url').value;
  if (!scriptUrl) return; 
  
  const extraDebtInput = document.getElementById('debt-extra-payment');
  if (extraDebtInput) {
    userSettings.debtExtraPayment = parseFloat(extraDebtInput.value) || 0;
  }

  // Use JSON parse/stringify for a true deep clone, breaking the reference
  const cloudSettings = JSON.parse(JSON.stringify(userSettings));
  delete cloudSettings.name;
  delete cloudSettings.budgets; // This will now fully remove the budgets from the payload

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'syncSettings',
        settings: cloudSettings
      })
    });
  } catch(e) {
    console.error("Failed to sync settings to cloud.");
  }
}