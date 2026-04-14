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

    try {
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Du er en juridisk assistent. Svar på norsk: " + input }] }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const aiText = data.candidates[0].content.parts[0].text;
        responseDiv.innerText = aiText;
    } catch (error) {
        responseDiv.innerHTML = `<span class="text-danger">Feil: ${error.message}</span>`;
    }
}