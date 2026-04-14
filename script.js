function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function beregnSlutt() {
    const datoInput = document.getElementById('oppsigelsesDato').value;
    if (!datoInput) return alert("Velg en dato først!");
    let dato = new Date(datoInput);
    dato.setMonth(dato.getMonth() + 3);
    let sisteDag = new Date(dato.getFullYear(), dato.getMonth() + 1, 0);
    document.getElementById('resultat').innerHTML = "Arbeidsforholdet avsluttes: " + sisteDag.toLocaleDateString('no-NO');
}

function saveKey() {
    const key = document.getElementById('userApiKey').value;
    if (!key) return alert("Vennligst lim inn en nøkkel!");
    localStorage.setItem('gemini_key', key);
    alert("Nøkkelen er lagret lokalt!");
    document.getElementById('apiSection').classList.add('d-none');
}

async function askAI() {
    const input = document.getElementById('aiInput').value;
    const responseDiv = document.getElementById('aiResponse');
    const API_KEY = localStorage.getItem('gemini_key');
    
    if (!API_KEY) return alert("Legg inn API-nøkkel under 'Innstillinger' først!");
    if (!input) return alert("Skriv noe først!");

    responseDiv.classList.remove('d-none');
    responseDiv.innerHTML = "<em>Tenker... ⚖️</em>";

    // Denne URL-en er den offisielle for Gemini Pro
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Svar kort på norsk: " + input }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            responseDiv.innerText = aiText;
        } else {
            responseDiv.innerText = "Fikk et uventet svarformat fra Google.";
        }

    } catch (error) {
        console.error("Full feilmelding:", error);
        responseDiv.innerHTML = `<span class="text-danger">Feil: ${error.message}</span>`;
    }
}