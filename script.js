// VERSJON 2.0 - Gemini 3
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
    const key = document.getElementById('userApiKey').value.trim();
    if (!key) return alert("Vennligst lim inn en nøkkel!");
    localStorage.setItem('gemini_key', key);
    alert("Nøkkelen er lagret!");
    document.getElementById('apiSection').classList.add('d-none');
}

async function askAI() {
    const input = document.getElementById('aiInput').value;
    const responseDiv = document.getElementById('aiResponse');
    const API_KEY = localStorage.getItem('gemini_key');
    
    if (!API_KEY) return alert("Legg inn API-nøkkel først!");
    
    responseDiv.classList.remove('d-none');
    responseDiv.innerHTML = "<em>Kobler til Gemini 3... ⚖️</em>";

    // Vi bruker modellen fra dokumentasjonen din: gemini-3-flash-preview
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Svar på norsk: " + input }] }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const aiText = data.candidates[0].content.parts[0].text;
        responseDiv.innerText = aiText;
    } catch (error) {
        responseDiv.innerHTML = `<span class="text-danger">Feil: ${error.message}</span>`;
        console.error("DEBUG:", error);
    }
}