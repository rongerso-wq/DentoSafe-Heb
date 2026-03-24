const protocols = {
    avulsion: {
        title: "Avulsion Protocol",
        emergency: "Ensure the tooth is a permanent tooth. Keep patient calm. Find the tooth and pick it up by the crown. If dirty, wash briefly (10 secs) under cold running water. Replant immediately if possible, or store in milk, HBSS, or saline if replantation is impossible.",
        diagnosis: "Clinically: Tooth is completely out of socket. Radiographically: Empty socket. Check for possible alveolar bone plate fractures.",
        treatment: [
            "Administer local anesthesia.",
            "Irrigate socket with saline. Examine for alveolar fracture (reposition if fractured).",
            "Replant the tooth slowly with slight digital pressure.",
            "Verify position clinically and radiographcally.",
            "Apply a flexible splint for 2 weeks (up to 4 weeks if extra-oral dry time > 60 min).",
            "Prescribe systemic antibiotics (Amoxicillin or Doxycycline for patients >12yo) and update Tetanus."
        ],
        followups: [14, 30, 90] // Days from today (2 weeks, 4 weeks, 3 months)
    },
    intrusion: {
        title: "Intrusion Protocol",
        emergency: "Clean the area with water/saline. Reassure the patient. Do not attempt to forcibly pull the tooth out. Administer pain relief if needed.",
        diagnosis: "Clinically: Tooth is displaced axially into the alveolar bone. Sounds metallic to percussion. Radiographically: Missing or reduced periodontal ligament space. CEJ is located apically.",
        treatment: [
            "For teeth with incomplete root formation: Allow spontaneous eruption. If no movement in 4 weeks, initiate orthodontic repositioning.",
            "For teeth with complete root formation: Allow spontaneous eruption only if intruded <3mm. If 3-7mm, reposition orthodontically or surgically. If >7mm, reposition surgically.",
            "If surgical repositioning: Apply flexible splint for 4-8 weeks.",
            "Initiate RCT within 2 weeks for all fully formed roots."
        ],
        followups: [14, 28, 56] // 2 weeks, 4 weeks, 8 weeks
    },
    lateral: {
        title: "Lateral Luxation Protocol",
        emergency: "Clean the area and face. Stop bleeding with gentle pressure. Reassure the patient.",
        diagnosis: "Clinically: Tooth is displaced palatally/lingually or labially, often immovable and gives a high metallic sound to percussion. Radiographically: Widened PDL space, apex usually displaced labially into the bone.",
        treatment: [
            "Administer local anesthesia.",
            "Reposition the tooth gently using digital pressure to free it from the bony lock and guide it back into the socket.",
            "Verify correct position radiographically.",
            "Stabilize the tooth with a flexible splint for 4 weeks.",
            "Monitor pulpal status. If fully formed root, high risk of necrosis; initiate RCT if pulp necrosis is diagnosed."
        ],
        followups: [14, 28, 56] // 2w, 4w, 8w
    },
    root: {
        title: "Root Fracture Protocol",
        emergency: "Clean the area. Reassure patient. Avoid biting on the affected tooth.",
        diagnosis: "Clinically: Coronal segment may be mobile and displaced. Pain on biting. Radiographically: Fracture line visible (may require multiple angles - periapical, occlusal).",
        treatment: [
            "Administer local anesthesia if needed.",
            "Reposition the coronal segment as soon as possible.",
            "Verify position radiographically.",
            "Stabilize with a flexible splint for 4 weeks (up to 4 months if fracture is in cervical third).",
            "Monitor for pulpal healing. RCT is only indicated if pulp necrosis develops (treatment usually limited to coronal fragment)."
        ],
        followups: [28, 56, 120] // 4w, 8w, 4m
    }
};

function selectTrauma(type) {
    // Reset buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'border-blue-500', 'bg-blue-50');
        btn.classList.add('bg-white', 'border-transparent');
    });
    
    // Set active button
    const btnId = `btn-${type}`;
    const activeBtn = document.getElementById(btnId);
    activeBtn.classList.remove('bg-white', 'border-transparent');
    activeBtn.classList.add('active', 'border-blue-500', 'bg-blue-50');

    // Show panels
    document.getElementById('protocol-card').classList.remove('hidden');
    document.getElementById('followup-card').classList.remove('hidden');

    // Load data
    const data = protocols[type];
    document.getElementById('protocol-title').innerText = data.title;
    document.getElementById('prot-emergency').innerText = data.emergency;
    document.getElementById('prot-diagnosis').innerText = data.diagnosis;
    
    const treatmentHtml = data.treatment.map(step => `<div class="flex items-start gap-2"><i class="fa-solid fa-check text-green-500 mt-1"></i><span>${step}</span></div>`).join('');
    document.getElementById('prot-treatment').innerHTML = treatmentHtml;

    // Smart Follow Up
    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('today-date').innerText = today.toLocaleDateString('en-US', options);

    const fuContainer = document.getElementById('followup-container');
    fuContainer.innerHTML = '';
    
    data.followups.forEach((daysToAdd, index) => {
        const fuDate = new Date(today);
        fuDate.setDate(fuDate.getDate() + daysToAdd);
        
        let label = '';
        if (daysToAdd <= 14) label = "2 Weeks";
        else if (daysToAdd <= 30) label = "4 Weeks";
        else if (daysToAdd <= 60) label = "8 Weeks";
        else if (daysToAdd <= 90) label = "3 Months";
        else if (daysToAdd <= 120) label = "4 Months";

        fuContainer.innerHTML += `
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Follow-up ${index + 1}</div>
                <div class="text-blue-600 font-bold text-lg mb-1">${label}</div>
                <div class="text-gray-800 text-sm font-medium">${fuDate.toLocaleDateString('en-US', options)}</div>
            </div>
        `;
    });
}

function generatePatientSummary() {
    document.getElementById('summary-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('summary-modal').classList.add('hidden');
}
